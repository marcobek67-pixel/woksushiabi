/**
 * ============================================================
 *  MENYU MA'LUMOTLARI — haqiqiy menyuga asoslangan
 *  Manba: restoran menyusidagi rasm (WOK SUSHI LAVASH PIZZA)
 * ============================================================
 */

import type { MenuCategory, Product } from './products'

export const categories: MenuCategory[] = [
  {
    id: 'lavash',
    name: 'LAVASH',
    emoji: '🌯',
    tagline: "Issiq, to'yimli, yo'l bo'yi",
    image: '/images/lavash-signature.jpg',
    accent: '#e8380d',
    addons: [
      { id: 'lavash-cheese', name: "Qo'shimcha pishloq", price: 7000 },
      { id: 'lavash-meat', name: "Qo'shimcha go'sht", price: 12000 },
      { id: 'lavash-spicy', name: 'Achchiq sous', price: 3000 },
    ],
  },
  {
    id: 'hotdog',
    name: 'HOT-DOG',
    emoji: '🌭',
    tagline: 'Tez va mazali',
    image: '/images/wok-signature.jpg',
    accent: '#ff5a1f',
    addons: [],
  },
  {
    id: 'xagti',
    name: 'XAGTI',
    emoji: '',
    tagline: "To'yimli lavash uslubida",
    image: '/images/lavash-signature.jpg',
    accent: '#e8b44a',
    addons: [{ id: 'xagti-cheese', name: "Qo'shimcha pishloq", price: 5000 }],
  },
  {
    id: 'doner',
    name: 'DONER',
    emoji: '🥙',
    tagline: "An'anaviy doner kebab",
    image: '/images/lavash-signature.jpg',
    accent: '#f0742c',
    addons: [{ id: 'doner-sauce', name: "Qo'shimcha sous", price: 3000 }],
  },
  {
    id: 'burger',
    name: 'BURGER',
    emoji: '🍔',
    tagline: "Issiq burger, yangi sabzavot",
    image: '/images/pitsa-signature.jpg',
    accent: '#e8380d',
    addons: [
      { id: 'burger-cheese', name: "Qo'shimcha pishloq", price: 5000 },
      { id: 'burger-bacon', name: 'Bekon', price: 7000 },
    ],
  },
  {
    id: 'snacks',
    name: 'SNACKS',
    emoji: '🍟',
    tagline: "Kichkina, lekin mazali",
    image: '/images/snack-spring-rolls.jpg',
    accent: '#e8b44a',
    addons: [],
  },
  {
    id: 'setlar',
    name: 'SETLAR',
    emoji: '🎁',
    tagline: "Tejamaslik uchun",
    image: '/images/set-family.jpg',
    accent: '#e8380d',
    addons: [],
  },
]

