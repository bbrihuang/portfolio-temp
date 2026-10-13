import { Link } from 'react-router'
import { siGithub } from 'simple-icons'
import BrandIcon from '../components/BrandIcon.jsx'
import { ArrowDown, ArrowRight, ArrowUpRight, Chain, FileText, Glyph, Globe, LinkedIn, MapPin, Rocket, Trophy } from '../components/Icons.jsx'
import ProfileBlurb from '../components/ProfileBlurb.jsx'
import { site } from '../config.js'
import { marquee, stack } from '../data/skills.js'
import { itemColor, onDark } from '../lib/color.js'
import { usePageMeta } from '../lib/hooks.js'
import { glow, sectionColors } from '../lib/theme.js'

// Clubs, each in its own color, with cultural clubs last. `href` links the club's
// name to its site; leave it null to show the name as plain text.
const activities = [
  {
    org: 'BU Rocket Propulsion Group',
    role: 'Nozzle Design Engineer',
    href: 'https://burpg.org/',
    icon: <Rocket size={15} />,
    tint: 'bg-orange-400/15 text-orange-300',
  },
  {
    org: 'BU AI Society',
    role: 'Robotics Simulation Developer & LLM Inference Researcher',
    href: 'https://www.buaisociety.com/',
    icon: <Glyph name="agent" size={15} />,
    tint: 'bg-cyan-400/15 text-cyan-300',
  },
  {
    org: 'BU Blockchain',
    role: 'Member',
    href: 'https://www.instagram.com/bu_blockchain/',
    icon: <Chain size={15} />,
    tint: 'bg-amber-400/15 text-amber-300',
  },
  {
    org: 'BU Chinese Students Association',
    role: 'Member',
    href: 'https://www.instagram.com/teamcsa/',
    icon: <Globe size={15} />,
    tint: 'bg-red-400/15 text-red-300',
  },
  {
    org: 'BU Japanese Student Association',
    role: 'Member',
    href: 'https://www.instagram.com/thebujsa/',
    icon: <Globe size={15} />,
    tint: 'bg-pink-400/15 text-pink-300',
  },
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
          <span className="text-steel">I build where</span>{' '}
          <span className="text-gradient bg-gradient-to-r from-sky-300 to-indigo-400">software</span>{' '}
          <span className="text-steel">meets</span>{' '}
          <span className="text-gradient bg-gradient-to-r from-amber-200 to-orange-400">hardware.</span>
        </h1>
        <p className="rise-blur mt-6 max-w-xl text-[17px] leading-relaxed text-fog" style={{ '--i': 2 }}>
          I study Computer Engineering at Boston University. I lead engineering at GradientV, design rocket
          nozzles with the BU Rocket Propulsion Group, simulate a hexapod robot with BU AI Society, and run
          Cubic Builds, my custom PC business.
        </p>
        <SectionLinks />
        <p className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-steel" style={{ '--i': 5 }}>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            Boston, MA · New York City, NY
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

// Experience (blue), Projects (purple) and About me: equal-width buttons. A row of
// three on wider screens, stacked full width on phones where three would not fit.
function SectionLinks() {
  const buttons = [
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
  ]
  return (
    <div className="mt-8 grid gap-3 sm:w-fit sm:grid-cols-3">
      {buttons.map((b, i) => {
        const c = sectionColors[b.to]
        return (
          <Link
            key={b.to}
            to={b.to}
            className="btn rise group min-w-40 bg-(--c) text-white hover:bg-(--c-hover)"
            style={{ '--i': 3 + i, '--c': c.base, '--c-hover': c.hover, boxShadow: glow(c.base) }}
          >
            {b.label}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        )
      })}
      <AboutButton />
    </div>
  )
}

// Sits beside Experience and Projects and scrolls down to the About section.
function AboutButton() {
  const go = () => {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('about')?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }
  return (
    <button type="button" onClick={go} className="btn btn-glass rise group min-w-40" style={{ '--i': 5 }}>
      About me
      <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
    </button>
  )
}

// LinkedIn and GitHub. The email lives in the profile card up top.
function Elsewhere() {
  const links = [
    {
      href: site.linkedin,
      label: 'LinkedIn',
      handle: site.linkedinHandle,
      icon: <LinkedIn size={16} />,
      tint: 'bg-[#0a66c2] text-white',
    },
    {
      href: site.github,
      label: 'GitHub',
      handle: site.githubHandle,
      icon: <BrandIcon icon={siGithub} size={17} />,
      tint: 'bg-snow text-void',
    },
    // Full-width card under the other two, shown once config.js has a résumé.
    site.resume && {
      href: site.resume,
      label: 'Résumé',
      handle: 'PDF · opens in a new tab',
      icon: <FileText size={17} />,
      tint: 'bg-emerald-500 text-white',
      wide: true,
    },
  ].filter(Boolean)
  return (
    <div className="grid grid-cols-2 gap-4">
      {links.map((l, k) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={`glass rise group flex items-center gap-3 rounded-3xl p-4 transition-transform duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.99] ${
            l.wide ? 'col-span-2' : ''
          }`}
          style={{ '--i': 3 + k }}
        >
          <span className={`grid size-9 shrink-0 place-items-center rounded-full ${l.tint}`}>{l.icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-medium">{l.label}</span>
            <span className="block truncate font-mono text-xs text-fog">{l.handle}</span>
          </span>
          <ArrowUpRight
            size={16}
            className="hidden shrink-0 text-steel transition-colors group-hover:text-snow min-[420px]:block"
          />
        </a>
      ))}
    </div>
  )
}

function About() {
  return (
    <section id="about" className="mt-16 scroll-mt-28 sm:mt-20" aria-labelledby="about-title">
      <h2 id="about-title" className="rise-blur text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
        About
      </h2>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="glass rise flex items-center gap-5 rounded-3xl p-5" style={{ '--i': 1 }}>
            <img
              src="/bu-logo.png"
              alt="Boston University"
              width="500"
              height="224"
              className="h-14 w-auto shrink-0 rounded-lg shadow-[0_8px_24px_-10px_rgb(204_0_0/0.7)]"
            />
            <div>
              <p className="text-lg font-semibold tracking-tight">{site.degree}</p>
              <p className="text-sm text-fog">
                {site.school} · {site.graduation}
              </p>
            </div>
          </div>

          <div className="glass rise rounded-3xl p-5" style={{ '--i': 2 }}>
            <p className="flex items-center gap-2 text-[15px] font-medium">
              <Trophy size={18} className="text-amber-300" />
              Clubs & Activities
            </p>
            <ul className="mt-3.5 space-y-2.5 text-sm">
              {activities.map((a) => (
                <li key={a.org} className="flex items-center gap-3">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${a.tint}`}>{a.icon}</span>
                  <span>
                    {a.href ? (
                      <a href={a.href} target="_blank" rel="noreferrer" className="link-line text-mist hover:text-snow">
                        {a.org}
                        <ArrowUpRight size={12} className="ml-0.5 inline align-[-1px] text-steel" />
                      </a>
                    ) : (
                      <span className="text-mist">{a.org}</span>
                    )}
                    <span className="px-1.5 text-slate">•</span>
                    <span className="text-fog">{a.role}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/[0.07] pt-3 text-sm text-steel">Speaks English & Mandarin</p>
          </div>

          <Elsewhere />
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
                      <span className="contents" style={{ color: itemColor(s) }}>
                        {s.icon ? <BrandIcon icon={s.icon} size={15} /> : <Glyph name={s.glyph} size={16} />}
                      </span>
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
  // Logos rest in grey and light up in their brand color on hover.
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
                style={{ '--brand': onDark(icon.hex) }}
                className="text-slate transition-colors duration-300 hover:text-(--brand)"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  usePageMeta(null)
  return (
    <>
      <Hero />
      <About />
      <Marquee />
    </>
  )
}
