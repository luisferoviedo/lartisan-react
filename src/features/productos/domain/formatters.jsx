export function safeValue(value, fallback) {
  return value === undefined || value === null || value === '' ? fallback : value
}

export function formatPrice(value) {
  if (value === undefined || value === null || value === '') return ''
  if (typeof value === 'number') return `$ ${value.toLocaleString('es-CO')}`
  return String(value)
}

export function getCoverByCategory(catSlug, covers) {
  return covers[catSlug] ?? ''
}
