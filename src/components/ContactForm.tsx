import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { SERVICES } from '../data/services'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { StarburstIcon } from './icons/StarburstIcon'

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
  consent: boolean
}

type Toast = {
  message: string
  tone: 'success' | 'error'
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  consent: false,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  )
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  )
  const [toast, setToast] = useState<Toast | null>(null)

  const formspreeId = useMemo(
    () =>
      import.meta.env.VITE_FORMSPREE_ID ||
      import.meta.env.NEXT_PUBLIC_FORMSPREE_ID ||
      '',
    [],
  )

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    const { name, value, type } = target
    const nextValue =
      type === 'checkbox' && 'checked' in target ? target.checked : value
    setFormState((prev) => ({
      ...prev,
      [name]: nextValue,
    }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof FormState]
        return next
      })
    }
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}

    if (!formState.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }
    if (!EMAIL_REGEX.test(formState.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!formState.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }
    if (!formState.service) {
      nextErrors.service = 'Select a service.'
    }
    if (!formState.message.trim()) {
      nextErrors.message = 'Tell us more about the request.'
    }
    if (!formState.consent) {
      nextErrors.consent = 'Consent is required to submit.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    const nextErrors = validate()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      setToast({ message: 'Please fix the highlighted fields.', tone: 'error' })
      return
    }

    const payload = {
      ...formState,
      submittedAt: new Date().toISOString(),
    }

    try {
      if (formspreeId) {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
      } else {
        console.log('Contact form submission (mock)', payload)
      }

      setStatus('success')
      setToast({
        message: "Thanks! We'll reach out shortly to schedule service.",
        tone: 'success',
      })
      setFormState(INITIAL_STATE)
      setErrors({})
    } catch (error) {
      console.error('Contact form submission failed', error)
      setStatus('error')
      setToast({
        message:
          'Something went wrong while sending your request. Please try again.',
        tone: 'error',
      })
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-surface py-16 sm:py-20"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge
              icon={<StarburstIcon className="h-4 w-4 text-blue" accentColor="var(--color-red)" />}
            >
              Request Service
            </Badge>
            <h2
              id="contact-heading"
              className="mt-4 text-3xl font-extrabold uppercase tracking-wide text-navy sm:text-4xl"
            >
              Let&apos;s book your appointment
            </h2>
            <p className="mt-3 max-w-2xl text-base text-grey-800 sm:text-lg">
              Send the details and our dispatch team will confirm your visit, go
              over equipment needs, and lock in the best time for your schedule.
            </p>
          </div>
          <div className="hidden rounded-subtle border border-blue border-opacity-40 bg-blue bg-opacity-10 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-blue sm:block">
            <p>Weekday response within 1 hour</p>
            <p>Emergency calls available</p>
          </div>
        </div>

        <div className="relative rounded-[28px] border border-grey-150 bg-white p-6 shadow-subtle sm:p-8">
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                'pointer-events-none absolute right-6 top-6 flex max-w-xs items-center gap-3 rounded-subtle px-4 py-3 text-sm font-semibold uppercase tracking-wide shadow-subtle',
                toast.tone === 'success'
                  ? 'bg-blue text-white'
                  : 'bg-red text-white',
              )}
            >
              {toast.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="grid gap-6 md:grid-cols-2"
          >
            <Field
              label="Full Name"
              name="name"
              required
              error={errors.name}
            >
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputClass(errors.name)}
              />
            </Field>
            <Field
              label="Email"
              name="email"
              required
              error={errors.email}
            >
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputClass(errors.email)}
              />
            </Field>
            <Field
              label="Phone"
              name="phone"
              required
              error={errors.phone}
            >
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                className={inputClass(errors.phone)}
                placeholder="e.g. 480-555-0123"
              />
            </Field>
            <Field
              label="Requested Service"
              name="service"
              required
              error={errors.service}
            >
              <select
                id="contact-service"
                name="service"
                value={formState.service}
                onChange={handleChange}
                required
                className={cn(inputClass(errors.service), 'appearance-none')}
              >
                <option value="">Select a service</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              className="md:col-span-2"
              label="Message"
              name="message"
              required
              error={errors.message}
            >
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleChange}
                required
                className={cn(inputClass(errors.message), 'resize-vertical')}
              />
            </Field>
            <div className="md:col-span-2">
              <label className="flex items-start gap-3 text-sm text-grey-800">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formState.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-blue"
                  required
                />
                <span>
                  I agree to receive scheduling updates from Gonzalez Heating &
                  Cooling LLC. Your info stays private with our team.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red">
                  {errors.consent}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 md:col-span-2">
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
              </Button>
              {!formspreeId && (
                <p className="text-xs uppercase tracking-widest text-grey-600">
                  Form posts to console in this environment.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  name: string
  required?: boolean
  error?: string
  children: ReactNode
  className?: string
}

function Field({
  label,
  name,
  required,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={`contact-${name}`}
        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-navy"
      >
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red">
          {error}
        </p>
      )}
    </div>
  )
}

const inputBase =
  'w-full rounded-subtle border border-grey-150 bg-white px-3 py-3 text-sm text-grey-800 shadow-sm transition-colors duration-200 ease-in-out-standard focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-opacity-40 motion-reduce:transition-none'

function inputClass(hasError?: string) {
  if (hasError) {
    return cn(
      inputBase,
      'border-red focus:border-red focus:ring-red focus:ring-opacity-40',
    )
  }
  return inputBase
}
