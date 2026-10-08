/**
 * UI ovozlari — WebAudio bilan generatsiya qilinadi (fayl kerak emas).
 * Ovoz DEFAULT HOLATDA O'CHIQ. soundStore orqali yoqiladi.
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(freq: number, start: number, dur: number, type: OscillatorType, gain: number) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime + start)
  g.gain.setValueAtTime(0, c.currentTime + start)
  g.gain.linearRampToValueAtTime(gain, c.currentTime + start + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur)
  osc.connect(g).connect(c.destination)
  osc.start(c.currentTime + start)
  osc.stop(c.currentTime + start + dur + 0.05)
}

export type SoundName = 'click' | 'nav'

export function playSound(name: SoundName, enabled: boolean) {
  if (!enabled) return
  try {
    switch (name) {
      case 'click':
        tone(2200, 0, 0.05, 'sine', 0.04)
        break
      case 'nav':
        tone(1400, 0, 0.04, 'sine', 0.03)
        tone(2100, 0.03, 0.05, 'sine', 0.025)
        break
    }
  } catch {
    // audio not available — jim o'tkazib yuborish
  }
}
