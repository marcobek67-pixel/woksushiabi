/**
 * WOK SUSHI LAVASH ABI — to'liq tajriba (single page).
 * Ketma-ketlik: Loader -> Navbar -> Hero -> Marquee -> Categories -> Menu ->
 * FoodCinema -> Signature -> Promotions -> Instagram -> Contact -> Footer
 * Buyurtma faqat telefon orqali: savat / checkout yo'q.
 */
import { useEffect, useState } from 'react'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { ProductModal } from './components/ProductModal'
import { CustomCursor } from './components/ui/CustomCursor'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Categories } from './sections/Categories'
import { MenuSection } from './sections/MenuSection'
import { FoodCinema } from './sections/FoodCinema'
import { Signature } from './sections/Signature'
import { Promotions } from './sections/Promotions'
import { InstagramSection } from './sections/InstagramSection'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { useUIStore } from './stores/uiStore'
import { useFinePointer } from './hooks/useQuality'
import { initScroll, ScrollTrigger } from './utils/scroll'

export default function App() {
  const loaderDone = useUIStore((s) => s.loaderDone)
  const finePointer = useFinePointer()
  const [loaderMounted, setLoaderMounted] = useState(true)

  // Yuklanish tugaguncha sahifa scrolli qulflanadi
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!loaderDone) return
    document.body.style.overflow = ''
    const t = setTimeout(() => setLoaderMounted(false), 1250)
    // Loader panellari ketgach o'lchamlar qayta hisoblanadi
    const r = setTimeout(() => ScrollTrigger.refresh(), 1400)
    return () => {
      clearTimeout(t)
      clearTimeout(r)
    }
  }, [loaderDone])

  useEffect(() => {
    initScroll()
  }, [])

  return (
    <>
      <div className="relative">
        <Hero />
        <Marquee />
        <Categories />
        <MenuSection />
        <FoodCinema />
        <Signature />
        <Promotions />
        <InstagramSection />
        <Contact />
        <Footer />
      </div>

      <Navbar />
      <ProductModal />

      {finePointer && <CustomCursor />}

      {/* Kinematik noise qatlami */}
      <div className="noise-layer pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />

      {loaderMounted && <Loader />}
    </>
  )
}
