import heroImage from '../assets/heroImage.jpg'
import { Badge } from './Badge'
import { Button } from './Button'
import { CurvedDivider } from './CurvedDivider'
import { cn } from '../lib/cn'
import { StarburstIcon } from './icons/StarburstIcon'

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-surface"
    >
      <CurvedDivider className="-mt-14 text-surface" />
      <div className="relative mx-auto flex max-w-content flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:pb-24 lg:pt-12">
        <div className="relative flex flex-1 flex-col gap-6">
          <Badge
            icon={<StarburstIcon className="h-4 w-4 text-blue" accentColor="var(--color-red)" />}
          >
            Family Owned
          </Badge>
          <h1
            id="hero-heading"
            className="text-3xl font-extrabold uppercase tracking-wide text-navy sm:text-4xl lg:text-5xl"
          >
            Commercial & Residential HVAC, Done Right.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-grey-800 sm:text-lg">
            From fast repairs to dependable gas line work, Gonzalez keeps your
            home or business comfortable and safe.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button as="a" href="#contact">
              Request Service
            </Button>
            <Button as="a" href="#services" variant="secondary">
              View Services
            </Button>
          </div>
        </div>
        <div className="relative flex flex-1 justify-center lg:justify-end">
          <div
            className={cn(
              'relative rounded-[28px] border border-white border-opacity-40 bg-gradient-to-br from-blue via-navy to-navy p-4 shadow-subtle',
              'max-w-md',
            )}
          >
            <img
              src={heroImage}
              alt="Technician servicing an HVAC rooftop unit"
              className="h-full w-full rounded-[22px] object-cover"
            />
            <StarburstIcon
              className="absolute -top-4 -left-4 h-9 w-9 text-white text-opacity-80"
              accentColor="var(--color-blue)"
            />
            <StarburstIcon
              className="absolute -bottom-6 right-6 h-11 w-11 text-white text-opacity-60"
              accentColor="var(--color-red)"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
