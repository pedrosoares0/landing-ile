import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { HeroScrollShrinkWrapper } from './components/HeroScrollShrinkWrapper'
import { ManifestoSection } from './components/ManifestoSection'
import { HorizontalGallerySection } from './components/HorizontalGallerySection'
import { FeatureShowcaseSection } from './components/FeatureShowcaseSection'
import { LiturgicalPillars } from './components/LiturgicalPillars'
import { InteractiveDemoModal } from './components/InteractiveDemoModal'
import { Footer } from './components/Footer'

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-[#F7F1E6] text-[#262626] font-sans selection:bg-[#761D19] selection:text-[#F7F1E6]">
        <Navbar onOpenDemo={() => setDemoModalOpen(true)} />
        <main>
          <HeroScrollShrinkWrapper onOpenDemo={() => setDemoModalOpen(true)} />
          <ManifestoSection onOpenDemo={() => setDemoModalOpen(true)} />
          <HorizontalGallerySection />
          <FeatureShowcaseSection />
          <LiturgicalPillars onOpenDemo={() => setDemoModalOpen(true)} />
        </main>
        <Footer onOpenDemo={() => setDemoModalOpen(true)} />
        <InteractiveDemoModal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
        />
      </div>
    </SmoothScroll>
  )
}

export default App
