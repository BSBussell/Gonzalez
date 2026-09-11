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
        'inline-flex w-fit items-center gap-2 rounded-full bg-blue/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
