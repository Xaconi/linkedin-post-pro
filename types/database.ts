/**
 * Database Types - Re-export from Domain Layer
 *
 * This file provides backward compatibility and a convenient import path.
 * All business types should be imported from @/domain
 *
 * Usage:
 *   import type { User, Subscription } from '@/types/database'
 *   // or preferably:
 *   import type { User, Subscription } from '@/domain'
 */

export type {
  // Entities
  User,
  CreateUserData,
  UpdateUserData,
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  SubscriptionPlan,
  SubscriptionStatus,
  // Constants
  PlanConfig,
} from '@/domain'

// Re-export constants for convenience
export {
  PLANS,
  DEFAULT_PLAN,
  DEFAULT_STATUS,
  getPostsLimitForPlan,
  getPlanConfig,
  isPaidPlan,
  getAvailablePlans,
} from '@/domain'
