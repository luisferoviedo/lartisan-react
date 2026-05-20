# L'Artisan — Sitio Marketing

Charcutería artesanal premium, Medellín. React 19 + Vite 6 SPA.
Live: **lartisanfood.vercel.app** · Admin: **lartisan.sanity.studio**

## Constraints

- **Sin co-autor Claude** en ningún commit (git user: luisferoviedo)
- El contenido lo gestiona la señora del dueño sin conocimientos técnicos — cambios en Sanity Studio, sin tocar código
- Toda funcionalidad nueva debe ser completamente gratuita

## Stack

| Capa | Tecnología |
|------|-----------|
| UI | React 19, React Router 7, CSS puro (sin Tailwind) |
| Build | Vite 6, vendor chunk splitting, lazy routes |
| CMS | Sanity (projectId: `zaggnqkb`, dataset: `production`) |
| Deploy | Vercel (auto-deploy desde `main`) |
| Tests | Vitest + @testing-library/react |

## Arquitectura

**MVVM por feature** — cada feature en `src/features/{nombre}/`:
- `domain/` — constantes, tipos, selectores puros
- `application/` — ViewModels (`useXxxViewModel`) y hooks de datos
- `ui/` — componentes React, CSS de feature

**Adapter pattern** en `src/services/contentRepository.js`:
- `staticAdapter` — datos hardcodeados (fallback / dev sin env vars)
- `sanityAdapter` — GROQ queries a Sanity CMS (activo cuando `VITE_SANITY_PROJECT_ID` está seteado)
- El switch es automático: `const useSanity = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)`

**CSS dividido por feature** (importado en los page views, aprovecha lazy splitting de Vite):
- `src/styles/base.css` — variables, reset, tipografía, botones, utilidades
- `src/styles/layout.css` — header, nav hamburger, footer
- `src/styles/pages.css` — patrones compartidos: page-hero, recetas, nosotros, contacto
- `src/styles/not-found.css` — 404
- `src/features/home/ui/home.css` — Home (carga lazy)
- `src/features/productos/ui/products.css` — Productos + Detalle (carga lazy)

**Mobile nav**: drawer hamburger desde la derecha (`≤900px`), animación spring Apple (`cubic-bezier(0.32, 0.72, 0, 1)`). Estado en `Layout.jsx`: `menuOpen`, cierra con Escape / backdrop / navigate.

## Datos desde Sanity

Los productos vienen de Sanity. Las recetas usan **constantes hardcodeadas** (`src/features/recetas/domain/constants.jsx`) — pendiente migrar (ver deuda técnica).

El ViewModel activo lo decide `contentRepository.js` en runtime según `VITE_SANITY_PROJECT_ID`.

## Variables de entorno

```
VITE_SANITY_PROJECT_ID=zaggnqkb
VITE_SANITY_DATASET=production
VITE_SITE_URL=https://lartisanfood.vercel.app   # en producción
```

En `.env.local` para desarrollo. En Vercel → Settings → Environment Variables para producción.

## Comandos

```bash
npm run dev        # dev server
npm run build      # build producción
npm run test       # vitest (22 tests)
npm run lint       # eslint
```

---

## Deuda Técnica Pendiente

### ALTA — conecta datos reales

- [ ] **Recetas desde Sanity**: `useRecetasViewModel.jsx` importa de `domain/constants.jsx` (hardcoded). `useRecetasSource.jsx` existe pero no está conectado al ViewModel. Migrar para usar `contentAdapter.getRecetas()` igual que lo hacen productos.

- [ ] **Schema Sanity para receta**: agregar campos `productLabel` (string) y `productHref` (string) al schema `studio/schemaTypes/receta.js` y al documento de receta en `migrate-to-sanity.mjs`. Actualmente solo existen en las constantes JS.

### MEDIA — calidad de código / portafolio

- [ ] **Tests de hooks**: `useCatalogo`, `useProducto` y `useRecetasViewModel` no tienen tests. Prioridad: verificar el lifecycle guard (`let active = true`) que previene actualizaciones de estado en componentes desmontados.

- [ ] **Error boundaries por ruta**: hay un solo `RouteErrorBoundary` global. Cada ruta lazy debería tener su propio boundary para que un fallo en Productos no tumbe toda la app.

- [ ] **`recetas.css` separado**: los estilos de recetas viven en `pages.css` mezclados con nosotros/contacto. Extraer a `src/features/recetas/ui/recetas.css` e importar en `RecetasPageView.jsx`.

### BAJA — optimizaciones

- [ ] **Imágenes Sanity responsivas**: las URLs de imagen de Sanity se usan crudas (`imagen.asset->url`). Agregar `@sanity/image-url` para servir tamaños optimizados (`width`, `format: 'webp'`). Impacta Core Web Vitals (LCP).

- [ ] **Persistencia de búsqueda de productos**: el estado `?q=` se pierde al navegar con back/forward. Sincronizar con `useSearchParams` de React Router para que funcione como URL de estado.

- [ ] **Lighthouse audit post-Sanity**: correr Lighthouse en producción y verificar > 90 en Performance, SEO, Accessibility. Los renders de Sanity podrían introducir CLS si las imágenes no tienen dimensiones explícitas.
