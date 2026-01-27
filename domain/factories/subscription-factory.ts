/**
 * Subscription Factory - Domain layer
 * Validates and creates Subscription entities
 */

import type {
  Subscription,
  SubscriptionPlan,
  SubscriptionStatus,
  CreateSubscriptionData,
} from '../entities/subscription'
import { PLANS, DEFAULT_PLAN, DEFAULT_STATUS, getPostsLimitForPlan } from '../constants/plans'

export class SubscriptionValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SubscriptionValidationError'
  }
}

export interface RawSubscriptionData {
  id: string
  userId: string
  plan: string
  postsRemaining: number
  postsLimit: number
  cycleStartDate: Date | string
  status: string
  createdAt: Date | string
  updatedAt: Date | string
}

const VALID_PLANS: SubscriptionPlan[] = ['free', 'pro']
const VALID_STATUSES: SubscriptionStatus[] = ['active', 'cancelled', 'past_due']

export class SubscriptionFactory {
  /**
   * Create a Subscription entity from raw data with validation
   */
  static create(data: RawSubscriptionData): Subscription {
    SubscriptionFactory.validate(data)

    return {
      id: data.id,
      userId: data.userId,
      plan: data.plan as SubscriptionPlan,
      postsRemaining: data.postsRemaining,
      postsLimit: data.postsLimit,
      cycleStartDate: data.cycleStartDate instanceof Date
        ? data.cycleStartDate
        : new Date(data.cycleStartDate),
      status: data.status as SubscriptionStatus,
      createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
    }
  }

  /**
   * Create a new free subscription for a user
   */
  static createFree(userId: string): Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'> {
    if (!userId || typeof userId !== 'string') {
      throw new SubscriptionValidationError('User ID is required')
    }

    const postsLimit = getPostsLimitForPlan(DEFAULT_PLAN)

    return {
      userId,
      plan: DEFAULT_PLAN,
      postsRemaining: postsLimit,
      postsLimit,
      cycleStartDate: new Date(),
      status: DEFAULT_STATUS,
    }
  }

  /**
   * Validate subscription data according to domain rules
   */
  static validate(data: Partial<RawSubscriptionData>): void {
    if (!data.id || typeof data.id !== 'string') {
      throw new SubscriptionValidationError('Subscription ID is required')
    }

    if (!data.userId || typeof data.userId !== 'string') {
      throw new SubscriptionValidationError('User ID is required')
    }

    if (!data.plan || !VALID_PLANS.includes(data.plan as SubscriptionPlan)) {
      throw new SubscriptionValidationError(`Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}`)
    }

    if (!data.status || !VALID_STATUSES.includes(data.status as SubscriptionStatus)) {
      throw new SubscriptionValidationError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`)
    }

    if (typeof data.postsRemaining !== 'number' || data.postsRemaining < 0) {
      throw new SubscriptionValidationError('Posts remaining must be a non-negative number')
    }

    if (typeof data.postsLimit !== 'number' || data.postsLimit <= 0) {
      throw new SubscriptionValidationError('Posts limit must be a positive number')
    }

    if (data.postsRemaining > data.postsLimit) {
      throw new SubscriptionValidationError('Posts remaining cannot exceed posts limit')
    }
  }

  /**
   * Validate data for creating a new subscription
   */
  static validateCreateData(data: CreateSubscriptionData): void {
    if (!data.userId || typeof data.userId !== 'string') {
      throw new SubscriptionValidationError('User ID is required')
    }

    if (data.plan && !VALID_PLANS.includes(data.plan)) {
      throw new SubscriptionValidationError(`Invalid plan. Must be one of: ${VALID_PLANS.join(', ')}`)
    }

    if (data.status && !VALID_STATUSES.includes(data.status)) {
      throw new SubscriptionValidationError(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`)
    }

    if (data.postsRemaining !== undefined && (typeof data.postsRemaining !== 'number' || data.postsRemaining < 0)) {
      throw new SubscriptionValidationError('Posts remaining must be a non-negative number')
    }

    if (data.postsLimit !== undefined && (typeof data.postsLimit !== 'number' || data.postsLimit <= 0)) {
      throw new SubscriptionValidationError('Posts limit must be a positive number')
    }
  }
}
