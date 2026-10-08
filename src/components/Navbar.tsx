/**
 * Navbar — boshida shaffof, scroll'da glass.
 * Desktop: havolalar + Instagram + telefon bilan buyurtma.
 * Mobile: to'liq ekranli animatsiyali menyu.
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Volume2, VolumeX, X, Phone } from 'lucide-react'
import { InstagramIcon } from './ui/icons'
import { Logo, LogoMark } from './ui/Logo'
import { MagneticButton } from './ui/MagneticButton'
import { useUIStore } from '../stores/uiStore'
import { restaurantConfig } from '../config/restaurantConfig'
import { scrollToId } from '../utils/scroll'
import { playSound } from '../utils/sound'
import type { CategoryId } from '../data/products'

const NAV_LINKS: Array<{ label: string; id: string; category?: CategoryId }> = [
  { label: 'MENYU', id: 'menu' },
  { label: 'WOK', id: 'menu', category: 'wok' },
  { label: 'SUSHI', id: 'menu', category: 'sushi' },
  { label: 'LAVASH', id: 'menu', category: 'lavash' },
  { label: 'AKSIYALAR', id: 'aksiyalar' },
  { label: 'QAYERDAMIZ', id: 'qayerdamiz' },
]

const phoneHref = `tel:${restaurantConfig.contact.phone}`

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { soundEnabled, setSoundEnabled, mobileNavOpen, setMobileNavOpen, setMenuCategory } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (link: (typeof NAV_LINKS)[number]) => {
    playSound('nav', soundEnabled)
    if (link.category) setMenuCategory(link.category)
    setMobileNavOpen(false)
    scrollToId(link.id)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/5 py-2.5' : 'border-b border-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10">
          <button onClick={() => scrollToId('hero')} aria-label="Bosh sahifa" className="shrink-0">
            <Logo />
          </button>

          {/* Desktop havolalar */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l)}
                className="group relative text-[13px] font-bold tracking-[0.14em] text-cream/75 transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 gradient-fire transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 md:gap-3">
            {/* Ovoz */}
            <button
              onClick={() => {
                const next = !soundEnabled
                setSoundEnabled(next)
                if (next) playSound('click', true)
              }}
              aria-label={soundEnabled ? 'Ovozni oʻchirish' : 'Ovozni yoqish'}
              className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-all md:flex ${
                soundEnabled
                  ? 'border-ember/60 text-ember'
                  : 'border-white/10 text-sand hover:border-white/25 hover:text-cream'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Instagram */}
            <a
              href={restaurantConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sand transition-all hover:border-ember/60 hover:text-ember md:flex"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>

            {/* TELEFON — desktop */}
            <div className="hidden md:block">
              <MagneticButton variant="primary" href={phoneHref} className="!px-6 !py-2.5 text-xs">
                {restaurantConfig.contact.phoneDisplay}
              </MagneticButton>
            </div>

            {/* Mobil: telefon tezkor tugmasi */}
            <a
              href={phoneHref}
              aria-label="Qoʻngʻiroq qilish"
              onClick={() => playSound('click', soundEnabled)}
              className="flex h-10 w-10 items-center justify-center rounded-full gradient-fire text-ink md:hidden"
            >
              <Phone className="h-4.5 w-4.5" />
            </a>

            {/* Burger — mobile */}
            <button
              onClick={() => {
                playSound('nav', soundEnabled)
                setMobileNavOpen(true)
              }}
              aria-label="Menyu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menyu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] flex flex-col bg-ink/95 backdrop-blur-2xl"
          >
          <div className="flex items-center justify-between px-5 py-5">
            <LogoMark size={38} />
            <button
              onClick={() => setMobileNavOpen(false)}
              aria-label="Yopish"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-cream"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
            {NAV_LINKS.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
                onClick={() => go(l)}
                className="group flex items-baseline gap-4 border-b border-white/5 py-4 text-left"
              >
                <span className="font-display text-[10px] font-bold text-ember">
                  0{i + 1}
                </span>
                <span className="font-display text-3xl font-extrabold text-cream transition-colors group-active:text-ember">
                  {l.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="space-y-4 px-8 pb-10"
          >
            <div className="flex items-center gap-3 text-sm text-sand">
              <Phone className="h-4 w-4 text-ember" />
              <span>{restaurantConfig.contact.addressDisplay}</span>
            </div>
            <div className="flex gap-3">
              <MagneticButton variant="primary" href={phoneHref} className="flex-1 !py-3.5">
                {restaurantConfig.contact.phoneDisplay}
              </MagneticButton>
              <a
                href={restaurantConfig.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex w-14 items-center justify-center rounded-full border border-white/15 text-cream"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
