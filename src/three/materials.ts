/**
 * Umumiy materiallar — dastur sonini kamaytirish uchun.
 */
import * as THREE from 'three'

export const MATS = {
  rice: new THREE.MeshStandardMaterial({ color: '#f3eee2', roughness: 0.9, metalness: 0 }),
  nori: new THREE.MeshStandardMaterial({ color: '#191a1c', roughness: 0.45, metalness: 0.05 }),
  salmon: new THREE.MeshStandardMaterial({ color: '#ff7a4d', roughness: 0.32, metalness: 0.05 }),
  tuna: new THREE.MeshStandardMaterial({ color: '#d7263d', roughness: 0.32, metalness: 0.05 }),
  avocado: new THREE.MeshStandardMaterial({ color: '#8bb84f', roughness: 0.5, metalness: 0 }),
  cucumber: new THREE.MeshStandardMaterial({ color: '#cfe8b0', roughness: 0.4, metalness: 0 }),
  roe: new THREE.MeshStandardMaterial({ color: '#ff5a1f', roughness: 0.25, metalness: 0.1 }),
  cheese: new THREE.MeshStandardMaterial({ color: '#f7e8b0', roughness: 0.35, metalness: 0 }),
  wokMetal: new THREE.MeshStandardMaterial({
    color: '#17181c',
    metalness: 0.9,
    roughness: 0.3,
    side: THREE.DoubleSide,
  }),
  noodle: new THREE.MeshStandardMaterial({ color: '#e6b04c', roughness: 0.55, metalness: 0.05 }),
  chicken: new THREE.MeshStandardMaterial({ color: '#b5651d', roughness: 0.65, metalness: 0.02 }),
  beef: new THREE.MeshStandardMaterial({ color: '#7a3b1e', roughness: 0.6, metalness: 0.02 }),
  pepperRed: new THREE.MeshStandardMaterial({ color: '#d5382a', roughness: 0.4, metalness: 0 }),
  pepperGreen: new THREE.MeshStandardMaterial({ color: '#3f8f3a', roughness: 0.4, metalness: 0 }),
  corn: new THREE.MeshStandardMaterial({ color: '#f2c230', roughness: 0.35, metalness: 0.05 }),
  onion: new THREE.MeshStandardMaterial({ color: '#a07bc4', roughness: 0.4, metalness: 0 }),
  scallion: new THREE.MeshStandardMaterial({ color: '#7fb069', roughness: 0.45, metalness: 0 }),
  sesame: new THREE.MeshStandardMaterial({ color: '#f8f4e8', roughness: 0.4, metalness: 0 }),
  sauce: new THREE.MeshStandardMaterial({ color: '#38200c', roughness: 0.12, metalness: 0.15 }),
  wood: new THREE.MeshStandardMaterial({ color: '#2a1f14', roughness: 0.7, metalness: 0 }),
  gari: new THREE.MeshStandardMaterial({ color: '#f0a48c', roughness: 0.6, metalness: 0 }),
  wasabi: new THREE.MeshStandardMaterial({ color: '#6ea832', roughness: 0.6, metalness: 0 }),
  paper: new THREE.MeshStandardMaterial({ color: '#efe7d8', roughness: 0.85, metalness: 0 }),
  cabbage: new THREE.MeshStandardMaterial({ color: '#9b4d8f', roughness: 0.5, metalness: 0 }),
  lettuce: new THREE.MeshStandardMaterial({ color: '#7fb069', roughness: 0.5, metalness: 0 }),
  tomato: new THREE.MeshStandardMaterial({ color: '#d5382a', roughness: 0.4, metalness: 0 }),
  bread: new THREE.MeshStandardMaterial({ color: '#e8d9b8', roughness: 0.8, metalness: 0 }),
} as const
