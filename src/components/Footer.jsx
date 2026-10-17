import { useEffect, useState } from 'react'
import { site } from '../config.js'
import { isSoundOn, onSoundChange, setSoundOn } from '../lib/sound.js'
import { SoundOff, SoundOn } from './Icons.jsx'

// The nav's speaker button is hidden on phones, so the footer carries one there.
function SoundSwitch() {
  const [on, setOn] = useState(isSoundOn)
  useEffect(() => onSoundChange(setOn), [])
  return (
    <button
      type="button"
      data-sound="off"
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      className="inline-flex min-h-11 items-center gap-2 px-2 transition-colors hover:text-snow sm:hidden"
    >
      {on ? <SoundOn size={16} /> : <SoundOff size={16} />}
      Sound {on ? 'on' : 'off'}
    </button>
  )
}

// GitHub and LinkedIn live in the profile card on the homepage. Email is in the top
// bar on wide screens; the footer shows it only where the top bar hides it.
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="shell flex flex-col items-center justify-between gap-3 py-8 text-sm text-steel sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs">Built with React, Vite & Tailwind</p>
        <SoundSwitch />
        <a href={`mailto:${site.email}`} className="link-line inline-flex min-h-11 items-center px-2 transition-colors hover:text-snow md:hidden">
          Email
        </a>
      </div>
    </footer>
  )
}
