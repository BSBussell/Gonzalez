import { Badge } from './Badge'
import { Button } from './Button'
import { BUSINESS } from '../data/business'
import { StarburstIcon } from './icons/StarburstIcon'

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-surface"
    >
      <div className="relative mx-auto flex max-w-content flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
        <div data-enter className="relative flex flex-1 flex-col gap-6">
          <Badge
            icon={<StarburstIcon className="h-4 w-4 text-blue" />}
          >
            Family owned · Knoxville, TN
          </Badge>
          <h1
            id="hero-heading"
            className="max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            Comfort for your home. Care for your business.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-grey-800 sm:text-lg">
            Gonzalez Heating + Cooling LLC provides heating, cooling, and gas line services in Knoxville, Tennessee. Get practical
            answers and dependable care from the family-owned Gonzalez team.
          </p>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button as="a" href="#contact">
              Request Service
            </Button>
            <Button as="a" href={BUSINESS.phoneHref} variant="secondary">
              Call {BUSINESS.phoneDisplay}
            </Button>
          </div>
          <p className="text-sm text-grey-600">Residential &amp; commercial · Repairs, maintenance &amp; gas lines</p>
        </div>
        <div data-enter className="relative flex flex-1 justify-center lg:justify-end">
          <figure className="w-full max-w-xl overflow-hidden rounded-2xl border border-grey-150 bg-surface shadow-subtle">
            <div className="relative overflow-hidden rounded-none">
              <img
                src="/images/GonzalezPicture-1320.webp"
                srcSet="/images/GonzalezPicture-640.webp 640w, /images/GonzalezPicture-1320.webp 1320w"
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 576px, calc(100vw - 32px)"
                alt="The Gonzalez team beside a rooftop HVAC unit"
                width={1320}
                height={971}
                fetchPriority="high"
                className="h-auto w-full rounded-none"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),inset_0_-36px_56px_rgba(0,24,58,0.36)]"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-4 text-sm">
              <span className="font-semibold text-navy">The people behind your comfort.</span>
              <span className="text-grey-600">Gonzalez HVAC</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
