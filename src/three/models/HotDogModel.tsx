/**
 * HOT-DOG — batafsil, chiroyli, realistik.
 */
import * as THREE from 'three'
import { useMemo } from 'react'

interface HotDogModelProps {
  detail?: 'high' | 'low'
}

export function HotDogModel({ detail = 'high' }: HotDogModelProps) {
  const high = detail === 'high'

  const bunMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f0d080', roughness: 0.65, metalness: 0.02 }),
    [],
  )
  const bunInnerMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f5e6c8', roughness: 0.8, metalness: 0 }),
    [],
  )
  const sausageMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#a8322a', roughness: 0.4, metalness: 0.05 }),
    [],
  )
  const mustardMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.25, metalness: 0.05 }),
    [],
  )
  const ketchupMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cc1a1a', roughness: 0.2, metalness: 0.05 }),
    [],
  )
  const sesameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f5f0e0', roughness: 0.3, metalness: 0 }),
    [],
  )

  return (
    <group rotation={[0, 0.3, Math.PI / 10]}>
      {/* Pastki non yarmi */}
      <mesh position={[0, -0.15, 0]} material={bunMat}>
        <capsuleGeometry args={[0.18, 0.65, 12, 24]} />
      </mesh>

      {/* Non ichki qismi */}
      <mesh position={[0, -0.08, 0]} material={bunInnerMat}>
        <capsuleGeometry args={[0.15, 0.6, 10, 20]} />
      </mesh>

      {/* Kolbasa */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={sausageMat}>
        <cylinderGeometry args={[0.065, 0.065, 0.75, 20]} />
      </mesh>

      {/* Kolbasa uchlari */}
      <mesh position={[0, 0.05, 0.38]} rotation={[Math.PI / 2, 0, 0]} material={sausageMat}>
        <sphereGeometry args={[0.065, 16, 12]} />
      </mesh>
      <mesh position={[0, 0.05, -0.38]} rotation={[Math.PI / 2, 0, 0]} material={sausageMat}>
        <sphereGeometry args={[0.065, 16, 12]} />
      </mesh>

      {/* Yuqori non yarmi */}
      <mesh position={[0, 0.18, 0]} material={bunMat}>
        <capsuleGeometry args={[0.18, 0.65, 12, 24]} />
      </mesh>

      {/* Gorchitsa zigzag chizig'i */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`mustard-${i}`}
          position={[-0.25 + i * 0.1, 0.22, 0.1]}
          rotation={[0, 0, (i % 2 === 0 ? 1 : -1) * 0.3]}
          material={mustardMat}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
        </mesh>
      ))}

      {/* Ketchup zigzag chizig'i */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`ketchup-${i}`}
          position={[-0.25 + i * 0.1, 0.2, -0.08]}
          rotation={[0, 0, (i % 2 === 0 ? -1 : 1) * 0.3]}
          material={ketchupMat}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
        </mesh>
      ))}

      {high && (
        <>
          {/* Kunjut donalari */}
          {Array.from({ length: 15 }).map((_, i) => {
            const angle = (i / 15) * Math.PI * 2
            const x = Math.cos(angle) * 0.16
            const z = Math.sin(angle) * 0.08
            return (
              <mesh
                key={`sesame-${i}`}
                position={[x, 0.32, z]}
                rotation={[Math.random(), Math.random(), Math.random()]}
                material={sesameMat}
              >
                <sphereGeometry args={[0.008, 6, 6]} />
              </mesh>
            )
          })}

          {/* Qo'shimcha kunjut */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh
              key={`sesame2-${i}`}
              position={[(Math.random() - 0.5) * 0.3, 0.33, (Math.random() - 0.5) * 0.15]}
              rotation={[Math.random(), Math.random(), Math.random()]}
              material={sesameMat}
            >
              <sphereGeometry args={[0.007, 6, 6]} />
            </mesh>
          ))}
        </>
      )}
    </group>
  )
}
