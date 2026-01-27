/**
 * Subscription Service - Application layer business logic
 * Handles subscription operations without knowing about Supabase
 */

import { Container } from '../container'
import type { Subscription, SubscriptionPlan } from '@/domain/entities/subscription'

export class SubscriptionService {
  /**
   * Get subscription for a user
   */
  async getByUserId(userId: string): Promise<Subscription | null> {
    const subscriptionRepo = Container.getSubscriptionRepository()
    return subscriptionRepo.findByUserId(userId)
  }

  /**
   * Create free subscription for new user
   */
  async createFreeSubscription(userId: string): Promise<Subscription> {
    const subscriptionRepo = Container.getSubscriptionRepository()
    return subscriptionRepo.create({
      userId,
      plan: 'free',
    })
  }

  /**
   * Ensure user has a subscription, create free one if not
   */
  async ensureSubscription(userId: string): Promise<Subscription> {
    const existing = await this.getByUserId(userId)
    if (existing) {
      return existing
    }
    return this.createFreeSubscription(userId)
  }

  /**
   * Check if user can generate a post
   */
  async canGeneratePost(userId: string): Promise<boolean> {
    const subscription = await this.getByUserId(userId)
    if (!subscription) {
      return false
    }
    return subscription.postsRemaining > 0 && subscription.status === 'active'
  }

  /**
   * Consume one post from user's allowance
   * Returns null if no posts remaining
   */
  async consumePost(userId: string): Promise<Subscription | null> {
    const subscriptionRepo = Container.getSubscriptionRepository()
    return subscriptionRepo.decrementPostsRemaining(userId)
  }

  /**
   * Get remaining posts for user
   */
  async getPostsRemaining(userId: string): Promise<number> {
    const subscription = await this.getByUserId(userId)
    return subscription?.postsRemaining ?? 0
  }

  /**
   * Upgrade user to a new plan
   */
  async upgradePlan(userId: string, plan: SubscriptionPlan): Promise<Subscription> {
    const subscriptionRepo = Container.getSubscriptionRepository()
    return subscriptionRepo.upgradePlan(userId, plan)
  }

  /**
   * Reset posts for new billing cycle
   */
  async resetPostsForCycle(userId: string): Promise<Subscription> {
    const subscriptionRepo = Container.getSubscriptionRepository()
    return subscriptionRepo.resetPostsForCycle(userId)
  }
}

export const subscriptionService = new SubscriptionService()
