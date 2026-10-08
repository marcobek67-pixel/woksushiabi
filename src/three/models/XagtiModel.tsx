/**
 * XAGTI — go'sht va sabzavotli lavash uslubidagi o'ram.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATS } from '../materials'

interface XagtiModelProps {
  detail?: 'high' | 'low'
}

export function XagtiModel({ detail = 'high' }: XagtiModelProps) {
  const high = detail === 'high'

  const wrapMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d4a85e', roughness: 0.7, metalness: 0 }),
    [],
  )
  const grillMarkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3a2810', roughness: 0.6, metalness: 0 }),
    [],
  )

  return (
    <group rotation={[0.2, 0.5, Math.PI / 6]}>
      {/* Asosiy o'ram - silindr shaklida */}
      <mesh material={wrapMat}>
        <cylinderGeometry args={[0.17, 0.165, 0.85, 24, 1]} />
      </mesh>

      {/* Grill izlari */}
      {[0, 0.3, 0.6].map((offset, i) => (
        <mesh key={`grill-${i}`} position={[0.14, offset - 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={grillMarkMat}>
          <boxGeometry args={[0.015, 0.7, 0.02]} />
        </mesh>
      ))}
      {[-0.3, 0, 0.3].map((offset, i) => (
        <mesh key={`grill2-${i}`} position={[-0.12, offset, 0.1]} rotation={[0, 0, Math.PI / 2]} material={grillMarkMat}>
          <boxGeometry args={[0.012, 0.6, 0.015]} />
        </mesh>
      ))}

      {/* Uchidan ko'rinadigan ichlik */}
      <mesh position={[0, 0.43, 0]} material={MATS.bread}>
        <circleGeometry args={[0.165, 20]} />
      </mesh>
      <mesh position={[0, -0.43, 0]} rotation={[Math.PI, 0, 0]} material={MATS.bread}>
        <circleGeometry args={[0.17, 20]} />
      </mesh>

      {/* Ichki qatlam - go'sht rangi */}
      <mesh position={[0, 0.435, 0]} material={MATS.chicken}>
        <circleGeometry args={[0.12, 16]} />
      </mesh>

      {high && (
        <>
          {/* Yon tomondagi kichik bo'lak */}
          <group position={[0.28, -0.05, 0.15]} rotation={[0.8, 0.3, 1.2]}>
            <mesh material={wrapMat}>
              <cylinderGeometry args={[0.12, 0.115, 0.35, 20, 1]} />
            </mesh>
            <mesh position={[0, 0.18, 0]} material={MATS.bread}>
              <circleGeometry args={[0.115, 16]} />
            </mesh>
          </group>

          {/* Sous tomchisi */}
          <mesh position={[0.22, -0.25, 0.08]} rotation={[-Math.PI / 2, 0, 0]} material={MATS.sauce}>
            <circleGeometry args={[0.045, 12]} />
          </mesh>
        </>
      )}
    </group>
  )
}
