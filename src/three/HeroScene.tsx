/**
 * HERO 3D SAHNA — lavash (markaz), hotdog (chap), burger (o'ng).
 * Kamera parallaks + scroll hikoyasi + intro reveal.
 */
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { LavashModel } from './models/LavashModel'
import { HotDogModel } from './models/HotDogModel'
import { BurgerModel } from './models/BurgerModel'
import { heroScene } from '../stores/sceneStore'
import { useVisible } from './SceneWrappers'
import type { QualityTier } from '../hooks/useQuality'

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function CameraRig() {
  const { camera, size } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, -0.35, 0), [])
  const fit = THREE.MathUtils.clamp(1.25 / (size.width / size.height), 1, 1.7)

  useFrame((_, delta) => {
    const p = heroScene.progress
    let z = THREE.MathUtils.lerp(8.8, 6.4, smoothstep(0.06, 0.68, p))
    z = THREE.MathUtils.lerp(z, 3.6, smoothstep(0.8, 1, p))
    let y = THREE.MathUtils.lerp(1.45, 0.85, smoothstep(0.06, 0.68, p))
    y = THREE.MathUtils.lerp(y, 0.2, smoothstep(0.8, 1, p))
    z *= fit
    y *= fit

    camera.position.x = THREE.MathUtils.damp(camera.position.x, heroScene.mouseX * 0.6, 2.4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y + heroScene.mouseY * 0.3, 2.4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 2.4, delta)
    camera.lookAt(target)
  })
  return null
}

function FoodComposition({ tier }: { tier: QualityTier }) {
  const high = tier === 'high'
  const { size } = useThree()
  const portrait = size.width / size.height < 1
  const root = useRef<THREE.Group>(null)
  const lavash = useRef<THREE.Group>(null)
  const hotdog = useRef<THREE.Group>(null)
  const burger = useRef<THREE.Group>(null)

  useFrame((state) => {
    const p = heroScene.progress
    const intro = heroScene.intro
    const t = state.clock.elapsedTime
    const lift = portrait ? 0.6 : 0
    const spread = portrait ? 1.55 : 2.5
    const spreadR = portrait ? 1.6 : 2.55
    const sideDrop = portrait ? -0.8 : 0
    const sideScale = portrait ? 0.8 : 1

    if (root.current) {
      const s = 0.7 + 0.3 * intro
      root.current.scale.setScalar(s)
      root.current.position.y = -1.15 + lift - (1 - intro) * 1.6
    }
    if (lavash.current) {
      lavash.current.rotation.y = Math.sin(t * 0.22) * 0.08
      lavash.current.position.y = Math.sin(t * 0.6) * 0.04
    }
    const drift = smoothstep(0.08, 0.5, p)
    if (hotdog.current) {
      hotdog.current.position.set(
        -spread - drift * 2.6,
        sideDrop + 0.4 + Math.sin(t * 0.55) * 0.1 + drift * 0.7,
        -1.3 - drift * 1.4,
      )
      hotdog.current.rotation.y = 0.55 + t * 0.12 + drift * 1.8
      hotdog.current.rotation.z = drift * 0.5
      const sc = 0.78 * sideScale * (1 - drift * 0.45)
      hotdog.current.scale.setScalar(sc)
    }
    if (burger.current) {
      burger.current.position.set(
        spreadR + drift * 2.7,
        sideDrop + 0.15 + Math.sin(t * 0.5 + 2) * 0.1 + drift * 0.8,
        -1.0 - drift * 1.2,
      )
      burger.current.rotation.y = -0.4 - t * 0.1 - drift * 1.6
      burger.current.rotation.z = -drift * 0.4
      const sc = 0.8 * sideScale * (1 - drift * 0.45)
      burger.current.scale.setScalar(sc)
    }
  })

  return (
    <group ref={root}>
      <group ref={lavash}>
        <LavashModel detail={high ? 'high' : 'low'} />
      </group>
      <group ref={hotdog} position={[-2.5, 0.4, -1.3]} scale={0.78}>
        <HotDogModel detail={high ? 'high' : 'low'} />
      </group>
      <group ref={burger} position={[2.55, 0.15, -1.0]} scale={0.8}>
        <BurgerModel detail={high ? 'high' : 'low'} />
      </group>
    </group>
  )
}

export function HeroScene({ tier }: { tier: QualityTier }) {
  const high = tier === 'high'
  const { ref, visible, everVisible } = useVisible<HTMLDivElement>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      heroScene.mouseX = (e.clientX / window.innerWidth) * 2 - 1
      heroScene.mouseY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} className="absolute inset-0">
      {everVisible && (
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          style={{ position: 'absolute', inset: 0 }}
          dpr={high ? [1, 2] : [1, 1.5]}
          camera={{ position: [0, 1.45, 8.8], fov: 34, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <CameraRig />
          <ambientLight intensity={0.22} />
          <spotLight
            position={[4, 7, 4]}
            angle={0.5}
            penumbra={0.9}
            intensity={340}
            color="#ffd9ad"
            distance={40}
            decay={2}
          />
          <pointLight position={[-6, 2.5, -4]} intensity={55} color="#ff3d00" distance={25} decay={2} />
          <pointLight position={[5, 0.5, -3]} intensity={16} color="#e8b44a" distance={20} decay={2} />
          <pointLight position={[0, 3.4, 3.6]} intensity={42} color="#ffe3c0" distance={16} decay={2} />

          <Environment resolution={128} frames={1}>
            <Lightformer form="rect" intensity={2.2} color="#ffd9ad" position={[0, 5, -6]} scale={[8, 3, 1]} />
            <Lightformer
              form="rect"
              intensity={1.5}
              color="#ff5a1f"
              position={[-5, 1, -1]}
              rotation-y={Math.PI / 2}
              scale={[6, 1.6, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.1}
              color="#e8b44a"
              position={[5, 2, 0]}
              rotation-y={-Math.PI / 2}
              scale={[5, 1.4, 1]}
            />
            <Lightformer form="circle" intensity={0.7} color="#fff5e8" position={[0, 6, 2]} scale={2} />
          </Environment>

          <FoodComposition tier={tier} />
          <Sparkles
            count={high ? 80 : 30}
            scale={[11, 7, 4]}
            size={1.7}
            speed={0.16}
            color="#e8b44a"
            opacity={0.45}
          />

          {high && (
            <EffectComposer enableNormalPass={false}>
              <Bloom intensity={0.5} luminanceThreshold={0.36} luminanceSmoothing={0.7} mipmapBlur />
              <Vignette eskil={false} offset={0.22} darkness={0.75} />
            </EffectComposer>
          )}
        </Canvas>
      )}
    </div>
  )
}
