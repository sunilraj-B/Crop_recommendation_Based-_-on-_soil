import { HeroSection } from "@/components/hero-section"
import { CropRecommendationTool } from "@/components/crop-recommendation-tool"
import { FeaturedCrops } from "@/components/featured-crops"
import { GrowthTimeline } from "@/components/growth-timeline"
import { FarmingTips } from "@/components/farming-tips"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CropRecommendationTool />
        <FeaturedCrops />
        <GrowthTimeline />
        <FarmingTips />
      </div>
      <Footer />
    </main>
  )
}

