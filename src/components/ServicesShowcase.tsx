import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import './ServicesShowcase.css'
import { SERVICES } from '../data/services'
import { cn } from '../lib/cn'
import { Badge } from './Badge'
import { Button } from './Button'
import { StarburstIcon } from './icons/StarburstIcon'

const ROTATION_DELAY = 7000
const SERVICE_TONES = [
  { section: 'rgb(245 247 250)', overlay: 'rgba(0, 61, 121, 0.2)' },
  { section: 'rgb(242 247 250)', overlay: 'rgba(0, 120, 210, 0.17)' },
  { section: 'rgb(244 247 250)', overlay: 'rgba(0, 61, 121, 0.17)' },
  { section: 'rgb(246 247 250)', overlay: 'rgba(0, 120, 210, 0.15)' },
  { section: 'rgb(243 247 250)', overlay: 'rgba(0, 61, 121, 0.19)' },
] as const

const SERVICE_PHOTOS = [
  { src: '/machinesclose.jpg', position: 'object-center' },
  { src: '/gonzalezrepairProcess.jpg', position: 'object-[center_55%]' },
  { src: '/working_machine.jpg', position: 'object-[center_52%]' },
  { src: '/moremachines-wide.jpg', position: 'object-[center_58%]' },
  { src: '/ceilin_air_ducts.jpg', position: 'object-[center_38%]' },
] as const

