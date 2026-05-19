import { Link } from 'react-router-dom'
import { wa } from '../../../../utils/waLink'
import ImageWithFallback from '../../../../components/ImageWithFallback'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { formatPrice, safeValue } from '../../domain/formatters'

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ProductoDetalleHeroHeader({
  producto,
  heroImg,
  coverImg,
  highlights,
  intro,
  usos,
  orderMessage,
  availabilityMessage,
}) {
  const priceLabel = formatPrice(producto.precio)
  const quickFacts = [
    { label: 'Presentación', value: safeValue(producto.presentacion, 'Por definir') },
    { label: 'Contenido', value: safeValue(producto.peso, 'Por definir') },
    { label: 'Precio', value: priceLabel || 'Consultar' },
  ]

  return (
    <>
      <section className="section section-tight-bottom">
        <div className="container">
          <p className="p p-reset">
            <Link to="/productos" className="pd-bc-link">Productos</Link>
            <span className="pd-bc-sep"> → </span>
            <strong>{producto.categoria}</strong>
            {producto.seccion && (<><span className="pd-bc-sep"> → </span><strong>{producto.seccion}</strong></>)}
          </p>
        </div>
      </section>

      <section className="section section-no-top">
        <div className="container">
          <div className="pd-hero card pd-hero-card">
            {heroImg
              ? (
                <ImageWithFallback
                  className="pd-hero-img"
                  src={heroImg}
                  fallbackSrc={coverImg}
                  alt={producto.nombre}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 980px) 100vw, 72vw"
                  width="1600"
                  height="900"
                />
              )
              : <div className="pd-hero-fallback" aria-hidden="true" />
            }
            <div className="pd-hero-chip-row">
              <span className="pd-hero-chip">{producto.categoria}</span>
              {producto.seccion && <span className="pd-hero-chip pd-hero-chip-soft">{producto.seccion}</span>}
            </div>
          </div>

          <div className="pd-head card">
            <div className="pd-head-left">
              <span className="pd-eyebrow">Ficha de producto</span>
              <h1 className="pd-title">{producto.nombre}</h1>
              {highlights.length > 0 && (
                <div className="pd-highlights">
                  {highlights.map((h, i) => (
                    <span key={i} className="pd-hi">
                      <span className="pd-hi-ico"><CheckIcon /></span>
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="pd-summary-grid" aria-label={`Resumen rápido de ${producto.nombre}`}>
                {quickFacts.map((item) => (
                  <div key={item.label} className="pd-summary-item">
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              {Array.isArray(usos) && usos.length > 0 && (
                <div className="pd-occasion-row" aria-label={`Ideal para servir ${producto.nombre}`}>
                  {usos.slice(0, 3).map((item) => (
                    <span key={item} className="pd-chip">{item}</span>
                  ))}
                </div>
              )}
              <p className="pd-lead">{intro}</p>
            </div>
            <div className="pd-head-cta">
              <a className="btn btn-primary" href={wa(orderMessage)} target="_blank" rel="noopener noreferrer">
                Solicitar este producto
              </a>
              <a className="btn btn-outline" href={wa(availabilityMessage)} target="_blank" rel="noopener noreferrer">
                Consultar disponibilidad
              </a>
              <Link className="btn btn-outline" to="/productos" {...prefetchIntentProps('/productos')}>Volver</Link>
              <p className="pd-head-note">Si estás comparando opciones, te ayudamos a elegir según ocasión, cantidad y tipo de servicio.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
