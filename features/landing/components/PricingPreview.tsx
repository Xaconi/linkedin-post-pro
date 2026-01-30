import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'para siempre',
    description: 'Perfecto para probar y crear contenido ocasional',
    features: [
      '5 posts al mes',
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
    name: 'Pro',
    price: '8',
    period: '/mes',
    description: 'Para creadores de contenido serios',
    features: [
      '50 posts al mes',
      '3 tonos diferentes',
      '2 regiones (España/LATAM)',
      '3 variaciones por idea',
      'Copia con un clic',
      'Historial de posts',
      'Soporte prioritario',
    ],
    cta: 'Próximamente',
    ctaLink: null,
    highlighted: true,
    badge: 'Próximamente',
  },
]

/**
 * Pricing preview section with Free and Pro plans
 */
export function PricingPreview() {
  return (
    <section id="pricing" className="relative bg-neutral-light py-20 md:py-28">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-medium shadow-sm">
            Precios simples
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Empieza gratis,{' '}
            <span className="text-gradient">crece cuando quieras</span>
          </h2>
          <p className="mx-auto max-w-xl text-neutral-medium">
            Sin sorpresas, sin letra pequeña. Cancela cuando quieras.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-medium">
          <span className="flex items-center gap-2">
            <CheckIcon /> Sin tarjeta de crédito
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon /> Configuración en 30 segundos
          </span>
          <span className="flex items-center gap-2">
            <CheckIcon /> Cancela cuando quieras
          </span>
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  highlighted,
  badge,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaLink: string | null
  highlighted: boolean
  badge: string | null
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-8 transition-all ${highlighted
        ? 'border-2 border-primary bg-white shadow-xl'
        : 'border border-neutral-light/50 bg-white shadow-sm hover:shadow-md'
        }`}
    >
      {/* Popular badge */}
      {badge && (
        <div className="absolute -right-12 top-8 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-white">
          {badge}
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3 className="mb-2 font-display text-xl font-semibold text-neutral-dark">{name}</h3>
        <p className="text-sm text-neutral-medium">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-neutral-dark">{price}€</span>
        <span className="text-neutral-medium">{period}</span>
      </div>

      {/* CTA */}
      {ctaLink ? (
        <Link
          href={ctaLink}
          className={`mb-8 block w-full rounded-xl py-3 text-center font-medium transition-all ${highlighted
            ? 'bg-primary text-white hover:bg-primary-hover'
            : 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
            }`}
        >
          {cta}
        </Link>
      ) : (
        <button
          disabled
          className="mb-8 block w-full cursor-not-allowed rounded-xl bg-neutral-light py-3 text-center font-medium text-neutral-medium"
        >
          {cta}
        </button>
      )}

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 ${highlighted ? 'text-primary' : 'text-secondary'}`}>
              <CheckIcon />
            </span>
            <span className="text-neutral-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  )
}