export function ServicesShowcase() {
  const [enhanced, setEnhanced] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectionVersion, setSelectionVersion] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const showcaseRef = useRef<HTMLDivElement>(null)
  const navRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    // The server and first client render expose every service. Only collapse
    // the shared content once the interactive showcase is mounted.
    const selectLinkedService = () => {
      const index = SERVICES.findIndex((service) => `#service-${service.id}` === window.location.hash)
      if (index >= 0) {
        setActiveIndex(index)
        setPaused(true)
      }
    }
    selectLinkedService()
    setEnhanced(true)
    window.addEventListener('hashchange', selectLinkedService)
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onPreferenceChange = () => setReducedMotion(preference.matches)
    const onVisibilityChange = () => setPageVisible(!document.hidden)
    onPreferenceChange()
    onVisibilityChange()
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 })
    if (showcaseRef.current) observer.observe(showcaseRef.current)
    preference.addEventListener('change', onPreferenceChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('hashchange', selectLinkedService)
      observer.disconnect()
      preference.removeEventListener('change', onPreferenceChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  const rotating = enhanced && !paused && !hovered && !focused && !reducedMotion && visible && pageVisible

  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return
    const item = navRefs.current[activeIndex]
    const navigation = item?.parentElement
    if (!item || !navigation) return
    navigation.scrollTo({
      left: item.offsetLeft - (navigation.clientWidth - item.offsetWidth) / 2,
      behavior: reducedMotion ? 'instant' : 'smooth',
    })
  }, [activeIndex, reducedMotion])

  const selectService = (index: number) => {
    setActiveIndex(index)
    setSelectionVersion((version) => version + 1)
  }

  const handleNavigationKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight': nextIndex = (index + 1) % SERVICES.length; break
      case 'ArrowLeft': nextIndex = (index - 1 + SERVICES.length) % SERVICES.length; break
      case 'Home': nextIndex = 0; break
      case 'End': nextIndex = SERVICES.length - 1; break
      default: return
    }
    event.preventDefault()
    selectService(nextIndex)
    navRefs.current[nextIndex]?.focus()
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      data-enhanced={enhanced}
      className="services-section relative overflow-hidden py-16 transition-colors duration-500 ease-out sm:py-20 motion-reduce:transition-none"
      style={{ backgroundColor: SERVICE_TONES[activeIndex].section }}
    >
      {enhanced && !reducedMotion && (
        <button
          type="button"
          aria-label={paused ? 'Play service rotation' : 'Pause service rotation'}
          title={paused ? 'Play service rotation' : 'Pause service rotation'}
          onClick={() => setPaused((value) => !value)}
          className="absolute right-3 top-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:right-6 sm:top-4 motion-reduce:transition-none"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
          </svg>
        </button>
      )}
      <div className="relative mx-auto max-w-content px-4 sm:px-6">
        <div
          ref={showcaseRef}
          className="relative"
          onPointerOver={(event) => {
            if (event.pointerType === 'mouse') {
              const target = event.target as HTMLElement
              setHovered(Boolean(target.closest('a, button, h2, h3, p, li')))
            }
          }}
          onPointerLeave={() => setHovered(false)}
          onPointerDownCapture={() => setFocused(false)}
          onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))}
          onKeyDownCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
          }}
        >
          <div className="services-photo pointer-events-none absolute -top-4 bottom-[-5rem] -right-4 -left-4 z-0 sm:-right-6 sm:-left-6 lg:left-auto lg:-top-10 lg:bottom-[-7rem] lg:right-[-16vw] lg:w-[66vw] lg:max-w-[960px]" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 11%, black 84%, transparent 100%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 11%, black 84%, transparent 100%)' }}>
            {SERVICE_PHOTOS.map((photo, index) => (
              <img
                key={photo.src}
                src={`/images/${photo.src.split('/').pop()!.split('.')[0]}-1320.webp`}
                srcSet={`/images/${photo.src.split('/').pop()!.split('.')[0]}-640.webp 640w, /images/${photo.src.split('/').pop()!.split('.')[0]}-1320.webp 1320w`}
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt=""
                aria-hidden="true"
                width={1536}
                height={2048}
                loading="lazy"
                decoding="async"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover saturate-[0.88] contrast-[0.96] brightness-[1.03] transition-opacity duration-500 ease-out motion-reduce:transition-none',
                  photo.position,
                  index === activeIndex ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
            <div aria-hidden="true" className="absolute inset-0 transition-colors duration-500 ease-out motion-reduce:transition-none" style={{ backgroundColor: SERVICE_TONES[activeIndex].overlay }} />
            <div aria-hidden="true" className="services-photo-wash absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-background)_0%,rgba(var(--color-background-rgb)/0.98)_18%,rgba(var(--color-background-rgb)/0.88)_45%,rgba(var(--color-background-rgb)/0.78)_65%,rgba(var(--color-background-rgb)/0.96)_88%,var(--color-background)_100%)] lg:bg-[linear-gradient(to_right,var(--color-background)_0%,rgba(var(--color-background-rgb)/0.95)_8%,rgba(var(--color-background-rgb)/0.65)_24%,rgba(var(--color-background-rgb)/0.08)_50%,transparent_76%)]" />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(ellipse_at_43%_5%,rgba(var(--color-background-rgb)/0.98)_0%,rgba(var(--color-background-rgb)/0.8)_31%,transparent_72%)]" />
            <div aria-hidden="true" className="services-photo-bottom absolute inset-x-0 bottom-0 h-[28rem] bg-[linear-gradient(to_top,var(--color-background)_0%,rgba(var(--color-background-rgb)/0.98)_24%,rgba(var(--color-background-rgb)/0.9)_38%,rgba(var(--color-background-rgb)/0.55)_58%,rgba(var(--color-background-rgb)/0.15)_78%,transparent_100%)]" />
          </div>
          <header data-enter className="services-intro relative z-10 mx-auto max-w-2xl px-1 text-center sm:px-8">
            <Badge icon={<StarburstIcon className="h-4 w-4 text-blue" />}>How we can help</Badge>
            <h2 id="services-heading" className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">The right help for your heating &amp; cooling.</h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-grey-600">A system that won’t cool. A space that needs better airflow. A replacement you’re planning ahead for. Explore our services to find the right place to start.</p>
          </header>

          <div data-enter className="services-story relative z-10 mt-3 sm:mt-7 lg:min-h-[23rem]">
            <div className="relative z-10 grid lg:min-h-[23rem]">
              {SERVICES.map((service, index) => {
                const active = !enhanced || index === activeIndex
                return (
                  <article key={service.id} id={`service-${service.id}`} aria-hidden={enhanced ? !active : undefined} inert={enhanced && !active} className={cn('service-panel flex max-w-xl flex-col px-1 py-6 transition-[opacity,transform] duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none sm:px-8 sm:py-12 lg:px-4 lg:py-14', enhanced && 'col-start-1 row-start-1', active ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-3 opacity-0')}>
                    <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl">{service.title}</h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-grey-600">{service.summary}</p>
                    <ul className="mt-7 space-y-3 text-sm leading-6 text-grey-800">{service.details.map((detail) => <li key={detail} className="flex items-start gap-3"><span aria-hidden="true" className="font-semibold text-blue">✓</span><span>{detail}</span></li>)}</ul>
                    {service.disclaimer && <p className="mt-5 max-w-md text-xs leading-relaxed text-grey-600">{service.disclaimer}</p>}
                    <div className="service-action mt-auto pt-8"><Button as="a" href="#contact" aria-label={`Request service for ${service.title}`}>Request Service</Button></div>
                  </article>
                )
              })}
            </div>
          </div>

          {enhanced && <>
          <nav aria-label="Choose a service" className="service-nav relative z-10 grid grid-cols-2 gap-x-3 gap-y-1 px-1 sm:px-4 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-5 lg:gap-y-3">
            {SERVICES.map((service, index) => {
              const active = activeIndex === index
              return (
                <button
                  key={service.id}
                  ref={(element) => { navRefs.current[index] = element }}
                  type="button"
                  aria-current={active ? 'true' : undefined}
                  aria-label={`Show ${service.title}`}
                  onClick={() => selectService(index)}
                  onKeyDown={(event) => handleNavigationKey(event, index)}
                  className={cn(
                    'service-nav-item group relative inline-flex min-h-12 items-center justify-between gap-2 px-2 lg:justify-start lg:gap-3 py-3 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-4 motion-reduce:transition-none',
                    active ? 'text-blue' : 'text-navy hover:bg-blue/5 hover:text-blue',
                  )}
                >
                  <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.02em] sm:text-sm sm:tracking-[0.04em]"><span className="sm:hidden">{service.shortLabel}</span><span className="hidden sm:inline">{service.navigationLabel}</span></span>
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={cn('h-4 w-4 shrink-0 transition-[transform,opacity] duration-200 motion-reduce:transition-none', active ? 'rotate-90 opacity-100' : 'opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100')}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span aria-hidden="true" className={cn('absolute inset-x-2 bottom-0 h-[2px] origin-left bg-blue transition-transform duration-200 motion-reduce:transition-none', active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
                </button>
              )
            })}
          </nav>
          </>}
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-blue/10">
        {enhanced && !reducedMotion && (
          <span
            key={`${activeIndex}-${selectionVersion}`}
            className="service-progress block h-full origin-left bg-blue"
            style={{ animationDuration: `${ROTATION_DELAY}ms`, animationPlayState: rotating ? 'running' : 'paused' }}
            onAnimationEnd={() => {
              if (rotating) setActiveIndex((index) => (index + 1) % SERVICES.length)
            }}
          />
        )}
      </div>
    </section>
  )
}
