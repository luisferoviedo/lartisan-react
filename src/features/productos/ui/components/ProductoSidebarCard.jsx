import { wa } from '../../../../utils/waLink'
import ImageWithFallback from '../../../../components/ImageWithFallback'
import { formatPrice, safeValue } from '../../domain/formatters'

export default function ProductoSidebarCard({ producto, usos, visibleGallery, onGalleryError, orderMessage, availabilityMessage }) {
  const priceLabel = formatPrice(producto.precio)

  return (
    <aside className="pd-sidebar">
      <div className="pd-sticky">
        <div className="card pd-sidebar-card">
          <span className="pd-eyebrow">Decisión rápida</span>
          <h3 className="h2 pd-h3-card">Formato &amp; precio</h3>
          <div className="pd-kv"><div className="pd-k">Presentación</div><div className="pd-v">{safeValue(producto.presentacion, 'Por definir')}</div></div>
          <div className="pd-kv"><div className="pd-k">Contenido</div><div className="pd-v">{safeValue(producto.peso, 'Por definir')}</div></div>
          <div className="pd-kv">
            <div className="pd-k">Precio</div>
            <div className="pd-v pd-price-strong">
              {priceLabel || 'Consultar por WhatsApp'}
            </div>
          </div>
          {producto.precioNota && <div className="pd-mini-note">{producto.precioNota}</div>}

          {Array.isArray(usos) && usos.length > 0 && (
            <div className="pd-sidebar-uses">
              {usos.slice(0, 3).map((item) => <span key={item} className="pd-chip">{item}</span>)}
            </div>
          )}

          <div className="mt-14">
            <a className="btn btn-primary btn-block" href={wa(availabilityMessage)} target="_blank" rel="noopener noreferrer">
              Consultar disponibilidad
            </a>
          </div>
          <div className="mt-14">
            <a className="btn btn-outline btn-block" href={wa(orderMessage)} target="_blank" rel="noopener noreferrer">
              Solicitar este producto
            </a>
          </div>

          {visibleGallery.length > 0 && (
            <div className="pd-gallery">
              {visibleGallery.map(({ src, idx }) => (
                <div key={idx} className="pd-thumb">
                  <ImageWithFallback
                    src={src}
                    alt={`${producto.nombre} - foto ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 980px) 33vw, 120px"
                    width="600"
                    height="600"
                    onError={() => onGalleryError(idx)}
                  />
                </div>
              ))}
            </div>
          )}

          <p className="pd-microcopy">¿Dudas de preparación o cantidad? Escríbenos y te recomendamos.</p>
        </div>
      </div>
    </aside>
  )
}
