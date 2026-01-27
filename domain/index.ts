/**
 * Domain Layer - Pure Business Logic
 *
 * This layer contains:
 * - Entities: Pure TypeScript types representing business objects
 * - Factories: Create and validate entities with domain rules
 * - Constants: Business rules and configuration (plan limits, etc.)
 * - Repositories: Interfaces for data access (implemented by infrastructure)
 *
 * IMPORTANT: This layer has NO dependencies on external services
 * (Supabase, Clerk, Stripe, etc.)
 */

// Entities
export type {
  User,
  CreateUserData,
  UpdateUserData,
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  SubscriptionPlan,
  SubscriptionStatus,
} from './entities'

// Factories (create and validate entities)
export {
  UserFactory,
  UserValidationError,
  SubscriptionFactory,
  SubscriptionValidationError,
} from './factories'
export type { RawUserData, RawSubscriptionData } from './factories'

// Constants
export {
  PLANS,
  DEFAULT_PLAN,
  DEFAULT_STATUS,
  getPostsLimitForPlan,
  getPlanConfig,
  isPaidPlan,
  getAvailablePlans,
} from './constants'
export type { PlanConfig } from './constants'

// Repository Interfaces
export type { IUserRepository, ISubscriptionRepository } from './repositories'
