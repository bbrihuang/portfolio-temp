import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, LinkedIn, MailPlus } from './Icons.jsx'

export default function ContactCTA() {
  const { copied, copy } = useCopyEmail()
  return (
    <section className="glass rise relative mt-20 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12" style={{ '--i': 8 }}>
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -right-4 -top-12 size-44 rounded-full border border-white/[0.07]" />
      <p className="eyebrow">Get in touch</p>
      <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Looking for internships and interesting problems.
      </h2>
      <p className="mt-3 max-w-lg text-fog">Email is the fastest way to reach me.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" onClick={copy} className="btn btn-light" aria-live="polite">
          {copied ? <Check size={16} /> : <MailPlus size={16} />}
          {copied ? 'Copied!' : site.email}
        </button>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-glass">
          <LinkedIn size={16} />
          LinkedIn
        </a>
      </div>
    </section>
  )
}
