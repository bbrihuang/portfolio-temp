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

export const Copy = (p) => (
  <Svg {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Svg>
)

export const ArrowDown = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Svg>
)

export const Briefcase = (p) => (
  <Svg {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
  </Svg>
)

export const User = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </Svg>
)

// Setup page: parts, devices and roles.
export const Fan = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="1.6" />
    <path d="M12 10.4c-.6-2.4.2-4.6 2.6-5 1.4 1.5.6 4.1-1.4 5.6M13.6 12c2.4-.6 4.6.2 5 2.6-1.5 1.4-4.1.6-5.6-1.4M12 13.6c.6 2.4-.2 4.6-2.6 5-1.4-1.5-.6-4.1 1.4-5.6M10.4 12c-2.4.6-4.6-.2-5-2.6 1.5-1.4 4.1-.6 5.6 1.4" />
  </Svg>
)

export const Memory = (p) => (
  <Svg {...p}>
    <rect x="3" y="7" width="18" height="9" rx="1" />
    <path d="M7 10v3M10.5 10v3M14 10v3M17.5 10v3M5 16v2.5M9 16v2.5M15 16v2.5M19 16v2.5" />
  </Svg>
)

export const HardDrive = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 14h18" />
    <circle cx="16.5" cy="16.5" r=".6" fill="currentColor" />
    <path d="M6.5 16.5h5" />
  </Svg>
)

export const GraphicsCard = (p) => (
  <Svg {...p}>
    <rect x="2.5" y="6" width="19" height="10" rx="1.5" />
    <circle cx="8.5" cy="11" r="2.6" />
    <circle cx="15.5" cy="11" r="2.6" />
    <path d="M5 16v2.5h9V16" />
  </Svg>
)

export const Board = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <rect x="8" y="8" width="5" height="5" />
    <path d="M16 7.5v3M16 13.5v3M8 16.5h5" />
  </Svg>
)

export const Tower = (p) => (
  <Svg {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="1.5" />
    <circle cx="12" cy="14" r="3" />
    <path d="M9 6.5h6" />
  </Svg>
)

export const Plug = (p) => (
  <Svg {...p}>
    <path d="M9 3v4M15 3v4M6.5 7h11v3a5.5 5.5 0 0 1-11 0V7zM12 15.5V21" />
  </Svg>
)

export const Laptop = (p) => (
  <Svg {...p}>
    <rect x="4.5" y="5" width="15" height="10" rx="1.2" />
    <path d="M2.5 18.5h19l-1.5-3.5H4z" />
  </Svg>
)

export const Phone = (p) => (
  <Svg {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M10.5 5h3" />
  </Svg>
)

export const Earbuds = (p) => (
  <Svg {...p}>
    <path d="M7 4.5a3 3 0 0 1 3 3v2.5a3 3 0 0 1-3 3 3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3zM8.5 12.6V19.5M17 4.5a3 3 0 0 0-3 3v2.5a3 3 0 0 0 3 3 3 3 0 0 0 3-3V7.5a3 3 0 0 0-3-3zM15.5 12.6V19.5" />
  </Svg>
)

export const Gamepad = (p) => (
  <Svg {...p}>
    <path d="M7 7h10a4.5 4.5 0 0 1 4.4 5.4l-.8 4A2.5 2.5 0 0 1 16.4 18l-2.2-2.4H9.8L7.6 18a2.5 2.5 0 0 1-4.2-1.6l-.8-4A4.5 4.5 0 0 1 7 7z" />
    <path d="M8 10.5v3M6.5 12h3" />
    <circle cx="15.5" cy="11" r=".7" fill="currentColor" />
    <circle cx="17" cy="13" r=".7" fill="currentColor" />
  </Svg>
)

export const Server = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="4" width="17" height="7" rx="1.5" />
    <rect x="3.5" y="13" width="17" height="7" rx="1.5" />
    <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
  </Svg>
)

export const Cloud = (p) => (
  <Svg {...p}>
    <path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.6 4.5 4.5 0 0 0 7 18.5z" />
  </Svg>
)

export const Globe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </Svg>
)

export const Chain = (p) => (
  <Svg {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Svg>
)

export const Close = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const Play = (p) => (
  <Svg {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
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
  // Editor window with angle brackets (VS Code).
  editor: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 8h19M9.5 11.5 7 14l2.5 2.5M14.5 11.5 17 14l-2.5 2.5" />
    </>
  ),
  // Model on a desk: a window with a chat bubble (LM Studio).
  studio: (
    <>
      <rect x="3" y="3.5" width="18" height="13" rx="2" />
      <path d="M8 20.5h8M12 16.5v4M8 8h8M8 11.5h5" />
    </>
  ),
  // Connected nodes (ComfyUI's node graph).
  nodes: (
    <>
      <rect x="2.5" y="4" width="7" height="5" rx="1.2" />
      <rect x="14.5" y="4" width="7" height="5" rx="1.2" />
      <rect x="8.5" y="15" width="7" height="5" rx="1.2" />
      <path d="M9.5 6.5h5M6 9v3.5a2.5 2.5 0 0 0 2.5 2.5M18 9v3.5a2.5 2.5 0 0 1-2.5 2.5" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.6 9.6 4.5 4.5 0 0 0 7 18.5z" />
    </>
  ),
  // A document (Microsoft Office).
  office: (
    <>
      <path d="M14 3H6.5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V7.5L14 3z" />
      <path d="M14 3v4.5h4.5M8.5 12h7M8.5 15.5h7M8.5 9h3" />
    </>
  ),
  // A phone (iOS).
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.5 5h3" />
    </>
  ),
  // Four panes (Windows).
  windows: (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="0.8" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="0.8" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="0.8" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="0.8" />
    </>
  ),
  // Adobe-style app tiles: a rounded square with the app's two letters.
  pr: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="4" />
      <text x="12" y="15.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui, sans-serif">
        Pr
      </text>
    </>
  ),
  ps: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="4" />
      <text x="12" y="15.6" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor" stroke="none" fontFamily="system-ui, sans-serif">
        Ps
      </text>
    </>
  ),
  // Film strip with a cut (CapCut).
  cut: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M3 15h18M7 5v4M12 5v4M17 5v4M7 15v4M12 15v4M17 15v4" />
    </>
  ),
  // Brush stroke (Adobe Creative Cloud).
  brush: (
    <>
      <path d="M14.5 4.5 19.5 9.5 11 18l-5-5 8.5-8.5z" />
      <path d="M6 13c-2 0-3 1.5-3 3.5S2 20 2 20s3.5.5 5.5-.5S9 16.5 9 16" />
    </>
  ),
}

export const Glyph = ({ name, size = 16, className }) => (
  <Svg size={size} className={className}>
    {glyphs[name]}
  </Svg>
)
