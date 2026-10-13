// Logo: the "B" mark from public/logo.webp. Lifts slightly on hover.
// Slightly smaller on phones so the whole nav fits. Place inside an element
// with the `group` class.
export default function Mark() {
  return (
    <img
      src="/logo.webp"
      alt=""
      width="40"
      height="40"
      className="size-9 shrink-0 rounded-full border border-white/15 object-cover shadow-[0_6px_20px_-8px_rgb(255_255_255/0.35)] transition-transform duration-500 ease-out-expo group-hover:scale-105 sm:size-10"
    />
  )
}