export const products: Product[] = [
  // ============ LAVASH ============
  {
    id: 'lavash-standart',
    categoryId: 'lavash',
    name: 'Lavash Standart',
    description: "Oddiy lavash — go'sht, sabzavot va sous bilan.",
    price: 30000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
    popular: true,
  },
  {
    id: 'lavash-pishloq',
    categoryId: 'lavash',
    name: 'Lavash Pishloqli',
    description: "Mozzarella pishloqi qo'shilgan issiq lavash.",
    price: 35000,
    ingredients: ['Mozzarella', "Go'sht", "Ko'katlar", 'Pomidor', 'Sous', 'Lavash'],
    image: '/images/lavash-cheese.jpg',
  },
  {
    id: 'lavash-katta',
    categoryId: 'lavash',
    name: 'Lavash Katta',
    description: "Katta hajmli lavash — ko'proq go'sht va sabzavot.",
    price: 40000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Piyoz', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
    signature: true,
  },
  {
    id: 'lavash-tandir',
    categoryId: 'lavash',
    name: 'Lavash Tandir',
    description: "Tandirda pishirilgan lavash — maxsus ta'm.",
    price: 35000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Sous', 'Tandir lavash'],
    image: '/images/lavash-signature.jpg',
  },

  // ============ HOT-DOG ============
  {
    id: 'hotdog-klassik',
    categoryId: 'hotdog',
    name: 'Hot-Dog Klassik',
    description: 'Oddiy klassik hot-dog.',
    price: 10000,
    ingredients: ['Kolbasa', 'Non', 'Gorchitsa', 'Ketchup'],
    image: '/images/wok-signature.jpg',
  },
  {
    id: 'hotdog-big',
    categoryId: 'hotdog',
    name: 'Hot-Dog Big',
    description: "Katta o'lchamli hot-dog.",
    price: 16000,
    ingredients: ['Kolbasa', 'Non', 'Gorchitsa', 'Ketchup', 'Sabzavot'],
    image: '/images/wok-signature.jpg',
  },
  {
    id: 'hotdog-pishloq',
    categoryId: 'hotdog',
    name: 'Hot-Dog Pishloqli',
    description: "Eriydigan pishloq qo'shilgan hot-dog.",
    price: 20000,
    ingredients: ['Kolbasa', 'Pishloq', 'Non', 'Gorchitsa', 'Ketchup'],
    image: '/images/wok-signature.jpg',
  },
  {
    id: 'hotdog-shashlik',
    categoryId: 'hotdog',
    name: 'Hot-Dog Shashlik',
    description: "Shashlik go'shti bilan hot-dog.",
    price: 20000,
    ingredients: ['Shashlik go\'shti', 'Non', 'Piyoz', 'Sous'],
    image: '/images/wok-signature.jpg',
  },
  {
    id: 'hotdog-qazi',
    categoryId: 'hotdog',
    name: 'Hot-Dog Qazi',
    description: "Milliy qazi kolbasasi bilan hot-dog.",
    price: 30000,
    ingredients: ['Qazi', 'Non', 'Gorchitsa', 'Ketchup'],
    image: '/images/wok-signature.jpg',
    signature: true,
  },
  {
    id: 'hotdog-kolbaskoy',
    categoryId: 'hotdog',
    name: 'Hot-Dog Kolbaskoy',
    description: "Kolbaskoy sosiska bilan oddiy hot-dog.",
    price: 13000,
    ingredients: ['Kolbaskoy', 'Non', 'Gorchitsa'],
    image: '/images/wok-signature.jpg',
  },
  {
    id: 'hotdog-kolbaskoy-big',
    categoryId: 'hotdog',
    name: 'Hot-Dog Kolbaskoy Big',
    description: "Katta o'lchamli kolbaskoy hot-dog.",
    price: 20000,
    ingredients: ['Kolbaskoy', 'Non', 'Gorchitsa', 'Ketchup', 'Sabzavot'],
    image: '/images/wok-signature.jpg',
  },

  // ============ XAGTI ============
  {
    id: 'xagti-oddiy',
    categoryId: 'xagti',
    name: 'Xagti',
    description: "Go'sht va sabzavotli xagti.",
    price: 20000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
  },
  {
    id: 'xagti-pishloq',
    categoryId: 'xagti',
    name: 'Xagti Pishloqli',
    description: "Eriydigan pishloq qo'shilgan xagti.",
    price: 25000,
    ingredients: ["Go'sht", 'Pishloq', "Ko'katlar", 'Pomidor', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
  },
  {
    id: 'xagti-zhara',
    categoryId: 'xagti',
    name: 'Xagti Zhara',
    description: "Grilda pishirilgan xagti — maxsus ta'm.",
    price: 30000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Piyoz', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
    popular: true,
  },

  // ============ DONER ============
  {
    id: 'doner-standart',
    categoryId: 'doner',
    name: 'Doner Standart',
    description: "Oddiy doner kebab — go'sht va sabzavot.",
    price: 30000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Piyoz', 'Sous', 'Non'],
    image: '/images/lavash-signature.jpg',
  },
  {
    id: 'doner-big',
    categoryId: 'doner',
    name: 'Doner Big',
    description: "Katta o'lchamli doner kebab.",
    price: 35000,
    ingredients: ["Go'sht", "Ko'katlar", 'Pomidor', 'Piyoz', 'Sous', 'Non'],
    image: '/images/lavash-signature.jpg',
    popular: true,
  },

  // ============ BURGER ============
  {
    id: 'burger-gamburger',
    categoryId: 'burger',
    name: 'Gamburger',
    description: "Oddiy gamburger — go'sht kotleti va sabzavot.",
    price: 25000,
    ingredients: ["Go'sht kotleti", 'Non', "Ko'katlar", 'Pomidor', 'Sous'],
    image: '/images/pitsa-signature.jpg',
  },
  {
    id: 'burger-chizburger',
    categoryId: 'burger',
    name: 'Chizburger',
    description: "Pishloq qo'shilgan gamburger.",
    price: 25000,
    ingredients: ["Go'sht kotleti", 'Pishloq', 'Non', "Ko'katlar", 'Pomidor', 'Sous'],
    image: '/images/pitsa-signature.jpg',
  },
  {
    id: 'burger-barbekyu',
    categoryId: 'burger',
    name: 'Barbekyu Burger',
    description: "Barbekyu sousli gamburger.",
    price: 30000,
    ingredients: ["Go'sht kotleti", 'Barbekyu sous', 'Non', "Ko'katlar", 'Piyoz', 'Sous'],
    image: '/images/pitsa-signature.jpg',
    popular: true,
  },
  {
    id: 'burger-dabl',
    categoryId: 'burger',
    name: 'Dabl Burger',
    description: "Ikki qavatli go'sht kotletli burger.",
    price: 30000,
    ingredients: ["2 x Go'sht kotleti", 'Pishloq', 'Non', "Ko'katlar", 'Pomidor', 'Sous'],
    image: '/images/pitsa-signature.jpg',
    signature: true,
  },

  // ============ SNACKS ============
  {
    id: 'kotleta-fri',
    categoryId: 'snacks',
    name: 'Kotleta Fri',
    description: "Go'sht kotleti va kartoshka fri.",
    price: 20000,
    ingredients: ["Go'sht kotleti", 'Kartoshka fri'],
    image: '/images/snack-spring-rolls.jpg',
  },
  {
    id: 'kartoshka-fri',
    categoryId: 'snacks',
    name: 'Kartoshka Fri',
    description: "Qarsildoq kartoshka fri.",
    price: 10000,
    ingredients: ['Kartoshka', 'Tuz'],
    image: '/images/snack-spring-rolls.jpg',
  },

  // ============ SETLAR (kombinatsiya) ============
  {
    id: 'set-lavash-pepsi',
    categoryId: 'setlar',
    name: 'Lavash + Pepsi Set',
    description: "Lavash + kartoshka fri + Pepsi 0.5L.",
    price: 45000,
    ingredients: ['Lavash', 'Kartoshka fri', 'Pepsi 0.5L'],
    image: '/images/lavash-signature.jpg',
  },
  {
    id: 'set-lavash-cola',
    categoryId: 'setlar',
    name: 'Lavash + Cola Set',
    description: "Lavash + cola + kartoshka fri — to'liq ovqat.",
    price: 85000,
    ingredients: ['Lavash', 'Cola', 'Kartoshka fri'],
    image: '/images/lavash-signature.jpg',
    popular: true,
  },
  {
    id: 'set-burger-cola',
    categoryId: 'setlar',
    name: 'Burger + Cola Set',
    description: "Burger + cola + kartoshka fri.",
    price: 35000,
    ingredients: ['Burger', 'Cola', 'Kartoshka fri'],
    image: '/images/pitsa-signature.jpg',
  },
  {
    id: 'set-pizza-ana',
    categoryId: 'setlar',
    name: 'Pitsa + Ana Set',
    description: "Pitsa + Ana ichimligi + kartoshka fri.",
    price: 65000,
    ingredients: ['Pitsa', 'Ana ichimlik', 'Kartoshka fri'],
    image: '/images/pitsa-signature.jpg',
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId)
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getSignatureProducts(): Product[] {
  return products.filter((p) => p.signature)
}

export function getPopularProducts(): Product[] {
  return products.filter((p) => p.popular)
}
