/**
 * FOOD CINEMA — olovli sahna: ulkan wok, alangalar, uchqunlar,
 * havoda aylanayotgan masalliqlar.
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { WokModel } from './models/WokModel'
import { FireRing } from './effects/FireRing'
import { Embers } from './effects/Embers'
import { Steam } from './effects/Steam'
import { cinemaScene } from '../stores/sceneStore'
import { useVisible } from './SceneWrappers'
import type { QualityTier } from '../hooks/useQuality'

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function CinemaCamera() {
  const { camera } = useThree()
  useFrame((state, delta) => {
    const p = cinemaScene.progress
    const t = state.clock.elapsedTime
    const angle = t * 0.055 + p * 0.55
    const radius = 7.6 - p * 1.6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 2, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.0 - p * 0.35, 2, delta)
    camera.lookAt(0, -0.45, 0)
  })
  return null
}

/** Havoda aylanayotgan masalliqlar — "tashlangan" ovqat */
function TossedIngredients({ high }: { high: boolean }) {
  const group = useRef<THREE.Group>(null)
  const items = useMemo(() => {
    const arr: Array<{
      home: [number, number, number]
      orbitR: number
      speed: number
      phase: number
      yBase: number
      kind: 'noodle' | 'pepper' | 'chicken'
    }> = []
    const n = high ? 14 : 8
    for (let i = 0; i < n; i++) {
      arr.push({
        home: [0, 0, 0],
        orbitR: 0.5 + Math.random() * 0.75,
        speed: 0.5 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        yBase: 0.9 + Math.random() * 1.1,
        kind: i % 3 === 0 ? 'noodle' : i % 3 === 1 ? 'pepper' : 'chicken',
      })
    }
    return arr
  }, [high])

  const noodleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0, 0),
      new THREE.Vector3(-0.08, 0.06, 0.02),
      new THREE.Vector3(0.06, -0.02, -0.02),
      new THREE.Vector3(0.2, 0.05, 0.01),
    ])
    return new THREE.TubeGeometry(curve, 16, 0.026, 6, false)
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y = t * 0.4
    g.children.forEach((child, i) => {
      const it = items[i]
      if (!it) return
      const a = t * it.speed + it.phase
      child.position.set(
        Math.cos(a) * it.orbitR,
        it.yBase + Math.sin(t * 1.6 + it.phase) * 0.22,
        Math.sin(a) * it.orbitR,
      )
      child.rotation.x += 0.02
      child.rotation.y += 0.015
    })
  })

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      {items.map((it, i) =>
        it.kind === 'noodle' ? (
          <mesh key={i} geometry={noodleGeo}>
            <meshStandardMaterial color="#e6b04c" roughness={0.55} />
          </mesh>
        ) : it.kind === 'pepper' ? (
          <mesh key={i}>
            <boxGeometry args={[0.03, 0.03, 0.3]} />
            <meshStandardMaterial color={i % 2 ? '#d5382a' : '#3f8f3a'} roughness={0.4} />
          </mesh>
        ) : (
          <mesh key={i}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color="#b5651d" roughness={0.65} />
          </mesh>
        ),
      )}
    </group>
  )
}

export function CinemaScene({ tier }: { tier: QualityTier }) {
  const high = tier === 'high'
  const { ref, visible, everVisible } = useVisible<HTMLDivElement>()

  const fireIntensity = () => 0.5 + smoothstep(0.05, 0.5, cinemaScene.progress) * 0.5
  const steamPhase = () => smoothstep(0.3, 0.65, cinemaScene.progress)

  return (
    <div ref={ref} className="absolute inset-0">
      {everVisible && (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          style={{ position: 'absolute', inset: 0 }}
          dpr={high ? [1, 1.75] : [1, 1.5]}
          camera={{ position: [0, 1, 7.6], fov: 36, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <CinemaCamera />
          <ambientLight intensity={0.1} />
          <pointLight position={[4, 6, 4]} intensity={120} color="#ffd9ad" distance={30} decay={2} />
          <pointLight position={[-5, 2, -3]} intensity={60} color="#ff3d00" distance={20} decay={2} />

          <group position={[0, -0.95, 0]} scale={1.5}>
            <WokModel detail={high ? 'high' : 'low'} getProgress={() => 1} steamOffset={0.1} />
          </group>

          <TossedIngredients high={high} />

          <FireRing
            count={high ? 20 : 12}
            radius={1.35}
            scale={1.5}
            position={[0, -0.55, 0]}
            getIntensity={fireIntensity}
          />
          <Embers count={high ? 100 : 45} area={1.6} height={3.4} position={[0, -0.3, 0]} getIntensity={fireIntensity} />
          <Steam count={high ? 22 : 10} position={[0, 0.75, 0]} area={0.6} height={2.4} getPhase={steamPhase} />

          {high && (
            <EffectComposer enableNormalPass={false}>
              <Bloom intensity={0.62} luminanceThreshold={0.42} luminanceSmoothing={0.65} mipmapBlur />
              <Vignette eskil={false} offset={0.18} darkness={0.85} />
            </EffectComposer>
          )}
        </Canvas>
      )}
    </div>
  )
}
