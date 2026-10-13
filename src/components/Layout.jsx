import { Analytics } from '@vercel/analytics/react'
import { computeRoute, SpeedInsights } from '@vercel/speed-insights/react'
import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation, useMatches } from 'react-router'
import { play } from '../lib/sound.js'
import Background from './Background.jsx'
import Footer from './Footer.jsx'
import Nav from './Nav.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  // Vercel Web Analytics and Speed Insights group pages by route pattern, so
  // every project page reports as /projects/[slug] instead of one entry each.
  const matches = useMatches()
  const route = computeRoute(pathname, matches.at(-1)?.params ?? null)

  // A soft swell as each new page slides in (not on the first load).
  const first = useRef(true)
  useEffect(() => {
    if (first.current) first.current = false
    else play('page')
  }, [pathname])

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
      <Analytics route={route} path={pathname} />
      <SpeedInsights route={route} />
    </div>
  )
}
