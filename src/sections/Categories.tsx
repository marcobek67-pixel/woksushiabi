/**
 * "BUGUN NIMANI XOHLAYSAN?" — uchta ulkan interaktiv 3D obyekt:
 * WOK / SUSHI / LAVASH. Hover: aylanish, nur, matn, CTA.
 */
import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CategoryKind } from '../three/CategoryCanvas'
import { Scene3DBoundary } from '../three/SceneWrappers'
import { useUIStore } from '../stores/uiStore'
import { scrollToId } from '../utils/scroll'
import { useQuality } from '../hooks/useQuality'

// three.js chunk'i kechiktirib yuklanadi (PHASE 23)
const CategoryCanvas = lazy(() =>
  import('../three/CategoryCanvas').then((m) => ({ default: m.CategoryCanvas })),
)

const CARDS: Array<{
  kind: CategoryKind
  name: string
  emoji: string
  desc: string
  accent: string
  fallback: string
}> = [
  {
    kind: 'wok',
    name: 'WOK',
    emoji: '🍜',
    desc: "Olovda, wokda, bir zumda. Issiq nudel, go'sht va rang-barang sabzavotlar.",
    accent: '#ff5a1f',
    fallback: '/images/wok-signature.jpg',
  },
  {
    kind: 'sushi',
    name: 'SUSHI',
    emoji: '🍣',
    desc: "Yangi losos, krem sous va nozik guruch. Ustadan chiqqan rullar.",
    accent: '#e8b44a',
    fallback: '/images/sushi-signature.jpg',
  },
  {
    kind: 'lavash',
    name: 'LAVASH',
    emoji: '🌯',
    desc: "Grilda pishirilgan, issiq va to'yimli. Yo'l bo'yi eng yaxshi do'st.",
    accent: '#e8380d',
    fallback: '/images/lavash-signature.jpg',
  },
]

export function Categories() {
  const [hovered, setHovered] = useState<number | null>(null)
  const setMenuCategory = useUIStore((s) => s.setMenuCategory)
  const tier = useQuality()

  const openCategory = (kind: CategoryKind) => {
    setMenuCategory(kind)
    scrollToId('menu')
  }

  return (
    <section id="kategoriyalar" className="relative z-10 scroll-mt-24 bg-ink px-5 py-24 md:px-10 md:py-36">
      {/* Sarlavha */}
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center md:mb-20"
        >
          <div className="mb-4 text-[10px] font-bold tracking-[0.4em] text-ember md:text-xs">
            UCH YO'NALISH — BITTA JOY
          </div>
          <h2 className="font-display text-3xl font-black leading-tight text-cream md:text-6xl">
            BUGUN NIMANI
            <br />
            <span className="gradient-fire-text">XOHLAYSAN?</span>
          </h2>
        </motion.div>

        {/* Karta panellari */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-5">
          {CARDS.map((card, i) => (
            <motion.button
              key={card.kind}
              data-cat={card.kind}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => openCategory(card.kind)}
              className={`group relative block h-[62vh] min-h-[420px] overflow-hidden rounded-3xl border transition-all duration-500 md:h-[520px] ${
                hovered === i
                  ? 'border-ember/50 shadow-[0_30px_80px_-20px_rgba(255,90,31,0.35)]'
                  : 'border-white/8'
              }`}
              style={{ transitionDelay: '80ms' }}
            >
              {/* 3D yoki fallback */}
              {tier === 'off' ? (
                <img
                  src={card.fallback}
                  alt={card.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
              ) : (
                <Scene3DBoundary fallback={card.fallback} alt={card.name}>
                  <Suspense fallback={null}>
                    <CategoryCanvas kind={card.kind} accent={card.accent} hovered={hovered === i} />
                  </Suspense>
                </Scene3DBoundary>
              )}

              {/* Fon qatlamlari */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 85%, ${card.accent}26, transparent 70%)`,
                  opacity: hovered === i ? 1 : 0.4,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

              {/* Emoji + pastki matn */}
              <div className="absolute inset-x-0 bottom-0 p-7 text-left md:p-8">
                <div
                  className={`mb-3 text-4xl transition-transform duration-500 ${
                    hovered === i ? 'scale-110 -rotate-6' : ''
                  }`}
                >
                  {card.emoji}
                </div>
                <h3 className="font-display text-4xl font-black text-cream md:text-5xl">
                  {card.name}
                </h3>
                <div
                  className={`grid transition-all duration-500 ${
                    hovered === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-cream/75">
                      {card.desc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold tracking-widest text-cream transition-colors"
                      style={{ borderColor: `${card.accent}80` }}
                    >
                      KO'RISH <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Katta fon raqami */}
              <div className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-black leading-none text-white/4 md:text-[9rem]">
                0{i + 1}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Qo'shimcha yo'nalishlar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-sand"
        >
          <span>...va yana:</span>
          {['PITSA 🍕', 'VAFLI 🧇', 'SETLAR 🍱', 'SNACKS 🥟'].map((t) => (
            <button
              key={t}
              onClick={() => scrollToId('menu')}
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-bold text-cream/80 transition-colors hover:border-ember/60 hover:text-ember"
            >
              {t}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
