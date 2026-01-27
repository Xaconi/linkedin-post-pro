import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Container } from '../container'
import { SubscriptionService } from './subscription-service'
import { MockSubscriptionRepository, MockUserRepository } from '@/tests/mocks/repositories'
import { PLANS, DEFAULT_PLAN, DEFAULT_STATUS } from '@/domain'

/**
 * Test fixtures - use domain constants for business values
 */
const TEST_FIXTURES = {
  userIds: {
    createFree: 'user-123',
    ensure: 'user-456',
    ensureNew: 'user-789',
    canGenerate: 'user-can',
    noSubscription: 'nonexistent',
    zeroPosts: 'user-zero',
    cancelled: 'user-cancelled',
    consume: 'user-consume',
    empty: 'user-empty',
    remaining: 'user-remaining',
    upgrade: 'user-upgrade',
    reset: 'user-reset',
  },
  postsRemaining: {
    zero: 0,
    one: 1,
    afterConsume: PLANS.free.postsLimit - 1,
  },
}

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
      const subscription = await subscriptionService.createFreeSubscription(
        TEST_FIXTURES.userIds.createFree
      )

      expect(subscription.userId).toBe(TEST_FIXTURES.userIds.createFree)
      expect(subscription.plan).toBe(DEFAULT_PLAN)
      expect(subscription.postsRemaining).toBe(PLANS.free.postsLimit)
      expect(subscription.postsLimit).toBe(PLANS.free.postsLimit)
      expect(subscription.status).toBe(DEFAULT_STATUS)
    })
  })

  describe('ensureSubscription', () => {
    it('returns existing subscription if exists', async () => {
      const created = await subscriptionService.createFreeSubscription(TEST_FIXTURES.userIds.ensure)
      const ensured = await subscriptionService.ensureSubscription(TEST_FIXTURES.userIds.ensure)

      expect(ensured.id).toBe(created.id)
    })

    it('creates new subscription if not exists', async () => {
      const subscription = await subscriptionService.ensureSubscription(
        TEST_FIXTURES.userIds.ensureNew
      )

      expect(subscription.userId).toBe(TEST_FIXTURES.userIds.ensureNew)
      expect(subscription.plan).toBe(DEFAULT_PLAN)
    })
  })

  describe('canGeneratePost', () => {
    it('returns true when posts remaining > 0 and active', async () => {
      await subscriptionService.createFreeSubscription(TEST_FIXTURES.userIds.canGenerate)

      const canGenerate = await subscriptionService.canGeneratePost(
        TEST_FIXTURES.userIds.canGenerate
      )

      expect(canGenerate).toBe(true)
    })

    it('returns false when no subscription exists', async () => {
      const canGenerate = await subscriptionService.canGeneratePost(
        TEST_FIXTURES.userIds.noSubscription
      )

      expect(canGenerate).toBe(false)
    })

    it('returns false when posts remaining is 0', async () => {
      const subscription = await subscriptionService.createFreeSubscription(
        TEST_FIXTURES.userIds.zeroPosts
      )
      await mockSubscriptionRepo.update(subscription.id, {
        postsRemaining: TEST_FIXTURES.postsRemaining.zero,
      })

      const canGenerate = await subscriptionService.canGeneratePost(TEST_FIXTURES.userIds.zeroPosts)

      expect(canGenerate).toBe(false)
    })

    it('returns false when subscription is cancelled', async () => {
      const subscription = await subscriptionService.createFreeSubscription(
        TEST_FIXTURES.userIds.cancelled
      )
      await mockSubscriptionRepo.update(subscription.id, { status: 'cancelled' })

      const canGenerate = await subscriptionService.canGeneratePost(
        TEST_FIXTURES.userIds.cancelled
      )

      expect(canGenerate).toBe(false)
    })
  })

  describe('consumePost', () => {
    it('decrements posts remaining by 1', async () => {
      await subscriptionService.createFreeSubscription(TEST_FIXTURES.userIds.consume)

      const before = await subscriptionService.getPostsRemaining(TEST_FIXTURES.userIds.consume)
      expect(before).toBe(PLANS.free.postsLimit)

      await subscriptionService.consumePost(TEST_FIXTURES.userIds.consume)

      const after = await subscriptionService.getPostsRemaining(TEST_FIXTURES.userIds.consume)
      expect(after).toBe(TEST_FIXTURES.postsRemaining.afterConsume)
    })

    it('returns null when no posts remaining', async () => {
      const subscription = await subscriptionService.createFreeSubscription(
        TEST_FIXTURES.userIds.empty
      )
      await mockSubscriptionRepo.update(subscription.id, {
        postsRemaining: TEST_FIXTURES.postsRemaining.zero,
      })

      const result = await subscriptionService.consumePost(TEST_FIXTURES.userIds.empty)

      expect(result).toBeNull()
    })
  })

  describe('getPostsRemaining', () => {
    it('returns posts remaining for user', async () => {
      await subscriptionService.createFreeSubscription(TEST_FIXTURES.userIds.remaining)

      const remaining = await subscriptionService.getPostsRemaining(TEST_FIXTURES.userIds.remaining)

      expect(remaining).toBe(PLANS.free.postsLimit)
    })

    it('returns 0 when no subscription', async () => {
      const remaining = await subscriptionService.getPostsRemaining(
        TEST_FIXTURES.userIds.noSubscription
      )

      expect(remaining).toBe(TEST_FIXTURES.postsRemaining.zero)
    })
  })

  describe('upgradePlan', () => {
    it('upgrades from free to pro', async () => {
      await subscriptionService.createFreeSubscription(TEST_FIXTURES.userIds.upgrade)

      const upgraded = await subscriptionService.upgradePlan(TEST_FIXTURES.userIds.upgrade, 'pro')

      expect(upgraded.plan).toBe('pro')
      expect(upgraded.postsLimit).toBe(PLANS.pro.postsLimit)
      expect(upgraded.postsRemaining).toBe(PLANS.pro.postsLimit)
    })
  })

  describe('resetPostsForCycle', () => {
    it('resets posts to limit', async () => {
      const subscription = await subscriptionService.createFreeSubscription(
        TEST_FIXTURES.userIds.reset
      )
      await mockSubscriptionRepo.update(subscription.id, {
        postsRemaining: TEST_FIXTURES.postsRemaining.one,
      })

      const reset = await subscriptionService.resetPostsForCycle(TEST_FIXTURES.userIds.reset)

      expect(reset.postsRemaining).toBe(PLANS.free.postsLimit)
    })
  })
})
