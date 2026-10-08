/**
 * MENYU — dinamik kategoriyalar + premium mahsulot kartalari.
 * Kartani bosish mahsulot modalini ochadi; buyurtma telefon orqali.
 */
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Flame, Star } from 'lucide-react'
import { categories, getProductsByCategory } from '../data/menuData'
import { useUIStore } from '../stores/uiStore'
import { formatPrice } from '../utils/format'
import { playSound } from '../utils/sound'
import { SectionHeading } from '../components/ui/SectionHeading'

export function MenuSection() {
  const menuCategory = useUIStore((s) => s.menuCategory)
  const setMenuCategory = useUIStore((s) => s.setMenuCategory)
  const setActiveProduct = useUIStore((s) => s.setActiveProduct)
  const soundEnabled = useUIStore((s) => s.soundEnabled)

  const products = getProductsByCategory(menuCategory)
  const activeCat = categories.find((c) => c.id === menuCategory) ?? categories[0]

  return (
    <section id="menu" className="relative z-10 scroll-mt-20 bg-coal px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow="BARCHASI MENYUDA" title={<>MENYU<span className="text-ember">.</span></>} />

        {/* Kategoriya tablari */}
        <div className="no-scrollbar -mx-5 mt-12 flex gap-2.5 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0">
          {categories.map((cat) => {
            const active = cat.id === menuCategory
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setMenuCategory(cat.id)
                  playSound('nav', soundEnabled)
                }}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wider transition-colors md:text-sm ${
                  active ? 'text-ink' : 'text-cream/60 hover:text-cream'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 rounded-full gradient-fire"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {cat.emoji} {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Kategoriya tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-6 text-center text-sm text-sand"
          >
            {activeCat.tagline}
          </motion.div>
        </AnimatePresence>

        {/* Mahsulotlar grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {products.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 34, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                data-card
                onClick={() => setActiveProduct(p.id)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/6 bg-char/60 transition-all duration-300 hover:border-ember/35 hover:shadow-[0_24px_70px_-24px_rgba(255,90,31,0.4)]"
              >
                {/* Rasm */}
                <div className="relative aspect-[4/3.4] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-char via-transparent to-transparent opacity-90" />

                  {/* Badge'lar */}
                  <div className="absolute left-4 top-4 flex gap-2">
                    {p.popular && (
                      <span className="flex items-center gap-1 rounded-full bg-ink/70 px-3 py-1.5 text-[10px] font-bold tracking-wider text-gold backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-gold" /> OMMABOP
                      </span>
                    )}
                    {p.isNew && (
                      <span className="rounded-full bg-mint/90 px-3 py-1.5 text-[10px] font-bold tracking-wider text-ink">
                        YANGI
                      </span>
                    )}
                  </div>
                  {p.spicy && (
                    <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-flame/85 px-3 py-1.5 text-[10px] font-bold tracking-wider text-cream backdrop-blur-sm">
                      <Flame className="h-3 w-3" /> ACHCHIQ
                    </span>
                  )}
                </div>

                {/* Ma'lumot */}
                <div className="relative p-5 pt-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold leading-snug text-cream">
                      {p.name}
                    </h3>
                  </div>
                  <p className="clamp-2 mt-1.5 text-[13px] leading-relaxed text-sand">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-gold">
                      {formatPrice(p.price)}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-white/12 px-3.5 py-2 text-[10px] font-extrabold tracking-widest text-cream/70 transition-colors group-hover:border-ember/60 group-hover:text-ember">
                      TAFSIL <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
