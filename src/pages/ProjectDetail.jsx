import { Link, useParams } from 'react-router'
import CaseStudy from '../components/CaseStudy.jsx'
import Gallery from '../components/Gallery.jsx'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '../components/Icons.jsx'
import ProjectArt from '../components/ProjectArt.jsx'
import { projects } from '../data/projects.js'
import { usePageMeta } from '../lib/hooks.js'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]
  usePageMeta(p?.title, p?.short)
  if (!p) return <NotFound />

  const n = projects.length
  const prev = projects[(index - 1 + n) % n]
  const next = projects[(index + 1) % n]
  // Photos can live inside the case study instead of in the main gallery.
  const mediaInCaseStudy = p.caseStudy?.some((s) => s.gallery?.length)

  return (
    <article>
      <Link
        to="/projects"
        viewTransition
        className="rise group inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-snow"
      >
        <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
        All projects
      </Link>

      <div className="glass rise mt-6 rounded-3xl p-1.5" style={{ '--i': 1 }}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] sm:aspect-[21/9]">
          <div className="absolute inset-0" style={{ viewTransitionName: `art-${p.slug}`, viewTransitionClass: 'art' }}>
            <ProjectArt project={p} live />
          </div>
          {p.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-snow px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-void">
              ★ Featured
            </span>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <p className="eyebrow rise-blur" style={{ '--i': 2, color: p.accent }}>
            {p.label}
            {p.status === 'in-progress' && ' · In progress'}
          </p>
          <h1
            className="rise-blur mt-3 text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold leading-[1] tracking-[-0.04em]"
            style={{ '--i': 3 }}
          >
            {p.title}
          </h1>
          <p className="rise-blur mt-3 text-lg text-fog" style={{ '--i': 4 }}>
            {p.org}
          </p>
          <p className="rise-blur mt-8 max-w-2xl text-[17px] leading-relaxed text-mist" style={{ '--i': 5 }}>
            {p.summary}
          </p>

          {p.gallery?.length ? (
            <Gallery key={p.slug} items={p.gallery} />
          ) : p.status === 'in-progress' || mediaInCaseStudy ? null : (
            // Same frame as the carousel, so every project page has the same layout.
            <section className="mt-8" aria-label="Project photos">
              <div className="glass rounded-3xl p-1.5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-ash">
                  <div className="absolute inset-0 opacity-30">
                    <ProjectArt project={{ ...p, image: undefined }} />
                  </div>
                  <p className="absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-[0.14em] text-fog">
                    Photos coming soon
                  </p>
                </div>
              </div>
            </section>
          )}

          {p.highlights.length > 0 && (
            <h2 className="eyebrow rise mt-12" style={{ '--i': 6 }}>
              Highlights
            </h2>
          )}
          <ol className="mt-4 space-y-3">
            {p.highlights.map((h, k) => (
              <li key={h} className="glass rise flex gap-4 rounded-2xl p-4 sm:p-5" style={{ '--i': 7 + k }}>
                <span className="pt-0.5 font-mono text-xs" style={{ color: p.accent }}>
                  {String(k + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] leading-relaxed text-mist">{h}</span>
              </li>
            ))}
          </ol>

          <CaseStudy sections={p.caseStudy} />
        </div>

        <aside className="lg:col-span-4">
          <div className="glass rise rounded-3xl p-5 lg:sticky lg:top-28" style={{ '--i': 4 }}>
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1.5 text-[15px] text-mist">{p.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Timeline</dt>
                <dd className="mt-1.5 text-[15px] text-mist">{p.date}</dd>
              </div>
              {p.team?.length > 0 && (
                <div>
                  <dt className="eyebrow">Team</dt>
                  <dd className="mt-1.5 text-[15px] text-mist">
                    {p.team.map(({ name, href }, k) => (
                      <span key={name}>
                        {k > 0 && ', '}
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-snow hover:decoration-snow"
                          >
                            {name}
                          </a>
                        ) : (
                          name
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {p.stack.length > 0 && (
                <div>
                  <dt className="eyebrow">Stack</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip chip-sm">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            {p.links.length > 0 && (
              <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.07] pt-5">
                {p.links.map((l, k) => {
                  const className = `btn group justify-between ${k === 0 ? 'btn-light' : 'btn-glass'}`
                  // Links starting with "/" stay on this site; others open in a new tab.
                  return l.href.startsWith('/') ? (
                    <Link key={l.href} to={l.href} className={className}>
                      {l.label}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={className}>
                      {l.label}
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 grid gap-4 sm:grid-cols-2">
        {[
          ['Previous', prev, ArrowLeft],
          ['Next', next, ArrowRight],
        ].map(([label, q, Icon], k) => (
          <Link
            key={label}
            to={`/projects/${q.slug}`}
            viewTransition
            className={`glass rise group flex items-center gap-4 rounded-3xl p-2.5 transition-transform duration-500 ease-out-expo hover:-translate-y-1 ${
              k === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
            }`}
            style={{ '--i': 10 + k }}
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0"
                style={prev.slug !== next.slug ? { viewTransitionName: `art-${q.slug}`, viewTransitionClass: 'art' } : undefined}
              >
                <ProjectArt project={q} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="eyebrow">{label}</p>
              <p className="mt-0.5 truncate text-lg font-semibold tracking-tight">{q.title}</p>
            </div>
            <Icon size={18} className="mx-2 shrink-0 text-fog transition-colors group-hover:text-snow" />
          </Link>
        ))}
      </nav>
    </article>
  )
}
