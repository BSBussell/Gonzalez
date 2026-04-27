import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type BadgeProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function Badge({ children, className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-subtle border border-blue border-opacity-40 bg-blue bg-opacity-10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
