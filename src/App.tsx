import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { HeroScrollShrinkWrapper } from './components/HeroScrollShrinkWrapper'
import { ManifestoSection } from './components/ManifestoSection'
import { HorizontalGallerySection } from './components/HorizontalGallerySection'
import { FeatureShowcaseSection } from './components/FeatureShowcaseSection'
import { LiturgicalPillars } from './components/LiturgicalPillars'
import { PricingSection } from './components/PricingSection'
import { InteractiveDemoModal } from './components/InteractiveDemoModal'
import { Footer } from './components/Footer'

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState<string>('egbe')

  const handleOpenDemo = (planId?: string) => {
    if (planId) {
      setSelectedPlanId(planId)
    }
    setDemoModalOpen(true)
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-[#F7F1E6] text-[#262626] font-sans selection:bg-[#761D19] selection:text-[#F7F1E6]">
        <Navbar onOpenDemo={() => handleOpenDemo()} />
        <main>
          <HeroScrollShrinkWrapper onOpenDemo={() => handleOpenDemo()} />
          <ManifestoSection onOpenDemo={() => handleOpenDemo()} />
          <HorizontalGallerySection />
          <FeatureShowcaseSection onOpenDemo={() => handleOpenDemo()} />
          <LiturgicalPillars onOpenDemo={() => handleOpenDemo()} />
          <PricingSection
            onSelectPlan={(planId) => setSelectedPlanId(planId)}
            onOpenDemo={() => handleOpenDemo()}
          />
        </main>
        <Footer onOpenDemo={() => handleOpenDemo()} />
        <InteractiveDemoModal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
          selectedPlanId={selectedPlanId}
        />
      </div>
    </SmoothScroll>
  )
}

export default App
