import { describe, it, expect, beforeEach } from 'vitest'
import { contentRepository, setContentAdapter } from './contentRepository'

const mockCatalog = [{ titulo: 'Test', slug: 'test', items: [] }]
const mockProduct = { nombre: 'Argentino', slugGlobal: 'chorizos-argentino' }
const mockRecetas = [{ slug: 'tabla', titulo: 'Tabla Charcutera' }]

const mockAdapter = {
  getCatalogo: async () => mockCatalog,
  getProductoBySlug: async (slug) => (slug === 'chorizos-argentino' ? mockProduct : null),
  getRecetas: async () => mockRecetas,
}

describe('contentRepository adapter pattern', () => {
  beforeEach(() => {
    // Restaurar adaptador estático por defecto antes de cada test
    setContentAdapter({
      getCatalogo: async () => [],
      getProductoBySlug: async () => null,
      getRecetas: async () => [],
    })
  })

  it('getCatalogo usa el adaptador inyectado', async () => {
    setContentAdapter(mockAdapter)
    const result = await contentRepository.getCatalogo()
    expect(result).toBe(mockCatalog)
  })

  it('getProductoBySlug retorna producto existente', async () => {
    setContentAdapter(mockAdapter)
    const result = await contentRepository.getProductoBySlug('chorizos-argentino')
    expect(result).toBe(mockProduct)
  })

  it('getProductoBySlug retorna null para slug inexistente', async () => {
    setContentAdapter(mockAdapter)
    const result = await contentRepository.getProductoBySlug('no-existe')
    expect(result).toBeNull()
  })

  it('getRecetas usa el adaptador inyectado', async () => {
    setContentAdapter(mockAdapter)
    const result = await contentRepository.getRecetas()
    expect(result).toBe(mockRecetas)
  })

  it('swap de adaptador afecta llamadas subsecuentes', async () => {
    setContentAdapter(mockAdapter)
    expect(await contentRepository.getCatalogo()).toBe(mockCatalog)

    const newAdapter = { getCatalogo: async () => [], getProductoBySlug: async () => null, getRecetas: async () => [] }
    setContentAdapter(newAdapter)
    expect(await contentRepository.getCatalogo()).toHaveLength(0)
  })
})
