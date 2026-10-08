/**
 * Maxsus kursor — nuqta + ergashuvchi halqa.
 * Faqat (pointer: fine) qurilmalarda; [data-magnetic], a, button ustida kattalashadi.
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' })

    let visible = false

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)

      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-magnetic], [data-cursor-grow]')
      const isEmber = el.closest('[data-magnetic]')
      gsap.to(ring, {
        scale: interactive ? 1.7 : 1,
        borderColor: isEmber ? 'rgba(255,90,31,0.9)' : 'rgba(245,239,230,0.4)',
        duration: 0.3,
      })
      gsap.to(dot, { scale: interactive ? 0.4 : 1, duration: 0.3 })
    }

    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.classList.add('custom-cursor')

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember opacity-0"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-0"
        style={{ marginLeft: -18, marginTop: -18, borderColor: 'rgba(245,239,230,0.4)' }}
      />
    </>
  )
}
