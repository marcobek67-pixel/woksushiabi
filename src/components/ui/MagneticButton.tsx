/**
 * Magnit tugma — kursor erga tortadi, qo'yib yuborilganda elastik qaytadi.
 */
import { useRef, type ReactNode, type MouseEvent, type RefObject } from 'react'
import { gsap } from 'gsap'
import { playSound } from '../../utils/sound'
import { useUIStore } from '../../stores/uiStore'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'dark'
  className?: string
  strength?: number
  ariaLabel?: string
  /** Berilsa <a> sifatida chiziladi (masalan: tel: havolasi) */
  href?: string
}

const variants: Record<string, string> = {
  primary:
    'gradient-fire text-ink font-extrabold shadow-[0_10px_40px_-10px_rgba(255,90,31,0.7)] hover:shadow-[0_14px_60px_-8px_rgba(255,90,31,0.9)]',
  ghost:
    'border border-cream/20 text-cream hover:border-ember/70 hover:text-ember backdrop-blur-sm',
  dark: 'bg-char/80 text-cream border border-white/5 hover:border-ember/50',
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  strength = 0.35,
  ariaLabel,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
    if (inner.current) {
      gsap.to(inner.current, { x: x * 0.12, y: y * 0.12, duration: 0.4 })
    }
  }

  const onLeave = () => {
    if (!ref.current) return
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.35)',
    })
  }

  const handleClick = () => {
    playSound('click', useUIStore.getState().soundEnabled)
    onClick?.()
  }

  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm tracking-wide transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`

  const shine =
    variant === 'primary' ? (
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    ) : null

  const body = (
    <>
      {shine}
      <span ref={inner} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  )

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        data-magnetic
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={handleClick}
        className={classes}
      >
        {body}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      aria-label={ariaLabel}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={handleClick}
      className={classes}
    >
      {body}
    </button>
  )
}
