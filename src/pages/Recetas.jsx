import RouteErrorBoundary from '../components/RouteErrorBoundary'
import RecetasPageView from '../features/recetas/ui/RecetasPageView'

export default function Recetas() {
  return (
    <RouteErrorBoundary>
      <RecetasPageView />
    </RouteErrorBoundary>
  )
}
