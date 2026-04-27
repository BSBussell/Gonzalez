import { cn } from '../lib/cn'

type StripeColor = 'red' | 'navy' | 'blue' | 'white'

type StripeSeparatorProps = {
  className?: string
  colors?: StripeColor[]
  direction?: 'forward' | 'reverse'
}

const COLOR_MAP: Record<StripeColor, string> = {
  red: 'var(--color-red)',
  navy: 'var(--color-navy)',
  blue: 'var(--color-blue)',
  white: 'var(--color-white)',
}

const STRIPE_HEIGHTS = [6, 4, 3] as const

export function StripeSeparator({
  className,
  colors = ['navy', 'red', 'white'],
  direction = 'forward',
}: StripeSeparatorProps) {
  const effectiveColors = colors.slice(0, 3) as StripeColor[]

  return (
    <div className={cn('w-full', className)} aria-hidden="true">
      <div
        className={cn(
          'mx-auto flex max-w-6xl flex-col gap-1 px-4',
          direction === 'reverse' ? 'flex-col-reverse' : 'flex-col',
        )}
      >
        {effectiveColors.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className="block w-full rounded-full"
            style={{
              height: STRIPE_HEIGHTS[index] ?? STRIPE_HEIGHTS[STRIPE_HEIGHTS.length - 1],
              backgroundColor: COLOR_MAP[color],
            }}
          />
        ))}
      </div>
    </div>
  )
}
