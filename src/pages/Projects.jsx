import { useLayoutEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router'
import PageHeader from '../components/PageHeader.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ContactCTA from '../components/ContactCTA.jsx'
import { arrange, filterGroups, inFilter, projects } from '../data/projects.js'
import { usePageMeta, useSlidingPill } from '../lib/hooks.js'
import { glow, sectionColors } from '../lib/theme.js'

const purple = sectionColors['/projects']

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const filters = ['All', ...Object.keys(filterGroups)]

function FilterBar({ active, onChange }) {
  const ref = useRef(null)
  const pill = useSlidingPill(ref, '[aria-pressed="true"]', active)
  return (
    <div className="glass rise max-w-full overflow-x-auto rounded-full p-1 [scrollbar-width:none]" style={{ '--i': 3 }}>
      <div ref={ref} role="group" aria-label="Filter projects" className="relative flex w-max">
        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 rounded-full ${
            pill.animate ? 'transition-[transform,width] duration-500 ease-out-expo' : ''
          }`}
          style={{ ...pill.style, background: purple.base, boxShadow: glow(purple.base) }}
        />
        {filters.map((f) => (
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
  const list = useMemo(
    () => arrange(projects.filter((p) => inFilter(p, active))),
    [active],
  )

  // FLIP: remember where each card was, change the filter, then animate
  // every card from its old spot to its new one.
  const nodes = useRef(new Map())
  const before = useRef(null)
  const choose = (f) => {
    if (f === active) return
    before.current = new Map([...nodes.current].map(([slug, el]) => [slug, el.getBoundingClientRect()]))
    setParams(f === 'All' ? {} : { filter: f }, { replace: true, preventScrollReset: true })
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
  }, [active])

  return (
    <>
      <PageHeader index="03" title="Projects" count={projects.length} color={purple}>
        Things I’ve built and am building, from web apps and robot simulations to a rocket engine nozzle.
        Open one for the full write-up, or hit + for a quick look.
      </PageHeader>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <FilterBar active={active} onChange={choose} />
        <p className="rise font-mono text-xs text-steel" style={{ '--i': 3 }} aria-live="polite">
          Showing {list.length} of {projects.length}
        </p>
      </div>

      <ul className="mt-6 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <li
            key={p.slug}
            ref={(el) => {
              if (el) nodes.current.set(p.slug, el)
              else nodes.current.delete(p.slug)
            }}
            className={p.featured ? 'sm:col-span-2' : ''}
          >
            <ProjectCard project={p} index={i} />
          </li>
        ))}
      </ul>

      <ContactCTA />
    </>
  )
}
