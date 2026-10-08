/**
 * ============================================================
 *  MAHSULOT TURLARI VA YORDAMCHI FUNKSIYALAR
 * ============================================================
 *  Yagona manba — menuData.ts. Bu faylda faqat tip va helper'lar.
 */

export interface Addon {
  id: string
  name: string
  price: number
}

export interface Product {
  id: string
  categoryId: CategoryId
  name: string
  description: string
  price: number // so'm
  ingredients: string[]
  image: string
  spicy?: boolean
  popular?: boolean
  signature?: boolean
  isNew?: boolean
}

export type CategoryId =
  | 'wok'
  | 'sushi'
  | 'lavash'
  | 'pitsa'
  | 'vafli'
  | 'setlar'
  | 'snacks'
  | 'ichimliklar'

export interface MenuCategory {
  id: CategoryId
  name: string
  emoji: string
  tagline: string
  image: string
  accent: string // CSS rang — 3D karta uchun
  addons: Addon[]
}

export interface CartItem {
  key: string // productId + addonIds
  productId: string
  name: string
  image: string
  unitPrice: number // narx + addonlar
  qty: number
  addons: string[] // addon nomlari
}
