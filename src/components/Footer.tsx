import { StripeSeparator } from './StripeSeparator'

const ADDRESS = ['Gonzalez Heating & Cooling LLC', 'Knoxville, Tennessee']
const PHONE_DISPLAY = '865-385-7289'
const PHONE_HREF = '8653857289'
const EMAIL = 'service@gonzalezhvac.com'

export function Footer() {
  return (
    <footer className="relative bg-navy text-white">
      <StripeSeparator direction="reverse" className="-mt-1" />
      <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div>
          <h3 className="text-lg font-extrabold uppercase tracking-[0.3em] text-white">
            Gonzalez Heating + Cooling LLC
          </h3>
          <address className="mt-4 not-italic text-sm text-white text-opacity-80">
            {ADDRESS.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </div>
        <div className="space-y-3 text-sm text-white text-opacity-80">
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Phone
            </span>
            <a className="hover:text-white" href={`tel:${PHONE_HREF}`}>
              {PHONE_DISPLAY}
            </a>
          </div>
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Email
            </span>
            <a className="hover:text-white" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
          <div>
            <span className="block font-semibold uppercase tracking-wide text-white">
              Hours
            </span>
            <p>Monday – Saturday • 7am – 5pm</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white border-opacity-10">
        <div className="mx-auto flex max-w-content flex-col items-start gap-2 px-4 py-6 text-xs uppercase tracking-widest text-white text-opacity-70 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© Gonzalez Heating & Cooling LLC</p>
          <a className="hover:text-white" href="#">
            Designed by Beatrice Bussell
          </a>
        </div>
      </div>
    </footer>
  )
}
