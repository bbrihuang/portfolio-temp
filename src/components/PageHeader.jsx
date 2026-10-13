// `color` is a section color from lib/theme.js; the eyebrow and title take it on.
export default function PageHeader({ index, title, count, color, children }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow rise-blur" style={{ '--i': 0, color: color?.light }}>
        {index} / {title}
      </p>
      <h1
        className="rise-blur mt-4 text-[clamp(3.25rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.05em]"
        style={{ '--i': 1 }}
      >
        <span
          className={color ? 'bg-clip-text pb-[0.08em] text-transparent' : undefined}
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
      <p className="rise-blur mt-5 max-w-xl text-[17px] leading-relaxed text-fog" style={{ '--i': 2 }}>
        {children}
      </p>
    </header>
  )
}
