import { useState } from 'react'
import { SERVICES } from '../data/services'
import { Badge } from './Badge'
import { ServiceAccordion } from './ServiceAccordion'
import { StarburstIcon } from './icons/StarburstIcon'

export function ServicesGrid() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-grey-100 py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-content flex-col gap-10 px-4 sm:px-6">
        <div className="max-w-3xl">
          <Badge
            icon={<StarburstIcon className="h-4 w-4 text-blue" accentColor="var(--color-red)" />}
          >
            Trusted Coverage
          </Badge>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-extrabold uppercase tracking-wide text-navy sm:text-4xl"
          >
            Comprehensive HVAC Services
          </h2>
          <p className="mt-3 text-base text-grey-800 sm:text-lg">
            Every job starts with a clear plan, precise workmanship, and honest
            communication. Explore the Gonzalez lineup to see how we keep your
            systems efficient in every season.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const isOpen = activeService === service.id
            return (
              <ServiceAccordion
                key={service.id}
                service={service}
                isOpen={isOpen}
                onToggle={() =>
                  setActiveService((prev) =>
                    prev === service.id ? null : service.id,
                  )
                }
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
