/**
 * Subscription Repository Interface
 * Defines the contract for subscription data access
 * Implementation can be Supabase, Prisma, Stripe, etc.
 */

import type {
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  SubscriptionPlan,
} from '../entities/subscription'

export interface ISubscriptionRepository {
  /**
   * Find subscription by ID
   */
  findById(id: string): Promise<Subscription | null>

  /**
   * Find subscription by user ID
   */
  findByUserId(userId: string): Promise<Subscription | null>

  /**
   * Create a new subscription
   */
  create(data: CreateSubscriptionData): Promise<Subscription>

  /**
   * Update existing subscription
   */
  update(id: string, data: UpdateSubscriptionData): Promise<Subscription>

  /**
   * Decrement posts remaining for a user
   * Returns null if no posts remaining
   */
  decrementPostsRemaining(userId: string): Promise<Subscription | null>

  /**
   * Reset posts for new billing cycle
   */
  resetPostsForCycle(userId: string): Promise<Subscription>

  /**
   * Upgrade subscription to a new plan
   */
  upgradePlan(userId: string, plan: SubscriptionPlan): Promise<Subscription>

  /**
   * Delete subscription by ID
   */
  delete(id: string): Promise<void>
}
