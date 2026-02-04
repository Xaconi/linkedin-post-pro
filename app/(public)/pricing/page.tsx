import type { Metadata } from 'next'

import { PricingPageContent } from '@features/pricing'
import { Footer } from '@features/landing'

export const metadata: Metadata = {
  title: 'Precios y Planes - Generador Posts LinkedIn Gratis y Pro',
  description:
    'Planes y precios de LinkedIn Post Pro. Plan gratis: 5 posts/mes. Plan Pro: 50 posts/mes por 8€. Genera contenido LinkedIn con IA en español.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Precios LinkedIn Post Pro | Plan Gratis y Pro',
    description:
      'Genera posts para LinkedIn con IA. Plan gratis disponible. Plan Pro desde 8€/mes con 50 posts.',
    url: 'https://linkedinpostpro.com/pricing',
  },
}

export default function PricingPage() {
  return (
    <>
      <main className="min-h-screen">
        <PricingPageContent />
      </main>

      <Footer />
    </>
  )
}
