import mascot from '../assets/logo.webp'
import { BUSINESS } from '../data/business'

export function Header() {
  return (
    <header className="border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a href="#hero" aria-label="Gonzalez Heating and Cooling home" className="flex min-w-0 items-center gap-3">
          <img src={mascot} alt="" width={160} height={156} className="hidden h-16 w-16 -scale-x-100 sm:block" />
          <span>
            <span className="block text-xl font-extrabold tracking-[0.16em] sm:text-2xl">GONZALEZ</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs">Heating + Cooling LLC</span>
          </span>
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <a href="#services" className="hidden text-sm font-medium text-white/80 hover:text-white md:block">Our services</a>
          <a href="#contact" className="hidden text-sm font-medium text-white/80 hover:text-white md:block">Contact</a>
          <a href={BUSINESS.phoneHref} className="rounded-lg border border-white/30 px-3 py-3 text-xs font-semibold transition-colors hover:bg-white/10 sm:px-4 sm:text-sm">
            <span className="hidden sm:inline">Call </span>{BUSINESS.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  )
}
