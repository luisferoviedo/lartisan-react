import RouteErrorBoundary from '../components/RouteErrorBoundary'
import NosotrosPageView from '../features/nosotros/ui/NosotrosPageView'

export default function Nosotros() {
  return (
    <RouteErrorBoundary>
      <NosotrosPageView />
    </RouteErrorBoundary>
  )
}
