/**
 * BURGER — non, kotlet, pishloq, sabzavot qatlamlari.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATS } from '../materials'

interface BurgerModelProps {
  detail?: 'high' | 'low'
}

export function BurgerModel({ detail = 'high' }: BurgerModelProps) {
  const high = detail === 'high'

  const bunTopMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8c97a', roughness: 0.7, metalness: 0 }),
    [],
  )
  const bunBottomMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#dcc28a', roughness: 0.75, metalness: 0 }),
    [],
  )
  const pattyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#5a3018', roughness: 0.6, metalness: 0 }),
    [],
  )
  const cheeseSliceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f7d84a', roughness: 0.35, metalness: 0 }),
    [],
  )
  const lettuceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#6aa84f', roughness: 0.5, metalness: 0 }),
    [],
  )
  const tomatoSliceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d43030', roughness: 0.4, metalness: 0 }),
    [],
  )

  return (
    <group rotation={[0, -0.3, 0]}>
      {/* Pastki non */}
      <mesh position={[0, -0.22, 0]} material={bunBottomMat}>
        <cylinderGeometry args={[0.22, 0.2, 0.08, 24]} />
      </mesh>

      {/* Salat bargi */}
      <mesh position={[0, -0.14, 0]} rotation={[Math.PI / 2, 0, 0]} material={lettuceMat}>
        <circleGeometry args={[0.21, 20]} />
      </mesh>

      {/* Pomidor bo'laklari */}
      {[0.08, -0.08].map((x, i) => (
        <mesh key={`tomato-${i}`} position={[x, -0.09, 0]} rotation={[Math.PI / 2, 0, 0]} material={tomatoSliceMat}>
          <circleGeometry args={[0.06, 12]} />
        </mesh>
      ))}

      {/* Kotlet */}
      <mesh position={[0, -0.02, 0]} material={pattyMat}>
        <cylinderGeometry args={[0.2, 0.19, 0.1, 24]} />
      </mesh>

      {/* Pishloq - eriydigan */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} material={cheeseSliceMat}>
        <planeGeometry args={[0.38, 0.38]} />
      </mesh>
      {/* Pishloq chetlari osilib tushgan */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
        <mesh
          key={`drip-${i}`}
          position={[Math.cos(rot) * 0.19, 0.02, Math.sin(rot) * 0.19]}
          rotation={[0.4, rot, 0]}
          material={cheeseSliceMat}
        >
          <boxGeometry args={[0.06, 0.08, 0.02]} />
        </mesh>
      ))}

      {/* Yuqori non */}
      <mesh position={[0, 0.14, 0]} material={bunTopMat}>
        <sphereGeometry args={[0.21, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {high && (
        <>
          {/* Non ustidagi kunjut */}
          {Array.from({ length: 12 }).map((_, i) => {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * 0.8
            const r = 0.21
            return (
              <mesh
                key={`sesame-${i}`}
                position={[
                  r * Math.sin(phi) * Math.cos(theta),
                  r * Math.cos(phi) + 0.14,
                  r * Math.sin(phi) * Math.sin(theta),
                ]}
                rotation={[Math.random(), Math.random(), Math.random()]}
                material={MATS.sesame}
              >
                <sphereGeometry args={[0.007, 6, 6]} />
              </mesh>
            )
          })}
          {/* Sous tomchisi yon tomonda */}
          <mesh position={[0.18, -0.05, 0.1]} rotation={[0.3, 0, 0]} material={MATS.sauce}>
            <sphereGeometry args={[0.025, 8, 8]} />
          </mesh>
        </>
      )}
    </group>
  )
}
