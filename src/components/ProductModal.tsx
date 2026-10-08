/**
 * MAHSULOT TAJRIBASI — to'liq ekran premium modal:
 * katta rasm, tarkib, qo'shimchalar narxi va telefon orqali buyurtma.
 */
import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Phone, Star, X } from 'lucide-react'
import { getProduct, categories } from '../data/menuData'
import { restaurantConfig } from '../config/restaurantConfig'
import { useUIStore } from '../stores/uiStore'
import { formatPrice } from '../utils/format'
import { stopScroll, startScroll } from '../utils/scroll'

const phoneHref = `tel:${restaurantConfig.contact.phone}`

export function ProductModal() {
  const activeProductId = useUIStore((s) => s.activeProductId)
  const setActiveProduct = useUIStore((s) => s.setActiveProduct)

  const imgRef = useRef<HTMLImageElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const product = activeProductId ? getProduct(activeProductId) : undefined
  const category = useMemo(
    () => categories.find((c) => c.id === product?.categoryId),
    [product?.categoryId],
  )

  // Modal ochilganda scrollni qulflash
  useEffect(() => {
    if (activeProductId) stopScroll()
    else startScroll()
  }, [activeProductId])

  // Escape
  useEffect(() => {
    if (!activeProductId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProduct(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProductId, setActiveProduct])

  if (!product || !category) return null

  const onImgMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    setTilt({ x: -y * 5, y: x * 6 })
  }

  return (
    <AnimatePresence>
      {activeProductId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[160] flex items-end justify-center bg-ink/80 backdrop-blur-md md:items-center md:p-8"
          onClick={() => setActiveProduct(null)}
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-white/8 bg-char md:grid-cols-2 md:overflow-hidden md:rounded-3xl"
          >
            {/* Yopish */}
            <button
              onClick={() => setActiveProduct(null)}
              aria-label="Yopish"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur-md transition-colors hover:bg-ember hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Rasm */}
            <div
              className="relative h-64 overflow-hidden md:h-auto md:min-h-[520px]"
              onMouseMove={onImgMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <motion.img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                className="h-full w-full object-cover"
                style={{ perspective: 800 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char/60 via-transparent to-transparent md:bg-gradient-to-r" />
              {product.popular && (
                <span className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-gold backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-gold" /> OMMABOP
                </span>
              )}
              {product.spicy && (
                <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-flame/85 px-3 py-1.5 text-[10px] font-bold tracking-wider text-cream">
                  <Flame className="h-3 w-3" /> ACHCHIQ
                </span>
              )}
            </div>

            {/* Ma'lumot */}
            <div className="flex flex-col p-6 md:p-9">
              <div className="text-[10px] font-bold tracking-[0.35em] text-ember">
                {category.emoji} {category.name}
              </div>
              <h3 className="mt-2 font-display text-3xl font-black leading-tight text-cream">
                {product.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">{product.description}</p>

              {/* Tarkib */}
              <div className="mt-5">
                <div className="mb-2.5 text-[10px] font-bold tracking-[0.3em] text-cream/50">
                  TARKIB
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-cream/75"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Qo'shimchalar — narxi bilan, ma'lumot sifatida */}
              {category.addons.length > 0 && (
                <div className="mt-5">
                  <div className="mb-2.5 text-[10px] font-bold tracking-[0.3em] text-cream/50">
                    QO'SHIMCHA
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.addons.map((a) => (
                      <span
                        key={a.id}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-cream/65"
                      >
                        {a.name}
                        {a.price > 0 && (
                          <span className="ml-1.5 text-gold/80">+{formatPrice(a.price)}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Narx + telefon orqali buyurtma */}
              <div className="mt-auto pt-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-cream/50">NARXI</div>
                    <div className="font-display text-2xl font-black text-gold">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  <div className="text-right text-[11px] leading-snug text-sand">
                    Qo'ng'iroq qilib
                    <br />
                    band qiling
                  </div>
                </div>

                <a
                  href={phoneHref}
                  className="group relative mt-5 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full gradient-fire py-4 font-display text-base font-extrabold tracking-wide text-ink shadow-[0_14px_50px_-12px_rgba(255,90,31,0.8)] transition-transform active:scale-[0.97]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Phone className="relative h-4.5 w-4.5" strokeWidth={2.6} />
                  <span className="relative">{restaurantConfig.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
