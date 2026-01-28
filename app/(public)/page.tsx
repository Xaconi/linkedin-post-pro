import {
  HeroSection,
  ProblemSolution,
  HowItWorks,
  PricingPreview,
  FAQSection,
  FinalCTA,
  Footer,
} from '@features/landing'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
