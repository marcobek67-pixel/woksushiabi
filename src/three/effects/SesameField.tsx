/**
 * Uchib yuruvchi kunjut urug'lari — sahna bo'ylab sekin suzadi.
 * Hero atmosferasi uchun.
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface SesameFieldProps {
  count?: number
  spread?: [number, number, number]
  center?: [number, number, number]
}

interface SesameSeed {
  pos: THREE.Vector3
  rotSpeed: number
  bobSpeed: number
  phase: number
  bobAmp: number
}

export function SesameField({ count = 42, spread = [7, 4.5, 3], center = [0, 0.5, 0] }: SesameFieldProps) {
  const group = useRef<THREE.Group>(null)
  const seeds = useMemo<SesameSeed[]>(
    () =>
      Array.from({ length: count }, () => ({
        pos: new THREE.Vector3(
          center[0] + (Math.random() - 0.5) * 2 * spread[0],
          center[1] + (Math.random() - 0.5) * 2 * spread[1],
          center[2] + (Math.random() - 0.5) * 2 * spread[2],
        ),
        rotSpeed: (Math.random() - 0.5) * 1.4,
        bobSpeed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        bobAmp: 0.06 + Math.random() * 0.14,
      })),
    [count, spread, center],
  )
  const seedGeo = useMemo(() => new THREE.SphereGeometry(0.016, 8, 6), [])
  const seedMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f8f4e8', roughness: 0.4 }),
    [],
  )

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < g.children.length; i++) {
      const m = g.children[i] as THREE.Mesh
      const s = seeds[i]
      m.position.y = s.pos.y + Math.sin(t * s.bobSpeed + s.phase) * s.bobAmp
      m.position.x = s.pos.x + Math.sin(t * 0.16 + s.phase) * 0.12
      m.rotation.x += 0.006 * s.rotSpeed * 60 * 0.016
      m.rotation.y += 0.004 * s.rotSpeed
      m.scale.setScalar(0.8 + Math.abs(Math.sin(t * s.bobSpeed + s.phase)) * 0.5)
    }
  })

  return (
    <group ref={group}>
      {seeds.map((_, i) => (
        <mesh key={i} geometry={seedGeo} material={seedMat} position={[0, 0, 0]} />
      ))}
    </group>
  )
}
