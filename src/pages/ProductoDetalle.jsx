import ProductoDetalleView from '../features/productos/ui/ProductoDetalleView'
import RouteErrorBoundary from '../components/RouteErrorBoundary'

export default function ProductoDetalle() {
  return (
    <RouteErrorBoundary>
      <ProductoDetalleView />
    </RouteErrorBoundary>
  )
}
