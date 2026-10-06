import { Badge } from './Badge'
import { Button } from './Button'
import { StarburstIcon } from './icons/StarburstIcon'
import { BUSINESS } from '../data/business'

export function ThankYou() {
  return (
    <section aria-labelledby="thank-you-heading" className="mx-auto flex min-h-[55vh] max-w-content items-center px-4 py-16 sm:px-6 sm:py-24">
      <div data-enter className="max-w-2xl">
        <Badge icon={<StarburstIcon className="h-4 w-4 text-blue" />}>Thank you</Badge>
        <h1 id="thank-you-heading" className="mt-5 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">Your request is on its way.</h1>
        <p className="mt-6 text-base leading-7 text-grey-600 sm:text-lg">Thanks for reaching out to Gonzalez Heating + Cooling. We’ll review your details and follow up using your preferred contact method.</p>
        <p className="mt-4 text-base leading-7 text-grey-600">Submitting a request doesn’t book an appointment. If you need to speak with us sooner, give us a call.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button as="a" href={import.meta.env.BASE_URL}>Back to home</Button>
          <Button as="a" variant="secondary" href={BUSINESS.phoneHref}>Call {BUSINESS.phoneDisplay}</Button>
        </div>
      </div>
    </section>
  )
}
