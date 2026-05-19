import { usePageMeta } from '../../../hooks/usePageMeta'
import {
  RECETAS_HIGHLIGHTS,
  RECETAS_ITEMS,
  RECETAS_OCCASION_ITEMS,
  RECETAS_PAGE_META,
} from '../domain/constants'

export function useRecetasViewModel() {
  usePageMeta(RECETAS_PAGE_META)

  return {
    highlights: RECETAS_HIGHLIGHTS,
    recetas: RECETAS_ITEMS,
    occasionItems: RECETAS_OCCASION_ITEMS,
    loading: false,
    error: '',
  }
}
