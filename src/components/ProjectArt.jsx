import { useId } from 'react'

// Geometric cover art for projects without a photo. Every piece is drawn on
// a 400x260 canvas and cropped to fill its box, so keep motifs inside
// x 60-340 / y 45-215. Parts tagged art-spin, art-flow and art-cell
// animate while the card is hovered (or always, under .art-live).
// Everything draws in currentColor, which is the project's `accent`.

const S = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }
const mono = { fontFamily: 'JetBrains Mono Variable, monospace', fontSize: 8, fill: 'currentColor', fillOpacity: 0.38, letterSpacing: 1 }

function Meals() {
  const C = 2 * Math.PI * 44
  const arcs = [
    [0.3, 0.9],
    [0.45, 0.5],
    [0.25, 0.24],
  ]
  let offset = 0
  return (
    <>
      <circle cx="200" cy="130" r="80" {...S} strokeOpacity="0.28" />
      <circle cx="200" cy="130" r="66" {...S} strokeOpacity="0.12" />
      <g className="art-spin" style={{ '--turn': '140deg' }}>
        <g transform="rotate(-90 200 130)">
          {arcs.map(([share, o], i) => {
            const len = share * C - 4
            const el = (
              <circle
                key={i}
                cx="200"
                cy="130"
                r="44"
                {...S}
                strokeLinecap="butt"
                strokeWidth="14"
                strokeOpacity={o}
                strokeDasharray={`${len} ${C}`}
                strokeDashoffset={-offset}
              />
            )
            offset += share * C
            return el
          })}
        </g>
      </g>
      <circle cx="200" cy="130" r="3" fill="currentColor" fillOpacity="0.6" />
      {/* fork */}
      <path d="M92 72v26a6 6 0 0 0 12 0V72M98 72v26M98 104v86" {...S} strokeOpacity="0.55" strokeWidth="2" />
      {/* knife */}
      <path d="M306 72c10 12 10 40 0 52v66" {...S} strokeOpacity="0.55" strokeWidth="2" />
      <text x="232" y="214" {...mono}>P 30 · C 45 · F 25</text>
      <text x="120" y="54" {...mono}>WARREN · LUNCH</text>
    </>
  )
}

function Nozzle() {
  const upper = 'M58 86H128C150 86 160 114 182 114C216 114 252 94 292 80'
  const lower = 'M58 174H128C150 174 160 146 182 146C216 146 252 166 292 180'
  const flows = [
    'M66 108H128C150 108 162 122 182 122C216 122 252 112 292 104L368 92',
    'M66 152H128C150 152 162 138 182 138C216 138 252 148 292 156L368 168',
    'M66 130H372',
  ]
  const diamonds = [
    [306, 22, 18],
    [334, 20, 14],
    [358, 16, 10],
  ]
  return (
    <>
      <path d="M40 130H380" {...S} strokeOpacity="0.14" strokeDasharray="4 5" />
      <path d={upper} {...S} strokeOpacity="0.9" strokeWidth="2.2" />
      <path d={lower} {...S} strokeOpacity="0.9" strokeWidth="2.2" />
      <path d="M58 78H128C152 78 162 106 182 106C216 106 254 86 296 71" {...S} strokeOpacity="0.25" />
      <path d="M58 182H128C152 182 162 154 182 154C216 154 254 174 296 189" {...S} strokeOpacity="0.25" />
      {flows.map((d) => (
        <path key={d} d={d} {...S} className="art-flow" strokeOpacity="0.5" strokeWidth="1.4" />
      ))}
      {diamonds.map(([x, w, h], i) => (
        <polygon
          key={x}
          points={`${x - w / 2},130 ${x},${130 - h} ${x + w / 2},130 ${x},${130 + h}`}
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeOpacity="0.45"
          className="art-cell"
          style={{ '--o': 0.5, '--d': i * 4 }}
        />
      ))}
      <path d="M182 152V204M128 186V204M292 186V204" {...S} strokeOpacity="0.2" />
      <text x="100" y="216" {...mono}>CHAMBER</text>
      <text x="166" y="216" {...mono}>THROAT</text>
      <text x="278" y="216" {...mono}>EXIT</text>
    </>
  )
}

