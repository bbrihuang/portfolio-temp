// Logo: a square frame with a circle that rolls into the corner on hover.
// Place inside an element with the `group` class.
export default function Mark({ size = 40 }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-snow text-void transition-transform duration-500 ease-out-expo group-hover:rotate-90"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" width={size * 0.55} height={size * 0.55} aria-hidden>
        <rect x="4" y="4" width="24" height="24" rx="2.5" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="20" cy="12" r="5" fill="currentColor" />
      </svg>
    </span>
  )
}
