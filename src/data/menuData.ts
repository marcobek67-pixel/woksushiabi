/**
 * ============================================================
 *  MENYU MA'LUMOTLARI
 * ============================================================
 *  ⚠  PLACEHOLDER MA'LUMOTLAR.
 *  Instagram'da narxlar ommaviy ko'rinmadi, shu sababli quyidagi
 *  narxlar VA MAHSULOTLAR taxminiy namuna. Haqiqiy menyuni
 *  shu faylda tahrirlang — sayt avtomatik yangilanadi.
 *
 *  Kategoriyalar Instagram bio'dagi haqiqiy yo'nalishlarga
 *  asoslangan: "SUSHI | LAVASH | PITSA | VAFLI | NAMANGAN"
 *  (+ brend nomidagi WOK, hamda SETLAR / SNACKS / ICHIMLIKLAR).
 * ============================================================
 */

import type { MenuCategory, Product } from './products'

export const categories: MenuCategory[] = [
  {
    id: 'wok',
    name: 'WOK',
    emoji: '🍜',
    tagline: "Olovda, bir zumda, issiq holda",
    image: '/images/wok-signature.jpg',
    accent: '#ff5a1f',
    addons: [
      { id: 'wok-sauce', name: "Qo'shimcha sous", price: 5000 },
      { id: 'wok-meat', name: "Qo'shimcha go'sht", price: 15000 },
      { id: 'wok-sesame', name: "Qo'shimcha kunjut", price: 3000 },
      { id: 'wok-spicy', name: 'Achchiq qilish', price: 0 },
    ],
  },
  {
    id: 'sushi',
    name: 'SUSHI',
    emoji: '🍣',
    tagline: "Nozik, yangi, ustadan",
    image: '/images/sushi-signature.jpg',
    accent: '#e8b44a',
    addons: [
      { id: 'sushi-wasabi', name: 'Wasabi + gari', price: 5000 },
      { id: 'sushi-soy', name: "Qo'shimcha soya sous", price: 3000 },
      { id: 'sushi-salmon', name: "Qo'shimcha losos", price: 20000 },
    ],
  },
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
    id: 'pitsa',
    name: 'PITSA',
    emoji: '🍕',
    tagline: "Pishiriq, pishloq, olov",
    image: '/images/pitsa-signature.jpg',
    accent: '#f0742c',
    addons: [{ id: 'pitsa-cheese', name: "Qo'shimcha pishloq", price: 8000 }],
  },
  {
    id: 'vafli',
    name: 'VAFLI',
    emoji: '🧇',
    tagline: 'Shirin yakun',
    image: '/images/vafli-signature.jpg',
    accent: '#e8b44a',
    addons: [{ id: 'vafli-choco', name: "Qo'shimcha shokolad", price: 5000 }],
  },
  {
    id: 'setlar',
    name: 'SETLAR',
    emoji: '🍱',
    tagline: 'Kompaniya uchun to\'liq dasturxan',
    image: '/images/set-family.jpg',
    accent: '#ff5a1f',
    addons: [],
  },
  {
    id: 'snacks',
    name: 'SNACKS',
    emoji: '🥟',
    tagline: "Kichkina, lekin mazali",
    image: '/images/snack-spring-rolls.jpg',
    accent: '#e8b44a',
    addons: [],
  },
  {
    id: 'ichimliklar',
    name: 'ICHIMLIKLAR',
    emoji: '🥤',
    tagline: 'Chanqoqni bosishga',
    image: '/images/drinks-fresh.jpg',
    accent: '#9fd8a8',
    addons: [],
  },
]

