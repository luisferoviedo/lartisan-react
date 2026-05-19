import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Code splitting por ruta para reducir JS inicial.
const Home = lazy(() => import('./pages/Home'))
const Productos = lazy(() => import('./pages/Productos'))
const ProductoDetalle = lazy(() => import('./pages/ProductoDetalle'))
const Recetas = lazy(() => import('./pages/Recetas'))
const Nosotros = lazy(() => import('./pages/Nosotros'))
const Contacto = lazy(() => import('./pages/Contacto'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteLoader() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="p p-reset" aria-live="polite">Cargando contenido...</p>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Fallback compartido durante carga de chunks de ruta */}
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route
            path="/"
            element={<Layout />}
          >
            <Route index element={<Home />} />
            <Route path="productos" element={<Productos />} />
            <Route path="productos/:slug" element={<ProductoDetalle />} />
            <Route path="recetas" element={<Recetas />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
