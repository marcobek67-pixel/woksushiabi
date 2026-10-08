/**
 * Kategoriya kartasi uchun kichik 3D sahna.
 * Hover: tezroq aylanish + accent nur + kattalashish.
 */
import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { LavashModel } from './models/LavashModel'
import { HotDogModel } from './models/HotDogModel'
import { BurgerModel } from './models/BurgerModel'
import { XagtiModel } from './models/XagtiModel'
import { useVisible } from './SceneWrappers'

export type CategoryKind = 'lavash' | 'hotdog' | 'burger' | 'xagti' | 'doner' | 'snacks'

function RotatingModel({ kind, hovered }: { kind: CategoryKind; hovered: boolean }) {
  const group = useRef<THREE.Group>(null)
  const hoverAmount = useRef(0)
  const { size, camera } = useThree()

  useFrame((state, delta) => {
    const fit = THREE.MathUtils.clamp(1.1 / (size.width / size.height), 1, 1.55)
    const cam = camera as THREE.PerspectiveCamera
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 5.2 * fit, 3, delta)
    cam.lookAt(0, -0.1, 0)

    const g = group.current
    if (!g) return
    const target = hovered ? 1 : 0
    hoverAmount.current = THREE.MathUtils.damp(hoverAmount.current, target, 4, delta)
    const h = hoverAmount.current
    const t = state.clock.elapsedTime
    g.rotation.y = t * (0.22 + h * 0.75)
    g.position.y = -0.55 + Math.sin(t * 0.8) * 0.05 + h * 0.08
    g.scale.setScalar(1.06 + h * 0.08)
  })

  return (
    <group ref={group}>
      {kind === 'lavash' && <LavashModel detail="low" />}
      {kind === 'hotdog' && <HotDogModel detail="low" />}
      {kind === 'burger' && <BurgerModel detail="low" />}
      {kind === 'xagti' && <XagtiModel detail="low" />}
      {kind === 'doner' && <XagtiModel detail="low" />}
      {kind === 'snacks' && <HotDogModel detail="low" />}
    </group>
  )
}

export function CategoryCanvas({
  kind,
  accent,
  hovered,
}: {
  kind: CategoryKind
  accent: string
  hovered: boolean
}) {
  const { ref, visible, everVisible } = useVisible<HTMLDivElement>('120px')
  const rimRef = useRef<THREE.PointLight>(null)

  return (
    <div ref={ref} className="absolute inset-0">
      {everVisible && (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          style={{ position: 'absolute', inset: 0 }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.1, 5.2], fov: 34 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[3, 5, 3]}
            angle={0.5}
            penumbra={0.9}
            intensity={200}
            color="#ffd9ad"
            distance={25}
            decay={2}
          />
          <pointLight position={[0, 2.4, 2.6]} intensity={26} color="#ffe3c0" distance={12} decay={2} />
          <pointLight ref={rimRef} position={[-3.5, 1.5, -2.5]} intensity={hovered ? 34 : 20} color={accent} distance={14} decay={2} />
          <pointLight position={[2.6, -0.6, -2.8]} intensity={14} color="#ffb066" distance={12} decay={2} />
          <RotatingModel kind={kind} hovered={hovered} />
        </Canvas>
      )}
    </div>
  )
}
