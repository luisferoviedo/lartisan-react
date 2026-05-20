import { Link } from 'react-router-dom'
import { prefetchIntentProps } from '../../../../utils/prefetchRoutes'
import InstagramEmbed from './InstagramEmbed'

export default function RecetasGrid({ recetas, loading }) {
  return (
    <div className="grid recipes-grid">
      {loading && recetas.length === 0 && (
        <article className="card-base card-panel recipes-card">
          <p className="p p-reset">Cargando recetas...</p>
        </article>
      )}

      {recetas.map((receta) => (
        <article key={receta.slug} className="card-base card-panel recipes-card card-interactive">
          <div className="recipes-card-head">
            {receta.productLabel && (
              <Link
                className="recipes-product-tag"
                to={receta.productHref}
                {...prefetchIntentProps('/productos')}
                aria-label={`Ir al producto: ${receta.productLabel}`}
              >
                <span className="recipes-product-tag-dot" aria-hidden="true" />
                {receta.productLabel}
                <span className="recipes-product-tag-arrow" aria-hidden="true">→</span>
              </Link>
            )}
            <h3 className="recipes-card-title">{receta.title}</h3>
            {receta.description ? (
              <p className="p p-reset recipes-card-description">{receta.description}</p>
            ) : null}
            <span className="chip chip-soft recipes-card-meta-chip">{receta.meta}</span>
          </div>

          <div className="recipes-card-block">
            <span className="recipes-card-label">Ingredientes</span>
            <div className="recipes-card-chips" aria-label={`Ingredientes para ${receta.title}`}>
              {receta.ingredients.map((ingredient) => (
                <span key={ingredient} className="chip chip-soft">{ingredient}</span>
              ))}
            </div>
          </div>

          <div className="recipes-card-block">
            <span className="recipes-card-label">Pasos</span>
            <ol className="recipes-card-steps">
              {receta.steps.slice(0, 5).map((step, index) => (
                <li key={step}>
                  <span className="recipes-card-step-index">0{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="recipes-card-video">
            <span className="recipes-card-label">Ver preparación</span>
            <div className="recipe-video__wrap">
              <div className="recipe-video__inner">
                <InstagramEmbed
                  permalink={receta.instagramPermalink}
                  fallback={receta.videoFallback}
                />
              </div>
            </div>
          </div>

          <div className="recipes-card-footer">
            <Link
              className="btn btn-primary recipe-cta"
              to={receta.ctaTo}
              {...prefetchIntentProps('/productos')}
            >
              {receta.ctaLabel}
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
