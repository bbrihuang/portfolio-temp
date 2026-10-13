import { Link } from 'react-router'
import { ArrowLeft } from '../components/Icons.jsx'
import { usePageMeta } from '../lib/hooks.js'

export default function NotFound() {
  usePageMeta('Not found')
  return (
    <section className="grid min-h-[55vh] place-items-center text-center">
      <div>
        <p className="eyebrow rise-blur">Error 404</p>
        <h1 className="rise-blur mt-4 text-7xl font-bold tracking-[-0.05em] sm:text-8xl" style={{ '--i': 1 }}>
          Lost?
        </h1>
        <p className="rise-blur mt-4 text-fog" style={{ '--i': 2 }}>
          That page doesn’t exist, or it moved.
        </p>
        <Link to="/" className="btn btn-light rise mt-8" style={{ '--i': 3 }}>
          <ArrowLeft size={16} />
          Back home
        </Link>
      </div>
    </section>
  )
}
