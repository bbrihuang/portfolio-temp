import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.jsx'
import Experience from './pages/Experience.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Projects from './pages/Projects.jsx'

// A data router (rather than <BrowserRouter>) is what makes <Link viewTransition>
// work. Pages are small, so they load eagerly; that also keeps the
// card-to-detail view transition from snapshotting a loading state.
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'experience', element: <Experience /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
