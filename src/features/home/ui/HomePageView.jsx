import { useHomeViewModel } from '../application/useHomeViewModel'
import HomeHeroSection from './components/HomeHeroSection'
import HomeExploreSection from './components/HomeExploreSection'
import HomeFeaturedSection from './components/HomeFeaturedSection'
import HomeFinalCtaSection from './components/HomeFinalCtaSection'

export default function HomePageView() {
  const { loading, error, destacados } = useHomeViewModel()

  return (
    <main id="main-content" tabIndex="-1">
      <HomeHeroSection />
      <HomeExploreSection />
      <HomeFeaturedSection loading={loading} error={error} destacados={destacados} />
      <HomeFinalCtaSection />
    </main>
  )
}
