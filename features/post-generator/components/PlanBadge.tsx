'use client'

import type { SubscriptionPlan } from '@/domain/entities/subscription'

interface PlanBadgeProps {
  plan: SubscriptionPlan
}

/**
 * Badge showing current subscription plan (Free/Pro)
 */
export function PlanBadge({ plan }: PlanBadgeProps) {
  const isPro = plan === 'pro'

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${isPro
          ? 'bg-secondary/10 text-secondary'
          : 'bg-neutral-light text-neutral-medium'
        }
      `}
    >
      {isPro ? 'Pro' : 'Free'}
    </span>
  )
}
