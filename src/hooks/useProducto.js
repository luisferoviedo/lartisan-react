import { useEffect, useState } from 'react'
import { contentRepository } from '../services/contentRepository'

// Hook shared para detalle de producto por slug.
export function useProducto(slug) {
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Guard de ciclo de vida para requests async.
    let active = true
    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await contentRepository.getProductoBySlug(slug)
        if (!active) return
        setProducto(data ?? null)
      } catch {
        if (!active) return
        setError('No pudimos cargar este producto en este momento.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [slug])

  return { producto, loading, error }
}
