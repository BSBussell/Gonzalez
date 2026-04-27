import { useEffect, useState } from 'react'
import mascot from '../assets/logo.png'
import { cn } from '../lib/cn'

const PHONE_DISPLAY = '865-385-7289'
const PHONE_HREF = '8653857289'
const EMAIL = 'service@gonzalezhvac.com'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="relative">
      <div
        className={cn(
          'sticky top-0 z-50 bg-navy text-white shadow-subtle transition-all duration-300 ease-in-out-standard motion-reduce:transition-none',
          isScrolled ? 'py-3' : 'py-4 md:py-6',
        )}
      >
        
        <div className="relative mx-auto flex max-w-content items-center justify-between gap-6 px-4 sm:px-6">
          <div className="flex flex-col gap-2 text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white text-opacity-70">
              family owned
            </span>
            <div className="text-2xl font-extrabold uppercase tracking-[0.35em] sm:text-3xl">
              <span className="block leading-tight">GONZALEZ</span>
              <span className="block text-base tracking-[0.25em] sm:text-xl">
                HEATING + COOLING LLC
              </span>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-4">
            <div className="hidden text-right text-[0.75rem] font-semibold uppercase tracking-widest sm:flex sm:flex-col sm:gap-1">
              <a
                className="transition-colors hover:text-white hover:text-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                href={`tel:${PHONE_HREF}`}
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                className="transition-colors hover:text-white hover:text-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>
            <img
              src={mascot}
              alt="Gonzalez Heating & Cooling logo"
              className="hidden h-20 w-20 sm:block md:h-24 md:w-24"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
