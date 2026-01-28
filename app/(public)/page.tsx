import {
  HeroSection,
  ProblemSolution,
  HowItWorks,
  PricingPreview,
  FAQSection,
  FinalCTA,
  Footer,
  StructuredData,
} from '@features/landing'

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <HeroSection />
        <ProblemSolution />
        <HowItWorks />
        <PricingPreview />
        <FAQSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
