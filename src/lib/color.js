// Brand colors on a dark ground. Some brands are navy or black, which would
// vanish on the graphite background, so those are mixed toward white until
// they read clearly. Everything else keeps its official color.

const BG = 0.0065 // relative luminance of --color-coal

function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function mixWithWhite(hex, t) {
  return [0, 2, 4]
    .map((i) => {
      const v = parseInt(hex.slice(i, i + 2), 16)
      return Math.round(v + (255 - v) * t)
        .toString(16)
        .padStart(2, '0')
    })
    .join('')
}

/** A readable version of `hex` (with or without #) for use on the dark background. */
export function onDark(hex, minContrast = 3.4) {
  let h = hex.replace('#', '')
  // Black and near-black marks (GitHub, Vercel, ...) are monochrome brands: show them white.
  if (luminance(h) < 0.005) return '#e4e4e7'
  for (let t = 0; (luminance(h) + 0.05) / (BG + 0.05) < minContrast && t < 1; ) {
    t += 0.05
    h = mixWithWhite(hex.replace('#', ''), t)
  }
  return `#${h}`
}

/** The color for a tech-stack item: its brand color, or the `color` set in skills.js. */
export const itemColor = (item) => onDark(item.color ?? item.icon?.hex ?? 'a1a1aa')
