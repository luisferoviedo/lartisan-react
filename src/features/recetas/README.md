# Feature Recetas

Mismo patrón de lectura que `productos`:

1. `pages/Recetas.jsx` (entrypoint de ruta)
2. `ui/RecetasPageView.jsx` (ensambla pantalla)
3. `application/useRecetasViewModel.jsx` (estado/orquestación)
4. `application/useRecetasSource.jsx` (frontera de datos)
5. `domain/constants.jsx` (constantes de negocio)

Regla de uso:
- UI/estructura visual: `ui/`
- Estado de pantalla: `application/`
- Valores reutilizables: `domain/`
