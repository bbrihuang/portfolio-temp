import { Link } from 'react-router'
import { siGithub } from 'simple-icons'
import BrandIcon from '../components/BrandIcon.jsx'
import { ArrowRight, ArrowUpRight, Check, Copy, FileText, Glyph, LinkedIn, MapPin } from '../components/Icons.jsx'
import { ProfileCard } from '../components/ProfileBlurb.jsx'
import ProjectArt from '../components/ProjectArt.jsx'
import Terminal from '../components/Terminal.jsx'
import { site } from '../config.js'
import { projects } from '../data/projects.js'
import { stack } from '../data/skills.js'
import { itemColor } from '../lib/color.js'
import { useCopyEmail, usePageMeta } from '../lib/hooks.js'
import { useEffect, useState } from 'react'

// Clubs. The first three are engineering or leadership roles and get rows;
// the rest are memberships and collapse to one line. Logos live in public/clubs/.
const activeRoles = [
  {
    org: 'BU AI Society',
    role: 'Robotics Simulation Developer & LLM Inference Researcher',
    logo: '/clubs/bu-ai-society.png',
    href: 'https://www.buaisociety.com/',
  },
  { org: 'BU Rocket Propulsion Group', role: 'Nozzle Design Engineer', logo: '/clubs/burpg.png', href: 'https://burpg.org/' },
  {
    org: 'Heartfelt Connections',
    role: 'VP of User Experience',
    initials: 'HC',
    href: 'https://www.linkedin.com/company/105780600/',
  },
]
const memberships = [
  { org: 'BU Blockchain', href: 'https://www.instagram.com/bu_blockchain/' },
  { org: 'BU Game Design', href: 'https://www.instagram.com/bugamedesign/' },
  { org: 'BU Computer Science', href: 'https://www.instagram.com/bucomputerscience/' },
  { org: 'BU Japanese Student Association', href: 'https://www.instagram.com/thebujsa/' },
  { org: 'BU Chinese Students Association', href: 'https://www.instagram.com/teamcsa/' },
]

// Where each project sits on the map. x and y are positions on a 1000 x 440
// plane (see the SVG paths below); `line` is which line it belongs to and
// `side` puts its label above or below the station.
const stations = [
  { slug: 'bu-dining-meal-planner', line: 'sw', x: 150, y: 60, side: 'above' },
  { slug: 'llm-research', line: 'sw', x: 300, y: 60, side: 'above' },
  { slug: 'jethexa', line: 'both', x: 535, y: 150, side: 'above' },
  { slug: 'setup', line: 'both', x: 605, y: 150, side: 'below' },
  { slug: 'cubic-builds-storefront', line: 'sw', x: 860, y: 60, side: 'above' },
  { slug: 'temperature-sensor', line: 'hw', x: 150, y: 240, side: 'below' },
  { slug: 'pc-building-guide', line: 'hw', x: 300, y: 240, side: 'below' },
  { slug: 'burpg-nozzle', line: 'hw', x: 860, y: 240, side: 'below' },
]

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))
const placed = stations.map((s) => ({ ...s, project: bySlug[s.slug] })).filter((s) => s.project)

