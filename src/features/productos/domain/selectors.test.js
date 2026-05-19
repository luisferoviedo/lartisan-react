import { describe, it, expect } from 'vitest'
import { filterCatalog, flattenCategoryProducts, filterVisibleGallery, cookMetaFallback } from './selectors'

const mockCatalog = [
  {
    titulo: 'Chorizos',
    slug: 'chorizos',
    items: [
      { nombre: 'Argentino', slugGlobal: 'chorizos-argentino' },
      { nombre: 'Italiano', slugGlobal: 'chorizos-italiano' },
    ],
  },
  {
    titulo: 'Charcutería fina',
    slug: 'charcuteria-fina',
    secciones: [
      {
        titulo: 'Jamones',
        slug: 'jamones',
        items: [{ nombre: 'Oxford', slugGlobal: 'charcuteria-fina-jamones-oxford' }],
      },
    ],
  },
]

describe('filterCatalog', () => {
  it('retorna catálogo completo cuando query es vacío', () => {
    expect(filterCatalog(mockCatalog, '')).toBe(mockCatalog)
  })

  it('filtra por nombre de producto', () => {
    const result = filterCatalog(mockCatalog, 'argentino')
    expect(result).toHaveLength(1)
    expect(result[0].items).toHaveLength(1)
    expect(result[0].items[0].nombre).toBe('Argentino')
  })

  it('filtra por título de categoría', () => {
    const result = filterCatalog(mockCatalog, 'chorizos')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('chorizos')
  })

  it('filtra en secciones de charcutería', () => {
    const result = filterCatalog(mockCatalog, 'oxford')
    expect(result).toHaveLength(1)
    expect(result[0].secciones[0].items[0].nombre).toBe('Oxford')
  })

  it('retorna array vacío cuando no hay coincidencias', () => {
    expect(filterCatalog(mockCatalog, 'zzznada')).toHaveLength(0)
  })
})

describe('flattenCategoryProducts', () => {
  it('aplana categoría con items directos', () => {
    const result = flattenCategoryProducts(mockCatalog[0])
    expect(result).toHaveLength(2)
    expect(result[0].secTitulo).toBeNull()
  })

  it('aplana categoría con secciones', () => {
    const result = flattenCategoryProducts(mockCatalog[1])
    expect(result).toHaveLength(1)
    expect(result[0].secTitulo).toBe('Jamones')
  })
})

describe('filterVisibleGallery', () => {
  const galeria = ['/img/1.webp', '/img/2.webp', '/img/3.webp', '/img/4.webp']

  it('limita a 3 imágenes máximo', () => {
    expect(filterVisibleGallery(galeria, new Set())).toHaveLength(3)
  })

  it('excluye índices rotos', () => {
    const broken = new Set([0, 1])
    const result = filterVisibleGallery(galeria, broken)
    expect(result).toHaveLength(1)
    expect(result[0].idx).toBe(2)
  })
})

describe('cookMetaFallback', () => {
  it('parrilla → 10–12 min', () => {
    expect(cookMetaFallback('Parrilla').tiempo).toBe('10–12 min')
  })

  it('plancha → 8–10 min', () => {
    expect(cookMetaFallback('Plancha / sartén').tiempo).toBe('8–10 min')
  })

  it('horno → 15–18 min', () => {
    expect(cookMetaFallback('Horno / airfryer').tiempo).toBe('15–18 min')
  })

  it('desconocido → —', () => {
    expect(cookMetaFallback('Microondas').tiempo).toBe('—')
  })
})
