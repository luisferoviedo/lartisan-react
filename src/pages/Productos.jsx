import ProductosPageView from '../features/productos/ui/ProductosPageView'
import RouteErrorBoundary from '../components/RouteErrorBoundary'

export default function Productos() {
  return (
    <RouteErrorBoundary>
      <ProductosPageView />
    </RouteErrorBoundary>
  )
}
