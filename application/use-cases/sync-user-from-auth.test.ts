import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Container } from '../container'
import { syncUserFromAuth } from './sync-user-from-auth'
import { MockUserRepository, MockSubscriptionRepository } from '@/tests/mocks/repositories'

describe('syncUserFromAuth', () => {
  let mockUserRepo: MockUserRepository
  let mockSubscriptionRepo: MockSubscriptionRepository

  beforeEach(() => {
    mockUserRepo = new MockUserRepository()
    mockSubscriptionRepo = new MockSubscriptionRepository()
    Container.setUserRepository(mockUserRepo)
    Container.setSubscriptionRepository(mockSubscriptionRepo)
  })

  afterEach(() => {
    Container.reset()
    mockUserRepo.clear()
    mockSubscriptionRepo.clear()
  })

  const authData = {
    externalId: 'clerk_sync_123',
    email: 'sync@example.com',
    name: 'Sync User',
    emailVerified: true,
  }

  it('creates new user and subscription for new auth provider user', async () => {
    const result = await syncUserFromAuth(authData)

    expect(result.isNewUser).toBe(true)
    expect(result.user.externalId).toBe('clerk_sync_123')
    expect(result.user.email).toBe('sync@example.com')
    expect(result.user.name).toBe('Sync User')
    expect(result.subscription.plan).toBe('free')
    expect(result.subscription.postsRemaining).toBe(5)
  })

  it('returns existing user and subscription for returning user', async () => {
    // First sync creates user
    const first = await syncUserFromAuth(authData)

    // Second sync returns existing
    const second = await syncUserFromAuth(authData)

    expect(second.isNewUser).toBe(false)
    expect(second.user.id).toBe(first.user.id)
    expect(second.subscription.id).toBe(first.subscription.id)
  })

  it('creates subscription if user exists but subscription does not', async () => {
    // Create user without subscription
    await mockUserRepo.create({
      externalId: authData.externalId,
      email: authData.email,
      name: authData.name,
      emailVerified: authData.emailVerified,
    })

    const result = await syncUserFromAuth(authData)

    expect(result.isNewUser).toBe(false)
    expect(result.subscription).toBeDefined()
    expect(result.subscription.plan).toBe('free')
  })

  it('updates emailVerified when changed', async () => {
    // Create with emailVerified = false
    await syncUserFromAuth({ ...authData, emailVerified: false })

    // Sync with emailVerified = true
    const result = await syncUserFromAuth({ ...authData, emailVerified: true })

    expect(result.user.emailVerified).toBe(true)
  })

  it('handles user without name', async () => {
    const result = await syncUserFromAuth({
      externalId: 'clerk_noname',
      email: 'noname@example.com',
      emailVerified: false,
    })

    expect(result.user.name).toBeNull()
  })

  it('preserves subscription state for returning users', async () => {
    // Create user and consume some posts
    const first = await syncUserFromAuth(authData)
    await mockSubscriptionRepo.update(first.subscription.id, { postsRemaining: 2 })

    // Sync again
    const second = await syncUserFromAuth(authData)

    expect(second.subscription.postsRemaining).toBe(2)
  })
})
