import { useEffect, useState } from 'react'
import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, FileText, LinkedIn, MailPlus } from './Icons.jsx'

// The fields the badge cycles through, matching the kinds of projects on the page.
const fields = ['software', 'hardware', 'AI/ML', 'robotics']

// Steps through the fields once, a few seconds each, then rests on the first.
// Text that keeps changing with no way to stop it is hard on some readers, so it
// does not loop. Reduced-motion visitors just get the first field.
function useCycle(length, ms = 2400) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let step = 0
    const id = setInterval(() => {
      step += 1
      setI(step % length)
      if (step >= length) clearInterval(id)
    }, ms)
    return () => clearInterval(id)
  }, [length, ms])
  return i
}

// A compact "get in touch" card at the end of the Projects page: availability
// badge, one line, and the three ways to reach me.
export default function ContactCTA({ index = 3 }) {
  const { copied, copy } = useCopyEmail()
  const field = useCycle(fields.length)
  return (
    <aside className="glass rise rounded-3xl p-4" style={{ '--i': index }} aria-label="Get in touch">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-ok/35 bg-ok/10 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-ok">
          <span aria-hidden className="size-2 rounded-full bg-ok" />
          Open to internships
        </span>
        <span className="font-mono text-xs text-fog">
          in{' '}
          <span key={field} className="swap-in inline-block text-snow">
            {fields[field]}
          </span>
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-snug text-mist">
        Always up for a new problem. Building something interesting? I’d love to help.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {/* Both labels share one grid cell, so the button is always as wide as the
            email and doesn't shrink when it says "Copied!". */}
        <button type="button" onClick={copy} className="btn btn-light relative h-9 px-3 text-[13px] after:absolute after:inset-x-0 after:-inset-y-1 after:content-['']" aria-live="polite">
          {copied ? <Check size={14} className="pop-in text-ok" /> : <MailPlus size={14} />}
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
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-glass relative h-9 px-3 text-[13px] after:absolute after:inset-x-0 after:-inset-y-1 after:content-['']">
          <LinkedIn size={14} />
          LinkedIn
        </a>
        {site.resume && (
          <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-glass relative h-9 px-3 text-[13px] after:absolute after:inset-x-0 after:-inset-y-1 after:content-['']">
            <FileText size={14} />
            Resume
          </a>
        )}
      </div>
    </aside>
  )
}
