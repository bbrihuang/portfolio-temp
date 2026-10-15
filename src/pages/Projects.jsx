import { useLayoutEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import ContactCTA from '../components/ContactCTA.jsx'
import { Plus } from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { featuredOrder, filterGroups, inFilter, projects, sorts } from '../data/projects.js'
import { usePageMeta, useSlidingPill } from '../lib/hooks.js'
import { glow, sectionColors } from '../lib/theme.js'

const purple = sectionColors['/projects']

// Featured projects lead the page in a set order; everything else is filterable below.
const featured = featuredOrder.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean)
const others = projects.filter((p) => !featuredOrder.includes(p.slug))

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const filters = ['All', ...Object.keys(filterGroups)]
const sortNames = Object.keys(sorts)

// A row of pill buttons with a sliding highlight. Used twice: the category filter
// (filled purple) and, separately, the sort order (a quieter white outline).
function PillGroup({ label, options, active, onChange, filled, index }) {
  const ref = useRef(null)
  const pill = useSlidingPill(ref, '[aria-pressed="true"]', active)
  return (
    <div className="glass rise max-w-full overflow-x-auto rounded-full p-1 [scrollbar-width:none]" style={{ '--i': index }}>
      <div ref={ref} role="group" aria-label={label} className="relative flex w-max">
        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 rounded-full ${
            pill.animate ? 'transition-[transform,width] duration-500 ease-out-expo' : ''
          } ${filled ? '' : 'border border-white/20 bg-white/10'}`}
          style={{ ...pill.style, ...(filled && { background: purple.base, boxShadow: glow(purple.base) }) }}
        />
        {options.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => onChange(f)}
            className="relative inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-fog transition-colors duration-300 hover:text-snow aria-pressed:text-white"
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  usePageMeta('Projects', 'Software, hardware, robotics, AI and aerospace projects by Brian Huang.')
  const [params, setParams] = useSearchParams()
  const active = filters.includes(params.get('filter')) ? params.get('filter') : 'All'
  const sort = sortNames.includes(params.get('sort')) ? params.get('sort') : 'Newest'
  const list = useMemo(
    () => others.filter((p) => inFilter(p, active)).sort(sorts[sort]),
    [active, sort],
  )

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
          <PageHeader index="03" title="Projects" color={purple}>
            From full-stack applications and local AI experiments to robotics and hardware design, these are projects
            where I’ve turned my random ideas into actual working systems.
          </PageHeader>
          <p className="rise mt-4 inline-flex items-center gap-2 text-sm text-fog" style={{ '--i': 3 }}>
            <span className="grid size-6 place-items-center rounded-full border border-white/15 text-snow">
              <Plus size={13} />
            </span>
            Tip: Hit + for a quick peek at what each project does!
          </p>
        </div>
        <div className="lg:col-span-5">
          <ContactCTA index={3} />
        </div>
      </div>

      <section className="mt-14" aria-labelledby="featured-title">
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="more-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            More projects
          </h2>
          <p className="rise font-mono text-xs text-steel" style={{ '--i': 3 }} aria-live="polite">
            Showing {list.length} of {others.length}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <PillGroup
            label="Filter projects"
            options={filters}
            active={active}
            onChange={(filter) => update({ filter })}
            filled
            index={3}
          />
          <div className="flex items-center gap-2.5">
            <span className="eyebrow">Sort</span>
            <PillGroup label="Sort projects" options={sortNames} active={sort} onChange={(s) => update({ sort: s })} index={4} />
          </div>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
