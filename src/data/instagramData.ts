/**
 * ============================================================
 *  INSTAGRAM GALEREYASI
 * ============================================================
 *  Placeholder tarmoq — rasmlar AI tomonidan yaratilgan namunalar.
 *  Haqiqiy Instagram postlarini (rasm + caption) shu yerga qo'shing.
 *  Instagram API ishlatmoqchi bo'lsangiz, bu faylni API bilan
 *  almashtirish kifoya — komponent interfeysi o'zgarmaydi.
 * ============================================================
 */

import { restaurantConfig } from '../config/restaurantConfig'

export interface InstagramTile {
  image: string
  caption: string
  link: string
}

export const instagramTiles: InstagramTile[] = [
  { image: '/images/wok-signature.jpg', caption: "Bugungi eng issiq wok 🔥", link: restaurantConfig.instagram.url },
  { image: '/images/sushi-signature.jpg', caption: "Yangi partiya sushi — ertalabdan", link: restaurantConfig.instagram.url },
  { image: '/images/lavash-signature.jpg', caption: "Lavash ichida nima bor?", link: restaurantConfig.instagram.url },
  { image: '/images/kitchen-fire.jpg', caption: "Olov ustida — 3, 2, 1...", link: restaurantConfig.instagram.url },
  { image: '/images/pitsa-signature.jpg', caption: "Pitsa ham bor deb o'ylaganmisiz?", link: restaurantConfig.instagram.url },
  { image: '/images/vafli-signature.jpg', caption: "Shirin yakun — vafli 🧇", link: restaurantConfig.instagram.url },
]
