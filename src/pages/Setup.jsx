import Gallery from '../components/Gallery.jsx'
import {
  ArrowUpRight,
  Board,
  Cloud,
  Code,
  Cpu,
  Earbuds,
  Fan,
  Gamepad,
  GraphicsCard,
  HardDrive,
  Laptop,
  Memory,
  Phone,
  Plug,
  Server,
  Tower,
} from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { setup } from '../data/setup.js'
import { usePageMeta } from '../lib/hooks.js'
import { sectionColors } from '../lib/theme.js'

const orange = sectionColors['/setup']

const icons = {
  cpu: Cpu,
  fan: Fan,
  board: Board,
  cloud: Cloud,
  memory: Memory,
  drive: HardDrive,
  gpu: GraphicsCard,
  tower: Tower,
  plug: Plug,
  laptop: Laptop,
  phone: Phone,
  earbuds: Earbuds,
  gamepad: Gamepad,
  code: Code,
  server: Server,
}

function Icon({ name, size = 18 }) {
  const C = icons[name] ?? Cpu
  return <C size={size} />
}

function IconTile({ name, size = 'size-9' }) {
  return (
    <span
      className={`grid ${size} shrink-0 place-items-center rounded-xl`}
      style={{ color: orange.light, background: `${orange.base}1f` }}
    >
      <Icon name={name} />
    </span>
  )
}

function SectionHead({ index, title, note }) {
  return (
    <div>
      <p className="eyebrow" style={{ color: orange.light }}>
        {index} / {title}
      </p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {note && <p className="font-mono text-xs text-fog">{note}</p>}
      </div>
    </div>
  )
}

