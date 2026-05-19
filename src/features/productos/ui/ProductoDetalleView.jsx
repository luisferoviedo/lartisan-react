import { Link, useParams } from 'react-router-dom'
import { prefetchIntentProps } from '../../../utils/prefetchRoutes'
import { useProductoDetalleViewModel } from '../application/useProductoDetalleViewModel'
import ProductoDetalleHeroHeader from './components/ProductoDetalleHeroHeader'
import ProductoCookingSection from './components/ProductoCookingSection'
import ProductoInfoColumn from './components/ProductoInfoColumn'
import ProductoSidebarCard from './components/ProductoSidebarCard'

export default function ProductoDetalleView() {
  const { slug } = useParams()
  const {
    producto,
    loading,
    coverImg,
    heroImg,
    notFoundMessage,
    highlights,
    intro,
    maridaje,
    coccion,
    conservacion,
    usos,
    visibleGallery,
    onGalleryError,
    buildOrderMessage,
    buildAvailabilityMessage,
  } = useProductoDetalleViewModel(slug)

  if (loading) {
    return (
      <main id="main-content" tabIndex="-1">
        <section className="section pd-loading">
          <div className="container">
            <div className="skeleton skeleton--animate skeleton-line skeleton-line--short" aria-hidden="true" />
            <div className="skeleton skeleton--animate skeleton-line skeleton-line--title" aria-hidden="true" />
            <div className="skeleton skeleton--animate skeleton-hero" aria-hidden="true" />
            <div className="skeleton skeleton--animate skeleton-line" aria-hidden="true" />
            <div className="skeleton skeleton--animate skeleton-line" style={{ maxWidth: '92%' }} aria-hidden="true" />
            <div className="skeleton skeleton--animate skeleton-line" style={{ maxWidth: '70%' }} aria-hidden="true" />
            <p className="p p-reset" style={{ marginTop: 20 }}>Cargando ficha del producto…</p>
          </div>
        </section>
      </main>
    )
  }

  if (!producto) {
    return (
      <main id="main-content" tabIndex="-1">
        <section className="section">
          <div className="container">
            <h1 className="h1">Producto no encontrado</h1>
            <p className="p">{notFoundMessage}</p>
            <Link className="btn btn-primary" to="/productos" {...prefetchIntentProps('/productos')}>Volver a productos</Link>
          </div>
        </section>
      </main>
    )
  }

  const orderMessage = buildOrderMessage()
  const availabilityMessage = buildAvailabilityMessage()

  return (
    <main id="main-content" tabIndex="-1">
      <ProductoDetalleHeroHeader
        producto={producto}
        heroImg={heroImg}
        coverImg={coverImg}
        highlights={highlights}
        intro={intro}
        usos={usos}
        orderMessage={orderMessage}
        availabilityMessage={availabilityMessage}
      />

      <section className="section section-tight-top">
        <div className="container pd-shell">
          <div className="pd-main">
            <div className="pd-main-grid">
              <ProductoCookingSection coccion={coccion} />
              <ProductoInfoColumn
                producto={producto}
                usos={usos}
                maridaje={maridaje}
                conservacion={conservacion}
              />
            </div>
          </div>

          <ProductoSidebarCard
            producto={producto}
            usos={usos}
            visibleGallery={visibleGallery}
            onGalleryError={onGalleryError}
            orderMessage={orderMessage}
            availabilityMessage={availabilityMessage}
          />
        </div>
      </section>
    </main>
  )
}
