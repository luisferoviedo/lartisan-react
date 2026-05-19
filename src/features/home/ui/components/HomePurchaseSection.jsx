import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import { INSTAGRAM_URL, PURCHASE_STEPS } from '../../domain/constants'

export default function HomePurchaseSection() {
  const teaserSteps = PURCHASE_STEPS.slice(0, 2)

  return (
    <section className="section home-purchase">
      <div className="container">
        <span className="home-section-eyebrow">Compra sin fricción</span>
        <h2 className="h2 home-section-title">La ruta de compra se entiende rápido</h2>
        <p className="p home-section-subtitle">
          En home dejamos el resumen. La versión completa para resolver entrega, cobertura y formato ya vive mejor en Contacto.
        </p>
        <div className="grid home-purchase-grid">
          {teaserSteps.map((step, idx) => (
            <article key={step.title} className="card home-step-card">
              <span className="home-step-index">0{idx + 1}</span>
              <h3 className="home-step-title">{step.title}</h3>
              <p className="p p-reset">{step.description}</p>
            </article>
          ))}
        </div>
        <div className="home-purchase-actions">
          <Link className="btn btn-primary" to="/contacto" {...prefetchIntentProps('/contacto')}>Ver cómo pedir</Link>
          <Link className="btn btn-outline" to="/contacto" {...prefetchIntentProps('/contacto')}>Resolver entrega y cobertura</Link>
        </div>
        <p className="p home-purchase-note">
          Si primero quieres revisar la marca o inspirarte antes de escribir, puedes ir a <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>.
        </p>
      </div>
    </section>
  )
}
