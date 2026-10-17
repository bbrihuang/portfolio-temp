import { useLayoutEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import ContactCTA from '../components/ContactCTA.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { filterGroups, inFilter, projects, sorts } from '../data/projects.js'
import { usePageMeta, useSlidingPill } from '../lib/hooks.js'

// The filter takes the line colors from the home page map: Software is blue,
// Hardware is orange, All is neutral.
const pillColor = { All: 'var(--color-snow)', Software: 'var(--color-sw)', Hardware: 'var(--color-hw)' }

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const filters = ['All', ...Object.keys(filterGroups)]
const sortNames = Object.keys(sorts)

// The category filter: a row of pills with a sliding highlight.
function FilterBar({ active, onChange }) {
  const ref = useRef(null)
  const pill = useSlidingPill(ref, '[aria-pressed="true"]', active)
  return (
    <div className="glass rise max-w-full overflow-x-auto rounded-full p-1 [scrollbar-width:none]" style={{ '--i': 3 }}>
      <div ref={ref} role="group" aria-label="Filter projects" className="relative flex w-max">
        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 rounded-full ${
            pill.animate ? 'transition-[transform,width,background-color] duration-500 ease-out-expo' : ''
          }`}
          style={{ ...pill.style, background: pillColor[active] }}
        />
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => onChange(f)}
            className="relative inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-fog transition-colors duration-300 hover:text-snow aria-pressed:text-void"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}

// Sort is one small menu rather than a second row of pills, so it reads as
// secondary to the category filter.
function SortMenu({ value, onChange }) {
  return (
    <label className="rise flex items-center gap-2.5 text-sm text-fog" style={{ '--i': 4 }}>
      Sort by
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-full border border-white/15 bg-coal px-4 text-sm font-medium text-mist transition-colors hover:border-white/25"
      >
        {sortNames.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function Projects() {
  usePageMeta('Projects', 'Software, hardware, robotics, AI and aerospace projects by Brian Huang.')
  const [params, setParams] = useSearchParams()
  const active = filters.includes(params.get('filter')) ? params.get('filter') : 'All'
  const sort = sortNames.includes(params.get('sort')) ? params.get('sort') : 'Newest'
  // Featured projects are in this list too, marked on their cards, so the filter
  // and sort always apply to everything on the page.
  const list = useMemo(() => projects.filter((p) => inFilter(p, active)).sort(sorts[sort]), [active, sort])

  // FLIP: remember where each card was, change the filter, then animate
  // every card from its old spot to its new one.
  const nodes = useRef(new Map())
  const before = useRef(null)
  // Filter and sort both live in the URL; the defaults (All, Newest) are left out.
  const update = (next) => {
    const q = { filter: active, sort, ...next }
    if (q.filter === active && q.sort === sort) return
    before.current = new Map([...nodes.current].map(([slug, el]) => [slug, el.getBoundingClientRect()]))
    setParams(
      { ...(q.filter !== 'All' && { filter: q.filter }), ...(q.sort !== 'Newest' && { sort: q.sort }) },
      { replace: true, preventScrollReset: true },
    )
  }
  useLayoutEffect(() => {
    const prev = before.current
    if (!prev) return
    before.current = null
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    for (const [slug, el] of nodes.current) {
      const a = prev.get(slug)
      const b = el.getBoundingClientRect()
      if (!a) {
        // New arrivals fade in on the card itself so its glass keeps blurring.
        el.firstElementChild?.animate(
          [
            { opacity: 0, transform: 'scale(0.94)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 500, easing: EASE },
        )
        continue
      }
      const dx = a.left - b.left
      const dy = a.top - b.top
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 650, easing: EASE })
      }
    }
  }, [active, sort])

  return (
    <>
      <PageHeader index="03" title="Projects">
        From full-stack applications and local AI experiments to robotics and hardware design, these are projects where
        I’ve turned my random ideas into actual working systems.
      </PageHeader>

      <section className="mt-12" aria-label="All projects">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <FilterBar active={active} onChange={(filter) => update({ filter })} />
          <SortMenu value={sort} onChange={(s) => update({ sort: s })} />
        </div>
        <p className="rise mt-4 font-mono text-xs text-steel" style={{ '--i': 5 }} aria-live="polite">
          Showing {list.length} of {projects.length}
        </p>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <li
              key={p.slug}
              ref={(el) => {
                if (el) nodes.current.set(p.slug, el)
                else nodes.current.delete(p.slug)
              }}
            >
              <ProjectCard project={p} index={i} />
            </li>
          ))}
        </ul>
      </section>

      {/* Contact comes after the work, so the page opens on the projects. */}
      <div className="mt-20 max-w-xl">
        <ContactCTA index={3} />
      </div>
    </>
  )
}