// True from the lg breakpoint up. Used to render the profile card and terminal
// in one place or the other, never both: the terminal measures itself on mount.
function useWide() {
  const [wide, setWide] = useState(() => matchMedia('(width >= 64rem)').matches)
  useEffect(() => {
    const mq = matchMedia('(width >= 64rem)')
    const on = () => setWide(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return wide
}

function Status() {
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fog">
      <span className="inline-flex items-center gap-2 font-medium text-snow">
        <span aria-hidden className="size-2.5 rounded-full bg-ok" />
        Open to internships
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MapPin size={15} />
        Boston, MA / New York City, NY
      </span>
    </p>
  )
}

function Hero({ wide }) {
  return (
    <section aria-labelledby="hero-title" className="grid items-start gap-x-12 gap-y-6 lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-7 lg:self-center">
        <h1
          id="hero-title"
          className="rise-blur max-w-4xl text-balance text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[0.98] tracking-[-0.03em] [font-stretch:90%]"
          style={{ '--i': 0 }}
        >
          I build where <span className="text-sw-light">software</span> meets <span className="text-hw">hardware.</span>
        </h1>
        <p className="rise-blur max-w-[62ch] text-[17px] leading-relaxed text-mist" style={{ '--i': 1 }}>
          Computer Engineering at Boston University. I do local LLM and robotics work with BU AI Society, lead software at
          GradientV for small businesses, and run Cubic Builds, my custom PC building business.
        </p>
        <div className="rise flex flex-wrap items-center gap-3" style={{ '--i': 3 }}>
          {site.resume && (
            <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-light">
              <FileText size={16} />
              Resume
            </a>
          )}
          <Link to="/projects" className="btn btn-glass">
            All projects
            <ArrowRight size={16} />
          </Link>
          <Link to="/experience" className="btn btn-glass">
            Experience
          </Link>
        </div>
        <Status />
      </div>
      {wide && (
        <div className="flex flex-col gap-4 lg:col-span-5">
          <ProfileCard startIndex={2} />
          <Terminal startIndex={3} compact />
        </div>
      )}
    </section>
  )
}

function Station({ s, n }) {
  const p = s.project
  return (
    <Link
      to={`/projects/${p.slug}`}
      className="station"
      style={{ left: `${s.x / 10}%`, top: `${(s.y / 300) * 100}%`, '--n': n }}
      aria-label={`${p.title}, ${p.label}`}
    >
      <span className={`station-dot ${s.line === 'both' ? 'is-interchange' : ''}`} />
      <span className={`station-label ${s.side}`}>
        <span className="station-title block text-[15px] font-semibold leading-tight text-snow">{p.title}</span>
        <span className="mt-0.5 block text-xs text-fog">{p.date}</span>
      </span>
    </Link>
  )
}

// Wide screens: the full diagram. The Software line (blue) and the Hardware
// line (orange) run in from the left, share a trunk through the interchange,
// and part again. Bends are 45 degrees only.
function SystemMap() {
  return (
    <div className="relative mx-auto hidden w-full lg:block" style={{ aspectRatio: '1000 / 300' }}>
      <svg viewBox="0 0 1000 300" className="absolute inset-0 size-full" fill="none" aria-hidden>
        <path
          className="route route-hw"
          pathLength="1"
          d="M40 240 H395 L480 155 H660 L745 240 H960"
          stroke="var(--color-hw)"
          strokeWidth="9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          className="route"
          pathLength="1"
          d="M40 60 H395 L480 145 H660 L745 60 H960"
          stroke="var(--color-sw)"
          strokeWidth="9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <p className="absolute left-0 top-[27%] text-sm font-semibold text-sw-light">Software line</p>
      <p className="absolute left-0 top-[63%] text-sm font-semibold text-hw">Hardware line</p>
      <p className="absolute left-[57%] top-[calc(50%+4.75rem)] w-max -translate-x-1/2 text-sm text-fog">Interchange: work that needs both</p>
      {placed.map((s, i) => (
        <Station key={s.slug} s={s} n={i} />
      ))}
    </div>
  )
}

// Phones and tablets: the same system as vertical rails.
function RailGroup({ title, color, split, items }) {
  if (!items.length) return null
  return (
    <div>
      <h3 className="text-sm font-semibold" style={{ color }}>
        {title}
      </h3>
      <ul className={`rail mt-3 ${split ? 'rail-split' : ''}`} style={{ '--rail': color }}>
        {items.map((s) => (
          <li key={s.slug} className="relative">
            <Link to={`/projects/${s.slug}`} className="relative flex min-h-12 flex-col justify-center py-2">
              <span className={`station-dot ${split ? 'is-interchange' : ''}`} />
              <span className="text-[15px] font-semibold leading-tight text-snow">{s.project.title}</span>
              <span className="text-xs text-fog">
                {s.project.label} · {s.project.date}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RailMap() {
  const pick = (line) => placed.filter((s) => s.line === line)
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:hidden">
      <RailGroup title="Software line" color="var(--color-sw-light)" items={pick('sw')} />
      <RailGroup title="Hardware line" color="var(--color-hw)" items={pick('hw')} />
      <div className="sm:col-span-2">
        <RailGroup title="Interchange: work that needs both" color="var(--color-snow)" split items={pick('both')} />
      </div>
    </div>
  )
}

function Work({ wide }) {
  return (
    <section className="mt-8" aria-labelledby="work-title">
      <h2 id="work-title" className="sr-only">
        Projects on the system map
      </h2>
      <SystemMap />
      <p className="mt-2 hidden text-right text-xs text-steel lg:block">Position on the map is not chronological.</p>
      <RailMap />
      {/* Phones: the card follows the map so the work shows first. */}
      {!wide && (
        <div className="mt-10 flex flex-col gap-4">
          <ProfileCard startIndex={0} />
          <Terminal startIndex={1} />
        </div>
      )}
    </section>
  )
}

// Three projects shown with their art or photo and one real line each:
// one hardware, one hybrid, one software.
const featured = ['temperature-sensor', 'jethexa', 'bu-dining-meal-planner'].map((slug) => bySlug[slug]).filter(Boolean)

function SelectedWork() {
  return (
    <section className="mt-20 sm:mt-24" aria-labelledby="selected-title">
      <h2 id="selected-title" className="text-4xl font-bold tracking-[-0.03em] [font-stretch:90%] sm:text-5xl">
        Selected work
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {featured.map((p) => (
          <li key={p.slug}>
            <Link to={`/projects/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-coal">
                <ProjectArt project={p} className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
              </div>
              <p className="mt-4 text-lg font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
                {p.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-fog">{p.short}</p>
              <p className="mt-2 text-xs text-steel">
                {p.label} · {p.date}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Roles() {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">Clubs & activities</h3>
      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {activeRoles.map((a) => (
          <li key={a.org}>
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-white/[0.03]"
            >
              {a.logo ? (
                <img
                  src={a.logo}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                  className="size-11 shrink-0 rounded-xl border border-white/10 object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-ash font-mono text-xs font-semibold text-mist"
                >
                  {a.initials}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold leading-snug">{a.org}</span>
                <span className="block text-sm leading-snug text-fog">{a.role}</span>
              </span>
              <ArrowUpRight size={14} className="shrink-0 text-steel transition-colors group-hover:text-snow" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-fog">
        Also a member of{' '}
        {memberships.map((m, i) => (
          <span key={m.org}>
            <a href={m.href} target="_blank" rel="noreferrer" className="link-line text-mist hover:text-snow">
              {m.org}
            </a>
            {i < memberships.length - 2 ? ', ' : i === memberships.length - 2 ? ', and ' : '.'}
          </span>
        ))}
      </p>
    </div>
  )
}

const mainGroups = ['Languages', 'Frameworks & Tools', 'AI / ML', 'Hardware & CAD']

function StackRow({ g }) {
  return (
    <div className="grid gap-3 py-4 sm:grid-cols-[9rem_1fr] sm:gap-5">
      <dt className="text-[15px] font-semibold">{g.group}</dt>
      <dd>
        <ul className="flex flex-wrap gap-1.5">
          {g.items.map((s) => (
            <li key={s.name} className="chip chip-sm gap-1.5">
              <span className="contents" style={{ color: itemColor(s) }}>
                {s.icon ? <BrandIcon icon={s.icon} size={13} /> : <Glyph name={s.glyph} size={14} />}
              </span>
              {s.name}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  )
}

function Stack() {
  const main = mainGroups.map((n) => stack.find((g) => g.group === n)).filter(Boolean)
  const rest = stack.filter((g) => !mainGroups.includes(g.group))
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight">Tech stack</h3>
      <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
        {main.map((g) => (
          <StackRow key={g.group} g={g} />
        ))}
      </dl>
      <details className="group mt-3">
        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center gap-x-2 text-sm font-medium text-mist hover:text-snow">
          <span className="group-open:hidden">Show {rest.length} more groups</span>
          <span className="hidden group-open:inline">Hide extra groups</span>
          <span className="font-normal text-fog">({rest.map((g) => g.group).join(', ')})</span>
        </summary>
        <dl className="divide-y divide-white/10 border-y border-white/10">
          {rest.map((g) => (
            <StackRow key={g.group} g={g} />
          ))}
        </dl>
      </details>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="mt-20 scroll-mt-28 sm:mt-28" aria-labelledby="about-title">
      <h2 id="about-title" className="text-4xl font-bold tracking-[-0.03em] [font-stretch:90%] sm:text-5xl">
        About
      </h2>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* The logo sits on a BU-red tile so its own white border is not clipped. */}
        <div className="shrink-0 rounded-xl bg-[#cc0000] p-1.5">
          <img src="/bu-logo.png" alt="Boston University" width="500" height="224" className="h-11 w-auto" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold leading-snug tracking-tight">{site.degree}</p>
          <p className="text-sm text-fog">
            {site.school} · {site.graduation}
          </p>
        </div>
      </div>
      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <Roles />
        <Stack />
      </div>
    </section>
  )
}

function Contact() {
  const { copied, copy } = useCopyEmail()
  return (
    <section id="contact" className="mt-20 scroll-mt-28 sm:mt-28" aria-labelledby="contact-title">
      <div>
        <div>
          <h2 id="contact-title" className="text-4xl font-bold tracking-[-0.03em] [font-stretch:90%] sm:text-5xl">
            Get in touch
          </h2>
          <p className="mt-4 max-w-[48ch] text-[17px] leading-relaxed text-mist">
            Looking for an internship, or building something interesting? I would like to help and learn along the way.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="btn btn-light" aria-live="polite">
              {copied ? <Check size={16} className="text-ok" /> : <Copy size={16} />}
              <span>{copied ? 'Email copied' : site.email}</span>
            </button>
            {site.resume && (
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-glass">
                <FileText size={16} />
                Resume
              </a>
            )}
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-glass">
              <LinkedIn size={16} />
              LinkedIn
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="btn btn-glass">
              <BrandIcon icon={siGithub} size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  usePageMeta(null)
  const wide = useWide()
  return (
    <>
      <Hero wide={wide} />
      <Work wide={wide} />
      <SelectedWork />
      <About />
      <Contact />
    </>
  )
}
