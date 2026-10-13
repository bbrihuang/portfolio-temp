import { site } from '../config.js'

// GitHub, LinkedIn and Email live in the top bar on wide screens. The footer only
// shows the ones the top bar has to hide on smaller screens, so they never repeat.
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="shell flex flex-col items-center justify-between gap-3 py-8 text-sm text-steel sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs">Built with React, Vite & Tailwind</p>
        <div className="flex gap-5 xl:hidden">
          <a href={site.github} target="_blank" rel="noreferrer" className="link-line transition-colors hover:text-snow">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-line transition-colors hover:text-snow">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="link-line transition-colors hover:text-snow md:hidden">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
