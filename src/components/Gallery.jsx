import { useEffect, useRef, useState } from 'react'
import { play } from '../lib/sound.js'
import { ArrowLeft, ArrowRight, Close, Play } from './Icons.jsx'

// Photos and videos for a project, from its `gallery` in data/projects.js.
// Each item: { src, alt, caption?, poster? }. Images (jpg, png, webp, gif, svg)
// and videos (mp4, webm) both work; `poster` is the still a video shows before
// it plays. Videos play muted and loop. Shown as a carousel (arrows, dots, swipe, auto-advance). Clicking a slide
// opens it full size; arrows, swipes and Esc work there.

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src)

// `eager` loads the first photo right away (right for the page's main gallery); `auto`
// turns on auto-advance. Galleries further down a page pass false for both.
export default function Gallery({ items, eager = true, auto = true }) {
  const [open, setOpen] = useState(-1)
  const dialog = useRef(null)
  const touchX = useRef(null)
  const n = items?.length ?? 0
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open >= 0 && !d.open) d.showModal()
    if (open < 0 && d.open) d.close()
  }, [open])

  // Slide to photo i (wrapping). The scroll handler keeps `index` in step.
  const go = (i) => {
    const t = track.current
    if (!t) return
    t.scrollTo({ left: ((i + n) % n) * t.clientWidth })
  }
  const onScroll = (e) => {
    const t = e.currentTarget
    setIndex(Math.round(t.scrollLeft / t.clientWidth))
  }

  // Auto-advance every few seconds; stops while hovered or focused, while the
  // full-size viewer is open, and for visitors who prefer reduced motion.
  useEffect(() => {
    if (!auto || n < 2 || hover || open >= 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => go(index + 1), 4500)
    return () => clearInterval(id)
  })

  if (!n) return null

  const close = () => {
    if (open >= 0) play('close')
    setOpen(-1)
  }
  const step = (dir) => setOpen((i) => (i + dir + n) % n)
  const current = items[open]

  const onKeyDown = (e) => {
    if (n < 2) return
    if (e.key === 'ArrowLeft') step(-1)
    if (e.key === 'ArrowRight') step(1)
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - (touchX.current ?? 0)
    if (n > 1 && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <section className="mt-8" aria-label="Project photos" aria-roledescription="carousel">
      <div
        className="glass rounded-3xl p-1.5"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <div className="relative">
          <div
            ref={track}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((g, k) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setOpen(k)}
                data-sound="open"
                aria-label={`View ${g.alt || `item ${k + 1}`} full size`}
                aria-roledescription="slide"
                className="relative aspect-[16/10] w-full shrink-0 snap-center bg-ash"
              >
                {isVideo(g.src) ? (
                  <>
                    <video src={g.src} poster={g.poster} muted loop playsInline preload="metadata" className="size-full object-contain" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-snow/90 text-void">
                        <Play size={18} />
                      </span>
                    </span>
                  </>
                ) : (
                  <img src={g.src} alt={g.alt ?? ''} loading={eager && k === 0 ? 'eager' : 'lazy'} className="size-full object-contain" />
                )}
              </button>
            ))}
          </div>

          {n > 1 &&
            [
              [-1, 'Previous photo', ArrowLeft, 'left-3'],
              [1, 'Next photo', ArrowRight, 'right-3'],
            ].map(([dir, label, Icon, side]) => (
              <button
                key={label}
                type="button"
                onClick={() => go(index + dir)}
                data-sound="slide"
                aria-label={label}
                className={`btn btn-scrim absolute top-1/2 size-10 -translate-y-1/2 px-0 ${side}`}
              >
                <Icon size={16} />
              </button>
            ))}
        </div>

        <div className="flex items-center justify-between gap-3 px-2.5 pb-1.5 pt-2.5">
          <p className="min-w-0 text-sm text-fog" aria-live="polite">
            {items[index]?.caption}
          </p>
          {n > 1 && (
            <div className="flex shrink-0 items-center gap-1.5">
              {items.map((g, k) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Go to photo ${k + 1}`}
                  aria-current={k === index}
                  className={`size-2 rounded-full transition-colors ${k === index ? 'bg-snow' : 'bg-white/25 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <dialog
        ref={dialog}
        onClose={close}
        onKeyDown={onKeyDown}
        aria-label={current?.alt || 'Gallery'}
        className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent p-0 text-snow backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div
            className="flex size-full flex-col items-center justify-center gap-3 px-4 py-16 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && close()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={close}
              data-sound="off"
              autoFocus
              aria-label="Close"
              className="btn btn-scrim absolute right-4 top-4 size-11 px-0"
            >
              <Close size={18} />
            </button>

            <figure className="flex max-h-full max-w-6xl flex-col items-center gap-3">
              {isVideo(current.src) ? (
                <video
                  key={current.src}
                  src={current.src}
                  poster={current.poster}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="swap-in max-h-[78dvh] max-w-full rounded-2xl"
                />
              ) : (
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt ?? ''}
                  className="swap-in max-h-[78dvh] max-w-full rounded-2xl object-contain"
                />
              )}
              <figcaption className="text-center text-sm text-fog">
                {current.caption}
                {n > 1 && (
                  <span className="ml-3 font-mono text-xs text-steel">
                    {open + 1}/{n}
                  </span>
                )}
              </figcaption>
            </figure>

            {n > 1 &&
              [
                [-1, 'Previous', ArrowLeft, 'left-4'],
                [1, 'Next', ArrowRight, 'right-4'],
              ].map(([dir, label, Icon, side]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => step(dir)}
                  data-sound="slide"
                  aria-label={label}
                  className={`btn btn-scrim absolute bottom-4 size-11 px-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${side}`}
                >
                  <Icon size={18} />
                </button>
              ))}
          </div>
        )}
      </dialog>
    </section>
  )
}
