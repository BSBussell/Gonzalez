import { useId } from 'react'
import type { Service } from '../data/services'
import { cn } from '../lib/cn'
import { Button } from './Button'
import { ServiceCard } from './ServiceCard'

type ServiceAccordionProps = {
  service: Service
  isOpen: boolean
  onToggle: () => void
}

export function ServiceAccordion({
  service,
  isOpen,
  onToggle,
}: ServiceAccordionProps) {
  const baseId = useId()
  const panelId = `${service.id}-panel-${baseId}`
  const triggerId = `${service.id}-trigger-${baseId}`

  return (
    <article className="w-full">
      <ServiceCard
        as="button"
        type="button"
        id={triggerId}
        aria-controls={panelId}
        aria-expanded={isOpen}
        service={service}
        isOpen={isOpen}
        onClick={onToggle}
        className="w-full"
      />
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-in-out-standard motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0',
        )}
      >
        <div className="overflow-hidden rounded-subtle border border-grey-150 bg-white px-6 py-5 text-sm leading-relaxed text-grey-800 shadow-subtle">
          <ul className="flex list-disc flex-col gap-2 pl-4 text-grey-800">
            {service.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          {service.disclaimer && (
            <p className="mt-4 text-xs uppercase tracking-wide text-grey-600">
              {service.disclaimer}
            </p>
          )}
          <div className="mt-5">
            <Button
              as="a"
              href="#contact"
              className="px-4 py-2 text-xs"
              aria-label={`Request a quote for ${service.title}`}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
