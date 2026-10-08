/**
 * ============================================================
 *  INSTAGRAM GALEREYASI
 * ============================================================
 */

import { restaurantConfig } from '../config/restaurantConfig'

export interface InstagramTile {
  image: string
  caption: string
  link: string
}

export const instagramTiles: InstagramTile[] = [
  { image: '/images/lavash-signature.jpg', caption: "Issiq lavash — har kuni yangi ", link: restaurantConfig.instagram.url },
  { image: '/images/wok-signature.jpg', caption: "Hot-dog klassikdan shashlikgacha", link: restaurantConfig.instagram.url },
  { image: '/images/pitsa-signature.jpg', caption: "Burger + fri — eng yaxshi kombinatsiya 🍔", link: restaurantConfig.instagram.url },
  { image: '/images/kitchen-fire.jpg', caption: "Olov ustida pishiriladi", link: restaurantConfig.instagram.url },
  { image: '/images/snack-spring-rolls.jpg', caption: "Kotleta fri — tez va to'yimli", link: restaurantConfig.instagram.url },
  { image: '/images/drinks-fresh.jpg', caption: "Muzdek ichimliklar bilan", link: restaurantConfig.instagram.url },
]
