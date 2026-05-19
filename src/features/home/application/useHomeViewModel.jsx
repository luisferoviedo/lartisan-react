import { useMemo } from 'react'
import { usePageMeta } from '../../../hooks/usePageMeta'
import { HOME_PAGE_META } from '../domain/constants'
import { getDestacados } from '../domain/selectors'
import { useHomeSource } from './useHomeSource'

// ViewModel de Home: selecciona destacados y expone estado de carga/error.
export function useHomeViewModel() {
  const { catalogo, loading, error } = useHomeSource()

  usePageMeta(HOME_PAGE_META)

  const destacados = useMemo(
    () => getDestacados(Array.isArray(catalogo) ? catalogo : [], 6),
    [catalogo],
  )

  return {
    loading,
    error,
    destacados,
  }
}
