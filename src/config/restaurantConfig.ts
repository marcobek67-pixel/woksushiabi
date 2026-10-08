/**
 * ============================================================
 *  WOK SUSHI LAVASH ABI — RESTAURANT CONFIGURATION
 * ============================================================
 *  BARCHA BIZNES MA'LUMOTLARI SHU FAYLDA.
 *  Faqat shu faylni tahrirlab, butun saytni yangilashingiz mumkin.
 *
 *  Ma'lumotlar manbasi — Instagram profili @woksushi_lavash_abi
 *  (biografya + koordinatalar), 2026-10-06 holatiga ko'ra.
 *
 *  ✅ Tekshirilgan: telefon, manzil, koordinatalar, shahar, yo'nalishlar
 *  ⚠ Kiritilmagan: ish vaqti — quyidagi `hours` maydonini to'ldiring.
 * ============================================================
 */

export const restaurantConfig = {
  brand: {
    name: 'WOK SUSHI LAVASH ABI',
    shortName: 'ABI',
    tagline: "Bir ta'm. Uch xil kayfiyat.",
    city: 'Namangan', // ✅ Instagram bio
    // ✅ Instagram bio'dan: "Namangan tumani uchun maxsus"
    area: 'Namangan tumani',
    // ✅ Instagram bio'dan: "Bitta joyda — barcha ta'mlar"
    claim: "Bitta joyda — barcha ta'mlar",
    // ✅ Instagram bio yo'nalishlari: Sushi | Lavash | Burger | Pitsa (+ vafli)
    lineup: ['SUSHI', 'LAVASH', 'BURGER', 'PITSA', 'VAFLI'],
  },

  instagram: {
    handle: 'woksushi_lavash_abi',
    url: 'https://www.instagram.com/woksushi_lavash_abi/', // ✅ tekshirilgan
  },

  // ✅ Tekshirilgan — Instagram profili + berilgan koordinatalar
  contact: {
    phone: '+998907540797',
    phoneDisplay: '+998 90 754 07 97',
    telegram: '', // ⚠ KIRITILMAGAN — havola bo'lsa shu yerga yozing
    addressCity: 'Namangan',
    // ✅ "Toshbuloq poliklinikasi yonida"
    addressStreet: 'Toshbuloq poliklinikasi yonida',
    addressDisplay: 'Toshbuloq poliklinikasi yonida, Namangan',
    // ✅ 40°55'47.4"N 71°35'04.4"E
    lat: 40.9298333,
    lng: 71.5845556,
    hours: '', // ⚠ KIRITILMAGAN — masalan: 'Har kuni 10:00 — 23:00'
    mapUrl: 'https://www.google.com/maps?q=40.9298333,71.5845556',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=40.9298333,71.5845556&z=17&output=embed',
  },

  currency: {
    code: "so'm",
    format: 'space', // 45000 -> "45 000 so'm"
  },

  // SEO / OG rasm (public/images ichida)
  ogImage: '/images/og-cover.jpg',
} as const;

export type RestaurantConfig = typeof restaurantConfig;