function Hexapod() {
  const cx = 200
  const cy = 130
  const pt = (r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]
  const angles = [0, 60, 120, 180, 240, 300]
  const body = angles.map((a) => pt(34, a).join(',')).join(' ')
  return (
    <>
      <circle cx={cx} cy={cy} r="112" {...S} strokeOpacity="0.12" strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r="80" {...S} strokeOpacity="0.08" />
      <g className="art-spin" style={{ '--turn': '300deg' }}>
        <path d={`M${cx} ${cy}L${pt(112, -40).join(' ')}A112 112 0 0 1 ${pt(112, -8).join(' ')}Z`} fill="currentColor" fillOpacity="0.07" />
        <path d={`M${cx} ${cy}L${pt(112, -8).join(' ')}`} {...S} strokeOpacity="0.4" />
      </g>
      {[-30, 30, 90, 150, 210, 270].map((a) => {
        const hip = pt(34, a)
        const knee = pt(62, a + 10)
        const foot = pt(92, a - 4)
        return (
          <g key={a}>
            <path d={`M${hip.join(' ')}L${knee.join(' ')}L${foot.join(' ')}`} {...S} strokeOpacity="0.75" strokeWidth="2" />
            <circle cx={knee[0]} cy={knee[1]} r="3.2" fill="#141416" stroke="currentColor" strokeOpacity="0.75" />
            <circle cx={foot[0]} cy={foot[1]} r="2.6" fill="currentColor" fillOpacity="0.8" />
          </g>
        )
      })}
      <polygon points={body} fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.9" strokeWidth="2" />
      <polygon points={angles.map((a) => pt(18, a).join(',')).join(' ')} {...S} strokeOpacity="0.35" />
      <rect x={cx + 26} y={cy - 6} width="10" height="12" rx="2" fill="currentColor" fillOpacity="0.85" />
      <text x="60" y="56" {...mono}>18 DOF · LIDAR · IMU</text>
    </>
  )
}

function Attention() {
  const n = 10
  const cell = 14
  const gap = 3
  const size = n * (cell + gap) - gap
  const x0 = 200 - size / 2
  const y0 = 134 - size / 2
  const cells = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const x = x0 + j * (cell + gap)
      const y = y0 + i * (cell + gap)
      if (j > i) {
        cells.push(<rect key={`${i}-${j}`} x={x} y={y} width={cell} height={cell} rx="2" {...S} strokeOpacity="0.07" />)
      } else {
        const hash = ((i * 7 + j * 13) % 10) / 10
        const o = +(0.1 + 0.7 * Math.exp(-(i - j) / 2.6) * (0.55 + 0.45 * hash)).toFixed(2)
        cells.push(
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width={cell}
            height={cell}
            rx="2"
            fill="currentColor"
            fillOpacity={o}
            className="art-cell"
            style={{ '--o': o, '--d': i + j }}
          />,
        )
      }
    }
  }
  return (
    <>
      {cells}
      <text x={x0} y={y0 - 10} {...mono}>KEYS →</text>
      <text x={x0 - 12} y={y0} {...mono} transform={`rotate(90 ${x0 - 12} ${y0})`}>
        QUERIES →
      </text>
      <path d={`M${x0 + size + 22} ${y0 + size}V${y0 + 30}`} {...S} strokeOpacity="0.5" strokeWidth="6" />
      <path d={`M${x0 + size + 36} ${y0 + size}V${y0 + size - 30}`} {...S} strokeOpacity="0.25" strokeWidth="6" />
      <text x={x0 + size + 14} y={y0 + size + 16} {...mono}>PF  DC</text>
    </>
  )
}

function Cube() {
  const s = 64
  const cx = 200
  const cy = 134
  const dx = s * Math.cos(Math.PI / 6)
  const top = [cx, cy - s]
  const left = [cx - dx, cy - s / 2]
  const right = [cx + dx, cy - s / 2]
  const mid = [cx, cy]
  const bl = [cx - dx, cy + s / 2]
  const br = [cx + dx, cy + s / 2]
  const bottom = [cx, cy + s]
  const p = (...pts) => pts.map((q) => q.join(',')).join(' ')
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  // 3x3 grid lines on a face spanned by corner o and edges toward u and v.
  const grid = (o, u, v) =>
    [1 / 3, 2 / 3].flatMap((t) => [
      `M${lerp(o, u, t).join(' ')}L${lerp(v, [u[0] + v[0] - o[0], u[1] + v[1] - o[1]], t).join(' ')}`,
      `M${lerp(o, v, t).join(' ')}L${lerp(u, [u[0] + v[0] - o[0], u[1] + v[1] - o[1]], t).join(' ')}`,
    ])
  return (
    <>
      <polygon
        points={[0, 60, 120, 180, 240, 300].map((a) => [cx + 104 * Math.cos(((a + 30) * Math.PI) / 180), cy + 104 * Math.sin(((a + 30) * Math.PI) / 180)].join(',')).join(' ')}
        {...S}
        strokeOpacity="0.12"
        strokeDasharray="3 6"
      />
      <g className="art-spin" style={{ '--turn': '120deg' }}>
        <polygon points={p(top, right, mid, left)} fill="currentColor" fillOpacity="0.24" />
        <polygon points={p(left, mid, bottom, bl)} fill="currentColor" fillOpacity="0.1" />
        <polygon points={p(mid, right, br, bottom)} fill="currentColor" fillOpacity="0.04" />
        {[...grid(left, top, mid), ...grid(mid, left, bottom), ...grid(mid, right, bottom)].map((d) => (
          <path key={d} d={d} {...S} strokeOpacity="0.28" />
        ))}
        <polygon points={p(top, right, br, bottom, bl, left)} {...S} strokeOpacity="0.85" strokeWidth="2" />
        <path d={`M${left.join(' ')}L${mid.join(' ')}L${right.join(' ')}M${mid.join(' ')}V${bottom[1]}`} {...S} strokeOpacity="0.85" strokeWidth="2" />
      </g>
      {[
        [82, 70],
        [312, 196],
        [318, 62],
      ].map(([x, y]) => (
        <rect key={x} x={x} y={y} width="10" height="10" {...S} strokeOpacity="0.35" transform={`rotate(45 ${x + 5} ${y + 5})`} />
      ))}
    </>
  )
}

