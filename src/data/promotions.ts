/**
 * ============================================================
 *  AKSIYALAR / PROMOTIONSLAR
 * ============================================================
 */

export interface Promotion {
  id: string
  badge: string
  title: string
  description: string
  image?: string
  isPlaceholder?: boolean
}

export const promotions: Promotion[] = [
  {
    id: 'combo-lavash',
    badge: 'KOMBO',
    title: 'Lavash + Pepsi Set',
    description: "Lavash + kartoshka fri + Pepsi — faqat 45,000 so'm.",
    image: '/images/lavash-signature.jpg',
  },
  {
    id: 'combo-burger',
    badge: 'SET',
    title: 'Burger + Cola + Fri',
    description: "To'liq ovqat seti — burger, cola va kartoshka fri. 35,000 so'm.",
    image: '/images/pitsa-signature.jpg',
  },
]
