import RouteErrorBoundary from '../components/RouteErrorBoundary'
import ContactoPageView from '../features/contacto/ui/ContactoPageView'

export default function Contacto() {
  return (
    <RouteErrorBoundary>
      <ContactoPageView />
    </RouteErrorBoundary>
  )
}
