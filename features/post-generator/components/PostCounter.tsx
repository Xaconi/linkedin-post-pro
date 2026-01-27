'use client'

import { PostIcon } from '@/shared/components'
import { PlanBadge } from './PlanBadge'
import type { SubscriptionPlan } from '@/domain/entities/subscription'

interface PostCounterProps {
  postsRemaining: number
  postsLimit: number
  plan: SubscriptionPlan
}

/**
 * Displays remaining posts count with plan badge
 * Shows warning state when posts are low or depleted
 */
export function PostCounter({
  postsRemaining,
  postsLimit,
  plan,
}: PostCounterProps) {
  const percentage = (postsRemaining / postsLimit) * 100
  const isLow = percentage <= 20 && postsRemaining > 0
  const isDepleted = postsRemaining === 0

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-light">
      <div className="flex items-center gap-3">
        <div
          className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${isDepleted
              ? 'bg-error/10'
              : isLow
                ? 'bg-orange-100'
                : 'bg-primary/10'
            }
          `}
        >
          <PostIcon
            className={`
              w-5 h-5
              ${isDepleted
                ? 'text-error'
                : isLow
                  ? 'text-orange-500'
                  : 'text-primary'
              }
            `}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-dark">
            {isDepleted ? (
              'Sin posts disponibles'
            ) : (
              <>
                Te quedan{' '}
                <span
                  className={`
                    font-semibold
                    ${isDepleted
                      ? 'text-error'
                      : isLow
                        ? 'text-orange-500'
                        : 'text-primary'
                    }
                  `}
                >
                  {postsRemaining}
                </span>{' '}
                {postsRemaining === 1 ? 'post' : 'posts'}
              </>
            )}
          </p>
          <p className="text-xs text-neutral-medium">
            {postsRemaining} de {postsLimit} este mes
          </p>
        </div>
      </div>
      <PlanBadge plan={plan} />
    </div>
  )
}
