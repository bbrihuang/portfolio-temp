import { site } from '../config.js'
import { useCopyEmail, useTilt } from '../lib/hooks.js'
import { Check, FileText, LinkedIn, MailPlus } from './Icons.jsx'

// A compact "get in touch" card that sits to the right of the Projects page
// header: availability badge, one line, and the three ways to reach me. A slow
// light runs around its rim and a sheen follows the pointer.
export default function ContactCTA({ index = 3 }) {
  const { copied, copy } = useCopyEmail()
  const sheen = useTilt(0)
  return (
    <aside
      ref={sheen}
      className="glass live-rim rise group relative rounded-3xl p-5 sm:p-6"
      style={{ '--i': index }}
      aria-label="Get in touch"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--gx,50%)_var(--gy,50%),rgb(52_211_153/0.08),transparent_50%)]"
      />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300">
          <span className="relative grid size-2 place-items-center">
            <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400/60" />
            <span className="size-2 rounded-full bg-emerald-400" />
          </span>
          Open to internships
        </span>
      </div>
      <p className="relative mt-4 text-[15px] leading-relaxed text-mist">
        Always up for a new problem. If you’re building something interesting, I’d love to help, and learn a lot along the
        way.
      </p>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {/* Both labels share one grid cell, so the button is always as wide as the
            email and doesn't shrink when it says "Copied!". */}
        <button
          type="button"
          onClick={copy}
          className={`btn btn-light shimmer h-10 px-4 text-sm ${copied ? 'copied-pop' : ''}`}
          aria-live="polite"
        >
          {copied ? <Check size={15} className="pop-in text-emerald-600" /> : <MailPlus size={15} />}
          <span className="grid">
            <span className={`col-start-1 row-start-1 transition-opacity duration-200 ${copied ? 'opacity-0' : ''}`} aria-hidden={copied}>
              {site.email}
            </span>
            <span
              className={`col-start-1 row-start-1 text-center transition-opacity duration-200 ${copied ? '' : 'opacity-0'}`}
              aria-hidden={!copied}
            >
              Copied!
            </span>
          </span>
        </button>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-glass h-10 px-4 text-sm">
          <LinkedIn size={15} />
          LinkedIn
        </a>
        {site.resume && (
          <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-glass h-10 px-4 text-sm">
            <FileText size={15} />
            Resume
          </a>
        )}
      </div>
    </aside>
  )
}
