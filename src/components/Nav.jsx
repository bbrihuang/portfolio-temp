import { useRef } from 'react'
import { siGithub } from 'simple-icons'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../config.js'
import { useSlidingPill } from '../lib/hooks.js'
import BrandIcon from './BrandIcon.jsx'
import { FileText, LinkedIn, Mail } from './Icons.jsx'
import Mark from './Mark.jsx'

export const sections = [
  { to: '/', label: 'Home', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
]

const iconBtn =
  'grid size-10 place-items-center rounded-full text-fog transition-colors hover:bg-white/10 hover:text-snow'

export default function Nav() {
  const { pathname } = useLocation()
  const listRef = useRef(null)
  // White pill that slides under whichever link is current.
  const pill = useSlidingPill(listRef, '[aria-current="page"]', pathname)

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
              className={`absolute inset-y-0 left-0 rounded-full bg-snow shadow-[0_6px_20px_-6px_rgb(255_255_255/0.5)] ${
                pill.animate ? 'transition-[transform,width,opacity] duration-500 ease-out-expo' : ''
              }`}
              style={pill.style}
            />
            {sections.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                end={s.end}
                className="relative inline-flex h-10 items-center rounded-full px-3 text-[13px] font-medium text-fog transition-colors duration-300 hover:text-snow aria-[current=page]:text-void sm:px-4 sm:text-sm"
              >
                {s.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-0.5 justify-self-end">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={`${iconBtn} hidden sm:grid`}>
              <BrandIcon icon={siGithub} size={17} />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={`${iconBtn} hidden sm:grid`}>
              <LinkedIn size={17} />
            </a>
            {site.resume && (
              <a href={site.resume} target="_blank" rel="noreferrer" aria-label="Résumé" className={`${iconBtn} hidden sm:grid`}>
                <FileText size={18} />
              </a>
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
