// Color means one thing on this site: blue is the Software line and orange is the
// Hardware line (see the tokens in index.css). Experience and Projects have no
// color of their own, so the nav pill and page headers stay neutral there.
// Only the Setup page keeps an accent, the same orange as "hardware" in the
// homepage headline.
//   base   button and pill fill
//   hover  base, a step lighter
//   light  for text and gradients on the dark background
export const sectionColors = {
  '/setup': { base: '#f97316', hover: '#fb8a3c', light: '#fcd38d' },
}

/** The section color for a path ('/projects/jethexa' → Projects), or undefined. */
export const sectionColor = (pathname) =>
  Object.entries(sectionColors).find(([to]) => pathname === to || pathname.startsWith(`${to}/`))?.[1]

/** A soft glow under a filled button or pill. */
export const glow = (hex) => `0 8px 24px -10px ${hex}cc`
