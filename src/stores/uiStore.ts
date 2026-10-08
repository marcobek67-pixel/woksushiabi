import { create } from 'zustand'
import type { CategoryId } from '../data/products'

interface UIState {
  loaderDone: boolean
  setLoaderDone: (v: boolean) => void

  mobileNavOpen: boolean
  setMobileNavOpen: (v: boolean) => void

  soundEnabled: boolean
  setSoundEnabled: (v: boolean) => void

  activeProductId: string | null
  setActiveProduct: (id: string | null) => void

  menuCategory: CategoryId
  setMenuCategory: (c: CategoryId) => void
}

export const useUIStore = create<UIState>((set) => ({
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),

  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  soundEnabled: false, // ovoz DEFAULT O'CHIQ
  setSoundEnabled: (v) => set({ soundEnabled: v }),

  activeProductId: null,
  setActiveProduct: (id) => set({ activeProductId: id }),

  menuCategory: 'wok',
  setMenuCategory: (c) => set({ menuCategory: c }),
}))
