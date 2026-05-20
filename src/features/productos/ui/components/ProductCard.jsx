import { Link } from 'react-router-dom'
import { wa } from '../../../../utils/waLink'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { buildProductCardWhatsAppMessage } from '../../application/whatsappBuilders'
import { formatPrice } from '../../domain/formatters'
import ImageWithFallback from '../../../../components/ImageWithFallback'

export default function ProductCard({ product, categoria, secTitulo = null, mobileCategoryLabel = null }) {
  if (!product) return null

  const priceLabel = formatPrice(product.precio)
  const atributos = Array.isArray(product.atributos) ? product.atributos : []
  const sellos = Array.isArray(product.sellos) ? product.sellos : []
  const usos = Array.isArray(product.usos) ? product.usos : []
  const contextLabel = mobileCategoryLabel || secTitulo || categoria

  return (
    <article className="card product-card">
      <div className="product-card-media">
        {product.imagen
          ? (
            <ImageWithFallback
              className="product-card-image"
              src={product.imagen}
              alt={product.nombre}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 400px"
              width="1200"
              height="900"
            />
          )
          : <div className="product-card-fallback" aria-hidden="true" />
        }
        <div className="product-card-overlay">
          <span className="product-card-context">{contextLabel}</span>
          {sellos.length > 0 && <span className="product-card-seal">{sellos[0]}</span>}
        </div>
      </div>

      <div className="product-card-body">
        {mobileCategoryLabel && <small className="product-mobile-label">{mobileCategoryLabel}</small>}
        <h3 className="product-title">{product.nombre}</h3>
        {priceLabel && <p className="p product-price">Desde {priceLabel}</p>}
        <p className="p product-copy">{product.frase}</p>
        {usos.length > 0 && (
          <div className="product-uses" aria-label={`Usos recomendados de ${product.nombre}`}>
            {usos.slice(0, 3).map((use) => (
              <span key={use}>{use}</span>
            ))}
          </div>
        )}
        <ul className="product-bullets">
          {atributos.slice(0, 3).map((attr, i) => <li key={i}>{attr}</li>)}
        </ul>
      </div>

      <div className="product-actions">
        <Link className="btn btn-outline" to={`/productos/${product.slugGlobal}`} {...prefetchIntentProps(`/productos/${product.slugGlobal}`)}>Ver ficha completa</Link>
        <a
          className="btn btn-primary"
          href={wa(buildProductCardWhatsAppMessage({
            nombre: product.nombre,
            categoria,
            secTitulo,
            priceLabel,
            mobileCategoryLabel,
          }))}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar este producto
        </a>
      </div>
    </article>
  )
}
