import { useEffect, useRef } from 'react'

/** Animate on first entry without ever hiding content before enhancement runs. */
export function useEntranceAnimations() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root.current || !('IntersectionObserver' in window)) return

    const animations = new Map<Element, Animation>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        if (preference.matches || entry.target.contains(document.activeElement)) return
        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 520, easing: 'cubic-bezier(0.2, 0.65, 0.3, 1)' },
        )
        animations.set(entry.target, animation)
        animation.onfinish = () => animations.delete(entry.target)
      })
    }, { threshold: 0.12 })

    root.current.querySelectorAll('[data-enter]').forEach((element) => observer.observe(element))
    const stopMotion = () => {
      if (!preference.matches) return
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }
    const revealFocused = (event: FocusEvent) => {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          animation.cancel()
          animations.delete(element)
        }
      })
    }
    preference.addEventListener('change', stopMotion)
    const element = root.current
    element.addEventListener('focusin', revealFocused)
    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      preference.removeEventListener('change', stopMotion)
      element.removeEventListener('focusin', revealFocused)
    }
  }, [])

  return root
}
