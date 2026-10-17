import { Fragment, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowRight, ArrowUpRight } from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { duration, experience, formatRange } from '../data/experience.js'
import { usePageMeta, useSlidingPill } from '../lib/hooks.js'
import { glow, sectionColors } from '../lib/theme.js'

// "Cubic Builds" -> "CB". A single-word name keeps its own capitals, so
// "GradientV LLC" -> "GV".
const initials = (org) => {
  const words = org.split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !/^(LLC|Inc\.?)$/.test(w))
  if (words.length === 1) return (words[0].match(/[A-Z]/g) ?? []).slice(0, 2).join('') || words[0].slice(0, 2)
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
}

// The company's logo, or its initials when there's no logo yet.
function OrgLogo({ role: r, size = 'size-14' }) {
  if (r.logo) {
    return (
      <img
        src={r.logo}
        alt=""
        className={`${size} shrink-0 rounded-2xl border border-white/12 object-cover`}
        style={{ boxShadow: `0 8px 22px -10px ${r.color ?? '#000'}` }}
      />
    )
  }
  return (
    <div
      className={`relative grid ${size} shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-graphite to-coal`}
    >
      <span aria-hidden className="absolute -right-3 -top-3 size-8 rounded-full bg-white/10" />
      <span className="relative text-lg font-semibold tracking-tight text-mist">{initials(r.org)}</span>
    </div>
  )
}

function RoleDetail({ role: r, compact = false }) {
  const facts = [
    ['Dates', formatRange(r.start, r.end)],
    ['Duration', duration(r.start, r.end)],
    ['Location', r.location],
  ]
  const orgLine = (
    <p className={compact ? 'text-sm text-fog' : 'mt-1 text-fog'}>
      {r.url ? (
        <a href={r.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-mist hover:text-snow">
          <span className="link-line">{r.org}</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : (
        <span className="text-mist">{r.org}</span>
      )}
      <span className="text-steel"> · {r.orgNote}</span>
    </p>
  )

  return (
    <>
      {/* Compact (inline on phones) skips the heading the tab already shows. */}
      {compact ? (
        orgLine
      ) : (
        <div className="flex items-start gap-4">
          <OrgLogo role={r} />
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{r.role}</h2>
            {orgLine}
          </div>
        </div>
      )}

      <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07]">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-coal/70 px-3 py-3 sm:px-4">
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-1 text-sm text-mist">{v}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 space-y-3">
        {r.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-mist">
            <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rotate-45" style={{ background: r.color ?? '#a1a1aa' }} />
            {pt}
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
        {r.skills.map((s) => (
          <li key={s} className="chip chip-sm">
            {s}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Experience() {
  usePageMeta('Experience', 'Where Brian Huang has worked: GradientV, Boston University TechOps, Cubic Builds and more.')
  const [params, setParams] = useSearchParams()
  const found = experience.findIndex((e) => e.slug === params.get('role'))
  const activeIndex = found === -1 ? 0 : found
  const active = experience[activeIndex]

  const listRef = useRef(null)
  const pill = useSlidingPill(listRef, '[aria-selected="true"]', activeIndex, 'y')

  const select = (i, focus = false) => {
    setParams({ role: experience[i].slug }, { replace: true, preventScrollReset: true })
    if (focus) listRef.current?.querySelectorAll('[role="tab"]')[i]?.focus()
  }

  // Arrow keys move from the focused tab, not from state: router updates
  // render in a transition, so state can lag a fast click-then-keypress.
  const onKeyDown = (e) => {
    const tabs = [...listRef.current.querySelectorAll('[role="tab"]')]
    const from = tabs.indexOf(e.target)
    if (from === -1) return
    const n = tabs.length
    const keys = { ArrowDown: from + 1, ArrowUp: from - 1, Home: 0, End: n - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    select((keys[e.key] + n) % n, true)
  }

  return (
    <>
      <PageHeader index="02" title="Experience" color={sectionColors['/experience']}>
        Where I’ve worked, in chronological order.
      </PageHeader>

      <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="glass rise self-start rounded-3xl p-2 lg:col-span-5" style={{ '--i': 3 }}>
          <div ref={listRef} role="tablist" aria-orientation="vertical" aria-label="Roles" onKeyDown={onKeyDown} className="relative">
            <span
              aria-hidden
              className={`absolute inset-x-0 top-0 rounded-2xl border border-[color-mix(in_srgb,var(--section-light)_40%,transparent)] bg-[color-mix(in_srgb,var(--section)_16%,transparent)] ${
                pill.animate ? 'transition-[transform,height] duration-500 ease-out-expo' : ''
              }`}
              style={pill.style}
            />
            {experience.map((e, i) => {
              const selected = i === activeIndex
              const current = !e.end
              const last = i === experience.length - 1
              return (
                <Fragment key={e.slug}>
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${e.slug}`}
                    aria-selected={selected}
                    aria-controls="role-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className="group relative flex w-full gap-4 rounded-2xl px-4 py-4 text-left"
                  >
                    {/* Timeline rail: a diamond per role, filled for current ones. */}
                    <span aria-hidden className="relative flex w-3 justify-center pt-1.5">
                      {!last && <span className="absolute -bottom-[2.375rem] left-1/2 top-5 w-px -translate-x-1/2 bg-white/10" />}
                      <span
                        className={`relative size-2.5 rotate-45 border transition-colors duration-300 ${
                          selected
                            ? ''
                            : current
                              ? 'border-mist bg-mist/40'
                              : 'border-steel bg-void group-hover:border-fog'
                        }`}
                        style={selected ? { background: e.color, borderColor: e.color } : undefined}
                      />
                    </span>
                    <OrgLogo role={e} size="size-11" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-steel">
                          {formatRange(e.start, e.end)}
                        </span>
                        {current && e.badge !== false && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/35 bg-ok/10 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-ok">
                            <span className="size-1.5 rounded-full bg-ok" />
                            Current
                          </span>
                        )}
                      </span>
                      <span
                        className={`mt-1 block text-[17px] font-semibold leading-snug tracking-tight transition-colors ${
                          selected ? 'text-snow' : 'text-mist group-hover:text-snow'
                        }`}
                      >
                        {e.role}
                      </span>
                      <span className="block text-sm text-fog">{e.org}</span>
                    </span>
                  </button>

                  {/* Phones and tablets open the selected role in place. */}
                  {selected && (
                    <div key={e.slug} className="swap-in px-4 pb-5 pt-1 lg:hidden">
                      <RoleDetail role={e} compact />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.slug}`}
            className="glass rise sticky top-28 rounded-3xl p-8"
            style={{ '--i': 4 }}
          >
            <div key={active.slug} className="swap-in">
              <RoleDetail role={active} />
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/projects"
        className="glass rise group mt-16 flex items-center justify-between gap-4 rounded-3xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
        style={{ '--i': 6 }}
      >
        <span>
          <span className="eyebrow" style={{ color: sectionColors['/projects'].light }}>
            Up next
          </span>
          <span className="mt-2 block text-3xl font-semibold tracking-tight">Projects</span>
        </span>
        <span
          className="grid size-12 place-items-center rounded-full text-white transition-transform duration-500 ease-out-expo group-hover:scale-110"
          style={{ background: sectionColors['/projects'].fill, boxShadow: glow(sectionColors['/projects'].base) }}
        >
          <ArrowRight size={18} className="transition-transform duration-500 ease-out-expo group-hover:-rotate-45" />
        </span>
      </Link>
    </>
  )
}
