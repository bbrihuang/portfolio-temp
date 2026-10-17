// Section colors: Experience is blue, Projects is a tech violet. Shared by the nav
// pill and each page's header. (The Software/Hardware filter on Projects uses the
// map's blue and orange instead; see index.css.) The Setup entry is the orange of
// "hardware" in the homepage headline.
//   base   the main color (glows and shadows are cast from it)
//   fill   gradient for the nav pill and filled buttons (white text sits on it)
//   hover  base, a step lighter
//   light  for text and gradients on the dark background
export const sectionColors = {
  '/experience': {
    base: '#2f7cf6',
    fill: 'linear-gradient(135deg, #4a93ff 0%, #2f7cf6 45%, #1d4fc4 100%)',
    hover: '#4a8ef8',
    light: '#8ab8ff',
  },
  '/projects': {
    base: '#7c3aed',
    fill: 'linear-gradient(135deg, #9b6bff 0%, #7c3aed 45%, #4c1d95 100%)',
    hover: '#8f56f0',
    light: '#b79cff',
  },
  '/setup': {
    base: '#f97316',
    fill: 'linear-gradient(135deg, #fb923c 0%, #f97316 45%, #c2540a 100%)',
    hover: '#fb8a3c',
    light: '#fcd38d',
  },
}

/** The section color for a path ('/projects/jethexa' → Projects), or undefined. */
export const sectionColor = (pathname) =>
  Object.entries(sectionColors).find(([to]) => pathname === to || pathname.startsWith(`${to}/`))?.[1]

/** A soft glow under a filled button or pill. */
export const glow = (hex) => `0 8px 24px -10px ${hex}cc`
