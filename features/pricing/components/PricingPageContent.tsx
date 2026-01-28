'use client'

import { useState } from 'react'
import Link from 'next/link'

import { PLAN_LIMITS } from '@/config/plans'

import { CheckIcon } from './CheckIcon'
import { PricingCard } from './PricingCard'
import { WaitlistModal } from './WaitlistModal'

const plans = [
  {
    name: PLAN_LIMITS.FREE.name,
    price: String(PLAN_LIMITS.FREE.price),
    period: 'para siempre',
    description: 'Perfecto para probar y crear contenido ocasional',
    features: [
      `${PLAN_LIMITS.FREE.postsPerMonth} posts al mes`,
      '3 tonos diferentes',
      '2 regiones (España/LATAM)',
      '3 variaciones por idea',
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
    description: 'Para creadores de contenido serios',
    features: [
      `${PLAN_LIMITS.PRO.postsPerMonth} posts al mes`,
      '3 tonos diferentes',
      '2 regiones (España/LATAM)',
      '3 variaciones por idea',
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

const comparisonFeatures = [
  { feature: 'Posts al mes', free: '5', pro: '50' },
  { feature: 'Tonos disponibles', free: 'Todos (3)', pro: 'Todos (3)' },
  { feature: 'Regiones', free: 'España + LATAM', pro: 'España + LATAM' },
  { feature: 'Variaciones por idea', free: '3', pro: '3' },
  { feature: 'Copia con un clic', free: true, pro: true },
  { feature: 'Historial de posts', free: false, pro: true },
  { feature: 'Soporte prioritario', free: false, pro: true },
]

/**
 * Client component for pricing page with waitlist modal integration
 */
export function PricingPageContent() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          {/* Header */}
          <div className="mb-16 text-center">
            <Link
              href="/"
              className="mb-8 inline-block font-display text-xl font-bold text-neutral-dark"
            >
              LinkedIn Post<span className="text-primary"> Pro</span>
            </Link>

            <h1 className="mb-4 font-display text-4xl font-bold text-neutral-dark md:text-5xl">
              Precios simples y claros
            </h1>
            <p className="mx-auto max-w-xl text-lg text-neutral-medium">
              Empieza gratis, sin tarjeta de crédito. Actualiza cuando necesites más.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                {...plan}
                onCtaClick={
                  plan.ctaLink === null
                    ? () => setIsWaitlistOpen(true)
                    : undefined
                }
              />
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-medium">
            <span className="flex items-center gap-2">
              <CheckIcon className="text-secondary" /> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-secondary" /> Configuración en 30 segundos
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="text-secondary" /> Cancela cuando quieras
            </span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-neutral-light py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark">
              Compara los planes
            </h2>
            <p className="text-neutral-medium">
              Todo lo que necesitas saber sobre cada plan
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-light/50 bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-light">
                  <th className="px-6 py-4 text-left font-display font-semibold text-neutral-dark">
                    Característica
                  </th>
                  <th className="px-6 py-4 text-center font-display font-semibold text-neutral-dark">
                    Free
                  </th>
                  <th className="bg-primary/5 px-6 py-4 text-center font-display font-semibold text-primary">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={
                      index !== comparisonFeatures.length - 1
                        ? 'border-b border-neutral-light'
                        : ''
                    }
                  >
                    <td className="px-6 py-4 text-neutral-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <CheckIcon className="mx-auto text-secondary" />
                        ) : (
                          <span className="text-neutral-medium">—</span>
                        )
                      ) : (
                        <span className="text-neutral-dark">{row.free}</span>
                      )}
                    </td>
                    <td className="bg-primary/5 px-6 py-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <CheckIcon className="mx-auto text-primary" />
                        ) : (
                          <span className="text-neutral-medium">—</span>
                        )
                      ) : (
                        <span className="font-medium text-neutral-dark">
                          {row.pro}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-neutral-light">
                  <td className="px-6 py-6"></td>
                  <td className="px-6 py-6 text-center">
                    <Link
                      href="/signup"
                      className="inline-block rounded-lg border-2 border-primary px-6 py-2 font-medium text-primary transition-all hover:bg-primary hover:text-white"
                    >
                      Empezar gratis
                    </Link>
                  </td>
                  <td className="bg-primary/5 px-6 py-6 text-center">
                    <button
                      onClick={() => setIsWaitlistOpen(true)}
                      className="inline-block rounded-lg bg-primary px-6 py-2 font-medium text-white transition-all hover:bg-primary-hover"
                    >
                      Me interesa
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark">
            ¿Tienes preguntas?
          </h2>
          <p className="mb-8 text-neutral-medium">
            Consulta nuestras preguntas frecuentes o escríbenos directamente.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#faq"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 font-medium text-primary transition-all hover:bg-primary hover:text-white"
            >
              Ver FAQ
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        source="pricing_page"
      />
    </>
  )
}
