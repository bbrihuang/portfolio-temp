import { Link } from 'react-router'
import BrandIcon from '../components/BrandIcon.jsx'
import { ArrowRight, ArrowUpRight, Check, Glyph, MailPlus, MapPin, Trophy } from '../components/Icons.jsx'
import ProfileBlurb from '../components/ProfileBlurb.jsx'
import { site } from '../config.js'
import { experience } from '../data/experience.js'
import { projects } from '../data/projects.js'
import { marquee, stack } from '../data/skills.js'
import { useCopyEmail, usePageMeta } from '../lib/hooks.js'

const activities = [
  ['BU Rocket Propulsion Group', 'Nozzle Design Engineer'],
  ['BU AI Society', 'Robotics Simulation Developer'],
  ['BU AI Society', 'LLM Inference Researcher'],
  ['Cubic Builds', 'Founder'],
]

function Hero() {
  return (
    <section className="grid items-center gap-10 lg:min-h-[calc(100dvh-15rem)] lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="eyebrow rise-blur" style={{ '--i': 0 }}>
          Hi! My name is {site.first}.
        </p>
        <h1
          className="rise-blur mt-5 text-[clamp(2.75rem,6.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em]"
          style={{ '--i': 1 }}
        >
          <span className="text-steel">I build across</span> software, hardware{' '}
          <span className="text-steel">&</span> propulsion.
        </h1>
        <p className="rise-blur mt-6 max-w-xl text-[17px] leading-relaxed text-fog" style={{ '--i': 2 }}>
          I study Computer Engineering at Boston University. I lead engineering at GradientV, design rocket
          nozzles with the BU Rocket Propulsion Group, simulate a hexapod robot with BU AI Society, and run
          Cubic Builds, my custom PC business.
        </p>
        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ '--i': 3 }}>
          <Link to="/experience" className="btn btn-light group">
            See my experience
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link to="/projects" className="btn btn-glass">
            View projects
          </Link>
        </div>
        <p className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-steel" style={{ '--i': 4 }}>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            Boston, MA
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Open to internships
          </span>
        </p>
      </div>

      <div className="lg:col-span-5">
        <ProfileBlurb startIndex={2} />
      </div>
    </section>
  )
}

function SayHi() {
  const { copied, copy } = useCopyEmail()
  return (
    <button
      type="button"
      onClick={copy}
      className="glass rise group flex w-full items-center gap-3 rounded-3xl p-5 text-left transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.99]"
      style={{ '--i': 3 }}
    >
      <span className="grid size-9 place-items-center rounded-full bg-white/[0.07] text-mist transition-colors group-hover:bg-snow group-hover:text-void">
        {copied ? <Check size={17} /> : <MailPlus size={17} />}
      </span>
      <span className="text-[15px]" aria-live="polite">
        {copied ? (
          <>
            Copied <span className="font-mono text-sm text-fog">{site.email}</span>
          </>
        ) : (
          'Say hi · Copy email'
        )}
      </span>
      <ArrowUpRight size={16} className="ml-auto text-steel transition-colors group-hover:text-snow" />
    </button>
  )
}

function About() {
  return (
    <section className="mt-24 sm:mt-28" aria-labelledby="about-title">
      <h2 id="about-title" className="rise-blur text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
        About
      </h2>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="glass rise flex items-center gap-5 rounded-3xl p-5" style={{ '--i': 1 }}>
            <div
              aria-hidden
              className="grid h-14 w-[104px] shrink-0 place-items-center border-2 border-snow/90 bg-black font-serif text-[13px] leading-[1.1] tracking-[0.05em] text-snow"
            >
              <span className="text-center">
                BOSTON
                <br />
                UNIVERSITY
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">{site.degree}</p>
              <p className="text-sm text-fog">
                {site.school} · {site.graduation}
              </p>
            </div>
          </div>

          <div className="glass rise rounded-3xl p-5" style={{ '--i': 2 }}>
            <p className="flex items-center gap-2 text-[15px] font-medium">
              <Trophy size={18} className="text-fog" />
              Clubs & Activities
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {activities.map(([org, role]) => (
                <li key={org + role}>
                  <span className="text-mist">{org}</span>
                  <span className="px-1.5 text-slate">•</span>
                  <span className="text-fog">{role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/[0.07] pt-3 text-sm text-steel">
              Speaks English, Mandarin & Spanish
            </p>
          </div>

          <SayHi />
        </div>

        <div className="glass rise rounded-3xl p-5 sm:p-6 lg:col-span-7" style={{ '--i': 2 }}>
          <h3 className="text-2xl font-semibold tracking-tight">Tech Stack</h3>
          <div className="mt-4 space-y-5">
            {stack.map((g) => (
              <div key={g.group}>
                <p className="mb-2.5 text-[15px] text-fog">{g.group}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s.name} className="chip">
                      {s.icon ? <BrandIcon icon={s.icon} size={15} /> : <Glyph name={s.glyph} size={16} />}
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  // Two copies side by side; the track slides exactly one copy's width.
  return (
    <div className="marquee fade-edges rise mt-16 overflow-hidden py-4" style={{ '--i': 4 }} aria-hidden>
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20">
            {marquee.map((icon) => (
              <BrandIcon
                key={icon.slug}
                icon={icon}
                size={52}
                className="text-slate transition-colors duration-300 hover:text-mist"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function UpNext() {
  const cards = [
    {
      to: '/experience',
      label: 'Experience',
      text: `${experience.length} roles, from leading engineering at GradientV to running Cubic Builds.`,
    },
    {
      to: '/projects',
      label: 'Projects',
      text: `${projects.length} builds across software, robotics, AI, and a rocket engine.`,
    },
  ]
  return (
    <section className="mt-16 grid gap-4 sm:grid-cols-2" aria-label="Sections">
      {cards.map((c, i) => (
        <Link
          key={c.to}
          to={c.to}
          className="glass rise group relative overflow-hidden rounded-3xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
          style={{ '--i': 5 + i }}
        >
          <p className="eyebrow">0{i + 2}</p>
          <p className="mt-3 flex items-center justify-between text-3xl font-semibold tracking-tight">
            {c.label}
            <span className="grid size-11 place-items-center rounded-full border border-white/10 transition-all duration-500 ease-out-expo group-hover:border-transparent group-hover:bg-snow group-hover:text-void">
              <ArrowRight size={18} className="transition-transform duration-500 ease-out-expo group-hover:-rotate-45" />
            </span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-fog">{c.text}</p>
        </Link>
      ))}
    </section>
  )
}

export default function Home() {
  usePageMeta(null)
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <UpNext />
    </>
  )
}
