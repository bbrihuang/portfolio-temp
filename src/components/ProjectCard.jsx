import { useState } from 'react'
import { Link } from 'react-router'
import { useTilt } from '../lib/hooks.js'
import { ArrowRight, Plus } from './Icons.jsx'
import ProjectArt from './ProjectArt.jsx'

// A project tile in the style of nikp.xyz: cover art, a short rule, title,
// date and stack. The whole card links to the project page; the + button
// slides up a quick-look panel instead. Featured cards span two columns.
export default function ProjectCard({ project: p, index = 0 }) {
  const [open, setOpen] = useState(false)
  const tilt = useTilt(4)
  const href = `/projects/${p.slug}`

  return (
    <article
      ref={tilt}
      className="glass rise group relative flex h-full flex-col overflow-hidden rounded-3xl transition-[transform,border-color] duration-500 ease-out-expo [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-white/20"
      style={{ '--i': index + 3 }}
    >
      <div
        className={`relative overflow-hidden ${
          p.featured ? 'aspect-[16/8] lg:aspect-auto lg:min-h-[220px] lg:flex-1' : 'aspect-[16/10]'
        }`}
      >
        <div className="absolute inset-0" style={{ viewTransitionName: `art-${p.slug}`, viewTransitionClass: 'art' }}>
          <ProjectArt
            project={p}
            className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#141416] to-transparent" />

        {p.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-snow px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-void shadow-lg">
            ★ Featured
          </span>
        )}
        <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: p.accent }}>
          {p.categories[0]}
        </span>

        {/* Quick look */}
        <div
          id={`peek-${p.slug}`}
          className={`glass-strong absolute inset-x-3 bottom-3 z-10 rounded-2xl p-4 transition-[transform,opacity] duration-500 ease-out-expo ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[calc(100%+1rem)] opacity-0'
          }`}
          inert={!open}
        >
          <p className="line-clamp-4 text-sm leading-relaxed text-mist">{p.summary}</p>
          <Link
            to={href}
            viewTransition
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-snow"
          >
            <span className="link-line">View project</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Sheen that follows the pointer (position from useTilt). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,50%),rgb(255_255_255/0.07),transparent_45%)]"
      />

      <div className="p-5">
        <div
          className="h-0.5 w-10 rounded-full transition-[width] duration-500 ease-out-expo group-hover:w-20"
          style={{ background: p.accent ?? '#f4f4f5' }}
        />
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            <Link to={href} viewTransition className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-snow">
              {p.title}
            </Link>
          </h3>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`peek-${p.slug}`}
            aria-label={open ? `Close quick look at ${p.title}` : `Quick look at ${p.title}`}
            className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-fog transition-colors hover:border-white/25 hover:text-snow aria-expanded:border-transparent aria-expanded:bg-snow aria-expanded:text-void"
          >
            <Plus size={16} className={`transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : ''}`} />
          </button>
        </div>
        <p className="mt-1 font-mono text-xs text-fog">{p.date}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-fog">{p.short}</p>
        <p className="mt-3 line-clamp-1 font-mono text-[11px] text-steel">{p.stack.join(' · ')}</p>
      </div>
    </article>
  )
}
