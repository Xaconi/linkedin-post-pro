'use client'

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

function PostIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  )
}
