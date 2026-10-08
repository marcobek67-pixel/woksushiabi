/**
 * BUGUNGI KAYFIYAT — aksiyalar.
 * ⚠ promotions.ts dagi placeholder'lar aniq belgilangan.
 */
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { promotions } from '../data/promotions'
import { useUIStore } from '../stores/uiStore'
import { scrollToId } from '../utils/scroll'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Promotions() {
  const setMenuCategory = useUIStore((s) => s.setMenuCategory)

  if (promotions.length === 0) {
    return (
      <section id="aksiyalar" className="relative z-10 scroll-mt-20 bg-coal px-5 py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionHeading eyebrow="YAKINDA" title="BUGUNGI KAYFIYAT" />
          <p className="mt-6 text-sand">
            Aksiyalar hozircha yo'q — yangi takliflar tez orada paydo bo'ladi.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="aksiyalar" className="relative z-10 scroll-mt-20 overflow-hidden bg-coal px-5 py-24 md:px-10 md:py-36">
      {/* Fon nur */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,90,31,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="AKSIYALAR"
          title={
            <>
              BUGUNGI <span className="gradient-fire-text">KAYFIYAT</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-3xl border p-7 transition-colors ${
                promo.isPlaceholder
                  ? 'border-dashed border-ember/35 bg-char/40'
                  : 'border-white/8 bg-char/60'
              }`}
            >
              {promo.image && (
                <>
                  <img
                    src={promo.image}
                    alt={promo.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-15 transition-all duration-700 group-hover:scale-110 group-hover:opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/80 to-coal/40" />
                </>
              )}

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full gradient-fire px-4 py-1.5 font-display text-[11px] font-extrabold tracking-widest text-ink">
                    <Sparkles className="h-3 w-3" />
                    {promo.badge}
                  </span>
                  {promo.isPlaceholder && (
                    <span className="rounded-full border border-white/15 px-2.5 py-1 text-[9px] font-bold tracking-[0.2em] text-sand/80">
                      PLACEHOLDER
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-display text-2xl font-black leading-snug text-cream">
                  {promo.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sand">{promo.description}</p>

                <button
                  onClick={() => {
                    setMenuCategory('setlar')
                    scrollToId('menu')
                  }}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-ember transition-transform hover:translate-x-1"
                >
                  KO'RISH <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-sand/60">
          Haqiqiy aksiya shartlari <span className="text-ember/80">src/data/promotions.ts</span>{' '}
          faylida to'ldiriladi — ommaviy tasdiqlanmagan aksiya ko'rsatilmaydi.
        </p>
      </div>
    </section>
  )
}