function Board() {
  const pins = []
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) pins.push([172 + j * 10, 102 + i * 10])
  const traces = [
    'M164 108H120L104 92H70',
    'M164 124H112L96 140H62',
    'M164 140H124L108 156V196',
    'M186 94V70L170 54H112',
    'M206 94V62L222 46H262',
    'M236 112H258L268 102',
    'M236 134H260',
    'M236 152H258L268 162',
    'M214 166V188L228 202H300',
  ]
  return (
    <>
      {traces.map((d) => (
        <path key={d} d={d} {...S} strokeOpacity="0.22" strokeWidth="1.6" />
      ))}
      {traces.map((d) => (
        <path key={`f${d}`} d={d} {...S} className="art-flow" strokeOpacity="0.7" strokeWidth="1.6" />
      ))}
      {[
        [70, 92],
        [62, 140],
        [108, 196],
        [112, 54],
        [262, 46],
        [300, 202],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill="#141416" stroke="currentColor" strokeOpacity="0.6" />
      ))}
      <rect x="164" y="94" width="72" height="72" rx="3" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.8" strokeWidth="2" />
      {pins.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x + 3} cy={y + 3} r="1.4" fill="currentColor" fillOpacity="0.4" />
      ))}
      {[272, 286, 300, 314].map((x, i) => (
        <rect key={x} x={x} y="62" width="8" height="140" rx="1.5" fill="currentColor" fillOpacity={i % 2 ? 0.04 : 0.1} stroke="currentColor" strokeOpacity="0.45" />
      ))}
      <rect x="84" y="212" width="170" height="8" rx="1.5" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.4" />
      <text x="174" y="182" {...mono}>CPU</text>
    </>
  )
}

// Three overlapping browser windows, one per client site; the front one lifts on hover.
function Sites() {
  const windows = [
    [92, 58, 0.12, 'CAFE'],
    [146, 82, 0.2, 'TAX'],
    [200, 106, 0.32, 'TRUCK'],
  ]
  return (
    <>
      {windows.map(([x, y, o, label], i) => (
        <g key={label} className={i === 2 ? 'art-spin' : undefined} style={i === 2 ? { '--turn': '-4deg' } : undefined}>
          <rect x={x} y={y} width="128" height="92" rx="6" fill="#141416" stroke="currentColor" strokeOpacity={o + 0.4} strokeWidth="1.6" />
          <path d={`M${x} ${y + 16}H${x + 128}`} {...S} strokeOpacity={o + 0.2} />
          {[8, 16, 24].map((d) => (
            <circle key={d} cx={x + d} cy={y + 8} r="2" fill="currentColor" fillOpacity={o + 0.3} />
          ))}
          <rect x={x + 12} y={y + 28} width="58" height="8" rx="2" fill="currentColor" fillOpacity={o + 0.2} />
          <path d={`M${x + 12} ${y + 46}H${x + 104}M${x + 12} ${y + 56}H${x + 88}`} {...S} strokeOpacity={o + 0.1} className="art-flow" />
          <rect x={x + 12} y={y + 68} width="34" height="12" rx="6" {...S} strokeOpacity={o + 0.4} />
        </g>
      ))}
    </>
  )
}

const motifs = { meals: Meals, nozzle: Nozzle, hexapod: Hexapod, attention: Attention, cube: Cube, board: Board, sites: Sites }

export default function ProjectArt({ project, live = false, className = '' }) {
  const id = useId().replace(/:/g, '')
  if (project.image) {
    return <img src={project.image} alt="" className={`size-full object-cover ${className}`} loading="lazy" />
  }
  const Motif = motifs[project.art] ?? Cube
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className={`size-full ${live ? 'art-live' : ''} ${className}`}
      style={{ color: project.accent ?? '#fff' }}
      aria-hidden
    >
      <defs>
        <pattern id={`${id}g`} width="20" height="20" patternUnits="userSpaceOnUse" x="10" y="10">
          <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity="0.045" />
        </pattern>
        <radialGradient id={`${id}r`} cx="50%" cy="50%" r="65%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#141416" />
      <rect width="400" height="260" fill={`url(#${id}g)`} />
      <rect width="400" height="260" fill={`url(#${id}r)`} />
      <Motif />
    </svg>
  )
}
