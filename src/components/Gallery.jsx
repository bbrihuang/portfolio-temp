import { useEffect, useRef, useState } from 'react'
import { play } from '../lib/sound.js'
import { ArrowLeft, ArrowRight, Close, Play } from './Icons.jsx'

// Photos and videos for a project, from its `gallery` in data/projects.js.
// Each item: { src, alt, caption?, poster? }. Images (jpg, png, webp, gif, svg)
// and videos (mp4, webm) both work; `poster` is the still a video shows before
// it plays. Clicking an item opens it full size; arrows, swipes and Esc work there.

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src)

export default function Gallery({ items }) {
  const [open, setOpen] = useState(-1)
  const dialog = useRef(null)
  const touchX = useRef(null)
  const n = items?.length ?? 0

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open >= 0 && !d.open) d.showModal()
    if (open < 0 && d.open) d.close()
  }, [open])

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
    <section className="mt-16" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="eyebrow">
        Gallery
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g, k) => (
          <li key={g.src}>
            <button
              type="button"
              onClick={() => setOpen(k)}
              data-sound="open"
              aria-label={`View ${g.alt || `item ${k + 1}`}`}
              className="glass group block w-full rounded-3xl p-1.5 text-left transition-transform duration-500 ease-out-expo hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-ash">
                {isVideo(g.src) ? (
                  <>
                    <video src={g.src} poster={g.poster} muted playsInline preload="metadata" className="size-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-snow/90 text-void transition-transform duration-300 group-hover:scale-110">
                        <Play size={18} />
                      </span>
                    </span>
                  </>
                ) : (
                  <img
                    src={g.src}
                    alt={g.alt ?? ''}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                  />
                )}
              </div>
              {g.caption && <p className="px-2.5 pb-1.5 pt-2.5 text-sm text-fog">{g.caption}</p>}
            </button>
          </li>
        ))}
      </ul>

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
              className="btn btn-glass absolute right-4 top-4 size-11 px-0"
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
                  className={`btn btn-glass absolute bottom-4 size-11 px-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${side}`}
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
