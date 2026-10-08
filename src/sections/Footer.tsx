/**
 * Footer — brend izi, havolalar, aloqa, yuqoriga qaytish.
 */
import { ArrowUp } from 'lucide-react'
import { InstagramIcon } from '../components/ui/icons'
import { restaurantConfig } from '../config/restaurantConfig'
import { scrollToId } from '../utils/scroll'
import { useUIStore } from '../stores/uiStore'
import type { CategoryId } from '../data/products'

export function Footer() {
  const setMenuCategory = useUIStore((s) => s.setMenuCategory)

  const goCat = (id: CategoryId) => {
    setMenuCategory(id)
    scrollToId('menu')
  }

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/6 bg-ink">
      {/* Katta outline soʻz */}
      <div className="pointer-events-none select-none px-5 pt-14 text-center md:px-10">
        <div className="text-stroke-ember font-display text-[clamp(2.2rem,7vw,6rem)] font-black leading-none tracking-tight opacity-60">
          WOK SUSHI LAVASH
        </div>
        <div className="mt-2 font-display text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight text-cream md:-mt-2">
          ABI
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 md:px-10">
        <div className="grid gap-10 border-b border-white/6 pb-12 md:grid-cols-4">
          {/* Brend */}
          <div className="md:col-span-2">
            <div className="font-display text-sm font-bold tracking-[0.25em] text-cream">
              {restaurantConfig.brand.name}
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand">
              {restaurantConfig.brand.tagline} {restaurantConfig.brand.city} — lavash, hot-dog, xagti, doner va burger.
            </p>
            <p className="mt-2 text-sm text-sand/80">{restaurantConfig.contact.addressDisplay}</p>
            <a
              href={restaurantConfig.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/12 px-5 py-2.5 text-xs font-bold tracking-widest text-cream transition-colors hover:border-ember/70 hover:text-ember"
            >
              <InstagramIcon className="h-4 w-4" /> @{restaurantConfig.instagram.handle}
            </a>
          </div>

          {/* Navigatsiya */}
          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-sand">MENYU</div>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  ['LAVASH', 'lavash'],
                  ['HOT-DOG', 'hotdog'],
                  ['XAGTI', 'xagti'],
                  ['DONER', 'doner'],
                  ['BURGER', 'burger'],
                  ['SNACKS', 'snacks'],
                ] as const
              ).map(([label, id]) => (
                <li key={id}>
                  <button
                    onClick={() => goCat(id)}
                    className="text-cream/70 transition-colors hover:text-ember"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Boʻlimlar */}
          <div>
            <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-sand">
              BOʻLIMLAR
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => scrollToId('menu')} className="text-cream/70 transition-colors hover:text-ember">
                  Menyuni koʻrish
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('aksiyalar')} className="text-cream/70 transition-colors hover:text-ember">
                  Aksiyalar
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId('qayerdamiz')} className="text-cream/70 transition-colors hover:text-ember">
                  Qayerdamiz?
                </button>
              </li>
              <li>
                <a href={`tel:${restaurantConfig.contact.phone}`} className="text-cream/70 transition-colors hover:text-ember">
                  {restaurantConfig.contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Pastki qator */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center md:flex-row md:text-left">
          <div className="text-[11px] leading-relaxed text-sand/70">
            © {new Date().getFullYear()} {restaurantConfig.brand.name}. Barcha huquqlar himoyalangan.
            <br className="md:hidden" />
            <span className="mx-1 hidden md:inline">·</span> Maʼlumotlar{' '}
            <span className="text-ember/80">restaurantConfig.ts</span> orqali tahrirlanadi.
          </div>
          <button
            onClick={() => scrollToId('hero')}
            className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-sand transition-colors hover:text-ember"
          >
            YUQORIGA
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 transition-all group-hover:-translate-y-1 group-hover:border-ember/60">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
