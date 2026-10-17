import { Analytics } from '@vercel/analytics/react'
import { computeRoute, SpeedInsights } from '@vercel/speed-insights/react'
import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router'
import Background from './Background.jsx'
import Footer from './Footer.jsx'
import Nav from './Nav.jsx'
import { sectionColor } from '../lib/theme.js'

export default function Layout() {
  const { pathname } = useLocation()
  // Vercel Web Analytics and Speed Insights group pages by route pattern, so
  // every project page reports as /projects/[slug] instead of one entry each.
  const matches = useMatches()
  const route = computeRoute(pathname, matches.at(-1)?.params ?? null)
  // Experience pages are blue and Projects pages violet. The page sets its color
  // as --section / --section-light, and focus rings, the glow behind the header and
  // the page's own highlights pick it up.
  const section = sectionColor(pathname)

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={section ? { '--section': section.base, '--section-light': section.light } : undefined}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:rounded-full focus:bg-snow focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <Background />
      {section && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-[75vh] [background:radial-gradient(60%_70%_at_50%_0%,color-mix(in_srgb,var(--section)_20%,transparent),transparent)]"
        />
      )}
      <Nav />
      {/* Keyed by path so each page replays its entrance, even between two
          projects that share a route. */}
      <main id="main" key={pathname} className="page shell flex-1 pb-20 pt-28 sm:pt-32">
        <Outlet />
      </main>
      <Footer />
      {/* New pages start at the top; Back returns to where you were. Filter
          and role changes pass preventScrollReset so they stay put. */}
      <ScrollRestoration />
      <Analytics route={route} path={pathname} />
      <SpeedInsights route={route} />
    </div>
  )
}
