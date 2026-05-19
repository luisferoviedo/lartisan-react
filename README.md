# L'Artisan Web (React + Vite)

Sitio comercial de L'Artisan orientado a catálogo premium de charcutería artesanal en Medellín.

## Objetivo del proyecto
- Comunicar propuesta de valor premium (proteína real, selección técnica, marca de alto nivel).
- Facilitar conversión a pedido por WhatsApp.
- Mantener una arquitectura simple de leer y fácil de escalar.

## Stack
- React 19
- React Router DOM 7
- Vite 6
- ESLint 9

## Scripts
```bash
npm install
npm run dev
npm run build   # ejecuta prebuild: genera public/sitemap.xml y public/robots.txt
npm run preview
npm run test
npm run lint
```

## Variables de entorno
Copia `.env.example` a `.env` y define `VITE_SITE_URL` con la URL pública del sitio (sin barra final), por ejemplo `https://www.tudominio.com`. Se usa en canonical/Open Graph, `index.html` en build y en la generación de sitemap/robots.

## Arquitectura (visión general)
El proyecto usa una arquitectura por features con capas ligeras:

- `pages/`: entrypoints de rutas (muy delgados).
- `features/<feature>/ui`: componentes de pantalla y bloques visuales.
- `features/<feature>/application`: view models y orquestación de estado.
- `features/<feature>/domain`: reglas puras (constantes, selectores, formatters, builders).
- `hooks/`: hooks compartidos de acceso a contenido y metadatos.
- `services/contentRepository.js`: frontera de datos (adapter pattern).
- `data/`: datasets estáticos actuales.
- `components/`: layout global y componentes cross-feature.
- `styles/global.css`: sistema visual global.

## Flujo de datos
```text
Route (pages/*)
  -> UI (features/*/ui/*)
  -> ViewModel (features/*/application/use*ViewModel)
  -> Source hook (features/*/application/use*Source)
  -> Shared hook (hooks/useCatalogo|useProducto|useRecetas)
  -> Repository (services/contentRepository)
  -> Adapter (estático hoy, API mañana)
```

## Estructura resumida
```text
src/
  App.jsx
  main.jsx
  components/
    Layout.jsx
    RouteErrorBoundary.jsx
    ImageWithFallback.jsx
  pages/
    Home.jsx
    Productos.jsx
    ProductoDetalle.jsx
    Recetas.jsx
    Nosotros.jsx
    Contacto.jsx
  features/
    home/
    productos/
    recetas/
    nosotros/
    contacto/
  hooks/
    useCatalogo.js
    useProducto.js
    useRecetas.js
    usePageMeta.js
    useJsonLd.js
  services/
    contentRepository.js
  data/
    catalogo.js
    recetas.js
  utils/
    waLink.jsx
    prefetchRoutes.js
  styles/
    global.css
```

## Reglas de mantenimiento
- Si cambias presentación: tocar `ui/`.
- Si cambias estado o flujo de pantalla: tocar `application/`.
- Si cambias reglas reutilizables: tocar `domain/`.
- Si cambias origen de datos: tocar `services/` + `hooks/` de datos.

## Convención `.jsx` y `.js`
En varias carpetas existen archivos `.js` con `export * from './archivo.jsx'`.
Esto se mantiene por compatibilidad de imports y tooling. La lógica fuente está en `.jsx`.

## SEO y metadatos
- `usePageMeta`: title/description + OpenGraph/Twitter.
- `useJsonLd`: inyección JSON-LD por pantalla (Organization, WebSite, Product).

## Cómo conectar backend/API más adelante
Hoy usamos adapter estático (`data/`).
Para migrar a backend sin romper UI:

1. Crear adapter con contrato:
   - `getCatalogo()`
   - `getProductoBySlug(slug)`
   - `getRecetas()`
2. Registrar adapter con `setContentAdapter(apiAdapter)`.
3. Mantener páginas y componentes sin cambios.

## Checklist QA manual (mínimo)
1. Home renderiza hero, secciones y galería responsive.
2. Productos lista categorías, búsqueda y cards sin pantalla en blanco.
3. Detalle de producto carga SEO/meta y galería sin desbordes.
4. Recetas/Nosotros/Contacto conservan estilo premium y CTAs funcionales.
5. Todos los CTA de WhatsApp abren mensaje correcto.
6. Navegación responsive del header funciona en móvil.

## Validación técnica esperada en cada cambio
- `npx eslint src --ext .js,.jsx`
- `npm run build`
- QA manual de rutas críticas (`/`, `/productos`, `/productos/:slug`, `/recetas`, `/nosotros`, `/contacto`)

## Estado actual
- Arquitectura por features implementada.
- Capa de datos desacoplada por repository.
- Rediseño premium aplicado en Home + resto de páginas.
- Galería Home con scroll animado y comportamiento responsive.
