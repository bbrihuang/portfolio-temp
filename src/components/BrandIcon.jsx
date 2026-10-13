// Renders a simple-icons mark in the current text color. Pass `style={{ color }}`
// (see lib/color.js) to show it in its brand color.
export default function BrandIcon({ icon, size = 16, className, style, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={icon.path} />
    </svg>
  )
}
