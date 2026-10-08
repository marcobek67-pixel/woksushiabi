/**
 * LAVASH — grinilda pishirilgan rulet, kesilgan bo'lagi bilan.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATS } from '../materials'
import { lavashTexture } from '../textures'

interface LavashModelProps {
  detail?: 'high' | 'low'
}

export function LavashModel({ detail = 'high' }: LavashModelProps) {
  const high = detail === 'high'
  const tex = useMemo(() => lavashTexture(), [])
  const lavashMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0,
      }),
    [tex],
  )

  const filling = useMemo(() => {
    const colors = [MATS.chicken, MATS.lettuce, MATS.cabbage, MATS.cucumber, MATS.tomato]
    return Array.from({ length: high ? 12 : 7 }, (_, i) => ({
      mat: colors[i % colors.length],
      pos: [
        (Math.random() - 0.5) * 0.24,
        (Math.random() - 0.5) * 0.24,
        (Math.random() - 0.5) * 0.24,
      ] as [number, number, number],
      rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [number, number, number],
      s: 0.5 + Math.random() * 0.9,
    }))
  }, [high])

  return (
    <group>
      {/* Asosiy roll — gorizontal yotgan */}
      <group rotation={[0, 0.3, Math.PI / 2 + 0.12]} position={[-0.12, 0, 0]}>
        <mesh material={lavashMat}>
          <cylinderGeometry args={[0.19, 0.185, 1.0, 26, 1]} />
        </mesh>
        {/* Uchidan ko'rinadac ichlik */}
        <mesh position={[0, 0.505, 0]} material={MATS.bread}>
          <circleGeometry args={[0.185, 24]} />
        </mesh>
        <mesh position={[0, -0.505, 0]} rotation={[Math.PI, 0, 0]} material={MATS.bread}>
          <circleGeometry args={[0.19, 24]} />
        </mesh>
        {/* Qog'oz o'ram */}
        <mesh position={[0, -0.31, 0]} material={MATS.paper}>
          <cylinderGeometry args={[0.197, 0.197, 0.36, 26, 1, true]} />
        </mesh>
      </group>

      {/* Kesilgan bo'lak — ichi ko'rinadi */}
      <group position={[0.32, 0.16, 0.12]} rotation={[0.25, -0.35, -0.12]}>
        <mesh material={lavashMat}>
          <cylinderGeometry args={[0.185, 0.19, 0.42, 24, 1]} />
        </mesh>
        {/* Ichki yuzasi */}
        <mesh position={[0, 0.213, 0]} material={MATS.bread}>
          <circleGeometry args={[0.185, 24]} />
        </mesh>
        {/* Ichlik klasteri */}
        <group position={[0, 0.23, 0]}>
          {filling.map((f, i) => (
            <mesh key={i} position={f.pos} rotation={f.rot} scale={f.s} material={f.mat}>
              <boxGeometry args={[0.055, 0.04, 0.05]} />
            </mesh>
          ))}
          {/* Sous izi */}
          <mesh position={[0.02, 0.05, 0]} rotation={[Math.PI / 2, 0, 0.6]} material={MATS.cheese}>
            <torusGeometry args={[0.07, 0.014, 8, 22, Math.PI * 1.4]} />
          </mesh>
        </group>
      </group>

      {high && (
        <>
          {/* Yonidagi kichik bo'lak */}
          <group position={[-0.42, -0.02, 0.18]} rotation={[1.2, 0.4, 0.9]}>
            <mesh material={lavashMat}>
              <cylinderGeometry args={[0.14, 0.14, 0.4, 20, 1]} />
            </mesh>
            <mesh position={[0, 0.203, 0]} material={MATS.bread}>
              <circleGeometry args={[0.14, 20]} />
            </mesh>
          </group>
          {/* Tomchilagan sous */}
          <mesh position={[0.55, -0.12, 0.05]} rotation={[-Math.PI / 2, 0, 0]} material={MATS.sauce}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>
        </>
      )}
    </group>
  )
}
