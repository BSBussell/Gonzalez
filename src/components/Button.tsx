import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ForwardedRef,
} from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary'

type ButtonAsButton = {
  as?: 'button'
  variant?: Variant
} & ButtonHTMLAttributes<HTMLButtonElement>

type ButtonAsAnchor = {
  as: 'a'
  variant?: Variant
} & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const styles: Record<Variant, string> = {
  primary:
    'bg-red text-white hover:bg-red hover:bg-opacity-90 focus-visible:outline focus-visible:outline-blue',
  secondary:
    'border border-navy text-navy hover:bg-navy hover:text-white hover:bg-opacity-100 focus-visible:outline focus-visible:outline-blue',
}

const sharedStyles =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200 ease-in-out-standard focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none disabled:pointer-events-none disabled:bg-grey-150 disabled:text-grey-600 disabled:shadow-none'

function renderButton(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
) {
  const { variant = 'primary', className, as = 'button', ...rest } = props as {
    variant?: Variant
    className?: string
    as?: 'button' | 'a'
    [key: string]: unknown
  }

  const classNames = cn(sharedStyles, styles[variant], className)

  if (as === 'a') {
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        className={classNames}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    )
  }

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      className={classNames}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  )
}

export const Button = forwardRef(renderButton)
Button.displayName = 'Button'
