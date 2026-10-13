const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Svg = ({ size = 18, children, className, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...stroke} {...rest}>
    {children}
  </svg>
)

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const ArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
)

export const ArrowUpRight = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
)

export const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const Mail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Svg>
)

export const MailPlus = (p) => (
  <Svg {...p}>
    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5M19 16v6M16 19h6" />
  </Svg>
)

export const Check = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
)

export const Prompt = (p) => (
  <Svg {...p}>
    <path d="m4 17 6-5-6-5M12 19h8" />
  </Svg>
)

export const Rocket = (p) => (
  <Svg {...p}>
    <path d="M12 15 9 12c1-4.5 4.5-8.5 11-9-.5 6.5-4.5 10-9 11z" />
    <path d="M9 12H5l2.5-3.5H11M12 15v4l3.5-2.5V13" />
    <path d="M6.5 16.5C5 17 4.5 19.5 4.5 19.5S7 19 7.5 17.5" />
  </Svg>
)

export const Code = (p) => (
  <Svg {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />
  </Svg>
)

export const Wrench = (p) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13a6 6 0 0 1-7.7 3.4L7 22.7 1.3 17l6.3-6.3A6 6 0 0 1 11 3l1.7 1.3a4 4 0 0 0 2 2z" />
  </Svg>
)

export const Cpu = (p) => (
  <Svg {...p}>
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
    <rect x="9.5" y="9.5" width="5" height="5" />
    <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
  </Svg>
)

export const Trophy = (p) => (
  <Svg {...p}>
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6" />
  </Svg>
)

export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
)

export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5z" />
    <path d="m3 13 9 5 9-5" />
  </Svg>
)

export const FileText = (p) => (
  <Svg {...p}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5z" />
    <path d="M14 3v5h5M8.5 13h7M8.5 17h5" />
  </Svg>
)

// Filled brand marks not covered by simple-icons.
export const LinkedIn = ({ size = 18, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
)

// Monochrome glyphs for skills that have no brand mark.
const glyphs = {
  java: (
    <>
      <path d="M5 10h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-4z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M4 21.5h14" />
      <path d="M9 3c-1 1.5 1 2.5 0 4M12.5 3c-1 1.5 1 2.5 0 4" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  gazebo: (
    <>
      <path d="m12 2.5 8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5z" />
      <path d="M15.5 9.5a4 4 0 1 0 .5 3.5h-3.5" />
    </>
  ),
  agent: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4.5M12 4.5h.01M9.5 13h.01M14.5 13h.01M2.5 13v2M21.5 13v2" />
    </>
  ),
  vector: (
    <>
      <circle cx="5" cy="18" r="1.6" />
      <circle cx="12" cy="6" r="1.6" />
      <circle cx="19" cy="15" r="1.6" />
      <path d="M6.3 16.6 10.8 7.4M13.5 6.7l4.4 6.8M6.6 17.7l10.8-2.3" />
    </>
  ),
  cad: (
    <>
      <path d="m12 2.5 8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5L12 2.5z" />
      <path d="M3.5 7.25 12 12l8.5-4.75M12 12v9.5" />
    </>
  ),
  wave: (
    <>
      <path d="M2.5 16c2.5 0 3-9 6-9s3.5 11 6.5 11 3.5-6 6.5-6" />
      <path d="M2.5 21h19" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  layers: (
    <>
      <path d="M4 20h16M6 16.5h12M8 13h8" />
      <path d="M12 3v6M9.5 6.5 12 9l2.5-2.5" />
    </>
  ),
  av: (
    <>
      <rect x="2.5" y="4" width="19" height="12.5" rx="1.5" />
      <path d="M8 20.5h8M12 16.5v4M10 8.5v4l3.5-2-3.5-2z" />
    </>
  ),
}

export const Glyph = ({ name, size = 16, className }) => (
  <Svg size={size} className={className}>
    {glyphs[name]}
  </Svg>
)
