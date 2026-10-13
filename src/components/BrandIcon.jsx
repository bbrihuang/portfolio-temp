// Renders a simple-icons mark in the current text color, keeping the whole
// site monochrome.
export default function BrandIcon({ icon, size = 16, className, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={icon.path} />
    </svg>
  )
}
