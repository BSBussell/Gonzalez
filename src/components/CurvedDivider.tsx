import { cn } from '../lib/cn'

type CurvedDividerProps = {
  className?: string
}

const LINE_STYLES = [
  { className: 'h-px w-full  opacity-35' },
  { className: 'h-1 w-full opacity-70' },
  { className: 'h-px w-full opacity-35' },
] as const

export function CurvedDivider({ className }: CurvedDividerProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 px-4 text-surface',
        className,
      )}
      aria-hidden="true"
    >
      {LINE_STYLES.map(({ className: lineClass }, index) => (
        <span
          key={index}
          className={cn('block rounded-full', lineClass)}
          style={{ backgroundColor: 'currentColor' }}
        />
      ))}
    </div>
  )
}
