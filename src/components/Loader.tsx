/**
 * Loading screen — "TA'M BOSHLANMOQDA..."
 * Haqiqiy asset preload + minimum davomiylik, keyin kinematik ochilish.
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { LogoMark } from './ui/Logo'
import { useUIStore } from '../stores/uiStore'
import { heroScene } from '../stores/sceneStore'

const PRELOAD = [
  '/images/wok-signature.jpg',
  '/images/sushi-signature.jpg',
  '/images/lavash-signature.jpg',
]

export function Loader() {
  const setLoaderDone = useUIStore((s) => s.setLoaderDone)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    let realFraction = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minTime = reduced ? 300 : 2100
    const startedAt = performance.now()

    let loadedCount = 0
    const step = () => {
      loadedCount++
      realFraction = loadedCount / PRELOAD.length
    }

    const loads = PRELOAD.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => {
            step()
            resolve()
          }
          img.onerror = () => {
            step()
            resolve()
          }
          img.src = src
        }),
    )

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()

    Promise.all([...loads, fonts, new Promise((r) => setTimeout(r, minTime))]).then(() => {
      if (!cancelled) {
        realFraction = 1
        setTimeout(() => !cancelled && setReady(true), 450)
      }
    })

    // Displayed progress — realFraction'ga yumshoq ergashadi
    const tick = () => {
      if (cancelled) return
      const timeFraction = Math.min(1, (performance.now() - startedAt) / minTime)
      const target = Math.min(timeFraction, realFraction) * 100
      setDisplayProgress((prev) => {
        const next = prev + (target - prev) * 0.09
        return next > 99.4 ? 100 : next
      })
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    setLoaderDone(true)
    gsap.to(heroScene, { intro: 1, duration: 1.8, ease: 'power3.out' })
  }, [ready, setLoaderDone])

  const done = displayProgress >= 100

  return (
    <motion.div
      className="fixed inset-0 z-[200]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {/* Ikki qora panel — ochilish */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[50.5%] bg-ink"
        animate={ready ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1], delay: 0.15 }}
      >
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[50.5%] bg-ink"
        animate={ready ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1], delay: 0.15 }}
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />
      </motion.div>

      {/* Kontent */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8"
        animate={ready ? { opacity: 0, scale: 1.06 } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={done ? { scale: [1, 1.12, 1], rotate: [0, 2, 0] } : { y: [0, -6, 0] }}
          transition={done ? { duration: 0.5 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <LogoMark size={72} />
        </motion.div>

        <div className="text-center">
          <div className="font-display text-[11px] font-semibold tracking-[0.42em] text-sand">
            WOK · SUSHI · LAVASH
          </div>
          <div className="mt-3 font-display text-2xl font-bold text-cream md:text-3xl">
            TA'M BOSHLANMOQDA
            <span className="dots" />
          </div>
        </div>

        <div className="w-56 md:w-72">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-[10px] font-semibold tracking-[0.3em] text-sand">YUKLANMOQDA</span>
            <span className="font-display text-xl font-bold text-ember tabular-nums">
              {Math.floor(displayProgress)}%
            </span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="gradient-fire h-full rounded-full transition-[width] duration-150 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
