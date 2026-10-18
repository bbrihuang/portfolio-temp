import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, Plus } from './Icons.jsx'
import ProjectArt from './ProjectArt.jsx'

// A project tile in the style of nikp.xyz: cover art, a short rule, title,
// date and stack. The whole card links to the project page; the + button
// slides up a quick-look panel instead. The category tag next to the rule is `label`.
export default function ProjectCard({ project: p, index = 0 }) {
  const [open, setOpen] = useState(false)
  const href = `/projects/${p.slug}`

  return (
    <article
      className="glass rise group relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--section-light)_55%,transparent)]"
      style={{ '--i': index + 3 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0" style={{ viewTransitionName: `art-${p.slug}`, viewTransitionClass: 'art' }}>
          <ProjectArt
            project={p}
            className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#141416] to-transparent" />

        {p.status === 'in-progress' && (
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-void/85 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.14em] text-mist">
            In progress
          </span>
        )}

        {/* Quick look */}
        <div
          id={`peek-${p.slug}`}
          className={`glass-strong absolute inset-x-3 bottom-3 z-10 rounded-2xl p-4 transition-[transform,opacity] duration-500 ease-out-expo ${
            open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[calc(100%+1rem)] opacity-0'
          }`}
          inert={!open}
        >
          <p className="line-clamp-4 text-sm leading-relaxed text-mist">{p.summary}</p>
          <Link
            to={href}
            viewTransition
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-snow"
          >
            <span className="link-line">View project</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div
            className="h-0.5 w-10 rounded-full transition-[width] duration-500 ease-out-expo group-hover:w-20"
            style={{ background: p.accent ?? '#f4f4f5' }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: p.accent }}>
            {p.label}
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">
            <Link to={href} viewTransition className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-snow">
              {p.title}
            </Link>
          </h3>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={`peek-${p.slug}`}
            aria-label={open ? `Close preview of ${p.title}` : `Preview ${p.title}`}
            className="relative z-10 inline-flex h-9 shrink-0 after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] items-center gap-1.5 rounded-full border border-white/10 pl-2.5 pr-3 text-xs font-medium text-fog transition-colors hover:border-white/25 hover:text-snow aria-expanded:border-transparent aria-expanded:bg-snow aria-expanded:text-void"
          >
            <Plus size={14} className={`transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : ''}`} />
            {open ? 'Close' : 'Preview'}
          </button>
        </div>
        <p className="mt-1 font-mono text-xs text-fog">{p.date}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-fog">{p.short}</p>
        {p.stack.length > 0 && (
          <p className="mt-3 line-clamp-1 font-mono text-xs text-steel">{p.stack.join(' · ')}</p>
        )}
      </div>
    </article>
  )
}
