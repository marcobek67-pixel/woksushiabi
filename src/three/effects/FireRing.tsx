/**
 * Alanga halqasi — sprite alangalar + yoriluvchi nur.
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { flameTexture } from '../textures'

interface FireRingProps {
  count?: number
  radius?: number
  getIntensity: () => number
  position?: [number, number, number]
  scale?: number
  lightColor?: string
}

interface FlameSeed {
  angle: number
  size: number
  speed: number
  phase: number
  color: THREE.Color
  tilt: number
}

const FLAME_COLORS = ['#ffd27a', '#ffb35c', '#ff8a2a', '#ff6a1f', '#ffc46b']

export function FireRing({
  count = 14,
  radius = 0.95,
  getIntensity,
  position = [0, 0, 0],
  scale = 1,
  lightColor = '#ff6a1f',
}: FireRingProps) {
  const tex = useMemo(() => flameTexture(), [])
  const seeds = useMemo<FlameSeed[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 + Math.random() * 0.35,
        size: (0.5 + Math.random() * 0.55) * scale,
        speed: 1.6 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
        color: new THREE.Color(FLAME_COLORS[i % FLAME_COLORS.length]),
        tilt: (Math.random() - 0.5) * 0.7,
      })),
    [count, scale],
  )
  const matRefs = useRef<(THREE.SpriteMaterial | null)[]>([])
  const group = useRef<THREE.Group>(null)
  const light = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const intensity = Math.max(0, Math.min(1, getIntensity()))
    g.visible = intensity > 0.02
    if (!g.visible) return

    const t = state.clock.elapsedTime
    // g.children ichida pointLight ham bor — faqat sprite'lar bo'yicha aylanamiz
    for (let i = 0; i < seeds.length; i++) {
      const sp = g.children[i] as THREE.Sprite
      const s = seeds[i]
      const flicker = 0.62 + Math.abs(Math.sin(t * s.speed + s.phase)) * 0.38
      const a = s.angle + t * 0.14
      sp.position.set(Math.cos(a) * radius, Math.sin(t * s.speed * 0.7 + s.phase) * 0.05 * scale, Math.sin(a) * radius)
      const sz = s.size * flicker * intensity
      sp.scale.set(sz, sz * (1.5 + flicker * 0.6), 1)
      const mat = matRefs.current[i]
      if (mat) mat.opacity = flicker * 0.85 * intensity
    }
    if (light.current) {
      light.current.intensity =
        intensity * (7 + Math.abs(Math.sin(t * 9.2)) * 4 + Math.sin(t * 5.7) * 2)
    }
  })

  return (
    <group ref={group} position={position}>
      {seeds.map((s, i) => (
        <sprite key={i}>
          <spriteMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            map={tex}
            color={s.color}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0}
            rotation={s.tilt}
          />
        </sprite>
      ))}
      <pointLight ref={light} color={lightColor} intensity={0} distance={9} decay={2} position={[0, 0.35, 0]} />
    </group>
  )
}
