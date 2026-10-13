import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

// Each shape has two wrappers so its motions stay independent:
//   outer - pointer and scroll parallax (scaled by `depth`)
//   inner - the per-page layout below, which eases when the route changes
// Behind the glass panels these shapes blur into soft light, which is what
// makes the frosted surfaces read as glass. Nothing here animates while the
// page is idle: every glass panel re-blurs whenever the shapes move, so
// constant motion would keep the GPU busy on every frame.
const shapes = [
  { id: 'orb', depth: 28, size: [54, 54] },
  { id: 'ring', depth: 14, size: [82, 82] },
  { id: 'diamond', depth: 36, size: [26, 26] },
  { id: 'triangle', depth: 22, size: [28, 28] },
  { id: 'capsule', depth: 18, size: [44, 12] },
  { id: 'dots', depth: 44, size: [15, 15] },
  { id: 'axis', depth: 8, size: [0, 0] },
]

// Positions are top-left offsets in vw / vh, rotation in degrees.
const layouts = {
  home: {
    orb: { x: 60, y: 6, r: 0, s: 1 },
    ring: { x: -22, y: 34, r: 0, s: 1 },
    diamond: { x: 82, y: 64, r: 45, s: 1 },
    triangle: { x: 4, y: -4, r: 14, s: 1 },
    capsule: { x: 34, y: 82, r: -18, s: 1 },
    dots: { x: 90, y: 16, r: 0, s: 1 },
    axis: { x: 92, y: 86, r: 0, s: 1 },
  },
  experience: {
    orb: { x: -12, y: 38, r: 0, s: 1.15 },
    ring: { x: 52, y: -26, r: 90, s: 1 },
    diamond: { x: 72, y: 22, r: 20, s: 1.2 },
    triangle: { x: 82, y: 68, r: -24, s: 0.9 },
    capsule: { x: 8, y: 8, r: 24, s: 1 },
    dots: { x: 4, y: 78, r: 0, s: 1 },
    axis: { x: 95, y: 34, r: 0, s: 1 },
  },
  projects: {
    orb: { x: 68, y: 48, r: 0, s: 0.95 },
    ring: { x: 14, y: -34, r: 180, s: 1.1 },
    diamond: { x: 2, y: 56, r: 72, s: 0.9 },
    triangle: { x: 46, y: 0, r: 42, s: 1.1 },
    capsule: { x: 62, y: 8, r: -36, s: 1 },
    dots: { x: 88, y: 84, r: 0, s: 1 },
    axis: { x: 4, y: 90, r: 0, s: 1 },
  },
  detail: {
    orb: { x: 28, y: -22, r: 0, s: 1.25 },
    ring: { x: 58, y: 38, r: 270, s: 0.9 },
    diamond: { x: -6, y: 22, r: 12, s: 1 },
    triangle: { x: 86, y: 30, r: 64, s: 0.8 },
    capsule: { x: 70, y: 86, r: 16, s: 1 },
    dots: { x: 10, y: 72, r: 0, s: 1 },
    axis: { x: 96, y: 62, r: 0, s: 1 },
  },
}

function layoutFor(pathname) {
  if (pathname.startsWith('/experience')) return layouts.experience
  if (pathname === '/projects' || pathname === '/projects/') return layouts.projects
  if (pathname.startsWith('/projects/')) return layouts.detail
  return layouts.home
}

const W = { stroke: '#fff', fill: 'none', vectorEffect: 'non-scaling-stroke' }

function Shape({ id }) {
  switch (id) {
    case 'orb':
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <defs>
            <radialGradient id="bg-orb" cx="34%" cy="28%" r="78%">
              <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.085" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#bg-orb)" />
          <circle cx="50" cy="50" r="49.8" {...W} strokeOpacity="0.08" />
        </svg>
      )
    case 'ring':
      return (
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <circle cx="50" cy="50" r="50" {...W} strokeOpacity="0.1" />
          <circle cx="50" cy="50" r="41" {...W} strokeOpacity="0.07" strokeDasharray="2 6" />
        </svg>
      )
    case 'diamond':
      return (
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <defs>
            <linearGradient id="bg-sq" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.015" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#bg-sq)" />
          <rect x="-12" y="-12" width="124" height="124" {...W} strokeOpacity="0.08" />
        </svg>
      )
    case 'triangle':
      return (
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <defs>
            <linearGradient id="bg-tri" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="50,4 96,88 4,88" fill="url(#bg-tri)" />
          <polygon points="50,-8 108,96 -8,96" {...W} strokeOpacity="0.09" />
        </svg>
      )
    case 'capsule':
      return (
        <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="size-full">
          <defs>
            <linearGradient id="bg-cap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="28" rx="14" fill="url(#bg-cap)" />
        </svg>
      )
    case 'dots':
      return (
        <svg viewBox="0 0 70 70" className="size-full">
          {Array.from({ length: 49 }, (_, i) => (
            <circle key={i} cx={5 + (i % 7) * 10} cy={5 + Math.floor(i / 7) * 10} r="1" fill="#fff" fillOpacity="0.28" />
          ))}
        </svg>
      )
    case 'axis':
      // Drafting crosshair: two hairlines that span the screen and meet at a ring.
      return (
        <div className="relative">
          <div className="absolute -left-[200vw] h-px w-[400vw] bg-white/[0.05]" />
          <div className="absolute -top-[200vh] h-[400vh] w-px bg-white/[0.05]" />
          <div className="absolute -left-2 -top-2 size-4 rounded-full border border-white/25" />
          <div className="absolute -left-[3px] -top-[3px] size-[7px] rounded-full bg-white/50" />
        </div>
      )
    default:
      return null
  }
}

export default function Background() {
  const ref = useRef(null)
  const { pathname } = useLocation()
  const layout = layoutFor(pathname)

  // Feed pointer position (-1..1) and scroll offset to CSS variables, at most
  // once per frame.
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let px = 0
    let py = 0
    const apply = () => {
      frame = 0
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
      el.style.setProperty('--sy', String(Math.round(window.scrollY)))
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onMove = (e) => {
      px = (e.clientX / window.innerWidth) * 2 - 1
      py = (e.clientY / window.innerHeight) * 2 - 1
      queue()
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', queue, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', queue)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* Lift the top of the page so the ground reads as grey, not black. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#26262b_0%,#141416_48%,#0b0b0c_100%)]" />

      {shapes.map((s) => {
        const p = layout[s.id]
        return (
          <div
            key={s.id}
            className="absolute left-0 top-0 transition-transform duration-[1400ms] ease-out"
            style={{
              transform: `translate3d(calc(var(--px, 0) * ${s.depth}px), calc(var(--py, 0) * ${s.depth}px - var(--sy, 0) * ${(s.depth * 0.006).toFixed(3)}px), 0)`,
            }}
          >
            <div
              className="transition-transform duration-[1800ms] ease-out-expo"
              style={{ transform: `translate3d(${p.x}vw, ${p.y}vh, 0) rotate(${p.r}deg) scale(${p.s})` }}
            >
              <div style={{ width: `${s.size[0]}vmin`, height: `${s.size[1]}vmin` }}>
                <Shape id={s.id} />
              </div>
            </div>
          </div>
        )
      })}

      {/* Drafting grid, strongest near the top center. */}
      <div
        className="absolute inset-0 opacity-[0.55] [background-image:linear-gradient(rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,#000_20%,transparent_80%)]"
      />

      {/* Film grain keeps the large flat greys from banding. */}
      <div className="absolute inset-0 opacity-[0.035] [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22160%22%20height=%22160%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.55)_100%)]" />
    </div>
  )
}