function DailyDrivers() {
  return (
    <section className="mt-16" aria-label="Daily Drivers">
      <SectionHead index="01" title="Daily Drivers" />
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {setup.daily.map((d, i) => (
          <li key={d.name} className="glass rise flex flex-col rounded-3xl p-5" style={{ '--i': 3 + i }}>
            <div className="flex items-center gap-3">
              <IconTile name={d.icon} />
              <span className="eyebrow">{d.kind}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">{d.name}</h3>
            {d.spec && <p className="mt-1 font-mono text-xs leading-relaxed text-fog">{d.spec}</p>}
            {d.why && <p className="mt-3 text-[15px] leading-relaxed text-mist">{d.why}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

// Stands in for the PC photo until one is set in data/setup.js: a line drawing
// of a Mini-ITX tower (glass side, GPU, tower cooler, fans).
function PcPlaceholder() {
  const s = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <div className="relative grid size-full place-items-center" style={{ color: orange.light }}>
      <svg viewBox="0 0 200 260" className="h-[78%] w-auto" aria-hidden>
        <rect x="30" y="14" width="140" height="226" rx="8" {...s} strokeWidth="2.2" strokeOpacity="0.85" />
        <rect x="42" y="26" width="116" height="202" rx="4" {...s} strokeOpacity="0.35" />
        {/* Motherboard */}
        <rect x="58" y="44" width="86" height="86" rx="3" {...s} strokeOpacity="0.4" />
        {/* Tower cooler */}
        <rect x="80" y="58" width="34" height="46" rx="3" {...s} strokeOpacity="0.8" />
        {[66, 74, 82, 90, 98].map((y) => (
          <path key={y} d={`M84 ${y}h26`} {...s} strokeOpacity="0.35" />
        ))}
        {/* Memory */}
        <path d="M124 52v40M130 52v40" {...s} strokeOpacity="0.7" strokeWidth="2.5" />
        {/* GPU */}
        <rect x="50" y="146" width="100" height="30" rx="3" {...s} strokeOpacity="0.85" />
        <circle cx="76" cy="161" r="10" {...s} strokeOpacity="0.6" />
        <circle cx="124" cy="161" r="10" {...s} strokeOpacity="0.6" />
        {/* PSU shroud */}
        <path d="M42 196h116" {...s} strokeOpacity="0.4" />
      </svg>
      <p className="absolute bottom-4 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">Photo coming soon</p>
    </div>
  )
}

function ThePC() {
  const { photo, pcpartpicker, parts, uses } = setup.pc
  return (
    <section className="mt-20" aria-label="The PC / Homelab">
      <SectionHead index="02" title="The PC / Homelab" note="gaming rig and homelab in one" />

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="glass rise overflow-hidden rounded-3xl p-1.5 lg:col-span-5" style={{ '--i': 3 }}>
          <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-coal/60 lg:aspect-auto lg:h-full">
            {photo ? (
              <img src={photo} alt="My PC" className="size-full object-cover" />
            ) : (
              <PcPlaceholder />
            )}
          </div>
        </div>

        <div className="glass rise flex flex-col rounded-3xl p-5 sm:p-6 lg:col-span-7" style={{ '--i': 4 }}>
          <h3 className="text-xl font-semibold tracking-tight">Parts list</h3>
          <ul className="mt-3 divide-y divide-white/[0.07]">
            {parts.map((p) => (
              <li key={p.kind + p.name} className="flex items-center gap-4 py-3">
                <IconTile name={p.icon} />
                <div className="min-w-0 flex-1">
                  <p className="eyebrow text-[10px]">{p.kind}</p>
                  <p className="text-[15px] font-medium leading-snug text-snow">{p.name}</p>
                  {p.spec && <p className="mt-0.5 font-mono text-[11px] text-fog sm:hidden">{p.spec}</p>}
                </div>
                {p.spec && (
                  <p className="hidden max-w-[40%] text-right font-mono text-[11px] leading-relaxed text-fog sm:block">
                    {p.spec}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {pcpartpicker && (
            <a
              href={pcpartpicker}
              target="_blank"
              rel="noreferrer"
              className="btn group mt-5 w-full text-white"
              style={{ background: orange.base }}
            >
              Full build on PCPartPicker
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      <ul className="mt-4 grid gap-4 md:grid-cols-3">
        {uses.map((u, i) => (
          <li key={u.title} className="glass rise rounded-3xl p-5" style={{ '--i': 5 + i }}>
            <div className="flex items-center gap-3">
              <IconTile name={u.icon} />
              <h3 className="text-lg font-semibold tracking-tight">{u.title}</h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-mist">{u.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

// The reasoning behind the build: an intro, reason cards, then honest trade-offs.
function WhySetup() {
  const { intro, reasons, tradeoffs } = setup.why
  return (
    <section className="mt-20" aria-label="Why This Setup">
      <SectionHead index="03" title="Why This Setup" />
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-mist">{intro}</p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <li key={r.title} className="glass rise rounded-3xl p-5" style={{ '--i': 3 + i }}>
            <span className="font-mono text-xs" style={{ color: orange.light }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">{r.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fog">{r.text}</p>
          </li>
        ))}
      </ol>
      {tradeoffs?.length > 0 && (
        <div className="glass rise mt-4 rounded-3xl p-5 sm:p-6" style={{ '--i': 3 + reasons.length }}>
          <h3 className="text-lg font-semibold tracking-tight">The trade-offs</h3>
          <ul className="mt-3 space-y-2.5">
            {tradeoffs.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-mist">
                <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rotate-45" style={{ background: orange.base }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

// What I deliberately don't self-host, and what I use instead.
function WhyNot() {
  return (
    <section className="mt-20" aria-label="Why Not">
      <SectionHead index="04" title="Why Not" note="what I don’t self-host" />
      <div className="mt-6 grid gap-4">
        {setup.whyNot.map((w, i) => (
          <article key={w.question} className="glass rise grid gap-5 rounded-3xl p-5 sm:p-6 md:grid-cols-12" style={{ '--i': 3 + i }}>
            <div className="md:col-span-4">
              <IconTile name={w.icon} size="size-11" />
              <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight">{w.question}</h3>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm" style={{ borderColor: `${orange.base}55`, background: `${orange.base}14`, color: orange.light }}>
                <span className="text-fog">Instead:</span> {w.instead}
              </p>
            </div>
            <div className="space-y-3 md:col-span-8">
              {w.text.map((t) => (
                <p key={t} className="text-[15px] leading-relaxed text-mist">
                  {t}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// The stack, top (what I touch) to bottom (the hardware), as connected boxes.
function Diagram({ layers }) {
  const box = (l, key) => (
    <div
      key={key}
      className={`flex-1 rounded-2xl border px-4 py-3 text-center ${
        l.hardware ? '' : 'border-white/[0.09] bg-white/[0.04]'
      }`}
      style={l.hardware ? { borderColor: `${orange.base}66`, background: `${orange.base}14` } : undefined}
    >
      <p className="text-[15px] font-semibold tracking-tight" style={l.hardware ? { color: orange.light } : undefined}>
        {l.title}
      </p>
      <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-fog">{l.detail}</p>
    </div>
  )
  return (
    <div className="glass rise rounded-3xl p-4 sm:p-6" style={{ '--i': 3 }}>
      {layers.map((l, i) => (
        <div key={i}>
          {i > 0 && (
            <div className="flex h-7 items-center justify-center gap-2">
              <span className="h-full w-px bg-white/15" />
              {layers[i - 1].note && <span className="font-mono text-[10px] uppercase tracking-wider text-steel">{layers[i - 1].note}</span>}
            </div>
          )}
          {l.split ? <div className="flex flex-col gap-3 sm:flex-row">{l.split.map((s, k) => box(s, k))}</div> : box(l, i)}
        </div>
      ))}
    </div>
  )
}

function Software() {
  const { layers, groups } = setup.software
  return (
    <section className="mt-20" aria-label="Software & Architecture">
      <SectionHead index="05" title="Software & Architecture" />
      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Diagram layers={layers} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {groups.map((g, i) => (
            <div key={g.title} className="glass rise rounded-3xl p-5" style={{ '--i': 4 + i }}>
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{g.title}</h3>
                {g.note && <span className="font-mono text-[11px] text-fog">{g.note}</span>}
              </div>
              <ul className="mt-3 space-y-3">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <p className="text-[15px] font-medium" style={{ color: orange.light }}>
                      {it.name}
                    </p>
                    <p className="text-sm leading-relaxed text-fog">{it.why}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Setup() {
  usePageMeta('Setup', 'The devices Brian Huang uses daily, and the custom PC that’s both his gaming rig and homelab.')
  return (
    <>
      <PageHeader index="04" title="Setup" color={orange}>
        {setup.intro}
      </PageHeader>
      <DailyDrivers />
      <ThePC />
      <WhySetup />
      <WhyNot />
      <Software />
      <Gallery items={setup.gallery} />
    </>
  )
}
