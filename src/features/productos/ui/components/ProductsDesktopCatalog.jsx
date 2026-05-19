import { CATEGORY_COVERS, CATEGORY_HIGHLIGHTS, CATEGORY_SUBTITLES } from '../../domain/constants'
import { getCoverByCategory } from '../../domain/formatters'
import CategoryHero from './CategoryHero'
import ProductCard from './ProductCard'

export default function ProductsDesktopCatalog({ filteredCatalog }) {
  return (Array.isArray(filteredCatalog) ? filteredCatalog : []).map((cat, catIndex) => {
    const cover = getCoverByCategory(cat.slug, CATEGORY_COVERS)

    return (
      <section key={cat.slug} id={cat.slug} className="cat-block">
        <CategoryHero
          title={cat.titulo}
          subtitle={CATEGORY_SUBTITLES[cat.slug]}
          cover={cover}
          highlights={CATEGORY_HIGHLIGHTS[cat.slug]}
          eager={catIndex === 0}
          sizes="(max-width: 980px) 100vw, 70vw"
        />

        {Array.isArray(cat.items) && (
          <div className="grid products-grid">
            {cat.items.map((product) => (
              <ProductCard
                key={product.slugGlobal}
                product={product}
                categoria={cat.titulo}
              />
            ))}
          </div>
        )}

        {Array.isArray(cat.secciones) && (
          <div className="cat-sections">
            {cat.secciones.map((sec) => (
              <section key={sec.slug} id={`${cat.slug}-${sec.slug}`} className="subcat-block">
                <h3 className="subcat-title">{sec.titulo}</h3>
                <div className="grid products-grid">
                  {(Array.isArray(sec.items) ? sec.items : []).map((product) => (
                    <ProductCard
                      key={product.slugGlobal}
                      product={product}
                      categoria={cat.titulo}
                      secTitulo={sec.titulo}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    )
  })
}
