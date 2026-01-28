import Link from 'next/link'

import { CheckIcon } from './CheckIcon'

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaLink: string | null
  highlighted: boolean
  badge: string | null
  onCtaClick?: () => void
}

interface PricingCardProps extends PricingPlan {}

/**
 * Pricing card component for displaying plan details
 * Used in both landing page preview and dedicated pricing page
 */
export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  highlighted,
  badge,
  onCtaClick,
}: PricingCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-8 transition-all ${
        highlighted
          ? 'border-2 border-primary bg-white shadow-xl'
          : 'border border-neutral-light/50 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-semibold text-white">
          {badge}
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <h3 className="mb-2 font-display text-xl font-semibold text-neutral-dark">
          {name}
        </h3>
        <p className="text-sm text-neutral-medium">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6 flex items-baseline gap-1">
        <span className="font-display text-5xl font-bold text-neutral-dark">
          {price}€
        </span>
        <span className="text-neutral-medium">{period}</span>
      </div>

      {/* CTA */}
      {ctaLink ? (
        <Link
          href={ctaLink}
          className={`mb-8 block w-full rounded-xl py-3 text-center font-medium transition-all ${
            highlighted
              ? 'bg-primary text-white hover:bg-primary-hover'
              : 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
          }`}
        >
          {cta}
        </Link>
      ) : onCtaClick ? (
        <button
          onClick={onCtaClick}
          className={`mb-8 block w-full rounded-xl py-3 text-center font-medium transition-all ${
            highlighted
              ? 'bg-primary text-white hover:bg-primary-hover'
              : 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
          }`}
        >
          {cta}
        </button>
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
            <span
              className={`mt-0.5 ${highlighted ? 'text-primary' : 'text-secondary'}`}
            >
              <CheckIcon />
            </span>
            <span className="text-neutral-medium">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
