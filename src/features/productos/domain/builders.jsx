export function buildProductSchema({ product, pageDescription, heroImg }) {
  if (!product) return null

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const toAbsolute = (src) => {
    if (!src) return null
    if (String(src).startsWith('http')) return src
    return `${origin}${src}`
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nombre,
    description: pageDescription,
    brand: {
      '@type': 'Brand',
      name: "L'Artisan",
    },
    category: product.categoria,
    image: toAbsolute(heroImg),
    url: pageUrl,
  }

  if (typeof product.precio === 'number') {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'COP',
      price: product.precio,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
    }
  }

  return schema
}
