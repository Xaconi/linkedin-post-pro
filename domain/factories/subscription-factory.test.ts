import { describe, it, expect } from 'vitest'
import { SubscriptionFactory, SubscriptionValidationError } from './subscription-factory'

describe('SubscriptionFactory', () => {
  const validSubscriptionData = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    userId: '456e4567-e89b-12d3-a456-426614174000',
    plan: 'free',
    postsRemaining: 5,
    postsLimit: 5,
    cycleStartDate: '2024-01-01',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }

  describe('create', () => {
    it('creates a valid subscription entity', () => {
      const subscription = SubscriptionFactory.create(validSubscriptionData)

      expect(subscription.id).toBe(validSubscriptionData.id)
      expect(subscription.userId).toBe(validSubscriptionData.userId)
      expect(subscription.plan).toBe('free')
      expect(subscription.postsRemaining).toBe(5)
      expect(subscription.postsLimit).toBe(5)
      expect(subscription.status).toBe('active')
      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
      expect(subscription.createdAt).toBeInstanceOf(Date)
      expect(subscription.updatedAt).toBeInstanceOf(Date)
    })

    it('creates subscription with pro plan', () => {
      const subscription = SubscriptionFactory.create({
        ...validSubscriptionData,
        plan: 'pro',
        postsRemaining: 50,
        postsLimit: 50,
      })

      expect(subscription.plan).toBe('pro')
      expect(subscription.postsLimit).toBe(50)
    })

    it('converts string dates to Date objects', () => {
      const subscription = SubscriptionFactory.create(validSubscriptionData)

      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
      expect(subscription.createdAt).toBeInstanceOf(Date)
    })
  })

  describe('createFree', () => {
    it('creates a free subscription with default values', () => {
      const subscription = SubscriptionFactory.createFree('user-123')

      expect(subscription.userId).toBe('user-123')
      expect(subscription.plan).toBe('free')
      expect(subscription.postsRemaining).toBe(5)
      expect(subscription.postsLimit).toBe(5)
      expect(subscription.status).toBe('active')
      expect(subscription.cycleStartDate).toBeInstanceOf(Date)
    })

    it('throws error for missing userId', () => {
      expect(() => SubscriptionFactory.createFree('')).toThrow(
        SubscriptionValidationError
      )
      expect(() => SubscriptionFactory.createFree('')).toThrow(
        'User ID is required'
      )
    })
  })

  describe('validate', () => {
    it('throws error for missing id', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, id: '' })
      ).toThrow(SubscriptionValidationError)
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, id: '' })
      ).toThrow('Subscription ID is required')
    })

    it('throws error for missing userId', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, userId: '' })
      ).toThrow('User ID is required')
    })

    it('throws error for invalid plan', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, plan: 'invalid' })
      ).toThrow('Invalid plan. Must be one of: free, pro')
    })

    it('throws error for invalid status', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, status: 'invalid' })
      ).toThrow('Invalid status. Must be one of: active, cancelled, past_due')
    })

    it('throws error for negative postsRemaining', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, postsRemaining: -1 })
      ).toThrow('Posts remaining must be a non-negative number')
    })

    it('throws error for zero postsLimit', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, postsLimit: 0 })
      ).toThrow('Posts limit must be a positive number')
    })

    it('throws error when postsRemaining exceeds postsLimit', () => {
      expect(() =>
        SubscriptionFactory.validate({
          ...validSubscriptionData,
          postsRemaining: 10,
          postsLimit: 5,
        })
      ).toThrow('Posts remaining cannot exceed posts limit')
    })

    it('accepts valid data without throwing', () => {
      expect(() => SubscriptionFactory.validate(validSubscriptionData)).not.toThrow()
    })

    it('accepts cancelled status', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, status: 'cancelled' })
      ).not.toThrow()
    })

    it('accepts past_due status', () => {
      expect(() =>
        SubscriptionFactory.validate({ ...validSubscriptionData, status: 'past_due' })
      ).not.toThrow()
    })
  })

  describe('validateCreateData', () => {
    it('validates correct create data', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({ userId: 'user-123' })
      ).not.toThrow()
    })

    it('validates create data with optional fields', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({
          userId: 'user-123',
          plan: 'pro',
          postsRemaining: 50,
          postsLimit: 50,
          status: 'active',
        })
      ).not.toThrow()
    })

    it('throws error for invalid optional plan', () => {
      expect(() =>
        SubscriptionFactory.validateCreateData({
          userId: 'user-123',
          plan: 'invalid' as 'free',
        })
      ).toThrow('Invalid plan')
    })
  })
})
