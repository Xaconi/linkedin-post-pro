/**
 * User Types - Re-export from Domain Layer
 *
 * For backward compatibility. Prefer importing from @/domain directly.
 */

export type {
  SubscriptionPlan,
  SubscriptionStatus,
  Subscription as UserSubscription,
} from '@/domain'

// Alias for backward compatibility
export type { SubscriptionPlan as PlanType } from '@/domain'
