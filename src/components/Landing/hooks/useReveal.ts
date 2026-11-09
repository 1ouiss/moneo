import { useEffect } from 'react'

// Fait apparaître les éléments [data-reveal] quand ils entrent dans l'écran.
export const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )
    document
      .querySelectorAll('[data-reveal]')
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}
