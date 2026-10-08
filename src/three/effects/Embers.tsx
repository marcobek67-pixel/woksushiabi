/**
 * Uchqunlar (embers) — ko'tariluvchi olov zarralari.
 * Fire Cinema sahnnasi va hero'dagi olov uchun.
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { dotTexture } from '../textures'

interface EmbersProps {
  count?: number
  getIntensity?: () => number
  area?: number
  height?: number
  position?: [number, number, number]
}

export function Embers({
  count = 70,
  getIntensity,
  area = 1.1,
  height = 2.6,
  position = [0, 0, 0],
}: EmbersProps) {
  const tex = useMemo(() => dotTexture(), [])
  const matRef = useRef<THREE.PointsMaterial>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = Array.from({ length: count }, () => ({
      speed: 0.4 + Math.random() * 0.8,
      delay: Math.random(),
      x: (Math.random() - 0.5) * 2 * area,
      z: (Math.random() - 0.5) * area,
      wig: Math.random() * 10,
    }))
    return { positions, seeds }
  }, [count, area])

  useFrame((state) => {
    const pts = pointsRef.current
    const mat = matRef.current
    if (!pts || !mat) return
    const intensity = getIntensity ? Math.max(0, Math.min(1, getIntensity())) : 1
    pts.visible = intensity > 0.02
    if (!pts.visible) return

    const t = state.clock.elapsedTime
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      const s = seeds[i]
      const cycle = (t * s.speed + s.delay) % 1
      attr.setX(i, s.x + Math.sin(t * 1.6 + s.wig) * 0.12)
      attr.setY(i, cycle * height + Math.sin(cycle * Math.PI) * 0.1)
      attr.setZ(i, s.z + Math.cos(t * 1.2 + s.wig) * 0.08)
    }
    attr.needsUpdate = true
    mat.opacity = Math.min(0.95, intensity * (0.65 + Math.sin(t * 7) * 0.2))
    mat.size = 0.05 + Math.abs(Math.sin(t * 3.1)) * 0.035
  })

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        map={tex}
        color="#ffb35c"
        size={0.06}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0}
        sizeAttenuation
      />
    </points>
  )
}
