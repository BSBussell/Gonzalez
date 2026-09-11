import { IconStar, type IconProps } from '@tabler/icons-react'

type StarburstIconProps = IconProps

export function StarburstIcon({
  className,
  stroke = 1.75,
  'aria-hidden': ariaHidden = true,
  ...rest
}: StarburstIconProps) {
  return (
    <IconStar
      className={className}
      stroke={stroke}
      color="currentColor"
      focusable="false"
      aria-hidden={ariaHidden}
      {...rest}
    />
  )
}
