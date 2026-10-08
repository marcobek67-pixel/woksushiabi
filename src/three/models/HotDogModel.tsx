/**
 * HOT-DOG — non ichida kolbasa, gorchitsa va ketchup.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATS } from '../materials'

interface HotDogModelProps {
  detail?: 'high' | 'low'
}

export function HotDogModel({ detail = 'high' }: HotDogModelProps) {
  const high = detail === 'high'

  const bunMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8c97a', roughness: 0.75, metalness: 0 }),
    [],
  )
  const sausageMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c45a3c', roughness: 0.5, metalness: 0 }),
    [],
  )
  const mustardMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f2d42a', roughness: 0.3, metalness: 0 }),
    [],
  )
  const ketchupMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cc2222', roughness: 0.2, metalness: 0 }),
    [],
  )

  return (
    <group rotation={[0, 0.4, Math.PI / 12]}>
      {/* Non - ikki yarmi */}
      <mesh position={[-0.05, -0.12, 0]} material={bunMat}>
        <capsuleGeometry args={[0.16, 0.7, 8, 16]} />
      </mesh>
      <mesh position={[0.05, 0.12, 0]} material={bunMat}>
        <capsuleGeometry args={[0.16, 0.7, 8, 16]} />
      </mesh>

      {/* Kolbasa */}
      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={sausageMat}>
        <cylinderGeometry args={[0.055, 0.055, 0.72, 16]} />
      </mesh>

      {/* Gorchitsa zigzag */}
      <mesh position={[0, 0.18, 0.08]} rotation={[-Math.PI / 2, 0, 0]} material={mustardMat}>
        <torusGeometry args={[0.06, 0.012, 8, 20, Math.PI * 1.5]} />
      </mesh>

      {/* Ketchup zigzag */}
      <mesh position={[0, 0.16, -0.06]} rotation={[-Math.PI / 2, 0, 0.3]} material={ketchupMat}>
        <torusGeometry args={[0.055, 0.01, 8, 18, Math.PI * 1.4]} />
      </mesh>

      {high && (
        <>
          {/* Piyoz bo'laklari */}
          {[0.15, -0.15].map((x, i) => (
            <mesh key={i} position={[x, 0.19, 0]} rotation={[0.3, 0, 0.5]} material={MATS.onion}>
              <boxGeometry args={[0.04, 0.03, 0.04]} />
            </mesh>
          ))}
          {/* Non ustidagi kunjut */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={`sesame-${i}`}
              position={[
                (Math.random() - 0.5) * 0.25,
                0.28 + Math.random() * 0.04,
                (Math.random() - 0.5) * 0.12,
              ]}
              rotation={[Math.random(), Math.random(), Math.random()]}
              material={MATS.sesame}
            >
              <sphereGeometry args={[0.008, 6, 6]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
