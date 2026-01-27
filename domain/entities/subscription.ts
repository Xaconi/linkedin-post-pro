/**
 * Subscription Entity - Pure business domain type
 * Technology-agnostic, no dependencies on Supabase/Stripe/etc.
 */

/**
 * Available subscription plans
 */
export type SubscriptionPlan = 'free' | 'pro'

/**
 * Subscription status
 */
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due'

/**
 * Subscription entity
 */
export interface Subscription {
  id: string
  userId: string
  plan: SubscriptionPlan
  postsRemaining: number
  postsLimit: number
  cycleStartDate: Date
  status: SubscriptionStatus
  createdAt: Date
  updatedAt: Date
}

/**
 * Data required to create a subscription
 */
export interface CreateSubscriptionData {
  userId: string
  plan?: SubscriptionPlan
  postsRemaining?: number
  postsLimit?: number
  status?: SubscriptionStatus
}

/**
 * Data allowed for subscription updates
 */
export interface UpdateSubscriptionData {
  plan?: SubscriptionPlan
  postsRemaining?: number
  postsLimit?: number
  cycleStartDate?: Date
  status?: SubscriptionStatus
}
