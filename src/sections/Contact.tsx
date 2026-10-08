/**
 * QAYERDAMIZ? — aloqa bo'limi.
 * Ma'lumotlar manbasi: Instagram @woksushi_lavash_abi + berilgan koordinatalar.
 * Ish vaqti hali kiritilmagan — restaurantConfig.ts'dan to'ldiriladi.
 */
import { motion } from 'framer-motion'
import { Clock, MapPin, Phone, Navigation } from 'lucide-react'
import { InstagramIcon } from '../components/ui/icons'
import { restaurantConfig } from '../config/restaurantConfig'
import { SectionHeading } from '../components/ui/SectionHeading'

const { contact, instagram, brand } = restaurantConfig
const phoneHref = `tel:${contact.phone}`

export function Contact() {
  return (
    <section
      id="qayerdamiz"
      className="relative z-10 scroll-mt-20 overflow-hidden bg-coal px-5 py-24 md:px-10 md:py-36"
    >
      {/* Fon nur */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_85%_20%,rgba(255,90,31,0.07),transparent_70%)]" />

      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Matn + kartalar */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="ALOQA"
            title={
              <>
                QAYERDA<span className="gradient-fire-text">MIZ?</span>
              </>
            }
          />

          <div className="mt-10 space-y-3">
            <a href={phoneHref}>
              <InfoCard icon={<Phone className="h-5 w-5" />} label="TELEFON" value={contact.phoneDisplay} hint="Bosib qo'ng'iroq qiling" />
            </a>
            <a href={contact.mapUrl} target="_blank" rel="noreferrer">
              <InfoCard
                icon={<MapPin className="h-5 w-5" />}
                label="MANZIL"
                value={contact.addressStreet}
                hint={`${brand.city} · xaritada ochish`}
              />
            </a>
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              label="ISH VAQTI"
              value={contact.hours || "Kiritilmadi — restaurantConfig.ts'da to'ldiring"}
              hint={contact.hours ? undefined : 'Maʼlumotnomani toʻldiring'}
              muted={!contact.hours}
            />
          </div>

          {/* Tugmalar qatori */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-6 py-3.5 text-xs font-extrabold tracking-widest text-ink transition-transform hover:scale-105 active:scale-95"
            >
              <Navigation className="h-4 w-4" /> GOOGLE MAPS
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-xs font-extrabold tracking-widest text-cream transition-colors hover:border-ember/70 hover:text-ember"
            >
              <Phone className="h-4 w-4" /> QO'NG'IROQ
            </a>
            <a
              href={instagram.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3.5 text-xs font-extrabold tracking-widest text-cream transition-colors hover:border-ember/70 hover:text-ember"
            >
              <InstagramIcon className="h-4 w-4" /> INSTAGRAM
            </a>
          </motion.div>
        </div>

        {/* Jonli xarita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/4.1] overflow-hidden rounded-[2rem] border border-white/8 bg-ink md:aspect-[4/3.2]"
        >
          <iframe
            title={`${brand.name} — ${contact.addressDisplay}`}
            src={contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
            style={{ filter: 'invert(0.92) hue-rotate(185deg) saturate(0.55) contrast(0.92)' }}
          />
          {/* Kontrast uchun ustki qatlam */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

          {/* Manzil kartochkasi */}
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/10 bg-ink/80 px-4 py-3 backdrop-blur-md md:inset-x-4 md:bottom-4 md:gap-3 md:px-5 md:py-4">
            <div className="min-w-0">
              <div className="text-[10px] font-bold tracking-[0.3em] text-ember">MANZIL</div>
              <div className="clamp-2 mt-1 text-sm font-bold text-cream">
                {contact.addressDisplay}
              </div>
              <div className="mt-0.5 hidden text-[11px] tabular-nums text-sand md:block">
                {contact.lat.toFixed(5)}, {contact.lng.toFixed(5)}
              </div>
            </div>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full gradient-fire px-4 py-2.5 text-[10px] font-extrabold tracking-widest text-ink"
            >
              <Navigation className="h-3.5 w-3.5" /> MARSHRUT
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function InfoCard({
  icon,
  label,
  value,
  hint,
  muted,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
  muted?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-char/60 p-5 text-left transition-all hover:border-ember/45 hover:bg-char ${
        muted ? 'cursor-default hover:border-white/8' : ''
      }`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ember/25 bg-ember/10 text-ember">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold tracking-[0.3em] text-sand">{label}</span>
        <span className={`mt-1 block text-sm font-bold ${muted ? 'text-sand' : 'text-cream'}`}>
          {value}
        </span>
        {hint && (
          <span className="mt-0.5 block text-[11px] text-sand/70 opacity-0 transition-opacity group-hover:opacity-100">
            {hint}
          </span>
        )}
      </span>
    </motion.div>
  )
}
