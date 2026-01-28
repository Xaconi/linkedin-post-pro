import type { Metadata } from 'next'

import { PricingPageContent } from '@features/pricing'
import { Footer } from '@features/landing'

export const metadata: Metadata = {
  title: 'Precios',
  description:
    'Planes y precios de LinkedIn Post Pro. Empieza gratis con 5 posts al mes o únete a la lista de espera del plan Pro.',
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
