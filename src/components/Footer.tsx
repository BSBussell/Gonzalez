import { BUSINESS } from '../data/business'

export function Footer() {
  return (
    <footer className="relative border-t-4 border-red bg-navy text-white">
      <div data-enter className="mx-auto flex max-w-content flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-wide text-white">
            Gonzalez Heating + Cooling LLC
          </h2>
          <address className="mt-4 not-italic text-sm text-white text-opacity-80">
            {BUSINESS.location}
            <p className="mt-2">Family-owned care for your home and business.</p>
          </address>
        </div>
        <div className="space-y-3 text-sm text-white text-opacity-80">
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Phone
            </span>
            <a className="hover:text-white" href={BUSINESS.phoneHref}>
              {BUSINESS.phoneDisplay}
            </a>
          </div>
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Email
            </span>
            <a className="hover:text-white" href={`mailto:${BUSINESS.email}`}>
              {BUSINESS.email}
            </a>
          </div>
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Hours
            </span>
            <p>{BUSINESS.hours}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white border-opacity-10">
        <div className="mx-auto flex max-w-content flex-col items-start gap-2 px-4 py-6 text-xs uppercase tracking-widest text-white text-opacity-70 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© Gonzalez Heating & Cooling LLC</p>
          <span>Designed by Beatrice Bussell</span>
        </div>
      </div>
    </footer>
  )
}
