/**
 * ============================================================
 *  AKSIYALAR / PROMOTIONSLAR
 * ============================================================
 *  ⚠  PLACEHOLDER — Instagram'da tasdiqlangan aksiya topilmadi.
 *  Haqiqiy aksiyalarni shu ro'yxatga qo'shing — kartalar
 *  avtomatik chiziladi. Yo'q bo'lsa — bo'sh [] qoldiring,
 *  bo'lim "tez orada" holatiga o'tadi.
 *
 *  HECH QACHON o'ylab topilgan aksiya ko'rsatilmaydi.
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
    id: 'ph-combo',
    badge: 'KOMBO',
    title: 'Wok + Ichimlik',
    description: "PLACEHOLDER — haqiqiy aksiya shartlarini promotions.ts faylida to'ldiring.",
    image: '/images/wok-signature.jpg',
    isPlaceholder: true,
  },
  {
    id: 'ph-family',
    badge: 'FAMILY',
    title: 'Family Set',
    description: "PLACEHOLDER — haqiqiy aksiya shartlarini promotions.ts faylida to'ldiring.",
    image: '/images/set-family.jpg',
    isPlaceholder: true,
  },
  {
    id: 'ph-21',
    badge: '2+1',
    title: 'Uchtasini ol — bittasi bizdan',
    description: "PLACEHOLDER — haqiqiy aksiya shartlarini promotions.ts faylida to'ldiring.",
    image: '/images/sushi-signature.jpg',
    isPlaceholder: true,
  },
]
