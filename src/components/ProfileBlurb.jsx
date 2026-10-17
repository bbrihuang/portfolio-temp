import { useState } from 'react'
import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, Copy } from './Icons.jsx'
import Terminal from './Terminal.jsx'

function Avatar() {
  const [failed, setFailed] = useState(false)
  if (failed || !site.avatar) {
    return (
      <div className="grid size-20 shrink-0 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-graphite to-ash text-2xl font-semibold tracking-tight text-mist">
        BH
      </div>
    )
  }
  return (
    <img
      src={site.avatar}
      alt={`Photo of ${site.name}`}
      width="80"
      height="80"
      onError={() => setFailed(true)}
      className="size-20 shrink-0 rounded-2xl border border-white/15 object-cover"
    />
  )
}

// Email under the name. Click copies it; the icon confirms.
function CopyEmail() {
  const { copied, copy } = useCopyEmail()
  return (
    <button
      type="button"
      onClick={copy}
      title="Copy email"
      className="group inline-flex min-h-11 max-w-full items-center gap-1.5 font-mono text-sm text-mist transition-colors hover:text-snow"
    >
      <span className="link-line truncate">{site.email}</span>
      {copied ? (
        <Check size={14} className="shrink-0 text-emerald-400" />
      ) : (
        <Copy size={14} className="shrink-0 text-steel transition-colors group-hover:text-snow" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copied' : ''}
      </span>
    </button>
  )
}

// The profile card and the terminal (Terminal.jsx), stacked on the homepage.
// `startIndex` continues the page's entrance stagger.
export function ProfileCard({ startIndex = 0, className = '' }) {
  return (
    <div className={`glass rise flex items-center gap-5 rounded-3xl p-5 ${className}`} style={{ '--i': startIndex }}>
        <Avatar />
        <div className="min-w-0">
          <p className="text-xl font-semibold tracking-tight">{site.name}</p>
          <CopyEmail />
          <p className="mt-0.5 text-sm text-fog">
            {site.school} · Class of ’{String(site.classOf).slice(2)}
          </p>
        </div>
    </div>
  )
}

export default function ProfileBlurb({ startIndex = 0 }) {
  return (
    <div className="flex flex-col gap-4">
      <ProfileCard startIndex={startIndex} />
      <Terminal startIndex={startIndex + 1} />
    </div>
  )
}
