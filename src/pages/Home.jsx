import { Link } from 'react-router'
import BrandIcon from '../components/BrandIcon.jsx'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Glyph,
  Layers,
  MapPin,
  Trophy,
  User,
} from '../components/Icons.jsx'
import ProfileBlurb from '../components/ProfileBlurb.jsx'
import { site } from '../config.js'
import { marquee, stack } from '../data/skills.js'
import { itemColor, onDark } from '../lib/color.js'
import { usePageMeta } from '../lib/hooks.js'
import { glow, sectionColors } from '../lib/theme.js'

// Clubs, with cultural clubs last. Logos live in public/clubs/ (taken from each
// club's website or Instagram); a club with no `logo` gets an initials tile.
// `roles` is one line per role. `href` makes the whole row a link.
const activities = [
  {
    org: 'BU AI Society',
    roles: ['Robotics Simulation Developer & LLM Inference Researcher'],
    logo: '/clubs/bu-ai-society.png',
    href: 'https://www.buaisociety.com/',
  },
  { org: 'BU Rocket Propulsion Group', roles: ['Nozzle Design Engineer'], logo: '/clubs/burpg.png', href: 'https://burpg.org/' },
  {
    org: 'Heartfelt Connections',
    roles: ['VP of User Experience'],
    initials: 'HC',
    href: 'https://www.linkedin.com/company/105780600/',
  },
  { org: 'BU Blockchain', roles: ['Member'], logo: '/clubs/bu-blockchain.png', href: 'https://www.instagram.com/bu_blockchain/' },
  { org: 'BU Game Design', roles: ['Member'], logo: '/clubs/bu-game-design.jpg', href: 'https://www.instagram.com/bugamedesign/' },
  { org: 'BU Computer Science', roles: ['Member'], logo: '/clubs/bu-computer-science.jpg', href: 'https://www.instagram.com/bucomputerscience/' },
  {
    org: 'BU Japanese Student Association',
    roles: ['Member', 'Kyodai Family, Member'],
    logo: '/clubs/bu-jsa.png',
    href: 'https://www.instagram.com/thebujsa/',
  },
  { org: 'BU Chinese Students Association', roles: ['Member'], logo: '/clubs/bu-csa.png', href: 'https://www.instagram.com/teamcsa/' },
]

function Hero() {
  return (
    <section className="grid items-center gap-10 lg:min-h-[calc(100dvh-15rem)] lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="eyebrow rise-blur" style={{ '--i': 0 }}>
          Hi! I’m {site.first}.
        </p>
        <h1
          className="rise-blur mt-5 text-[clamp(2.75rem,6.4vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.04em]"
          style={{ '--i': 1 }}
        >
          <span className="text-fog">I build where</span>{' '}
          <span className="text-gradient bg-gradient-to-r from-sky-300 to-indigo-400">software</span>{' '}
          <span className="text-fog">meets</span>{' '}
          <span className="text-gradient bg-gradient-to-r from-amber-200 to-orange-400">hardware.</span>
        </h1>
        <p className="rise-blur mt-6 max-w-xl text-[17px] leading-relaxed text-fog" style={{ '--i': 2 }}>
          I study Computer Engineering at Boston University, where I work with BU AI Society on local LLMs and
          robotics. I’m also the Lead Software Engineer at GradientV, building software and AI tools for small
          businesses. I also run Cubic Builds, my custom PC building business.
          <span className="mt-3 block">Check out my other projects below!</span>
        </p>
        <SectionLinks />
        <p className="rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-steel" style={{ '--i': 5 }}>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            Boston, MA / New York City, NY
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
    { to: '/experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { to: '/projects', label: 'Projects', icon: <Layers size={16} /> },
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
            {b.icon}
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
      <User size={16} />
      About me
      <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
    </button>
  )
}

// A small Google Map of BU's campus, darkened to match the site. The embed is
// oversized and centered so Google's own buttons fall outside the frame; the
// whole tile is a link that opens BU in Google Maps. Full width under the
// degree on phones, a small tile beside it on wider screens.
function CampusMap() {
  return (
    <a
      href="https://maps.app.goo.gl/zNbbzCeZbUovEJ9g6"
      target="_blank"
      rel="noreferrer"
      aria-label="Boston University on Google Maps"
      className="group relative h-28 basis-full overflow-hidden rounded-2xl border border-white/12 bg-ash sm:h-[72px] sm:w-28 sm:basis-auto"
    >
      <iframe
        title="Map of Boston University"
        src="https://maps.google.com/maps?q=Boston%20University&z=16&output=embed"
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[960px] -translate-x-1/2 -translate-y-1/2 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]"
      />
      <span className="absolute bottom-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-black/60 text-snow opacity-80 transition-opacity group-hover:opacity-100">
        <ArrowUpRight size={12} />
      </span>
    </a>
  )
}

function About() {
  return (
    <section id="about" className="mt-16 scroll-mt-28 sm:mt-20" aria-labelledby="about-title">
      <h2 id="about-title" className="rise-blur text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
        About Me
      </h2>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="glass rise flex flex-wrap items-center gap-4 rounded-3xl p-5" style={{ '--i': 1 }}>
            {/* The logo sits on a BU-red tile, so the outer corners can be well rounded
                without clipping the logo's own inner white border. */}
            <div className="shrink-0 rounded-2xl bg-[#cc0000] p-1.5 shadow-[0_8px_24px_-10px_rgb(204_0_0/0.7)]">
              <img src="/bu-logo.png" alt="Boston University" width="500" height="224" className="h-11 w-auto" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-semibold leading-snug tracking-tight">{site.degree}</p>
              <p className="text-sm text-fog">
                {site.school} · {site.graduation}
              </p>
            </div>
            <CampusMap />
          </div>
        </div>
        <div className="glass rise rounded-3xl p-5" style={{ '--i': 2 }}>
          <p className="flex items-center gap-2 text-[15px] font-medium">
            <Trophy size={18} className="text-amber-300" />
            Clubs & Activities
          </p>
          <ul className="-mx-2 mt-2.5 grid sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((a) => (
              <li key={a.org}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/[0.05]"
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
                      className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] font-mono text-xs font-semibold text-mist"
                    >
                      {a.initials}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium leading-snug text-mist transition-colors group-hover:text-snow">
                      {a.org}
                    </span>
                    {a.roles.map((r) => (
                      <span key={r} className="block text-sm leading-snug text-fog">
                        {r}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight size={14} className="shrink-0 text-steel transition-colors group-hover:text-snow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 id="stack-title" className="text-3xl font-semibold tracking-tight">
          Tech Stack
        </h3>
        <p className="font-mono text-xs text-fog">what I build with, from code to hardware</p>
      </div>
      {/* Group cards flow into balanced columns, so nothing leaves a gap. */}
      <div className="mt-5 gap-4 sm:columns-2 lg:columns-3" aria-labelledby="stack-title">
        {stack.map((g, i) => (
          <div key={g.group} className="glass rise mb-4 break-inside-avoid rounded-3xl p-5" style={{ '--i': 2 + i }}>
            <p className="text-[15px] font-semibold tracking-tight">{g.group}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s.name} className="chip chip-sm gap-1.5">
                  <span className="contents" style={{ color: itemColor(s) }}>
                    {s.icon ? <BrandIcon icon={s.icon} size={13} /> : <Glyph name={s.glyph} size={14} />}
                  </span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
