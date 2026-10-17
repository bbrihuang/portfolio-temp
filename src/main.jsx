import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { router } from './App.jsx'

// iOS Safari only applies :active (the tap effects in index.css) once the page
// listens for touches. An empty listener is enough.
document.addEventListener('touchstart', () => {}, { passive: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
