const routeLoaders = {
  '/': () => import('../pages/Home'),
  '/productos': () => import('../pages/Productos'),
  '/productos/:slug': () => import('../pages/ProductoDetalle'),
  '/recetas': () => import('../pages/Recetas'),
  '/nosotros': () => import('../pages/Nosotros'),
  '/contacto': () => import('../pages/Contacto'),
}

const prefetched = new Set()

function normalizePath(path) {
  if (!path) return ''
  const cleanPath = String(path).split('#')[0].split('?')[0]
  if (cleanPath.startsWith('/productos/')) return '/productos/:slug'
  return cleanPath
}

export function prefetchRoute(path) {
  const normalized = normalizePath(path)
  const loader = routeLoaders[normalized]

  if (!loader || prefetched.has(normalized)) return

  prefetched.add(normalized)
  loader().catch(() => {
    prefetched.delete(normalized)
  })
}

export function prefetchIntentProps(path) {
  return {
    onMouseEnter: () => prefetchRoute(path),
    onFocus: () => prefetchRoute(path),
    onTouchStart: () => prefetchRoute(path),
  }
}
