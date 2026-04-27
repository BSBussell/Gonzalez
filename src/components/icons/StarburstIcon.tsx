import type { SVGProps } from 'react'

type StarburstIconProps = SVGProps<SVGSVGElement> & {
  accentColor?: string
}

export function StarburstIcon({
  accentColor = 'var(--color-red)',
  className,
  'aria-hidden': ariaHidden = true,
  ...rest
}: StarburstIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      focusable="false"
      aria-hidden={ariaHidden}
      className={className}
      {...rest}
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
      <path
        d="M16 4.75L19.22 11.75L26.92 12.9L21.31 17.96L22.64 25.6L16 21.88L9.36 25.6L10.69 17.96L5.08 12.9L12.78 11.75L16 4.75Z"
        fill="var(--color-white)"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M16 8.4L18.48 13.48L24 14.24L19.9 18.06L20.88 23.52L16 20.82L11.12 23.52L12.1 18.06L8 14.24L13.52 13.48L16 8.4Z"
        fill={accentColor}
      />
      <circle cx="23.5" cy="8" r="1.4" fill={accentColor} />
      <circle cx="8" cy="19.5" r="1" fill="var(--color-white)" opacity="0.65" />
    </svg>
  )
}
