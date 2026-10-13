import { useEffect, useRef, useState } from 'react'
import { siGithub } from 'simple-icons'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../config.js'
import { useSlidingPill } from '../lib/hooks.js'
import { isSoundOn, onSoundChange, setSoundOn } from '../lib/sound.js'
import { glow, sectionColor } from '../lib/theme.js'
import BrandIcon from './BrandIcon.jsx'
import { FileText, LinkedIn, Mail, SoundOff, SoundOn } from './Icons.jsx'
import Mark from './Mark.jsx'

export const sections = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/setup', label: 'Setup' },
]

const iconBtn =
  'grid size-10 place-items-center rounded-full text-fog transition-colors hover:bg-white/10 hover:text-snow'

// Speaker button: turns the UI sounds on or off (remembered per visitor).
function SoundToggle() {
  const [on, setOn] = useState(isSoundOn)
  useEffect(() => onSoundChange(setOn), [])
  return (
    <button
      type="button"
      data-sound="off"
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      aria-label={on ? 'Turn sound off' : 'Turn sound on'}
      title={on ? 'Sound on' : 'Sound off'}
      className="grid size-8 place-items-center rounded-full text-fog transition-colors hover:bg-white/10 hover:text-snow sm:size-10"
    >
      {on ? <SoundOn size={17} /> : <SoundOff size={17} />}
    </button>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const listRef = useRef(null)
  // White pill that slides under whichever link is current.
  const pill = useSlidingPill(listRef, '[aria-current="page"]', pathname)
  // The pill takes the section's color (blue Experience, purple Projects); Home stays white.
  const accent = sectionColor(pathname)

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <nav
          aria-label="Primary"
          className="glass-strong mx-auto grid h-14 max-w-4xl grid-cols-[1fr_auto_1fr] items-center rounded-full px-2"
        >
          <Link to="/" aria-label={`${site.name}, home`} className="group flex items-center gap-2.5 justify-self-start rounded-full pr-3">
            <Mark />
            <span className="hidden text-[15px] font-semibold tracking-tight md:block">{site.name}</span>
          </Link>

          <div ref={listRef} className="relative flex items-center">
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 rounded-full ${
                pill.animate ? 'transition-[transform,width,opacity,background-color] duration-500 ease-out-expo' : ''
              }`}
              style={{
                ...pill.style,
                background: accent?.base ?? 'var(--color-snow)',
                boxShadow: accent ? glow(accent.base) : '0 6px 20px -6px rgb(255 255 255 / 0.5)',
              }}
            />
            {sections.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                end={s.end}
                className={`relative inline-flex h-10 items-center rounded-full px-[7px] text-[13px] font-medium text-fog transition-colors duration-300 hover:text-snow sm:px-4 sm:text-sm ${
                  accent ? 'aria-[current=page]:text-white' : 'aria-[current=page]:text-void'
                }`}
              >
                {s.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-0.5 justify-self-end">
            <SoundToggle />
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${iconBtn} hidden xl:grid`}>
              <BrandIcon icon={siGithub} size={17} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${iconBtn} hidden xl:grid`}>
              <LinkedIn size={17} />
            </a>
            {/* Resume: an icon on mid-size screens, a labeled button once there's room. */}
            {site.resume && (
              <>
                <a href={site.resume} target="_blank" rel="noreferrer" aria-label="Resume" className={`${iconBtn} hidden sm:grid lg:hidden`}>
                  <FileText size={18} />
                </a>
                <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-glass ml-1 hidden h-10 px-4 text-sm lg:inline-flex">
                  <FileText size={16} />
                  Resume
                </a>
              </>
            )}
            <a href={`mailto:${site.email}`} className="btn btn-light ml-1 hidden h-10 px-4 text-sm md:inline-flex">
              <Mail size={16} />
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
