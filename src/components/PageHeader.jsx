// `color` is a section color from lib/theme.js; the eyebrow and title take it on.
// `aside` sits to the right of the title (e.g. an "Open to internships" badge).
export default function PageHeader({ index, title, count, color, aside, children }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow rise-blur" style={{ '--i': 0, color: color?.light }}>
        {index} / {title}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <h1
          className="rise-blur text-[clamp(3.25rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.05em]"
          style={{ '--i': 1 }}
        >
          <span
            className={color ? 'text-gradient' : undefined}
            style={color ? { backgroundImage: `linear-gradient(90deg, ${color.light}, ${color.base})` } : undefined}
          >
            {title}
          </span>
          {count != null && (
            <sup className="ml-2 align-super font-mono text-base font-normal tracking-normal text-steel sm:text-lg">
              ({String(count).padStart(2, '0')})
            </sup>
          )}
        </h1>
        {aside && (
          <div className="rise" style={{ '--i': 2 }}>
            {aside}
          </div>
        )}
      </div>
      <p className="rise-blur mt-5 max-w-xl text-[17px] leading-relaxed text-fog" style={{ '--i': 2 }}>
        {children}
      </p>
    </header>
  )
}
