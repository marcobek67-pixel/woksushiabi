/**
 * Protsedural canvas teksturalar — tashqi fayl kerak emas,
 * hamma narsa brauzerda generatsiya qilinadi.
 */
import * as THREE from 'three'

function makeCanvas(size: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('canvas 2d unavailable')
  return [c, ctx]
}

let _steam: THREE.CanvasTexture | null = null
export function steamTexture(): THREE.CanvasTexture {
  if (_steam) return _steam
  const [c, ctx] = makeCanvas(128)
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,0.6)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.26)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.08)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  _steam = new THREE.CanvasTexture(c)
  return _steam
}

let _flame: THREE.CanvasTexture | null = null
export function flameTexture(): THREE.CanvasTexture {
  if (_flame) return _flame
  const [c, ctx] = makeCanvas(128)
  // Alanga shakli: past keng, yuqori tor
  const g = ctx.createRadialGradient(64, 84, 4, 64, 74, 58)
  g.addColorStop(0, 'rgba(255,236,170,1)')
  g.addColorStop(0.25, 'rgba(255,170,60,0.9)')
  g.addColorStop(0.55, 'rgba(232,56,13,0.55)')
  g.addColorStop(1, 'rgba(120,20,0,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.ellipse(64, 78, 52, 58, 0, 0, Math.PI * 2)
  ctx.fill()
  _flame = new THREE.CanvasTexture(c)
  return _flame
}

let _dot: THREE.CanvasTexture | null = null
export function dotTexture(): THREE.CanvasTexture {
  if (_dot) return _dot
  const [c, ctx] = makeCanvas(64)
  const g = ctx.createRadialGradient(32, 32, 1, 32, 32, 30)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.5)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  _dot = new THREE.CanvasTexture(c)
  return _dot
}

let _lavash: THREE.CanvasTexture | null = null
/** Lavash xamiri: oltin rang + grill dog'lari */
export function lavashTexture(): THREE.CanvasTexture {
  if (_lavash) return _lavash
  const [c, ctx] = makeCanvas(512)
  ctx.fillStyle = '#e9c98f'
  ctx.fillRect(0, 0, 512, 512)
  // Yumshoq gorizontal tolalar
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = `rgba(214,178,116,${0.06 + Math.random() * 0.08})`
    const y = Math.random() * 512
    ctx.fillRect(0, y, 512, 1 + Math.random() * 3)
  }
  // Grill dog'lari
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = 2 + Math.random() * 7
    const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
    const alpha = 0.12 + Math.random() * 0.3
    grd.addColorStop(0, `rgba(120,70,20,${alpha})`)
    grd.addColorStop(1, 'rgba(120,70,20,0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
  _lavash = new THREE.CanvasTexture(c)
  _lavash.wrapS = _lavash.wrapT = THREE.RepeatWrapping
  return _lavash
}

let _shadow: THREE.CanvasTexture | null = null
/** Yumshoq radial soyali doira (wok ostiga) */
export function shadowTexture(): THREE.CanvasTexture {
  if (_shadow) return _shadow
  const [c, ctx] = makeCanvas(256)
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 128)
  g.addColorStop(0, 'rgba(0,0,0,0.55)')
  g.addColorStop(0.6, 'rgba(0,0,0,0.22)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  _shadow = new THREE.CanvasTexture(c)
  return _shadow
}
