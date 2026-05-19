import { useMemo, useState } from 'react'
import { useProductoSource } from './useProductoSource'
import { usePageMeta } from '../../../hooks/usePageMeta'
import { useJsonLd } from '../../../hooks/useJsonLd'
import { buildProductSchema } from '../domain/builders'
import { CATEGORY_COVERS, PRODUCTO_NOT_FOUND_MESSAGE } from '../domain/constants'
import { getCoverByCategory } from '../domain/formatters'
import { deriveProductDetailFields, filterVisibleGallery } from '../domain/selectors'
import {
  buildProductAvailabilityWhatsAppMessage,
  buildProductOrderWhatsAppMessage,
} from './whatsappBuilders'

const EMPTY_BROKEN_THUMBS = new Set()

// ViewModel de /productos/:slug.
// Centraliza SEO, JSON-LD, derivados de contenido y lógica de galería.
export function useProductoDetalleViewModel(slug) {
  const { producto, loading, error } = useProductoSource(slug)
  const [brokenThumbsBySlug, setBrokenThumbsBySlug] = useState({})
  const brokenThumbs = useMemo(
    () => brokenThumbsBySlug[slug] ?? EMPTY_BROKEN_THUMBS,
    [brokenThumbsBySlug, slug],
  )

  const coverImg = producto ? getCoverByCategory(producto.categoriaSlug, CATEGORY_COVERS) : ''
  const heroImg = producto ? (producto.imagen || coverImg || '') : ''

  const pageTitle = loading
    ? 'Cargando producto'
    : producto
      ? `${producto.nombre} - ${producto.categoria}`
      : 'Producto no encontrado'

  const pageDescription = producto
    ? `${producto.nombre}. ${producto.frase || 'Producto artesanal para parrilla y reuniones.'}`
    : 'Explora nuestro catálogo artesanal y encuentra el producto ideal para tu pedido.'

  usePageMeta({
    title: pageTitle,
    description: pageDescription,
    ogImagePath: heroImg || undefined,
  })

  const productSchema = useMemo(
    () => buildProductSchema({ product: producto, pageDescription, heroImg }),
    [heroImg, producto, pageDescription],
  )

  useJsonLd('ld-product', productSchema)

  const derived = useMemo(
    () => (producto ? deriveProductDetailFields(producto) : null),
    [producto],
  )

  const visibleGallery = useMemo(
    () => (derived ? filterVisibleGallery(derived.galeria, brokenThumbs) : []),
    [derived, brokenThumbs],
  )

  return {
    producto,
    loading,
    error,
    coverImg,
    heroImg,
    notFoundMessage: error || PRODUCTO_NOT_FOUND_MESSAGE,
    highlights: derived?.highlights ?? [],
    intro: derived?.intro ?? '',
    maridaje: derived?.maridaje ?? '',
    coccion: derived?.coccion ?? [],
    conservacion: derived?.conservacion ?? [],
    usos: derived?.usos ?? [],
    visibleGallery,
    onGalleryError: (idx) => {
      // Marca miniaturas rotas por slug para ocultarlas sin romper el carrusel.
      setBrokenThumbsBySlug((prev) => {
        const current = prev[slug] ?? new Set()
        const next = new Set(current)
        next.add(idx)
        return { ...prev, [slug]: next }
      })
    },
    buildOrderMessage: () => (producto ? buildProductOrderWhatsAppMessage(producto) : ''),
    buildAvailabilityMessage: () => (producto ? buildProductAvailabilityWhatsAppMessage(producto) : ''),
  }
}
