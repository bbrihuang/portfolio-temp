import { Navigate, createBrowserRouter, useLocation } from 'react-router'
import Layout from './components/Layout.jsx'
import Experience from './pages/Experience.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Projects from './pages/Projects.jsx'
import Setup from './pages/Setup.jsx'

// A data router (rather than <BrowserRouter>) is what makes <Link viewTransition>
// work. Pages are small, so they load eagerly; that also keeps the
// card-to-detail view transition from snapshotting a loading state.
// Setup used to be its own page at /setup and the homelab a project; both now live
// at /projects/homelab. Old links keep working, query string (?view=pc) included.
function MovedTo({ to, search }) {
  const { search: current } = useLocation()
  return <Navigate to={to + (current || search || '')} replace />
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'experience', element: <Experience /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/homelab', element: <Setup /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'setup', element: <MovedTo to="/projects/homelab" /> },
      { path: 'projects/setup', element: <MovedTo to="/projects/homelab" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
