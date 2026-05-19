import { Component } from 'react'

// Boundary de ruta: evita pantalla en blanco si un componente lanza error en render.
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || 'Error de render en esta ruta.',
    }
  }

  componentDidCatch(error, info) {
    // Keep visible feedback for users and detailed info for debugging.
    console.error('RouteErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main id="main-content" tabIndex="-1">
        <section className="section">
          <div className="container">
            <h1 className="h1">Ocurrió un error al renderizar esta página</h1>
            <p className="p">{this.state.errorMessage}</p>
            <p className="p p-reset">Recarga la página. Si persiste, comparte este mensaje para depurar.</p>
          </div>
        </section>
      </main>
    )
  }
}
