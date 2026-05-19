import { useEffect, useState } from 'react'
import { contentRepository } from '../services/contentRepository'

// Hook shared para listado de recetas.
export function useRecetas() {
  const [recetas, setRecetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Guard de ciclo de vida para evitar estados inválidos tras unmount.
    let active = true
    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await contentRepository.getRecetas()
        if (!active) return
        setRecetas(Array.isArray(data) ? data : [])
      } catch {
        if (!active) return
        setError('No pudimos cargar las recetas en este momento.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  return { recetas, loading, error }
}
