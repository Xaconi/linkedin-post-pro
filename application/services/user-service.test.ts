import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Container } from '../container'
import { UserService } from './user-service'
import { MockUserRepository } from '@/tests/mocks/repositories'

/**
 * Test fixtures - centralized test data to avoid magic strings
 */
const TEST_FIXTURES = {
  authData: {
    externalId: 'clerk_123',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: true,
  },
  alternativeUsers: {
    unverified: {
      externalId: 'clerk_456',
      email: 'user@example.com',
      emailVerified: false,
    },
    another: {
      externalId: 'clerk_789',
      email: 'another@example.com',
      emailVerified: true,
    },
    forUpdate: {
      externalId: 'clerk_update',
      email: 'update@example.com',
      emailVerified: false,
    },
  },
  nonexistentId: 'nonexistent',
  nonexistentInternalId: 'nonexistent-id',
}

describe('UserService', () => {
  let userService: UserService
  let mockUserRepo: MockUserRepository

  beforeEach(() => {
    mockUserRepo = new MockUserRepository()
    Container.setUserRepository(mockUserRepo)
    userService = new UserService()
  })

  afterEach(() => {
    Container.reset()
    mockUserRepo.clear()
  })

  describe('syncFromAuthProvider', () => {
    it('creates new user when not exists', async () => {
      const user = await userService.syncFromAuthProvider(TEST_FIXTURES.authData)

      expect(user.externalId).toBe(TEST_FIXTURES.authData.externalId)
      expect(user.email).toBe(TEST_FIXTURES.authData.email)
      expect(user.name).toBe(TEST_FIXTURES.authData.name)
      expect(user.emailVerified).toBe(TEST_FIXTURES.authData.emailVerified)
    })

    it('returns existing user without update if emailVerified unchanged', async () => {
      const initial = await userService.syncFromAuthProvider(TEST_FIXTURES.authData)
      const synced = await userService.syncFromAuthProvider(TEST_FIXTURES.authData)

      expect(synced.id).toBe(initial.id)
      expect(synced.updatedAt).toEqual(initial.updatedAt)
    })

    it('updates emailVerified when changed', async () => {
      const initial = await userService.syncFromAuthProvider({
        ...TEST_FIXTURES.authData,
        emailVerified: false,
      })

      expect(initial.emailVerified).toBe(false)

      const synced = await userService.syncFromAuthProvider({
        ...TEST_FIXTURES.authData,
        emailVerified: true,
      })

      expect(synced.id).toBe(initial.id)
      expect(synced.emailVerified).toBe(true)
    })
  })

  describe('getByExternalId', () => {
    it('returns user by external ID', async () => {
      await userService.syncFromAuthProvider(TEST_FIXTURES.alternativeUsers.unverified)

      const user = await userService.getByExternalId(
        TEST_FIXTURES.alternativeUsers.unverified.externalId
      )

      expect(user).not.toBeNull()
      expect(user?.email).toBe(TEST_FIXTURES.alternativeUsers.unverified.email)
    })

    it('returns null when user not found', async () => {
      const user = await userService.getByExternalId(TEST_FIXTURES.nonexistentId)
      expect(user).toBeNull()
    })
  })

  describe('getById', () => {
    it('returns user by internal ID', async () => {
      const created = await userService.syncFromAuthProvider(TEST_FIXTURES.alternativeUsers.another)

      const user = await userService.getById(created.id)

      expect(user).not.toBeNull()
      expect(user?.id).toBe(created.id)
    })

    it('returns null when user not found', async () => {
      const user = await userService.getById(TEST_FIXTURES.nonexistentInternalId)
      expect(user).toBeNull()
    })
  })

  describe('updateEmailVerification', () => {
    it('updates email verification status', async () => {
      const user = await userService.syncFromAuthProvider(TEST_FIXTURES.alternativeUsers.forUpdate)

      const updated = await userService.updateEmailVerification(user.id, true)

      expect(updated.emailVerified).toBe(true)
    })
  })
})
