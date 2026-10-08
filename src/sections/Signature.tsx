/**
 * ABI'S SIGNATURE — eng ta'sirli taomlar, premium reklama uslubida.
 */
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Star } from 'lucide-react'
import { getSignatureProducts } from '../data/menuData'
import { restaurantConfig } from '../config/restaurantConfig'
import { useUIStore } from '../stores/uiStore'
import { formatPrice } from '../utils/format'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Signature() {
  const products = getSignatureProducts()
  const setActiveProduct = useUIStore((s) => s.setActiveProduct)

  return (
    <section id="signature" className="relative z-10 bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="ENG SARA TAOMLAR"
          title={
            <>
              ABI'S <span className="gradient-fire-text">SIGNATURE</span>
            </>
          }
        />

        <div className="mt-16 space-y-14 md:mt-24 md:space-y-24">
          {products.map((p, i) => (
            <SignatureRow key={p.id} index={i} productId={p.id} />
          ))}
        </div>
      </div>
    </section>
  )

  function SignatureRow({ index, productId }: { index: number; productId: string }) {
    const p = products.find((x) => x.id === productId)!
    const rowRef = useRef<HTMLDivElement>(null)
    const imgWrapRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
      target: rowRef,
      offset: ['start end', 'end start'],
    })
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40])
    const flip = index % 2 === 1

    return (
      <motion.div
        ref={rowRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
          flip ? 'md:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Rasm */}
        <motion.div
          ref={imgWrapRef}
          style={{ y: parallaxY }}
          className="group relative overflow-hidden rounded-[2rem] border border-white/8"
          data-cursor-grow
          onClick={() => setActiveProduct(p.id)}
        >
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="aspect-[4/3.2] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-gold backdrop-blur-sm">
            <Star className="h-3 w-3 fill-gold" /> SIGNATURE
          </div>
          <div className="pointer-events-none absolute -bottom-4 -right-2 select-none font-display text-[6rem] font-black leading-none text-cream/6 md:text-[9rem]">
            0{index + 1}
          </div>
        </motion.div>

        {/* Matn */}
        <div className={flip ? 'md:pr-6 md:text-right' : 'md:pl-6'}>
          <div className="text-[10px] font-bold tracking-[0.4em] text-ember">
            {p.categoryId.toUpperCase()}
          </div>
          <h3 className="mt-3 font-display text-3xl font-black leading-tight text-cream md:text-5xl">
            {p.name}
          </h3>
          <p
            className={`clamp-3 mt-4 max-w-md text-sm leading-relaxed text-sand md:text-base ${
              flip ? 'md:ml-auto' : ''
            }`}
          >
            {p.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.ingredients.slice(0, 4).map((ing) => (
              <span
                key={ing}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-cream/70"
              >
                {ing}
              </span>
            ))}
          </div>
          <div className={`mt-7 flex items-center gap-5 ${flip ? 'md:justify-end' : ''}`}>
            <span className="font-display text-2xl font-black text-gold">
              {formatPrice(p.price)}
            </span>
            <a
              href={`tel:${restaurantConfig.contact.phone}`}
              className="flex items-center gap-2 rounded-full gradient-fire px-6 py-3 text-xs font-extrabold tracking-wider text-ink shadow-[0_10px_36px_-10px_rgba(255,90,31,0.7)] transition-transform hover:scale-105 active:scale-95"
            >
              <Phone className="h-4 w-4" strokeWidth={2.6} />
              {restaurantConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </motion.div>
    )
  }
}
