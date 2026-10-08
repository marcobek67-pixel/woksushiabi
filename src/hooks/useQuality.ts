import { useEffect, useState } from 'react'

export type QualityTier = 'high' | 'low' | 'off'

function detectTier(): QualityTier {
  if (typeof window === 'undefined') return 'high'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return 'off'

  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
  const isCoarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency ?? 8
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8

  // Juda past darajadagi qurilmalar — 2.5D fallback
  if (isMobileViewport && (cores <= 4 || memory <= 2)) return 'off'

  try {
    const canvas = document.createElement('canvas')
    if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) return 'off'
  } catch {
    return 'off'
  }

  if (isMobileViewport || isCoarse) return 'low'
  return 'high'
}

export function useQuality(): QualityTier {
  const [tier, setTier] = useState<QualityTier>('high')

  useEffect(() => {
    setTier(detectTier())
  }, [])

  return tier
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

/** Custom cursor faqat aniq ko'rsatkichli qurilmalarda (desktop). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches && !mq2.matches)
    const mq2 = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mq.addEventListener('change', update)
    mq2.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      mq2.removeEventListener('change', update)
    }
  }, [])
  return fine
}
