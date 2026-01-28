import Link from 'next/link'

import { CheckIcon } from '@/shared/components'

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

interface PricingCardProps extends PricingPlan { }

/**
 * Pricing card component for displaying plan details
 * Editorial design with clear visual hierarchy
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
  const ctaClassName = `mb-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-center font-semibold transition-all duration-200 ${
    highlighted
      ? 'bg-primary text-white hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]'
      : onCtaClick || ctaLink
        ? 'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white active:scale-[0.98]'
        : 'cursor-not-allowed border-2 border-neutral-light bg-neutral-light/50 text-neutral-medium'
  }`

  const ctaContent = (
    <>
      {cta}
      {(onCtaClick || ctaLink) && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ${
        highlighted
          ? 'border-2 border-primary bg-white shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15'
          : 'border border-neutral-light bg-white shadow-sm hover:border-neutral-light/80 hover:shadow-lg'
      }`}
    >
      {/* Highlighted card accent */}
      {highlighted && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary" />
      )}

      {/* Badge - refined ribbon */}
      {badge && (
        <div className="absolute -right-[52px] top-8 rotate-45 bg-gradient-to-r from-primary to-primary-hover px-14 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
          {badge}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8 pt-10">
        {/* Plan header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                highlighted
                  ? 'bg-primary text-white'
                  : 'bg-neutral-light text-neutral-dark'
              }`}
            >
              {name[0]}
            </span>
            <h3 className="font-display text-2xl font-bold text-neutral-dark">
              {name}
            </h3>
          </div>
          <p className="text-neutral-medium">{description}</p>
        </div>

        {/* Price - dramatic typography */}
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-6xl font-bold tracking-tight text-neutral-dark">
              {price}
            </span>
            <span className="text-3xl font-bold text-neutral-dark">€</span>
          </div>
          <span className="mt-1 block text-sm text-neutral-medium">
            {period}
          </span>
        </div>

        {/* CTA - full width with micro-interaction */}
        {ctaLink ? (
          <Link href={ctaLink} className={ctaClassName}>
            {ctaContent}
          </Link>
        ) : onCtaClick ? (
          <button onClick={onCtaClick} className={ctaClassName}>
            {ctaContent}
          </button>
        ) : (
          <button disabled className={ctaClassName}>
            {ctaContent}
          </button>
        )}

        {/* Features - with subtle divider */}
        <div className="mt-auto">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-medium">
              Incluye
            </span>
            <span className="h-px flex-1 bg-neutral-light" />
          </div>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${highlighted ? 'bg-primary/10' : 'bg-secondary/10'
                    }`}
                >
                  <CheckIcon
                    className={`h-3 w-3 ${highlighted ? 'text-primary' : 'text-secondary'}`}
                  />
                </span>
                <span className="text-sm text-neutral-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
