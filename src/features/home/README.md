# Feature Home

Patrón aplicado (igual que `productos` y `recetas`):

1. `pages/Home.jsx` (entrypoint de ruta)
2. `ui/HomePageView.jsx` (ensambla la pantalla)
3. `application/useHomeViewModel.jsx` (estado/orquestación)
4. `application/useHomeSource.jsx` (frontera de datos)
5. `domain/*` (constantes y selectores puros)

Regla práctica:
- Cambios visuales: `ui/`
- Cambios de estado/composición: `application/`
- Reglas reutilizables: `domain/`
