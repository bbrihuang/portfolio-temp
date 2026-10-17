import { useLayoutEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import ContactCTA from '../components/ContactCTA.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { featuredOrder, filterGroups, inFilter, projects, sorts } from '../data/projects.js'
import { usePageMeta, useSlidingPill } from '../lib/hooks.js'
import { sectionColors } from '../lib/theme.js'


// Featured projects lead the page in a set order; everything else is filterable below.
const featured = featuredOrder.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean)
const others = projects.filter((p) => !featuredOrder.includes(p.slug))

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
          style={{ ...pill.style, background: sectionColors['/projects'].fill }}
        />
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => onChange(f)}
            className="relative inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium text-fog transition-colors duration-300 hover:text-snow aria-pressed:text-white sm:px-4"
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
      {/* The browser's own arrow is cramped against the edge, so it is hidden and
          a chevron is drawn with room around it. */}
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 min-w-36 appearance-none rounded-full border border-white/15 bg-coal pl-5 pr-11 text-sm font-medium text-mist transition-colors hover:border-white/25"
        >
          {sortNames.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-fog"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  )
}

export default function Projects() {
  usePageMeta('Projects', 'Software, hardware, robotics, AI and aerospace projects by Brian Huang.')
  const [params, setParams] = useSearchParams()
  const active = filters.includes(params.get('filter')) ? params.get('filter') : 'All'
  const sort = sortNames.includes(params.get('sort')) ? params.get('sort') : 'Newest'
  const list = useMemo(() => others.filter((p) => inFilter(p, active)).sort(sorts[sort]), [active, sort])

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
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <PageHeader index="03" title="Projects" color={sectionColors['/projects']}>
            From full-stack applications and local AI experiments to robotics and hardware design, these are projects
            where I’ve turned my random ideas into actual working systems.
          </PageHeader>
        </div>
        <div className="lg:col-span-5">
          <ContactCTA index={3} />
        </div>
      </div>

      <section className="mt-12" aria-labelledby="featured-title">
        <h2 id="featured-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Featured
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i + 1} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="more-title">
        <h2 id="more-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          More projects
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <FilterBar active={active} onChange={(filter) => update({ filter })} />
          <SortMenu value={sort} onChange={(s) => update({ sort: s })} />
        </div>
        <p className="rise mt-4 font-mono text-xs text-steel" style={{ '--i': 5 }} aria-live="polite">
          {list.length} {list.length === 1 ? 'project' : 'projects'}
          {active !== 'All' && ` · ${active}`}
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
    </>
  )
}
