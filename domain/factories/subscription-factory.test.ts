import { describe, it, expect } from 'vitest'
import { SubscriptionFactory, SubscriptionValidationError } from './subscription-factory'
import { PLANS, DEFAULT_PLAN, DEFAULT_STATUS } from '../constants/plans'

/**
 * Test fixtures - use domain constants for business values
 */
const TEST_FIXTURES = {
  validSubscription: {
    id: '123e4567-e89b-12d3-a456-426614174000',
    userId: '456e4567-e89b-12d3-a456-426614174000',
    plan: DEFAULT_PLAN,
    postsRemaining: PLANS.free.postsLimit,
    postsLimit: PLANS.free.postsLimit,
    cycleStartDate: '2024-01-01',
    status: DEFAULT_STATUS,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  proSubscription: {
    plan: 'pro' as const,
    postsRemaining: PLANS.pro.postsLimit,
    postsLimit: PLANS.pro.postsLimit,
  },
  invalidValues: {
    plan: 'invalid',
    status: 'invalid',
    negativePostsRemaining: -1,
    zeroPostsLimit: 0,
  },
}

const ERROR_MESSAGES = {
  subscriptionIdRequired: 'Subscription ID is required',
  userIdRequired: 'User ID is required',
  invalidPlan: 'Invalid plan. Must be one of: free, pro',
  invalidStatus: 'Invalid status. Must be one of: active, cancelled, past_due',
  postsRemainingNonNegative: 'Posts remaining must be a non-negative number',
  postsLimitPositive: 'Posts limit must be a positive number',
  postsRemainingExceedsLimit: 'Posts remaining cannot exceed posts limit',
}

describe('SubscriptionFactory', () => {
  describe('create', () => {
    it('creates a valid subscription entity', () => {
      const subscription = SubscriptionFactory.create(TEST_FIXTURES.validSubscription)

      expect(subscription.id).toBe(TEST_FIXTURES.validSubscription.id)
      expect(subscription.userId).toBe(TEST_FIXTURES.validSubscription.userId)
      expect(subscription.plan).toBe(DEFAULT_PLAN)
      expect(subscription.postsRemaining).toBe(PLANS.free.postsLimit)
      expect(subscription.postsLimit).toBe(PLANS.free.postsLimit)
      expect(subscription.status).toBe(DEFAULT_STATUS)
      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
      expect(subscription.createdAt).toBeInstanceOf(Date)
      expect(subscription.updatedAt).toBeInstanceOf(Date)
    })

    it('creates subscription with pro plan', () => {
      const subscription = SubscriptionFactory.create({
        ...TEST_FIXTURES.validSubscription,
        ...TEST_FIXTURES.proSubscription,
      })

      expect(subscription.plan).toBe('pro')
      expect(subscription.postsLimit).toBe(PLANS.pro.postsLimit)
    })

    it('converts string dates to Date objects', () => {
      const subscription = SubscriptionFactory.create(TEST_FIXTURES.validSubscription)

      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
      expect(subscription.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('createFree', () => {
    it('creates a free subscription with default values', () => {
      const userId = TEST_FIXTURES.validSubscription.userId
      const subscription = SubscriptionFactory.createFree(userId)

      expect(subscription.userId).toBe(userId)
      expect(subscription.plan).toBe(DEFAULT_PLAN)
      expect(subscription.postsRemaining).toBe(PLANS.free.postsLimit)
      expect(subscription.postsLimit).toBe(PLANS.free.postsLimit)
      expect(subscription.status).toBe(DEFAULT_STATUS)
      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
    })

    it('throws error for missing userId', () => {
      expect(() => SubscriptionFactory.createFree('')).toThrow(SubscriptionValidationError)
      expect(() => SubscriptionFactory.createFree('')).toThrow(ERROR_MESSAGES.userIdRequired)
    })
  })

  describe('validate', () => {
    it('throws error for missing id', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...TEST_FIXTURES.validSubscription, id: '' })
      ).toThrow(SubscriptionValidationError)
      expect(() =>
        SubscriptionFactory.validate({ ...TEST_FIXTURES.validSubscription, id: '' })
      ).toThrow(ERROR_MESSAGES.subscriptionIdRequired)
    })

    it('throws error for missing userId', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...TEST_FIXTURES.validSubscription, userId: '' })
      ).toThrow(ERROR_MESSAGES.userIdRequired)
    })

    it('throws error for invalid plan', () => {
      expect(() =>
        SubscriptionFactory.validate({
          ...TEST_FIXTURES.validSubscription,
          plan: TEST_FIXTURES.invalidValues.plan,
        })
      ).toThrow(ERROR_MESSAGES.invalidPlan)
    })

    it('throws error for invalid status', () => {
      expect(() =>
        SubscriptionFactory.validate({
          ...TEST_FIXTURES.validSubscription,
          status: TEST_FIXTURES.invalidValues.status,
        })
      ).toThrow(ERROR_MESSAGES.invalidStatus)
    })

    it('throws error for negative postsRemaining', () => {
      expect(() =>
        SubscriptionFactory.validate({
          ...TEST_FIXTURES.validSubscription,
          postsRemaining: TEST_FIXTURES.invalidValues.negativePostsRemaining,
        })
      ).toThrow(ERROR_MESSAGES.postsRemainingNonNegative)
    })

    it('throws error for zero postsLimit', () => {
      expect(() =>
        SubscriptionFactory.validate({
          ...TEST_FIXTURES.validSubscription,
          postsLimit: TEST_FIXTURES.invalidValues.zeroPostsLimit,
        })
      ).toThrow(ERROR_MESSAGES.postsLimitPositive)
    })

    it('throws error when postsRemaining exceeds postsLimit', () => {
      const exceedingRemaining = PLANS.free.postsLimit + 5
      expect(() =>
        SubscriptionFactory.validate({
          ...TEST_FIXTURES.validSubscription,
          postsRemaining: exceedingRemaining,
          postsLimit: PLANS.free.postsLimit,
        })
      ).toThrow(ERROR_MESSAGES.postsRemainingExceedsLimit)
    })

    it('accepts valid data without throwing', () => {
      expect(() => SubscriptionFactory.validate(TEST_FIXTURES.validSubscription)).not.toThrow()
    })

    it('accepts cancelled status', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...TEST_FIXTURES.validSubscription, status: 'cancelled' })
      ).not.toThrow()
    })

    it('accepts past_due status', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...TEST_FIXTURES.validSubscription, status: 'past_due' })
      ).not.toThrow()
    })
  })

  describe('validateCreateData', () => {
    it('validates correct create data', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({ userId: TEST_FIXTURES.validSubscription.userId })
      ).not.toThrow()
    })

    it('validates create data with optional fields', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({
          userId: TEST_FIXTURES.validSubscription.userId,
          plan: 'pro',
          postsRemaining: PLANS.pro.postsLimit,
          postsLimit: PLANS.pro.postsLimit,
          status: DEFAULT_STATUS,
        })
      ).not.toThrow()
    })

    it('throws error for invalid optional plan', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({
          userId: TEST_FIXTURES.validSubscription.userId,
          plan: TEST_FIXTURES.invalidValues.plan as 'free',
        })
      ).toThrow('Invalid plan')
    })
  })
})
