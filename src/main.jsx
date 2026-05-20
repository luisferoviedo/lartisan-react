import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/layout.css'
import './styles/pages.css'
import './styles/not-found.css'
import App from './App.jsx'

// Entry point único de la aplicación.
// Monta React en #root y carga estilos globales antes de renderizar rutas.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
