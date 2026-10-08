/** Narxni "45 000 so'm" ko'rinishiga keltiradi. */
export function formatPrice(value: number): string {
  const formatted = value.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')
  return `${formatted} so'm`
}

/** Raqamni "45 000" ko'rinishiga keltiradi. */
export function formatNumber(value: number): string {
  return value.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')
}
