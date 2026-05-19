import { describe, it, expect } from 'vitest'
import { formatPrice, safeValue, getCoverByCategory } from './formatters.jsx'

describe('formatPrice', () => {
  it('formatea números en locale es-CO', () => {
    expect(formatPrice(24000)).toBe('$ 24.000')
  })

  it('devuelve cadena vacía para null o vacío', () => {
    expect(formatPrice(null)).toBe('')
    expect(formatPrice(undefined)).toBe('')
    expect(formatPrice('')).toBe('')
  })
})

describe('safeValue', () => {
  it('usa fallback cuando el valor falta', () => {
    expect(safeValue(null, 'x')).toBe('x')
    expect(safeValue('ok', 'x')).toBe('ok')
  })
})

describe('getCoverByCategory', () => {
  it('resuelve cover o cadena vacía', () => {
    expect(getCoverByCategory('chorizos', { chorizos: '/c.webp' })).toBe('/c.webp')
    expect(getCoverByCategory('otra', {})).toBe('')
  })
})
