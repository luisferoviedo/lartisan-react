import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useCatalogoSource } from './useCatalogoSource'
import { usePageMeta } from '../../../hooks/usePageMeta'
import {
  MOBILE_BREAKPOINT,
  MOBILE_INITIAL_VISIBLE,
  MOBILE_LOAD_STEP,
  PRODUCTOS_PAGE_META,
} from '../domain/constants'
import { filterCatalog, isMobileViewport } from '../domain/selectors'

// ViewModel de la página /productos:
// concentra estado UI, filtros y comportamiento responsive.
export function useProductosViewModel() {
  const [query, setQuery] = useState('')
  const [isMobile, setIsMobile] = useState(() => isMobileViewport())
  const [openCategory, setOpenCategory] = useState(null)
  const [mobileVisibleByCat, setMobileVisibleByCat] = useState({})
  const { catalogo, loading, error } = useCatalogoSource()
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.toLowerCase().trim()

  usePageMeta(PRODUCTOS_PAGE_META)

  const filteredCatalog = useMemo(
    () => filterCatalog(catalogo, normalizedQuery),
    [catalogo, normalizedQuery],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    // Sincroniza layout móvil/escritorio con media query real del navegador.
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const sync = () => setIsMobile(media.matches)

    sync()

    if (media.addEventListener) {
      media.addEventListener('change', sync)
      return () => media.removeEventListener('change', sync)
    }

    media.addListener(sync)
    return () => media.removeListener(sync)
  }, [])

  const activeCategory = useMemo(() => {
    // En móvil, garantiza una categoría activa válida para acordeón.
    if (!isMobile || filteredCatalog.length === 0) return null
    if (openCategory && filteredCatalog.some((cat) => cat.slug === openCategory)) return openCategory
    return filteredCatalog[0].slug
  }, [filteredCatalog, isMobile, openCategory])

  const expandCategoryProducts = (catSlug) => {
    setMobileVisibleByCat((prev) => ({
      ...prev,
      [catSlug]: (prev[catSlug] ?? MOBILE_INITIAL_VISIBLE) + MOBILE_LOAD_STEP,
    }))
  }

  const collapseCategoryProducts = (catSlug) => {
    setMobileVisibleByCat((prev) => ({
      ...prev,
      [catSlug]: MOBILE_INITIAL_VISIBLE,
    }))
  }

  const getMobileVisibleCount = (catSlug) => mobileVisibleByCat[catSlug] ?? MOBILE_INITIAL_VISIBLE

  return {
    query,
    setQuery,
    catalogo,
    loading,
    error,
    filteredCatalog,
    isMobile,
    activeCategory,
    setOpenCategory,
    expandCategoryProducts,
    collapseCategoryProducts,
    getMobileVisibleCount,
  }
}
