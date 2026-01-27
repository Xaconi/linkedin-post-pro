import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Container } from '../container'
import { SubscriptionService } from './subscription-service'
import { MockSubscriptionRepository, MockUserRepository } from '@/tests/mocks/repositories'

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService
  let mockSubscriptionRepo: MockSubscriptionRepository
  let mockUserRepo: MockUserRepository

  beforeEach(() => {
    mockSubscriptionRepo = new MockSubscriptionRepository()
    mockUserRepo = new MockUserRepository()
    Container.setSubscriptionRepository(mockSubscriptionRepo)
    Container.setUserRepository(mockUserRepo)
    subscriptionService = new SubscriptionService()
  })

  afterEach(() => {
    Container.reset()
    mockSubscriptionRepo.clear()
    mockUserRepo.clear()
  })

  describe('createFreeSubscription', () => {
    it('creates subscription with free plan defaults', async () => {
      const subscription = await subscriptionService.createFreeSubscription('user-123')

      expect(subscription.userId).toBe('user-123')
      expect(subscription.plan).toBe('free')
      expect(subscription.postsRemaining).toBe(5)
      expect(subscription.postsLimit).toBe(5)
      expect(subscription.status).toBe('active')
    })
  })

  describe('ensureSubscription', () => {
    it('returns existing subscription if exists', async () => {
      const created = await subscriptionService.createFreeSubscription('user-456')
      const ensured = await subscriptionService.ensureSubscription('user-456')

      expect(ensured.id).toBe(created.id)
    })

    it('creates new subscription if not exists', async () => {
      const subscription = await subscriptionService.ensureSubscription('user-789')

      expect(subscription.userId).toBe('user-789')
      expect(subscription.plan).toBe('free')
    })
  })

  describe('canGeneratePost', () => {
    it('returns true when posts remaining > 0 and active', async () => {
      await subscriptionService.createFreeSubscription('user-can')

      const canGenerate = await subscriptionService.canGeneratePost('user-can')

      expect(canGenerate).toBe(true)
    })

    it('returns false when no subscription exists', async () => {
      const canGenerate = await subscriptionService.canGeneratePost('nonexistent')

      expect(canGenerate).toBe(false)
    })

    it('returns false when posts remaining is 0', async () => {
      const subscription = await subscriptionService.createFreeSubscription('user-zero')
      await mockSubscriptionRepo.update(subscription.id, { postsRemaining: 0 })

      const canGenerate = await subscriptionService.canGeneratePost('user-zero')

      expect(canGenerate).toBe(false)
    })

    it('returns false when subscription is cancelled', async () => {
      const subscription = await subscriptionService.createFreeSubscription('user-cancelled')
      await mockSubscriptionRepo.update(subscription.id, { status: 'cancelled' })

      const canGenerate = await subscriptionService.canGeneratePost('user-cancelled')

      expect(canGenerate).toBe(false)
    })
  })

  describe('consumePost', () => {
    it('decrements posts remaining by 1', async () => {
      await subscriptionService.createFreeSubscription('user-consume')

      const before = await subscriptionService.getPostsRemaining('user-consume')
      expect(before).toBe(5)

      await subscriptionService.consumePost('user-consume')

      const after = await subscriptionService.getPostsRemaining('user-consume')
      expect(after).toBe(4)
    })

    it('returns null when no posts remaining', async () => {
      const subscription = await subscriptionService.createFreeSubscription('user-empty')
      await mockSubscriptionRepo.update(subscription.id, { postsRemaining: 0 })

      const result = await subscriptionService.consumePost('user-empty')

      expect(result).toBeNull()
    })
  })

  describe('getPostsRemaining', () => {
    it('returns posts remaining for user', async () => {
      await subscriptionService.createFreeSubscription('user-remaining')

      const remaining = await subscriptionService.getPostsRemaining('user-remaining')

      expect(remaining).toBe(5)
    })

    it('returns 0 when no subscription', async () => {
      const remaining = await subscriptionService.getPostsRemaining('nonexistent')

      expect(remaining).toBe(0)
    })
  })

  describe('upgradePlan', () => {
    it('upgrades from free to pro', async () => {
      await subscriptionService.createFreeSubscription('user-upgrade')

      const upgraded = await subscriptionService.upgradePlan('user-upgrade', 'pro')

      expect(upgraded.plan).toBe('pro')
      expect(upgraded.postsLimit).toBe(50)
      expect(upgraded.postsRemaining).toBe(50)
    })
  })

  describe('resetPostsForCycle', () => {
    it('resets posts to limit', async () => {
      const subscription = await subscriptionService.createFreeSubscription('user-reset')
      await mockSubscriptionRepo.update(subscription.id, { postsRemaining: 1 })

      const reset = await subscriptionService.resetPostsForCycle('user-reset')

      expect(reset.postsRemaining).toBe(5)
    })
  })
})
