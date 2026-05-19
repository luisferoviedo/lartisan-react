# Mapa Comentado de `src/`

Este documento resume **qué hace cada bloque** para que puedas navegar el proyecto sin perderte.

## 1) Boot y routing
- `main.jsx`: punto de entrada de React + carga de estilos globales.
- `App.jsx`: routing principal, lazy loading de rutas y fallback de carga.

## 2) Componentes globales
- `components/Layout.jsx`: header, navegación principal, outlet de rutas y footer.
- `components/RouteErrorBoundary.jsx`: evita pantalla en blanco si una ruta falla al renderizar.
- `components/ImageWithFallback.jsx`: imagen con fallback controlado.

## 3) Capa de páginas (`pages/`)
Cada archivo de `pages/` es un wrapper de ruta. Su responsabilidad es mínima: delegar al feature correspondiente.

## 4) Features (dominio por pantalla)
Cada feature sigue la misma idea:

- `ui/`: rendering y composición visual.
- `application/`: estado y orquestación (ViewModel + sources).
- `domain/`: reglas puras y reutilizables.

Features actuales:
- `features/home`
- `features/productos`
- `features/recetas`
- `features/nosotros`
- `features/contacto`

## 5) Datos y repositorio
- `services/contentRepository.js`: frontera única para consumir contenido.
- `data/catalogo.js` y `data/recetas.js`: fuente estática actual.
- `hooks/useCatalogo.js`, `useProducto.js`, `useRecetas.js`: hooks shared que consumen repository.

## 6) Cross-cutting hooks
- `hooks/usePageMeta.js`: SEO meta tags por ruta.
- `hooks/useJsonLd.js`: structured data por ruta.

## 7) Utilidades
- `utils/waLink.jsx`: generación de enlaces de WhatsApp (mensaje + número).
- `utils/prefetchRoutes.js`: hints de prefetch para mejorar percepción de carga.

## 8) Estilos
- `styles/global.css`: sistema visual global (tokens, layout, premium visual, responsive, interacciones).

## 9) Nota de compatibilidad
En varias carpetas hay archivos `.js` que reexportan `.jsx`.
No son duplicación de lógica: son puentes de compatibilidad de import.

## 10) Regla de contribución rápida
- Cambio visual: `ui` o `global.css`.
- Cambio de estado de pantalla: `application`.
- Cambio de regla/transformación: `domain`.
- Cambio de origen de datos: `services`/`hooks`.
