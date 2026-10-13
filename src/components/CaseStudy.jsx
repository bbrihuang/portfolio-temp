import { ArrowRight } from './Icons.jsx'

// A project's write-up, from its `caseStudy` sections in data/projects.js.
// Each section has a `title` and any of:
//   text    a paragraph, or an array of paragraphs
//   flow    pipeline steps drawn as a diagram: strings, or { label, note }
//   points  a list: strings, or { title, text }

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
              <span className="font-mono text-[10px] text-steel">{String(k + 1).padStart(2, '0')}</span>
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
          {s.points && <Points items={s.points} />}
        </section>
      ))}
    </div>
  )
}
