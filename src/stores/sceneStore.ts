/**
 * GSAP ScrollTrigger va R3F useFrame o'rtasidagi "ko'prik".
 * React re-render'siz, 60 FPS'da yoziladigan/o'qiladigan mutable holat.
 */

export const heroScene = {
  /** Hero pinned timeline scrub progress 0..1 */
  progress: 0,
  /** Intro reveal 0..1 (loader tugagandan keyin) */
  intro: 0,
  /** Mouse parallax -1..1 */
  mouseX: 0,
  mouseY: 0,
}

/** Food Cinema pinned scrub progress 0..1 */
export const cinemaScene = {
  progress: 0,
}
