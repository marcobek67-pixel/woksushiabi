/**
 * SUSHI — maki rullar, nigiri, tayoqchalar.
 */
import { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import { MATS } from '../materials'

interface SushiModelProps {
  detail?: 'high' | 'low'
}

export function SushiModel({ detail = 'high' }: SushiModelProps) {
  const high = detail === 'high'

  const rolls = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        pos: [(i - 1) * 0.52, 0, i === 1 ? 0.1 : 0] as [number, number, number],
        rotY: (i - 1) * 0.22,
        lean: (i - 1) * 0.16,
        topping: i % 3,
      })),
    [],
  )

  return (
    <group>
      {rolls.map((r, i) => (
        <group key={i} position={r.pos} rotation={[r.lean, r.rotY, 0]}>
          {/* Nori tashqi */}
          <mesh material={MATS.nori}>
            <cylinderGeometry args={[0.27, 0.27, 0.19, 24]} />
          </mesh>
          {/* Guruch disklari (yuqori/pastki) */}
          <mesh position={[0, 0.099, 0]} material={MATS.rice}>
            <cylinderGeometry args={[0.245, 0.245, 0.012, 24]} />
          </mesh>
          <mesh position={[0, -0.099, 0]} material={MATS.rice}>
            <cylinderGeometry args={[0.245, 0.245, 0.012, 24]} />
          </mesh>
          {/* Ustki qatlam */}
          {r.topping === 0 && (
            <mesh position={[0, 0.118, 0]} material={MATS.salmon}>
              <cylinderGeometry args={[0.19, 0.19, 0.03, 20]} />
            </mesh>
          )}
          {r.topping === 1 && (
            <>
              <mesh position={[-0.06, 0.116, 0.02]} rotation={[0.1, 0.4, 0]} material={MATS.avocado}>
                <boxGeometry args={[0.16, 0.02, 0.1]} />
              </mesh>
              <mesh position={[0.07, 0.116, -0.04]} rotation={[0, -0.3, 0]} material={MATS.salmon}>
                <boxGeometry args={[0.14, 0.022, 0.09]} />
              </mesh>
            </>
          )}
          {r.topping === 2 && (
            <group position={[0, 0.125, 0]}>
              {Array.from({ length: high ? 7 : 4 }).map((_, k) => {
                const a = (k / 7) * Math.PI * 2
                return (
                  <mesh key={k} position={[Math.cos(a) * 0.1, 0, Math.sin(a) * 0.1]} material={MATS.roe}>
                    <sphereGeometry args={[0.026, 8, 6]} />
                  </mesh>
                )
              })}
            </group>
          )}
        </group>
      ))}

      {/* Nigiri x2 */}
      {[
        [-0.45, 0, 0.52] as [number, number, number],
        [0.12, 0, 0.58] as [number, number, number],
      ].map((pos, i) => (
        <group key={i} position={pos} rotation={[0, i === 0 ? 0.35 : -0.2, 0]}>
          <RoundedBox args={[0.42, 0.12, 0.18]} radius={0.045} smoothness={3} material={MATS.rice} />
          <RoundedBox
            args={[0.4, 0.055, 0.16]}
            radius={0.025}
            smoothness={3}
            position={[0, 0.08, 0]}
            rotation={[0.06, 0, 0.04]}
            material={i === 0 ? MATS.salmon : MATS.tuna}
          />
        </group>
      ))}

      {high && (
        <>
          {/* Gari (tuzlangan zanjabil) */}
          <group position={[0.42, 0.02, 0.42]}>
            {Array.from({ length: 4 }).map((_, i) => (
              <mesh
                key={i}
                position={[i * 0.05 - 0.07, i * 0.012, i * 0.02]}
                rotation={[0.3, i * 0.7, 0.2]}
                material={MATS.gari}
              >
                <sphereGeometry args={[0.05, 8, 6]} />
              </mesh>
            ))}
          </group>
          {/* Wasabi */}
          <mesh position={[-0.52, 0.03, 0.5]} rotation={[0, 0.5, 0]} material={MATS.wasabi}>
            <coneGeometry args={[0.05, 0.08, 10]} />
          </mesh>
        </>
      )}

      {/* Chopsticks — tayoqchalar */}
      <group position={[0.1, 0.05, -0.35]} rotation={[0, 0.5, 0.02]}>
        {[-0.025, 0.025].map((o, i) => (
          <mesh key={i} position={[o, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={MATS.wood}>
            <cylinderGeometry args={[0.012, 0.009, 1.05, 8]} />
          </mesh>
        ))}
      </group>

      {/* Yumshoq "to'plam" osti diski */}
      <mesh position={[0, -0.06, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 40]} />
        <meshStandardMaterial color="#121110" roughness={0.35} metalness={0.25} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}
