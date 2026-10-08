/**
 * LAVASH — batafsil, chiroyli, realistik rulet.
 */
import * as THREE from 'three'
import { useMemo } from 'react'

interface LavashModelProps {
  detail?: 'high' | 'low'
}

export function LavashModel({ detail = 'high' }: LavashModelProps) {
  const high = detail === 'high'

  const lavashMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f5e6c8', roughness: 0.7, metalness: 0 }),
    [],
  )
  const fillingMat1 = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c45a3c', roughness: 0.5, metalness: 0 }),
    [],
  )
  const fillingMat2 = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#6aa84f', roughness: 0.6, metalness: 0 }),
    [],
  )
  const fillingMat3 = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#f0d080', roughness: 0.5, metalness: 0 }),
    [],
  )
  const sauceMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#cc1a1a', roughness: 0.3, metalness: 0 }),
    [],
  )
  const paperMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#e8dcc8', roughness: 0.8, metalness: 0 }),
    [],
  )

  const fillings = useMemo(() => {
    const mats = [fillingMat1, fillingMat2, fillingMat3]
    return Array.from({ length: high ? 15 : 8 }, (_, i) => ({
      mat: mats[i % 3],
      pos: [
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28,
        (Math.random() - 0.5) * 0.28,
      ] as [number, number, number],
      rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [number, number, number],
      s: 0.6 + Math.random() * 0.8,
    }))
  }, [high, fillingMat1, fillingMat2, fillingMat3])

  return (
    <group>
      {/* Asosiy lavash ruleti */}
      <group rotation={[0, 0.3, Math.PI / 2 + 0.15]} position={[-0.15, 0, 0]}>
        <mesh material={lavashMat}>
          <cylinderGeometry args={[0.2, 0.195, 1.1, 28, 1]} />
        </mesh>

        {/* Lavash uchlari */}
        <mesh position={[0, 0.555, 0]} material={lavashMat}>
          <circleGeometry args={[0.195, 24]} />
        </mesh>
        <mesh position={[0, -0.555, 0]} rotation={[Math.PI, 0, 0]} material={lavashMat}>
          <circleGeometry args={[0.2, 24]} />
        </mesh>

        {/* Qog'oz o'ram */}
        <mesh position={[0, -0.35, 0]} material={paperMat}>
          <cylinderGeometry args={[0.205, 0.205, 0.4, 28, 1, true]} />
        </mesh>

        {/* Qog'oz burmalari */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh
              key={`paper-fold-${i}`}
              position={[Math.cos(angle) * 0.205, -0.35, Math.sin(angle) * 0.205]}
              rotation={[0, angle, 0.2]}
              material={paperMat}
            >
              <boxGeometry args={[0.03, 0.08, 0.02]} />
            </mesh>
          )
        })}
      </group>

      {/* Kesilgan bo'lak */}
      <group position={[0.35, 0.18, 0.15]} rotation={[0.25, -0.35, -0.12]}>
        <mesh material={lavashMat}>
          <cylinderGeometry args={[0.195, 0.2, 0.45, 26, 1]} />
        </mesh>

        {/* Ichki yuzasi */}
        <mesh position={[0, 0.228, 0]} material={lavashMat}>
          <circleGeometry args={[0.195, 24]} />
        </mesh>

        {/* Ichliklar */}
        <group position={[0, 0.25, 0]}>
          {fillings.map((f, i) => (
            <mesh key={i} position={f.pos} rotation={f.rot} scale={f.s} material={f.mat}>
              <boxGeometry args={[0.06, 0.045, 0.055]} />
            </mesh>
          ))}

          {/* Sous izi */}
          <mesh position={[0.03, 0.06, 0]} rotation={[Math.PI / 2, 0, 0.6]} material={sauceMat}>
            <torusGeometry args={[0.08, 0.016, 10, 24, Math.PI * 1.5]} />
          </mesh>
        </group>
      </group>

      {high && (
        <>
          {/* Kichik bo'lak */}
          <group position={[-0.45, -0.05, 0.2]} rotation={[1.2, 0.4, 0.9]}>
            <mesh material={lavashMat}>
              <cylinderGeometry args={[0.15, 0.15, 0.42, 22, 1]} />
            </mesh>
            <mesh position={[0, 0.213, 0]} material={lavashMat}>
              <circleGeometry args={[0.15, 20]} />
            </mesh>
          </group>

          {/* Tomchilagan sous */}
          <mesh position={[0.58, -0.15, 0.08]} rotation={[-Math.PI / 2, 0, 0]} material={sauceMat}>
            <circleGeometry args={[0.07, 18]} />
          </mesh>
        </>
      )}
    </group>
  )
}
