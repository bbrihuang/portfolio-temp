import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, FileText, LinkedIn, MailPlus } from './Icons.jsx'

// A compact "get in touch" card that sits to the right of the Projects page
// header: availability badge, one line, and the three ways to reach me.
export default function ContactCTA({ index = 3 }) {
  const { copied, copy } = useCopyEmail()
  return (
    <aside className="glass rise rounded-3xl p-5 sm:p-6" style={{ '--i': index }} aria-label="Get in touch">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300">
        <span className="relative grid size-2 place-items-center">
          <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400/60" />
          <span className="size-2 rounded-full bg-emerald-400" />
        </span>
        Open to internships
      </span>
      <p className="mt-4 text-[15px] leading-relaxed text-mist">
        Always up for a new problem. If you’re building something interesting, I’d love to help, and learn a lot along the
        way.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={copy} className="btn btn-light h-10 px-4 text-sm" aria-live="polite">
          {copied ? <Check size={15} /> : <MailPlus size={15} />}
          {copied ? 'Copied!' : site.email}
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
