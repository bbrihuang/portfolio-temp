import { computeRoute, SpeedInsights } from '@vercel/speed-insights/react'
import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router'
import Background from './Background.jsx'
import Footer from './Footer.jsx'
import Nav from './Nav.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  // Vercel Speed Insights groups pages by route pattern, so every project page
  // reports as /projects/[slug] instead of one entry per project.
  const matches = useMatches()
  const route = computeRoute(pathname, matches.at(-1)?.params ?? null)

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[60] focus:rounded-full focus:bg-snow focus:px-4 focus:py-2 focus:text-void"
      >
        Skip to content
      </a>
      <Background />
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
      <SpeedInsights route={route} />
    </div>
  )
}