export const products: Product[] = [
  // ============ WOK ============
  {
    id: 'wok-chicken',
    categoryId: 'wok',
    name: 'Wok Tovuq',
    description:
      "Olovda loyqa darajada qovurilgan udon nudel, tovuh fileto, rang-barang sabzavotlar va maxsus soya sousi.",
    price: 45000,
    ingredients: ['Tovuq fileto', 'Udon nudel', "Bulg'or qalampiri", 'Sabzi', 'Piyoz', 'Soya sousi', 'Kunjut'],
    image: '/images/wok-signature.jpg',
    popular: true,
    signature: true,
  },
  {
    id: 'wok-beef',
    categoryId: 'wok',
    name: 'Wok Mol Achchiq',
    description: "Mol go'shti, soba nudel, achchiq qalampir va kimchi — olovli ta'mni sevganlar uchun.",
    price: 55000,
    ingredients: ['Mol goʻshti', 'Soba nudel', 'Achchiq qalampir', 'Piyoz', 'Kimchi', 'Kunjut'],
    image: '/images/wok-beef.jpg',
    spicy: true,
  },
  {
    id: 'wok-shrimp',
    categoryId: 'wok',
    name: 'Wok Krevetka',
    description: "Dengiz mahsulotlarini xohlaysizmi? Krevetka, udon va krem sousli yumshoq ta'm.",
    price: 59000,
    ingredients: ['Krevetka', 'Udon nudel', 'Krem sous', 'Bodring', "Bulg'or qalampiri", 'Kunjut'],
    image: '/images/wok-signature.jpg',
  },

  // ============ SUSHI ============
  {
    id: 'sushi-filadelfiya',
    categoryId: 'sushi',
    name: 'Filadelfiya',
    description: 'Klassika hech qachon eskirmaydi: yangi losos, krem sariyogʻ, avokado. 8 dona.',
    price: 89000,
    ingredients: ['Losos', 'Krem sariyogʻ', 'Avokado', 'Sushi guruch', 'Nori'],
    image: '/images/sushi-signature.jpg',
    popular: true,
    signature: true,
  },
  {
    id: 'sushi-kaliforniya',
    categoryId: 'sushi',
    name: 'Kaliforniya',
    description: 'Tobiko urugʻlari bilan qoplangan, krab sticks va avokado ichida. 8 dona.',
    price: 65000,
    ingredients: ['Krab sticks', 'Avokado', 'Bodring', 'Tobiko', 'Sushi guruch'],
    image: '/images/sushi-signature.jpg',
  },
  {
    id: 'sushi-baked',
    categoryId: 'sushi',
    name: 'Baked Losos',
    description: 'Pishirilgan rullar — eriydigan krem sous va ustidan pishirilgan losos. 8 dona.',
    price: 72000,
    ingredients: ['Losos', 'Krem sous', 'Masago', 'Sushi guruch', 'Nori'],
    image: '/images/sushi-baked.jpg',
    signature: true,
  },

  // ============ LAVASH ============
  {
    id: 'lavash-tovuq',
    categoryId: 'lavash',
    name: 'Lavash Tovuq',
    description: "Grilda pishirilgan tovuh fileto, yangi sabzavotlar va maxsus sous ichida.",
    price: 32000,
    ingredients: ['Tovuq fileto', "Ko'katlar", 'Piyoz', 'Pomidor', 'Achchiq-ismaliq sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
    popular: true,
    signature: true,
  },
  {
    id: 'lavash-pishloq',
    categoryId: 'lavash',
    name: 'Lavash Pishloqli',
    description: "Cho'ziladigan mozzarella pishloqi, pomidor va ziravorlar — vegetarianlar uchun ham.",
    price: 28000,
    ingredients: ['Mozzarella', 'Pomidor', 'Ziravorlar', 'Lavash'],
    image: '/images/lavash-cheese.jpg',
  },
  {
    id: 'lavash-mol',
    categoryId: 'lavash',
    name: "Lavash Mol go'shti",
    description: "Mol go'shti lavash — eng to'yimli variant. Katta ishtaha uchun.",
    price: 38000,
    ingredients: ["Mol go'shti", "Ko'katlar", 'Piyoz', 'Pomidor', 'Sous', 'Lavash'],
    image: '/images/lavash-signature.jpg',
  },

  // ============ PITSA ============
  {
    id: 'pitsa-pepperoni',
    categoryId: 'pitsa',
    name: 'Pitsa Pepperoni',
    description: 'Achchiq pepperoni, eriydigan mozzarella va xamirturushli qarsildoq hamir. 25 sm.',
    price: 65000,
    ingredients: ['Pepperoni', 'Mozzarella', 'Tomat sous', 'Hamir'],
    image: '/images/pitsa-signature.jpg',
    spicy: true,
    popular: true,
  },
  {
    id: 'pitsa-margarita',
    categoryId: 'pitsa',
    name: 'Pitsa Margarita',
    description: 'Uch ingredient: tomat, mozzarella, rayhon. Mukammal soddalik. 25 sm.',
    price: 55000,
    ingredients: ['Mozzarella', 'Tomat sous', 'Rayhon', 'Hamir'],
    image: '/images/pitsa-signature.jpg',
  },
  {
    id: 'pitsa-cheese',
    categoryId: 'pitsa',
    name: "Pitsa To'rt Pishloq",
    description: "Mozzarella, dor blue, parmesan va cheddar — pishloq sevuvchilar uchun bayram. 25 sm.",
    price: 75000,
    ingredients: ['Mozzarella', 'Dor blue', 'Parmesan', 'Cheddar', 'Tomat sous', 'Hamir'],
    image: '/images/pitsa-signature.jpg',
  },

  // ============ VAFLI ============
  {
    id: 'vafli-chocolate',
    categoryId: 'vafli',
    name: 'Vafli Shokolad',
    description: "Issiq belgiya vafli, eriydigan shokolad va shirin sous.",
    price: 30000,
    ingredients: ['Belgiya vafli', 'Shokolad', 'Shirin sous', 'Powdered sugar'],
    image: '/images/vafli-signature.jpg',
    popular: true,
  },
  {
    id: 'vafli-strawberry',
    categoryId: 'vafli',
    name: 'Vafli Qulupnay',
    description: "Yangi qulupnay, muzqaymoq va vafli — shirin yakunlash uchun.",
    price: 32000,
    ingredients: ['Belgiya vafli', 'Qulupnay', 'Muzqaymoq', 'Shirin sous'],
    image: '/images/vafli-signature.jpg',
  },
  {
    id: 'vafli-banana',
    categoryId: 'vafli',
    name: 'Vafli Banan',
    description: "Banan, karamel va yumshoq vafli.",
    price: 28000,
    ingredients: ['Belgiya vafli', 'Banan', 'Karamel', 'Shirin sous'],
    image: '/images/vafli-signature.jpg',
  },

  // ============ SETLAR ============
  {
    id: 'set-family',
    categoryId: 'setlar',
    name: 'Family Set',
    description: "Katta kompaniya uchun: 2 ta wok, 16 dona sushi rul, 2 ta lavash va ichimliklar.",
    price: 289000,
    ingredients: ['2 x Wok', '16 x Sushi rul', '2 x Lavash', '2 x Ichimlik'],
    image: '/images/set-family.jpg',
    popular: true,
    signature: true,
  },

  // ============ SNACKS ============
  {
    id: 'snack-spring-rolls',
    categoryId: 'snacks',
    name: 'Spring Rolls',
    description: "Qarsildoq pishirilgan rulolar sabzavotli ichlik bilan. Sous bilan. 6 dona.",
    price: 25000,
    ingredients: ['Vafli hamir', 'Sabzavotlar', 'Sous'],
    image: '/images/snack-spring-rolls.jpg',
  },

  // ============ ICHIMLIKLAR ============
  {
    id: 'drink-lemonade',
    categoryId: 'ichimliklar',
    name: 'Limonad Uy',
    description: "Yangi siqilgan limon, na'matak va yalpiz. 0.5 L.",
    price: 15000,
    ingredients: ['Limon', 'Yalpiz', 'Muz'],
    image: '/images/drinks-fresh.jpg',
  },
  {
    id: 'drink-cola',
    categoryId: 'ichimliklar',
    name: 'Cola',
    description: 'Muzdek gazlangan ichimlik. 0.5 L.',
    price: 10000,
    ingredients: ['Cola'],
    image: '/images/drinks-fresh.jpg',
  },
  {
    id: 'drink-water',
    categoryId: 'ichimliklar',
    name: 'Suv',
    description: 'Toza ichimlik suvi. 0.5 L.',
    price: 5000,
    ingredients: ['Suv'],
    image: '/images/drinks-fresh.jpg',
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
