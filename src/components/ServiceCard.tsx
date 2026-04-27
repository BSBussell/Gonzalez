import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react'
import type { Service } from '../data/services'
import { cn } from '../lib/cn'

type BaseProps = {
  service: Service
  isOpen?: boolean
  className?: string
}

type ServiceCardButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type ServiceCardDiv = BaseProps &
  HTMLAttributes<HTMLDivElement> & {
    as: 'div'
  }

type ServiceCardAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
  }

type ServiceCardProps = ServiceCardButton | ServiceCardDiv | ServiceCardAnchor

const iconProps = {
  width: 36,
  height: 36,
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  ariaHidden: true,
  focusable: 'false',
} as const

const iconStroke = 'var(--color-blue)'
const iconFill = 'var(--color-blue)'

const strokeProps = {
  stroke: iconStroke,
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const iconMap: Record<Service['id'], ReactElement> = {
  commercial: (
    <svg {...iconProps}>
      <rect x="8" y="14" width="32" height="20" rx="4" {...strokeProps} />
      <path
        d="M18 14V10.5C18 8.567 19.567 7 21.5 7H26.5C28.433 7 30 8.567 30 10.5V14"
        {...strokeProps}
      />
      <path d="M14 22H34" {...strokeProps} />
      <path d="M14 28H34" {...strokeProps} />
      <path d="M23 34V26H25V34" {...strokeProps} />
      <circle cx="12.5" cy="30" r="2" fill={iconFill} />
      <circle cx="35.5" cy="30" r="2" fill={iconFill} />
    </svg>
  ),
  residential: (
    <svg {...iconProps}>
      <path
        d="M9 23L24 11L39 23V37C39 38.105 38.105 39 37 39H11C9.895 39 9 38.105 9 37V23Z"
        {...strokeProps}
      />
      <path d="M12 24H36" {...strokeProps} />
      <path d="M31 20V15" {...strokeProps} />
      <path
        d="M19 39V31.5C19 29.567 20.567 28 22.5 28H25.5C27.433 28 29 29.567 29 31.5V39"
        {...strokeProps}
      />
      <circle cx="34" cy="18" r="2" fill={iconFill} />
    </svg>
  ),
  repairs: (
    <svg {...iconProps}>
      <circle cx="24" cy="20" r="9" {...strokeProps} />
      <path d="M24 11V8" {...strokeProps} />
      <path d="M15 20H12" {...strokeProps} />
      <path d="M36 20H33" {...strokeProps} />
      <path d="M24 29V32" {...strokeProps} />
      <path d="M18 26L24 20" {...strokeProps} />
      <circle cx="24" cy="20" r="2.2" fill={iconFill} />
      <path d="M14 34L22 42" {...strokeProps} />
      <path d="M34 34L28 28" {...strokeProps} />
    </svg>
  ),
  'gas-lines': (
    <svg {...iconProps}>
      <path d="M10 16H22L28 22H40" {...strokeProps} />
      <path d="M10 28H28L32 24H40" {...strokeProps} />
      <path d="M12 36H20" {...strokeProps} />
      <path d="M32 14L37 9" {...strokeProps} />
      <circle cx="34" cy="28" r="4.5" fill="none" {...strokeProps} />
      <path d="M34 23.5V32.5" {...strokeProps} />
      <path d="M29.5 28H38.5" {...strokeProps} />
    </svg>
  ),
  'line-runs': (
    <svg {...iconProps}>
      <path d="M8 18H18L28 32H40" {...strokeProps} />
      <path d="M8 30H20L24 26H30L34 34H40" {...strokeProps} />
      <circle cx="16" cy="18" r="2.4" fill={iconFill} />
      <circle cx="36" cy="30" r="2.4" fill={iconFill} />
      <path d="M12 36H24" {...strokeProps} strokeDasharray="3.5 3.5" />
    </svg>
  ),
}

function renderServiceCard(
  props: ServiceCardProps,
  ref: ForwardedRef<
    HTMLButtonElement | HTMLDivElement | HTMLAnchorElement | undefined
  >,
) {
  const typedProps = props as ServiceCardProps & {
    as?: 'button' | 'div' | 'a'
  }
  const { service, isOpen = false, className, as = 'button', ...rest } =
    typedProps

  const wrapperClasses = cn(
    'w-full rounded-subtle border border-grey-150 bg-white px-5 py-4 text-left transition-shadow duration-200 ease-in-out-standard motion-reduce:transition-none',
    isOpen ? 'shadow-subtle' : 'hover:shadow-subtle',
    className,
  )

  const content = (
    <span className="flex w-full items-start gap-4">
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue bg-opacity-10">
        {iconMap[service.id]}
      </span>
      <span className="flex-1">
        <span className="block text-lg font-semibold uppercase tracking-wide text-navy">
          {service.title}
        </span>
        <span className="mt-1 block text-sm text-grey-600">
          {service.summary}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white border-opacity-30 bg-red text-base font-semibold leading-none text-white transition-transform duration-200 ease-in-out-standard motion-reduce:transition-none',
          isOpen ? 'rotate-45' : 'rotate-0',
        )}
      >
        +
      </span>
    </span>
  )

  if (as === 'div') {
    return (
      <div
        ref={ref as ForwardedRef<HTMLDivElement>}
        className={wrapperClasses}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    )
  }

  if (as === 'a') {
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        className={cn(wrapperClasses, 'no-underline')}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      className={cn(wrapperClasses, 'inline-flex')}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}

export const ServiceCard = forwardRef(renderServiceCard)
ServiceCard.displayName = 'ServiceCard'
