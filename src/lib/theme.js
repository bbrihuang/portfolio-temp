// Section colors: Experience is blue, Projects is purple. Shared by the
// homepage buttons, the nav pill, each page's header and the projects filter.
//   base   button and pill fill (white text sits on it)
//   hover  base, a step lighter
//   light  for text and gradients on the dark background
export const sectionColors = {
  '/experience': { base: '#2f7cf6', hover: '#4a8ef8', light: '#8ab8ff' },
  '/projects': { base: '#8b45f5', hover: '#9b5cf7', light: '#c3a0ff' },
}

/** The section color for a path ('/projects/jethexa' → Projects), or undefined. */
export const sectionColor = (pathname) =>
  Object.entries(sectionColors).find(([to]) => pathname === to || pathname.startsWith(`${to}/`))?.[1]

/** A soft glow under a filled button or pill. */
export const glow = (hex) => `0 8px 24px -10px ${hex}cc`
