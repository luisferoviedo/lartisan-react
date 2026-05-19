import { useProductosViewModel } from '../application/useProductosViewModel'
import { PRODUCTS_PAGE_HIGHLIGHTS } from '../domain/constants'
import ProductsSidebar from './components/ProductsSidebar'
import ProductsDesktopCatalog from './components/ProductsDesktopCatalog'
import ProductsMobileCatalog from './components/ProductsMobileCatalog'

export default function ProductosPageView() {
  const {
    query,
    setQuery,
    catalogo,
    loading,
    error,
    filteredCatalog,
    isMobile,
    activeCategory,
    setOpenCategory,
    expandCategoryProducts,
    collapseCategoryProducts,
    getMobileVisibleCount,
  } = useProductosViewModel()

  return (
    <main id="main-content" tabIndex="-1" className="products-premium-page">
      <section className="section motion-rise products-premium-hero" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <span className="home-section-eyebrow">Catálogo L&apos;Artisan</span>
          <h1 className="h1 home-title-premium">Productos</h1>
          <p className="p products-premium-copy">
            Selección de producto pensada para servir mejor, vender mejor y elegir con más claridad según tu ocasión o tipo de servicio.
          </p>
          <div className="products-premium-points" aria-label="Diferenciales del catálogo">
            {PRODUCTS_PAGE_HIGHLIGHTS.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section motion-rise motion-delay-1">
        <div className="container products-shell">
          <ProductsSidebar
            query={query}
            setQuery={setQuery}
            catalogo={catalogo}
            error={error}
          />

          <div className="products-main">
            {loading && catalogo.length === 0 && (
              <div className="skeleton-grid" aria-busy="true" aria-label="Cargando catálogo">
                {[1, 2, 3].map((k) => (
                  <div key={k} className="skeleton-card">
                    <div className="skeleton skeleton--animate skeleton-card-media" aria-hidden="true" />
                    <div className="skeleton-card-body">
                      <div className="skeleton skeleton--animate skeleton-line skeleton-line--title" style={{ height: 26 }} aria-hidden="true" />
                      <div className="skeleton skeleton--animate skeleton-line" aria-hidden="true" />
                      <div className="skeleton skeleton--animate skeleton-line" style={{ maxWidth: '85%' }} aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isMobile && <ProductsDesktopCatalog filteredCatalog={filteredCatalog} />}

            {isMobile && (
              <ProductsMobileCatalog
                filteredCatalog={filteredCatalog}
                activeCategory={activeCategory}
                setOpenCategory={setOpenCategory}
                expandCategoryProducts={expandCategoryProducts}
                collapseCategoryProducts={collapseCategoryProducts}
                getMobileVisibleCount={getMobileVisibleCount}
              />
            )}

            {!loading && filteredCatalog.length === 0 && (
              <article className="card">
                <h2 className="h2 h2-tight">Sin resultados</h2>
                <p className="p p-reset">No encontramos resultados para “{query.trim()}”. Ajusta el término o explora otra categoría.</p>
              </article>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
