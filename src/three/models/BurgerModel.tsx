/**
 * BURGER — batafsil, chiroyli, realistik qatlamlar bilan.
 */
import * as THREE from 'three'
import { useMemo } from 'react'

interface BurgerModelProps {
  detail?: 'high' | 'low'
}

export function BurgerModel({ detail = 'high' }: BurgerModelProps) {
  const high = detail === 'high'

  const bunTopMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f0d080', roughness: 0.6, metalness: 0.02 }),
    [],
  )
  const bunBottomMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8c878', roughness: 0.65, metalness: 0.02 }),
    [],
  )
  const pattyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#4a2510', roughness: 0.7, metalness: 0.05 }),
    [],
  )
  const cheeseMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffd700', roughness: 0.3, metalness: 0.05 }),
    [],
  )
  const lettuceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#5a9a3a', roughness: 0.6, metalness: 0 }),
    [],
  )
  const tomatoMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d43030', roughness: 0.4, metalness: 0 }),
    [],
  )
  const onionMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f5f0e8', roughness: 0.5, metalness: 0 }),
    [],
  )
  const sesameMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f5f0e0', roughness: 0.3, metalness: 0 }),
    [],
  )

  return (
    <group rotation={[0, -0.3, 0]}>
      {/* Pastki non */}
      <mesh position={[0, -0.28, 0]} material={bunBottomMat}>
        <cylinderGeometry args={[0.24, 0.22, 0.1, 28]} />
      </mesh>

      {/* Salat bargi */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={lettuceMat}>
        <circleGeometry args={[0.23, 24]} />
      </mesh>

      {/* Salat bargi chetlari */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`lettuce-${i}`}
            position={[Math.cos(angle) * 0.2, -0.19, Math.sin(angle) * 0.2]}
            rotation={[0.3, angle, 0]}
            material={lettuceMat}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
          </mesh>
        )
      })}

      {/* Pomidor bo'laklari */}
      {[0.1, -0.1].map((x, i) => (
        <mesh key={`tomato-${i}`} position={[x, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]} material={tomatoMat}>
          <circleGeometry args={[0.07, 16]} />
        </mesh>
      ))}

      {/* Piyoz halqalari */}
      <mesh position={[0, -0.12, 0.08]} rotation={[Math.PI / 2, 0, 0.3]} material={onionMat}>
        <torusGeometry args={[0.05, 0.015, 8, 16]} />
      </mesh>
      <mesh position={[0.08, -0.12, -0.05]} rotation={[Math.PI / 2, 0, -0.2]} material={onionMat}>
        <torusGeometry args={[0.04, 0.012, 8, 16]} />
      </mesh>

      {/* Kotlet */}
      <mesh position={[0, -0.04, 0]} material={pattyMat}>
        <cylinderGeometry args={[0.22, 0.21, 0.12, 28]} />
      </mesh>

      {/* Pishloq */}
      <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]} material={cheeseMat}>
        <planeGeometry args={[0.42, 0.42]} />
      </mesh>

      {/* Pishloq osilib tushgan chetlari */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, i) => (
        <mesh
          key={`drip-${i}`}
          position={[Math.cos(rot) * 0.21, 0, Math.sin(rot) * 0.21]}
          rotation={[0.5, rot, 0]}
          material={cheeseMat}
        >
          <boxGeometry args={[0.08, 0.1, 0.025]} />
        </mesh>
      ))}

      {/* Yuqori non */}
      <mesh position={[0, 0.16, 0]} material={bunTopMat}>
        <sphereGeometry args={[0.23, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {high && (
        <>
          {/* Kunjut donalari */}
          {Array.from({ length: 20 }).map((_, i) => {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * 0.9
            const r = 0.23
            return (
              <mesh
                key={`sesame-${i}`}
                position={[
                  r * Math.sin(phi) * Math.cos(theta),
                  r * Math.cos(phi) + 0.16,
                  r * Math.sin(phi) * Math.sin(theta),
                ]}
                rotation={[Math.random(), Math.random(), Math.random()]}
                material={sesameMat}
              >
                <sphereGeometry args={[0.009, 6, 6]} />
              </mesh>
            )
          })}
        </>
      )}
    </group>
  )
}
