import RouteErrorBoundary from '../components/RouteErrorBoundary'
import HomePageView from '../features/home/ui/HomePageView'

export default function Home() {
  return (
    <RouteErrorBoundary>
      <HomePageView />
    </RouteErrorBoundary>
  )
}
