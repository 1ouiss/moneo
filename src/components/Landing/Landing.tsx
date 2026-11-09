import { CtaSection } from './components/CtaSection'
import { FaqSection } from './components/FaqSection'
import { FeaturesSection } from './components/FeaturesSection'
import { Hero } from './components/Hero'
import { HowItWorksSection } from './components/HowItWorksSection'
import { ShowcaseSection } from './components/ShowcaseSection'
import { SiteFooter } from './components/SiteFooter'
import { StructuredData } from './components/StructuredData'
import { useReveal } from './hooks/useReveal'

export const Landing = () => {
  useReveal()

  return (
    <>
      <main>
        <Hero />
        <ShowcaseSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
      <StructuredData />
    </>
  )
}
