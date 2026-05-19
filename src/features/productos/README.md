# Feature Productos

Estructura pensada para lectura rápida y mantenimiento seguro.

## Flujo de datos (en orden)

1. `pages/Productos.jsx` y `pages/ProductoDetalle.jsx`
2. `ui/*View.jsx` (componen la pantalla)
3. `application/use*ViewModel.jsx` (estado y orquestación)
4. `domain/*` (reglas puras: constantes, selectores, formateadores, builders)
5. `hooks/useCatalogo.js` y `hooks/useProducto.js` (acceso a datos)

## Carpetas

- `domain/`
  - `constants.jsx`: valores compartidos del negocio.
  - `selectors.jsx`: transformación de datos y derivados.
  - `formatters.jsx`: formato de precio y utilidades simples.
  - `builders.jsx`: estructuras derivadas (ej. schema SEO).
- `application/`
  - `useProductosViewModel.jsx`: estado de la pantalla de listado.
  - `useProductoDetalleViewModel.jsx`: estado de la pantalla detalle.
  - `useCatalogoSource.jsx` y `useProductoSource.jsx`: frontera de acceso a datos del feature.
  - `whatsappBuilders.jsx`: mensajes reutilizables para CTA.
- `ui/`
  - `ProductosPageView.jsx` y `ProductoDetalleView.jsx`: ensamblan componentes.
  - `components/`: bloques visuales pequeños y legibles.

## Regla práctica

Si el cambio es de presentación, toca `ui/`.
Si el cambio es de estado/flujo de pantalla, toca `application/`.
Si el cambio es una regla reutilizable, toca `domain/`.
