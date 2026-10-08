/**
 * HERO — 100vh kinematik muhit + 340vh scroll hikoyasi.
 *
 * Hikoya (scroll bilan):
 *   01 Masalliqlar tanlanadi  →  02 Olov yoqiladi
 *   →  03 Bug' ko'tariladi     →  04 Dasturxonga tayyor
 */
import { Suspense, lazy, useEffect, useRef } from 'react'
import { ChevronDown, Phone } from 'lucide-react'
import { gsap, ScrollTrigger, scrollToId } from '../utils/scroll'
import { heroScene } from '../stores/sceneStore'
import { useUIStore } from '../stores/uiStore'
import { restaurantConfig } from '../config/restaurantConfig'
import { useQuality, usePrefersReducedMotion } from '../hooks/useQuality'
import { Scene3DBoundary } from '../three/SceneWrappers'
import { MagneticButton } from '../components/ui/MagneticButton'

// three.js chunk'i faqat kerak bo'lganda yuklanadi (PHASE 23)
const HeroScene = lazy(() => import('../three/HeroScene').then((m) => ({ default: m.HeroScene })))

const BEATS: Array<{ label: string; window: [number, number] }> = [
  { label: '01 — Masalliqlar tanlanadi', window: [0.06, 0.3] },
  { label: '02 — Olov yoqiladi', window: [0.38, 0.58] },
  { label: '03 — Bug\u2019 ko\u2019tariladi', window: [0.6, 0.78] },
  { label: '04 — Dasturxonga tayyor', window: [0.82, 1.0] },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const beatsRef = useRef<Array<HTMLDivElement | null>>([])

  const loaderDone = useUIStore((s) => s.loaderDone)
  const tier = useQuality()
  const reduced = usePrefersReducedMotion()

  // ==== Scroll hikoyasi ====
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? true : 0.6,
        onUpdate: (self) => {
          heroScene.progress = self.progress
          const p = self.progress
          const dots = section.querySelectorAll<HTMLElement>('.rail-dot')
          dots.forEach((dot, i) => {
            const [a, b] = BEATS[i].window
            dot.classList.toggle('rail-active', p >= a - 0.02 && p <= b + 0.05)
          })
        },
      },
    })

    // Kontent yuqoriga suzib ketadi
    tl.to(contentRef.current, { opacity: 0, y: -70, ease: 'none', duration: 0.24 }, 0.05)
    if (hintRef.current) {
      tl.to(hintRef.current, { opacity: 0, duration: 0.1, ease: 'none' }, 0.05)
    }

    // Hikoya beatlari
    BEATS.forEach((_, i) => {
      const el = beatsRef.current[i]
      if (!el) return
      const [a, b] = BEATS[i].window
      tl.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.045 }, a)
      tl.to(el, { opacity: 0, y: -12, duration: 0.035 }, b - 0.035)
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.refresh()
    }
  }, [reduced])

  // ==== Intro (loader tugagach) ====
  useEffect(() => {
    if (!loaderDone) return
    if (reduced) return

    const tl = gsap.timeline({ delay: 0.25 })
    tl.fromTo(
      '.hero-word',
      { yPercent: 118, rotate: 4 },
      { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.11, ease: 'power4.out' },
    )
    if (eyebrowRef.current) {
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.75')
    }
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5',
      )
    }
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 22, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
        '-=0.45',
      )
    }
    if (hintRef.current) {
      tl.fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')
    }
  }, [loaderDone, reduced])

  return (
    <section id="hero" ref={sectionRef} className="relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Fon gradientlari */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_38%,rgba(255,90,31,0.13),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_15%_85%,rgba(232,56,13,0.08),transparent_70%)]" />

        {/* 3D sahn / 2.5D fallback */}
        {tier === 'off' ? (
          <div className="absolute inset-0">
            <img
              src="/images/wok-signature.jpg"
              alt="Wok Sushi Lavash Abi"
              className="h-full w-full scale-110 object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
          </div>
        ) : (
          <Scene3DBoundary fallback="/images/wok-signature.jpg" alt="Wok">
            <Suspense fallback={null}>
              <HeroScene tier={tier} />
            </Suspense>
          </Scene3DBoundary>
        )}

        {/* Pastki o'tish gradienti */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        {/* Kontent */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <div
            ref={eyebrowRef}
            className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] text-sand md:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            NAMANGAN · TOSHBULOQ
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          </div>

          <h1 className="font-display font-black leading-[0.95] tracking-tight text-cream">
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block text-[clamp(2.4rem,8.5vw,7.5rem)]">WOK.</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block text-[clamp(2.4rem,8.5vw,7.5rem)] gradient-fire-text">SUSHI.</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="hero-word inline-block text-[clamp(2.4rem,8.5vw,7.5rem)]">LAVASH.</span>
            </span>
          </h1>

          <div
            ref={taglineRef}
            className="mt-7 font-display text-lg font-semibold text-cream/85 md:text-2xl"
          >
            Bir ta'm. <span className="text-ember">Uch xil</span> kayfiyat.
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton
              variant="primary"
              href={`tel:${restaurantConfig.contact.phone}`}
              className="!px-9 !py-4 text-sm"
            >
              <Phone className="h-4 w-4" strokeWidth={2.6} />
              {restaurantConfig.contact.phoneDisplay}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToId('menu')}
              className="!px-9 !py-4 text-sm"
            >
              MENYUNI KO'RISH
            </MagneticButton>
          </div>
          <div className="mt-5 text-[11px] font-semibold tracking-wide text-sand">
            Buyurtma telefon orqali qabul qilinadi
          </div>
        </div>

        {/* Hikoya beatlari */}
        <div className="absolute bottom-24 left-6 z-10 md:bottom-28 md:left-12">
          {BEATS.map((b, i) => (
            <div
              key={b.label}
              ref={(el) => {
                beatsRef.current[i] = el
              }}
              className="absolute bottom-0 left-0 whitespace-nowrap font-display text-[11px] font-semibold tracking-[0.25em] text-cream/90 opacity-0 md:text-xs"
            >
              {b.label}
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex lg:right-12">
          {BEATS.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="rail-dot h-1.5 w-1.5 rounded-full bg-white/15 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Scroll ishorasi */}
        <div
          ref={hintRef}
          className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
        >
          <span className="text-[10px] font-bold tracking-[0.35em] text-sand">PASTGA SURING</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-ember" />
        </div>
      </div>
    </section>
  )
}
