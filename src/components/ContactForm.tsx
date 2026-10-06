import { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { SERVICES } from '../data/services'
import { BUSINESS } from '../data/business'
import { Badge } from './Badge'
import { Button } from './Button'
import { StarburstIcon } from './icons/StarburstIcon'

const SERVICE_TYPES = [...SERVICES.map((service) => service.requestLabel), 'Not Sure']

export function ContactForm() {
  const formAction = import.meta.env.VITE_CONTACT_FORM_ACTION || undefined
  const formId = formAction?.split('/').filter(Boolean).pop() || 'unconfigured'
  const [state, submit, reset] = useForm(formId)
  const submittingRef = useRef(false)
  const errorRef = useRef<HTMLDivElement>(null)
  const [unexpectedError, setUnexpectedError] = useState(false)

  useEffect(() => {
    if (state.succeeded) window.location.assign(`${import.meta.env.BASE_URL}thank-you/`)
  }, [state.succeeded])

  useEffect(() => {
    if (state.errors || unexpectedError) errorRef.current?.focus()
  }, [state.errors, unexpectedError])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!formAction || submittingRef.current || state.succeeded) return
    submittingRef.current = true
    setUnexpectedError(false)
    try {
      await submit(event)
    } catch {
      reset()
      setUnexpectedError(true)
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div data-enter className="max-w-2xl">
          <Badge icon={<StarburstIcon className="h-4 w-4 text-blue" />}>Request Service</Badge>
          <h2 id="contact-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">Request Service</h2>
          <p className="mt-4 text-base leading-7 text-grey-600 sm:text-lg">Call Gonzalez Heating + Cooling LLC to discuss your request. {formAction ? 'You can also send the details below for follow-up.' : 'You can also reach us by email.'}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <aside data-enter className="order-2 border-t border-grey-150 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-2">
            <h3 className="text-2xl font-bold tracking-tight text-navy">Prefer to talk?</h3>
            <p className="mt-3 max-w-sm text-base leading-7 text-grey-600">A quick call is often the fastest way to get started. We’ll listen, answer questions, and help you decide what comes next.</p>
            <Button as="a" href={BUSINESS.phoneHref} className="mt-7 min-h-12 w-full sm:w-auto">Call {BUSINESS.phoneDisplay}</Button>

            <div className="mt-8 space-y-4 border-t border-grey-150 pt-6 text-sm">
              <div>
                <p className="font-semibold text-navy">Hours</p>
                <p className="mt-1 text-grey-600">{BUSINESS.hours}</p>
              </div>
              <div>
                <p className="font-semibold text-navy">Email</p>
                <a href={`mailto:${BUSINESS.email}`} className="mt-1 inline-block font-medium text-blue hover:text-navy">{BUSINESS.email}</a>
              </div>
              <div>
                <p className="font-semibold text-navy">Service area</p>
                <p className="mt-1 text-grey-600">{BUSINESS.location}</p>
              </div>
            </div>
          </aside>

          <div data-enter className="order-1">
            <h3 className="text-2xl font-bold tracking-tight text-navy">Send us the details</h3>
            <p className="mt-3 text-sm leading-6 text-grey-600">Include your city or ZIP code, the type of system, and what you’re noticing. Required fields are marked *.</p>

            {!formAction && <p id="contact-availability" className="mt-4 text-sm leading-6 text-grey-600">Online requests are not available yet. Please <a href={BUSINESS.phoneHref} className="font-semibold text-blue underline underline-offset-4">call {BUSINESS.phoneDisplay}</a> to request service.</p>}

            <form action={formAction} method="post" onSubmit={handleSubmit} aria-busy={state.submitting} className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field label="Name" name="name">
                <input id="contact-name" name="name" aria-invalid={!!state.errors?.getFieldErrors('name').length} aria-describedby="contact-name-error" type="text" autoComplete="name" required className={inputClass} />
                <ValidationError id="contact-name-error" field="name" errors={state.errors} className="mt-2 text-sm text-red" />
              </Field>
              <Field label="Phone" name="phone">
                <input id="contact-phone" name="phone" aria-invalid={!!state.errors?.getFieldErrors('phone').length} aria-describedby="contact-phone-error" type="tel" autoComplete="tel" required className={inputClass} />
                <ValidationError id="contact-phone-error" field="phone" errors={state.errors} className="mt-2 text-sm text-red" />
              </Field>
              <Field label="Email" name="email">
                <input id="contact-email" name="email" aria-invalid={!!state.errors?.getFieldErrors('email').length} aria-describedby="contact-email-error" type="email" autoComplete="email" required className={inputClass} />
                <ValidationError id="contact-email-error" field="email" errors={state.errors} className="mt-2 text-sm text-red" />
              </Field>
              <Field label="Service Type" name="serviceType">
                <select id="contact-serviceType" name="serviceType" aria-invalid={!!state.errors?.getFieldErrors('serviceType').length} aria-describedby="contact-serviceType-error" defaultValue="" required className={inputClass}>
                  <option value="" disabled>Select a service</option>
                  {SERVICE_TYPES.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
                <ValidationError id="contact-serviceType-error" field="serviceType" errors={state.errors} className="mt-2 text-sm text-red" />
              </Field>
              <Field label="What can we help with?" name="message" className="sm:col-span-2">
                <textarea id="contact-message" name="message" aria-invalid={!!state.errors?.getFieldErrors('message').length} aria-describedby="contact-message-error" rows={4} required className={inputClass} placeholder="Tell us a little about the issue or project." />
                <ValidationError id="contact-message-error" field="message" errors={state.errors} className="mt-2 text-sm text-red" />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-navy">Preferred Contact Method</legend>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-sm text-grey-800">
                  <label className="flex min-h-11 items-center gap-2"><input type="radio" name="preferredContact" value="Phone" defaultChecked className="h-4 w-4 accent-blue" />Phone</label>
                  <label className="flex min-h-11 items-center gap-2"><input type="radio" name="preferredContact" value="Email" className="h-4 w-4 accent-blue" />Email</label>
                </div>
              </fieldset>
              <div className="pt-2 sm:col-span-2">
                <div ref={errorRef} role="alert" tabIndex={-1} className="mb-3 text-sm text-red">
                  <ValidationError errors={state.errors} />
                  {(state.errors || unexpectedError) && <p className="mt-2">Your request couldn’t be sent. Check the fields above and try again, or <a href={BUSINESS.phoneHref} className="font-semibold underline">call {BUSINESS.phoneDisplay}</a>.</p>}
                </div>
                <Button type="submit" disabled={!formAction || state.submitting || state.succeeded} aria-describedby={!formAction ? 'contact-availability' : undefined} className="min-h-12 w-full sm:w-auto">{state.submitting ? 'Sending…' : state.succeeded ? 'Request sent' : 'Send Service Request'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  name: string
  children: ReactNode
  className?: string
}

function Field({ label, name, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`contact-${name}`} className="text-sm font-semibold text-navy">{label} *</label>
      <div className="mt-2">{children}</div>
    </div>
  )
}

const inputClass = 'w-full rounded-lg border border-grey-150 bg-surface px-3 py-3 text-base text-grey-800 sm:text-sm transition-colors duration-200 ease-in-out-standard focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/30 motion-reduce:transition-none'
