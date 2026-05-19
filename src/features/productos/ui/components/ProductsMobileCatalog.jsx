import { MOBILE_INITIAL_VISIBLE, CATEGORY_COVERS, CATEGORY_HIGHLIGHTS, CATEGORY_SUBTITLES } from '../../domain/constants'
import { flattenCategoryProducts, getMobileCategoryLabel } from '../../domain/selectors'
import { getCoverByCategory } from '../../domain/formatters'
import CategoryHero from './CategoryHero'
import ProductCard from './ProductCard'

export default function ProductsMobileCatalog({
  filteredCatalog,
  activeCategory,
  setOpenCategory,
  expandCategoryProducts,
  collapseCategoryProducts,
  getMobileVisibleCount,
}) {
  return (
    <div className="products-mobile-list">
      {(Array.isArray(filteredCatalog) ? filteredCatalog : []).map((cat, catIndex) => {
        const cover = getCoverByCategory(cat.slug, CATEGORY_COVERS)
        const flatProducts = flattenCategoryProducts(cat)
        const visibleCount = getMobileVisibleCount(cat.slug)
        const visibleProducts = flatProducts.slice(0, visibleCount)
        const isExpanded = activeCategory === cat.slug

        return (
          <section key={cat.slug} id={cat.slug} className="cat-block">
            <CategoryHero
              title={cat.titulo}
              subtitle={CATEGORY_SUBTITLES[cat.slug]}
              cover={cover}
              highlights={CATEGORY_HIGHLIGHTS[cat.slug]}
              eager={catIndex === 0}
              sizes="100vw"
            />

            <button
              type="button"
              className="btn btn-accent-soft mobile-cat-toggle"
              aria-expanded={isExpanded}
              onClick={() => setOpenCategory(isExpanded ? null : cat.slug)}
            >
              {isExpanded ? 'Ocultar productos' : 'Ver productos'}
            </button>

            {isExpanded && (
              <>
                <div className="grid products-grid mobile-products-grid">
                  {visibleProducts.map(({ product, secTitulo }) => {
                    const mobileCategoryLabel = getMobileCategoryLabel(cat, secTitulo)
                    return (
                      <ProductCard
                        key={product.slugGlobal}
                        product={product}
                        categoria={cat.titulo}
                        secTitulo={secTitulo}
                        mobileCategoryLabel={mobileCategoryLabel}
                      />
                    )
                  })}
                </div>

                {flatProducts.length > visibleCount && (
                  <button
                    type="button"
                    className="btn btn-primary mobile-load-more"
                    onClick={() => expandCategoryProducts(cat.slug)}
                  >
                    Ver más ({flatProducts.length - visibleCount})
                  </button>
                )}

                {visibleCount > MOBILE_INITIAL_VISIBLE && (
                  <button
                    type="button"
                    className="btn btn-accent-soft mobile-load-less"
                    onClick={() => collapseCategoryProducts(cat.slug)}
                  >
                    Ver menos
                  </button>
                )}
              </>
            )}
          </section>
        )
      })}
    </div>
  )
}
