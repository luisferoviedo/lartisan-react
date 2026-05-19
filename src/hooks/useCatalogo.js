import { useEffect, useState } from 'react'
import { contentRepository } from '../services/contentRepository'

// Hook shared para cargar catálogo con estado estándar: data/loading/error.
export function useCatalogo() {
  const [catalogo, setCatalogo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Evita setState sobre componente desmontado durante requests async.
    let active = true
    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await contentRepository.getCatalogo()
        if (!active) return
        setCatalogo(Array.isArray(data) ? data : [])
      } catch {
        if (!active) return
        setError('No pudimos cargar el catálogo en este momento.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return { catalogo, loading, error }
}
