/**
 * Bug' — sprite'lardan iborat ko'tariluvchi bulut.
 * getPhase() 0..1 qaytarsa, shu miqdorda "bug'lanadi".
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { steamTexture } from '../textures'

interface SteamProps {
  count?: number
  getPhase?: () => number
  area?: number
  height?: number
  position?: [number, number, number]
  color?: string
}

interface SteamSeed {
  seed: number
  speed: number
  x: number
  z: number
  size: number
  delay: number
  drift: number
}

export function Steam({
  count = 16,
  getPhase,
  area = 0.55,
  height = 1.8,
  position = [0, 0, 0],
  color = '#ffe9d6',
}: SteamProps) {
  const tex = useMemo(() => steamTexture(), [])
  const seeds = useMemo<SteamSeed[]>(
    () =>
      Array.from({ length: count }, () => ({
        seed: Math.random() * 100,
        speed: 0.28 + Math.random() * 0.4,
        x: (Math.random() - 0.5) * 2 * area,
        z: (Math.random() - 0.5) * area,
        size: 0.55 + Math.random() * 0.75,
        delay: Math.random(),
        drift: 0.5 + Math.random() * 0.9,
      })),
    [count, area],
  )
  const matRefs = useRef<(THREE.SpriteMaterial | null)[]>([])
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const phase = getPhase ? Math.max(0, Math.min(1, getPhase())) : 1
    const visible = phase > 0.02
    g.visible = visible
    if (!visible) return

    const t = state.clock.elapsedTime
    for (let i = 0; i < g.children.length; i++) {
      const sp = g.children[i] as THREE.Sprite
      const s = seeds[i]
      const cycle = (t * s.speed + s.delay) % 1
      sp.position.set(
        s.x + Math.sin(t * 0.5 + s.seed) * 0.16 * cycle * s.drift,
        cycle * height,
        s.z + Math.cos(t * 0.4 + s.seed) * 0.08 * cycle,
      )
      const scale = s.size * (0.3 + cycle * 1.5)
      sp.scale.set(scale, scale * 1.25, 1)
      const mat = matRefs.current[i]
      if (mat) mat.opacity = Math.sin(cycle * Math.PI) * 0.3 * phase
    }
  })

  return (
    <group ref={group} position={position}>
      {seeds.map((s, i) => (
        <sprite key={i} position={[s.x, 0, s.z]}>
          <spriteMaterial
            ref={(el) => {
              matRefs.current[i] = el
            }}
            map={tex}
            color={color}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0}
          />
        </sprite>
      ))}
    </group>
  )
}
