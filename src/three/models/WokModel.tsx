/**
 * WOK — bosh qahramon.
 * Scroll hikoyasi: tarqoq masalliqlar wok ichiga uchib keladi,
 * olov alangalanadi, bug' ko'tariladi.
 */
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MATS } from '../materials'
import { shadowTexture } from '../textures'
import { heroScene } from '../../stores/sceneStore'
import { FireRing } from '../effects/FireRing'
import { Steam } from '../effects/Steam'

interface WokModelProps {
  detail?: 'high' | 'low'
  getProgress?: () => number
  steamOffset?: number
  fireScale?: number
  scatterDrop?: number
}

interface FlyItem {
  home: THREE.Vector3
  scatter: THREE.Vector3
  homeRot: THREE.Euler
  scatterRot: THREE.Euler
  phase: number
  bobPhase: number
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function randomScatter(minR: number, maxR: number, drop: number): THREE.Vector3 {
  const a = Math.random() * Math.PI * 2
  const r = minR + Math.random() * (maxR - minR)
  // Tarqoq holat wok atrofida qoladi — sarlavha ustiga chiqmasligi uchun pastda saqlanadi
  return new THREE.Vector3(Math.cos(a) * r, -0.3 + Math.random() * 1.2 - drop, Math.sin(a) * r * 0.6 - 0.45)
}

export function WokModel({
  detail = 'high',
  getProgress,
  steamOffset = 0,
  fireScale = 1,
  scatterDrop = 0,
}: WokModelProps) {
  const progress = getProgress ?? (() => heroScene.progress)

  const bowlGroup = useRef<THREE.Group>(null)
  const glowMat = useRef<THREE.MeshStandardMaterial>(null)
  const shadowMat = useRef<THREE.MeshBasicMaterial>(null)
  const flyRefs = useRef<(THREE.Object3D | null)[]>([])

  const high = detail === 'high'

  // ---- Noodle geometriyalari (kavisli trubalar) ----
  const noodleGeos = useMemo(() => {
    return Array.from({ length: high ? 9 : 6 }, () => {
      const pts: THREE.Vector3[] = []
      const lift = 0.12 + Math.random() * 0.3
      for (let j = 0; j < 5; j++) {
        pts.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.72,
            lift + Math.sin((j / 4) * Math.PI) * (0.1 + Math.random() * 0.16) + Math.random() * 0.05,
            (Math.random() - 0.5) * 0.72,
          ),
        )
      }
      const curve = new THREE.CatmullRomCurve3(pts)
      return new THREE.TubeGeometry(curve, 22, 0.024, 7, false)
    })
  }, [high])

  // ---- Uchuvchi masalliqlar: home/scatter joylashuvlari ----
  const flying = useMemo(() => {
    const items: FlyItem[] = []

    const push = (home: THREE.Vector3, rot: THREE.Euler) => {
      items.push({
        home,
        scatter: randomScatter(1.7, 3.1, scatterDrop),
        homeRot: rot,
        scatterRot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ),
        phase: Math.random() * 0.55,
        bobPhase: Math.random() * Math.PI * 2,
      })
    }

    // noodle home — wok markazida
    noodleGeos.forEach((_, i) => {
      push(
        new THREE.Vector3((Math.random() - 0.5) * 0.2, 0.1 + i * 0.055, (Math.random() - 0.5) * 0.2),
        new THREE.Euler(Math.random() * 0.6 - 0.3, Math.random() * Math.PI, Math.random() * 0.5 - 0.25),
      )
    })
    // sabzavotlar
    const vegCount = high ? 16 : 10
    for (let i = 0; i < vegCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.12 + Math.random() * 0.55
      push(
        new THREE.Vector3(Math.cos(a) * r, 0.28 + Math.random() * 0.3, Math.sin(a) * r),
        new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      )
    }
    // tovuq bo'laklari
    const meatCount = high ? 8 : 5
    for (let i = 0; i < meatCount; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 0.1 + Math.random() * 0.5
      push(
        new THREE.Vector3(Math.cos(a) * r, 0.3 + Math.random() * 0.32, Math.sin(a) * r),
        new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      )
    }
    return items
  }, [noodleGeos, high, scatterDrop])

  const shadowTex = useMemo(() => shadowTexture(), [])

  useFrame((state) => {
    const p = Math.min(1, Math.max(0, progress()))
    const t = state.clock.elapsedTime

    // Bowl sekin aylanadi + scroll bilan buriladi
    if (bowlGroup.current) {
      bowlGroup.current.rotation.y = t * 0.07 + p * 2.1
    }

    // Masalliqlar: scatter -> home
    const T0 = 0.06
    const T1 = 0.46
    flying.forEach((f, i) => {
      const obj = flyRefs.current[i]
      if (!obj) return
      const span = T1 - T0
      const local = Math.min(1, Math.max(0, (p - T0 - f.phase * 0.14) / (span * (1 - f.phase * 0.14))))
      const e = easeInOut(local)
      obj.position.lerpVectors(f.scatter, f.home, e)
      if (local < 1) {
        obj.position.y += Math.sin(t * 1.3 + f.bobPhase) * 0.07 * (1 - e)
      }
      obj.rotation.set(
        f.scatterRot.x + (f.homeRot.x - f.scatterRot.x) * e,
        f.scatterRot.y + (f.homeRot.y - f.scatterRot.y) * e + (1 - e) * t * 0.4,
        f.scatterRot.z + (f.homeRot.z - f.scatterRot.z) * e,
      )
      const settle = smoothstep(0.42, 0.6, p)
      if (settle > 0 && local >= 1) {
        // "tushib qolish" — kichik bounce
        obj.position.y += Math.sin(Math.min(1, settle) * Math.PI) * 0.015
      }
    })

    // Issiqlik — olov porlaganda
    const heat = smoothstep(0.46, 0.62, p) * (1 - smoothstep(0.8, 0.95, p) * 0.55)
    if (glowMat.current) {
      glowMat.current.emissiveIntensity = heat * 2.4
      glowMat.current.opacity = heat
    }
    if (shadowMat.current) {
      shadowMat.current.opacity = 0.34 + smoothstep(0.1, 0.5, p) * 0.3
    }
  })

  // Steam faqat p > 0.6 da
  const steamPhase = () => smoothstep(0.58, 0.78, progress()) * (1 - smoothstep(0.92, 1, progress()) * 0.35)
  const firePhase = () => smoothstep(0.46, 0.62, progress()) * (1 - smoothstep(0.78, 0.92, progress()) * 0.6)

  let flyIndex = 0
  const nextRef = () => {
    const idx = flyIndex++
    return (el: THREE.Object3D | null) => {
      flyRefs.current[idx] = el
    }
  }

  return (
    <group>
      {/* Wok tanasi */}
      <group ref={bowlGroup}>
        <mesh material={MATS.wokMetal}>
          <sphereGeometry args={[1.06, 56, 28, 0, Math.PI * 2, Math.PI / 2 - 0.18, Math.PI / 2 + 0.18]} />
        </mesh>
        {/* Tashqi qirra */}
        <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]} material={MATS.wokMetal}>
          <torusGeometry args={[1.045, 0.022, 12, 72]} />
        </mesh>
        {/* Ikkala qo'lqa */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 1.14, -0.02, 0]} rotation={[0, 0, Math.PI / 2]} material={MATS.wokMetal}>
            <cylinderGeometry args={[0.02, 0.028, 0.16, 10]} />
          </mesh>
        ))}

        {/* Sous qatlami — yaltiroq */}
        <mesh position={[0, 0.1, 0]} material={MATS.sauce}>
          <cylinderGeometry args={[0.78, 0.6, 0.06, 40]} />
        </mesh>

        {/* Nudellar — uchib keladi */}
        {noodleGeos.map((geo, i) => (
          <mesh key={`n${i}`} geometry={geo} ref={nextRef()} material={MATS.noodle} />
        ))}

        {/* Sabzavotlar: qalampir, sabzi, piyoz, makkajo'xori */}
        {Array.from({ length: high ? 16 : 10 }).map((_, i) => {
          const kind = i % 4
          if (kind === 0)
            return (
              <mesh key={`v${i}`} ref={nextRef()} material={i % 8 === 0 ? MATS.pepperGreen : MATS.pepperRed}>
                <boxGeometry args={[0.028, 0.028, 0.3]} />
              </mesh>
            )
          if (kind === 1)
            return (
              <mesh key={`v${i}`} ref={nextRef()} material={MATS.scallion}>
                <torusGeometry args={[0.035, 0.012, 8, 16]} />
              </mesh>
            )
          if (kind === 2)
            return (
              <mesh key={`v${i}`} ref={nextRef()} material={MATS.corn}>
                <sphereGeometry args={[0.03, 10, 8]} />
              </mesh>
            )
          return (
            <mesh key={`v${i}`} ref={nextRef()} material={MATS.onion}>
              <torusGeometry args={[0.045, 0.014, 8, 18, Math.PI * 1.2]} />
            </mesh>
          )
        })}

        {/* Tovuq bo'laklari */}
        {Array.from({ length: high ? 8 : 5 }).map((_, i) => (
          <mesh key={`m${i}`} ref={nextRef()} material={i % 3 === 0 ? MATS.beef : MATS.chicken}>
            <dodecahedronGeometry args={[0.055, 0]} />
          </mesh>
        ))}

        {/* Kunjut — tayyor bo'lganda paydo bo'ladi */}
        <SesameCluster detail={detail} />
      </group>

      {/* Ostki olov porloqi */}
      <mesh position={[0, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.16, 10, 40]} />
        <meshStandardMaterial
          ref={glowMat}
          color="#1c0a03"
          emissive="#ff5a1f"
          emissiveIntensity={0}
          transparent
          opacity={0}
          roughness={1}
        />
      </mesh>

      {/* Pastki alangalar */}
      <FireRing
        count={high ? 12 : 7}
        radius={0.78}
        scale={0.62 * fireScale}
        position={[0, -0.42, 0]}
        getIntensity={firePhase}
      />

      {/* Bug' */}
      <Steam
        count={high ? 18 : 9}
        position={[0, 0.55 + steamOffset, 0]}
        area={0.42}
        height={1.9}
        getPhase={steamPhase}
      />

      {/* Yumshoq soya */}
      <mesh position={[0, -1.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial ref={shadowMat} map={shadowTex} transparent opacity={0.34} depthWrite={false} />
      </mesh>
    </group>
  )
}

/** Tayyor ta'mga sepilgan kunjut */
function SesameCluster({ detail }: { detail: 'high' | 'low' }) {
  const group = useRef<THREE.Group>(null)
  const seeds = useMemo(() => {
    const n = detail === 'high' ? 26 : 14
    return Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * 0.62
      return [Math.cos(a) * r, 0.42 + Math.random() * 0.28, Math.sin(a) * r] as [number, number, number]
    })
  }, [detail])

  useFrame(() => {
    const p = Math.min(1, Math.max(0, heroScene.progress))
    const g = group.current
    if (!g) return
    const s = smoothstep(0.5, 0.68, p)
    g.visible = s > 0.01
    g.scale.setScalar(Math.max(0.001, s))
  })

  return (
    <group ref={group} scale={0.001}>
      {seeds.map((p, i) => (
        <mesh key={i} position={p} material={MATS.sesame}>
          <sphereGeometry args={[0.014, 6, 5]} />
        </mesh>
      ))}
    </group>
  )
}
