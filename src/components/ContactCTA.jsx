import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, FileText, LinkedIn, MailPlus } from './Icons.jsx'

// A slim "get in touch" reminder for recruiters, near the top of the Projects
// page: one line of text and the three ways to reach me.
export default function ContactCTA({ index = 3 }) {
  const { copied, copy } = useCopyEmail()
  return (
    <aside
      className="glass rise flex flex-col gap-4 rounded-3xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ '--i': index }}
      aria-label="Get in touch"
    >
      <p className="text-[15px] text-mist">
        <span className="mr-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Open to internships
        </span>
        Recruiting? Email is the fastest way to reach me.
      </p>
      <div className="flex flex-wrap gap-2">
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
