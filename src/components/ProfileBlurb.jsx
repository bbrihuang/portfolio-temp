import { useState } from 'react'
import { site } from '../config.js'
import { useCopyEmail } from '../lib/hooks.js'
import { Check, Code, Copy, Cpu, Prompt, Rocket, Wrench } from './Icons.jsx'

const lines = [
  { icon: Code, color: 'text-sky-400', cmd: 'build --lead', out: 'GradientV · Lead Software Engineer' },
  { icon: Rocket, color: 'text-orange-400', cmd: 'propulsion --team', out: 'BURPG · Nozzle Design Engineer' },
  { icon: Wrench, color: 'text-emerald-400', cmd: 'ventures --custom', out: 'Cubic Builds · $10K+ in custom PCs' },
  { icon: Cpu, color: 'text-rose-400', cmd: 'techops --role', out: 'BU COM TechOps · Student Assistant' },
]

const whoami = `Brian Huang · Computer Engineering ’${String(site.classOf).slice(2)}`

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
      className="group inline-flex max-w-full items-center gap-1.5 font-mono text-sm text-mist transition-colors hover:text-snow"
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

// The profile card and terminal from the original portfolio, restyled to
// sit on glass. `startIndex` continues the page's entrance stagger.
export default function ProfileBlurb({ startIndex = 0 }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="glass rise flex items-center gap-5 rounded-3xl p-5" style={{ '--i': startIndex }}>
        <Avatar />
        <div className="min-w-0">
          <p className="text-xl font-semibold tracking-tight">{site.name}</p>
          <CopyEmail />
          <p className="mt-0.5 text-sm text-fog">
            {site.school} · Class of ’{String(site.classOf).slice(2)}
          </p>
          <p className="mt-1 flex items-center gap-2 font-mono text-[11px] text-steel">
            <span className="relative grid size-2 place-items-center">
              <span className="pulse-ring absolute inset-0 rounded-full bg-emerald-400/60" />
              <span className="size-2 rounded-full bg-emerald-400" />
            </span>
            GradientV · BURPG · Cubic Builds
          </p>
        </div>
      </div>

      <div className="glass rise overflow-hidden rounded-3xl" style={{ '--i': startIndex + 1 }}>
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
          <div className="flex gap-2" aria-hidden>
            <span className="size-3 rounded-full bg-[#ff5f57]/85" />
            <span className="size-3 rounded-full bg-[#febc2e]/85" />
            <span className="size-3 rounded-full bg-[#28c840]/85" />
          </div>
          <span className="font-mono text-xs text-steel">{site.email}:~</span>
        </div>

        <div className="space-y-4 px-5 py-5 font-mono text-[13px] leading-relaxed">
          <div>
            <p className="flex items-center gap-2.5 text-steel">
              <Prompt size={16} />
              whoami
            </p>
            <p className="mt-1 pl-[26px] font-semibold text-snow">
              <span aria-label={whoami}>
                <span aria-hidden className="typed" style={{ '--chars': whoami.length + 3, width: `${whoami.length + 3}ch` }}>
                  &gt; {whoami}
                </span>
              </span>
            </p>
          </div>

          {lines.map((l, i) => (
            <div key={l.cmd} className="rise" style={{ '--i': startIndex + 3 + i }}>
              <p className="flex items-center gap-2.5 text-steel">
                <l.icon size={16} className={l.color} />
                {l.cmd}
              </p>
              <p className="mt-1 pl-[26px] font-medium text-mist">{l.out}</p>
            </div>
          ))}

          <p className="flex items-center gap-2.5 text-steel">
            <Prompt size={16} />
            <span className="caret inline-block h-4 w-2 bg-mist/80" aria-hidden />
          </p>
        </div>
      </div>
    </div>
  )
}
