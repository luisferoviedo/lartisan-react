import { useProducto } from '../../../hooks/useProducto'

export function useProductoSource(slug) {
  return useProducto(slug)
}
