import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { prefetchIntentProps } from '../utils/prefetchRoutes'

export default function NotFound() {
  usePageMeta({
    title: 'Página no encontrada',
    description: "La página que buscas no existe en L'Artisan. Explora el catálogo o vuelve al inicio.",
  })

  return (
    <main id="main-content" tabIndex="-1">
      <section className="section not-found-section">
        <div className="container not-found-inner">
          <p className="home-section-eyebrow">Error 404</p>
          <h1 className="h1">Esta página no está en el menú</h1>
          <p className="p">
            Puede que el enlace esté desactualizado o la página se haya movido. Te llevamos de vuelta al buen camino.
          </p>
          <div className="btn-group not-found-actions">
            <Link className="btn btn-primary" to="/" {...prefetchIntentProps('/')}>Ir al inicio</Link>
            <Link className="btn btn-outline" to="/productos" {...prefetchIntentProps('/productos')}>Ver productos</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
