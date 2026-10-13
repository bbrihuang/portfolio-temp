// Logo: the "B" mark from public/logo.webp. Lifts slightly on hover.
// Place inside an element with the `group` class.
export default function Mark({ size = 40 }) {
  return (
    <img
      src="/logo.webp"
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full border border-white/15 object-cover shadow-[0_6px_20px_-8px_rgb(255_255_255/0.35)] transition-transform duration-500 ease-out-expo group-hover:scale-105"
      style={{ width: size, height: size }}
    />
  )
}
