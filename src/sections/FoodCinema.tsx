/**
 * FOOD CINEMA — "TA'MNI KO'RISH MUMKIN EMAS."
 * Olovli wok, uchqunlar, kinematik matn baytlari.
 */
import { Suspense, lazy, useEffect, useRef } from 'react'
import { Phone } from 'lucide-react'
import { gsap, ScrollTrigger, scrollToId } from '../utils/scroll'
import { cinemaScene } from '../stores/sceneStore'
import { usePrefersReducedMotion, useQuality } from '../hooks/useQuality'
import { Scene3DBoundary } from '../three/SceneWrappers'
import { MagneticButton } from '../components/ui/MagneticButton'
import { restaurantConfig } from '../config/restaurantConfig'

// three.js chunk'i kechiktirib yuklanadi (PHASE 23)
const CinemaScene = lazy(() =>
  import('../three/CinemaScene').then((m) => ({ default: m.CinemaScene })),
)

export function FoodCinema() {
  const sectionRef = useRef<HTMLElement>(null)
  const beat1Ref = useRef<HTMLDivElement>(null)
  const beat2Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)

  const tier = useQuality()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? true : 0.7,
        onUpdate: (self) => {
          cinemaScene.progress = self.progress
        },
      },
    })

    // Fon rasm sekin kattalashadi
    if (bgRef.current) {
      tl.fromTo(bgRef.current, { scale: 1.15, yPercent: -4 }, { scale: 1, yPercent: 4, ease: 'none', duration: 1 }, 0)
    }

    if (beat1Ref.current) {
      tl.fromTo(beat1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.14 }, 0.04)
      tl.to(beat1Ref.current, { opacity: 0, y: -40, duration: 0.12 }, 0.3)
    }
    if (beat2Ref.current) {
      tl.fromTo(beat2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.14 }, 0.4)
      tl.to(beat2Ref.current, { opacity: 0, y: -30, duration: 0.12 }, 0.68)
    }
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.12, ease: 'back.out(1.4)' },
        0.76,
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.refresh()
    }
  }, [reduced])

  return (
    <section id="cinema" ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* Fon — olovli oshxona */}
        <img
          ref={bgRef}
          src="/images/kitchen-fire.jpg"
          alt="Olovli wok"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_60%,rgba(232,56,13,0.16),transparent_70%)]" />

        {/* 3D alanga sahnnasi */}
        {tier !== 'off' && (
          <Scene3DBoundary fallback="/images/kitchen-fire.jpg" alt="Olovli wok">
            <Suspense fallback={null}>
              <CinemaScene tier={tier} />
            </Suspense>
          </Scene3DBoundary>
        )}

        {/* Matn baytlari */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div
            ref={beat1Ref}
            className="absolute max-w-5xl text-center font-display text-[clamp(1.8rem,6vw,5rem)] font-black leading-[1.02] text-cream opacity-0"
          >
            TA'MNI KO'RISH
            <br />
            <span className="text-stroke-cream">MUMKIN EMAS.</span>
          </div>

          <div
            ref={beat2Ref}
            className="absolute max-w-5xl text-center font-display text-[clamp(1.8rem,6vw,5rem)] font-black leading-[1.02] text-cream opacity-0"
          >
            LEKIN UNI
            <br />
            <span className="gradient-fire-text">HIS QILDIRISH</span> MUMKIN.
          </div>

          <div
            ref={ctaRef}
            className="absolute flex flex-col items-center gap-5 rounded-[44px] bg-ink/55 px-10 py-9 opacity-0 backdrop-blur-[3px] md:px-14"
          >
            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] text-cream/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              HOZIR QO'NG'IROQ QILING
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            </div>
            <MagneticButton
              variant="primary"
              className="!px-10 !py-4.5 text-sm"
              href={`tel:${restaurantConfig.contact.phone}`}
            >
              <Phone className="h-4 w-4" strokeWidth={2.6} />
              {restaurantConfig.contact.phoneDisplay}
            </MagneticButton>
            <button
              onClick={() => scrollToId('menu')}
              className="text-xs font-semibold tracking-widest text-cream/70 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              MENYUNI KO'RISH
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
