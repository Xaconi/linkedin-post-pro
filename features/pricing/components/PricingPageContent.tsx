'use client'

import { PLAN_FEATURES, PLAN_LIMITS } from '@/config/plans'

import { ComparisonTable } from './ComparisonTable'
import { FAQPreview } from './FAQPreview'
import { HeroSection } from './HeroSection'
import { PricingCard } from './PricingCard'
import { WaitlistTrigger } from './WaitlistTrigger'

const plans = [
  {
    name: PLAN_LIMITS.FREE.name,
    price: String(PLAN_LIMITS.FREE.price),
    period: 'para siempre',
    description: 'Perfecto para probar y crear contenido ocasional',
    features: [
      `${PLAN_LIMITS.FREE.postsPerMonth} posts al mes`,
      `${PLAN_FEATURES.tonesAvailable} tonos diferentes`,
      `${PLAN_FEATURES.regionsAvailable} regiones (España/LATAM)`,
      `${PLAN_FEATURES.variationsPerIdea} variaciones por idea`,
      'Copia con un clic',
    ],
    cta: 'Empezar gratis',
    ctaLink: '/signup',
    highlighted: false,
    badge: null,
  },
  {
    name: PLAN_LIMITS.PRO.name,
    price: String(PLAN_LIMITS.PRO.price),
    period: '/mes',
    description: 'Para quienes publican cada semana',
    features: [
      `${PLAN_LIMITS.PRO.postsPerMonth} posts al mes`,
      `${PLAN_FEATURES.tonesAvailable} tonos diferentes`,
      `${PLAN_FEATURES.regionsAvailable} regiones (España/LATAM)`,
      `${PLAN_FEATURES.variationsPerIdea} variaciones por idea`,
      'Copia con un clic',
      'Historial de posts',
      'Soporte prioritario',
    ],
    cta: 'Me interesa',
    ctaLink: null,
    highlighted: true,
    badge: 'Próximamente',
  },
]

/**
 * Pricing page content - Client component (required for render props callbacks)
 * Plan data defined here, modal state managed by WaitlistTrigger
 * Content is SSR'd by Next.js and included in initial HTML
 */
export function PricingPageContent() {
  return (
    <WaitlistTrigger source="pricing_page">
      {(openWaitlist) => (
        <>
          <HeroSection>
            <div className="grid gap-8 md:grid-cols-2">
              {plans.map((plan) => (
                <PricingCard
                  key={plan.name}
                  {...plan}
                  onCtaClick={plan.ctaLink === null ? openWaitlist : undefined}
                />
              ))}
            </div>
          </HeroSection>

          <ComparisonTable onProClick={openWaitlist} />

          <FAQPreview />
        </>
      )}
    </WaitlistTrigger>
  )
}
