import Gallery from './Gallery.jsx'
import { ArrowRight } from './Icons.jsx'

// A project's write-up, from its `caseStudy` sections in data/projects.js.
// Each section has a `title` and any of:
//   text    a paragraph, or an array of paragraphs
//   flow    pipeline steps drawn as a diagram: strings, or { label, note }
//   points  a list: strings, or { title, text }
//   stats   figures as tiles: { label, value, unit? }
//   gallery photos and videos for this section, same format as a project's gallery

const asList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])

function Flow({ steps }) {
  return (
    // A column on phones, one row of equal steps on wide screens. Arrows sit in the gaps.
    <ol className="glass flex flex-col gap-6 rounded-3xl p-3 lg:grid lg:auto-cols-fr lg:grid-flow-col">
      {steps.map((step, k) => {
        const { label, note } = typeof step === 'string' ? { label: step } : step
        return (
          <li key={label} className="relative">
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5">
              <span className="font-mono text-xs text-steel">{String(k + 1).padStart(2, '0')}</span>
              <p className="text-sm font-medium text-snow">{label}</p>
              {note && <p className="mt-0.5 text-xs text-fog">{note}</p>}
            </div>
            {k < steps.length - 1 && (
              <ArrowRight
                size={14}
                className="absolute -bottom-[19px] left-1/2 -ml-[7px] rotate-90 text-steel lg:-right-[19px] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-mt-[7px] lg:ml-0 lg:rotate-0"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function Stats({ items }) {
  return (
    <dl className="glass grid grid-cols-2 gap-2 rounded-3xl p-2 sm:grid-cols-3">
      {items.map(({ label, value, unit }) => (
        <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-3">
          <dt className="text-xs text-fog">{label}</dt>
          <dd className="mt-1 text-snow">
            <span className="font-mono text-lg font-medium">{value}</span>
            {unit && <span className="ml-1.5 text-xs text-fog">{unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Points({ items }) {
  return (
    <ul className="glass divide-y divide-white/[0.07] rounded-3xl px-5 sm:px-6">
      {items.map((item) => {
        const { title, text } = typeof item === 'string' ? { text: item } : item
        return (
          <li key={title ?? text} className="py-4 text-[15px] leading-relaxed">
            {title && <p className="font-medium text-snow">{title}</p>}
            <p className={title ? 'mt-1 text-fog' : 'text-mist'}>{text}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default function CaseStudy({ sections }) {
  if (!sections?.length) return null
  return (
    <div className="mt-16 space-y-12">
      <p className="eyebrow">Case study</p>
      {sections.map((s) => (
        <section key={s.title} className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h2>
          {s.flow && <Flow steps={s.flow} />}
          {asList(s.text).map((t) => (
            <p key={t} className="max-w-2xl text-[16px] leading-relaxed text-mist">
              {t}
            </p>
          ))}
          {s.stats && <Stats items={s.stats} />}
          {s.points && <Points items={s.points} />}
          {s.gallery?.length > 0 && <Gallery items={s.gallery} eager={false} auto={false} />}
        </section>
      ))}
    </div>
  )
}
