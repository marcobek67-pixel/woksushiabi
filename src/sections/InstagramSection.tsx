/**
 * ABI BILAN INSTAGRAMDA — placeholder galereya (real postlar bilan almashadi).
 */
import { motion } from 'framer-motion'
import { InstagramIcon } from '../components/ui/icons'
import { instagramTiles } from '../data/instagramData'
import { restaurantConfig } from '../config/restaurantConfig'
import { SectionHeading } from '../components/ui/SectionHeading'

export function InstagramSection() {
  return (
    <section id="instagram" className="relative z-10 scroll-mt-20 bg-ink px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow={`${restaurantConfig.instagram.handle} · ${restaurantConfig.brand.city}`}
          title={
            <>
              ABI BILAN <span className="gradient-fire-text">INSTAGRAMDA</span>
            </>
          }
        />

        {/* Grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {instagramTiles.map((tile, i) => (
            <motion.a
              key={i}
              href={tile.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/6"
              data-cursor-grow
            >
              <img
                src={tile.image}
                alt={tile.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full gradient-fire">
                    <InstagramIcon className="h-3.5 w-3.5 text-ink" />
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-cream/90">
                    KO'RISH
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug text-cream/85">
                  {tile.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Obuna CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <p className="text-center text-sm text-sand">
            Yangi taomlar, backstage va aksiyalar — birinchi bo'lib Instagram'da.
          </p>
          <a
            href={restaurantConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-cream transition-all hover:border-ember/70 hover:text-ember"
          >
            <InstagramIcon className="h-4.5 w-4.5 transition-transform group-hover:scale-110" />
            @{restaurantConfig.instagram.handle}
            <span className="h-1.5 w-1.5 rounded-full bg-ember transition-transform group-hover:scale-150" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
