import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Container } from '../container'
import { UserService } from './user-service'
import { MockUserRepository } from '@/tests/mocks/repositories'

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
    const authData = {
      externalId: 'clerk_123',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
    }

    it('creates new user when not exists', async () => {
      const user = await userService.syncFromAuthProvider(authData)

      expect(user.externalId).toBe('clerk_123')
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      expect(user.emailVerified).toBe(true)
    })

    it('returns existing user without update if emailVerified unchanged', async () => {
      // Create initial user
      const initial = await userService.syncFromAuthProvider(authData)

      // Sync again with same data
      const synced = await userService.syncFromAuthProvider(authData)

      expect(synced.id).toBe(initial.id)
      expect(synced.updatedAt).toEqual(initial.updatedAt)
    })

    it('updates emailVerified when changed', async () => {
      // Create initial user with emailVerified = false
      const initial = await userService.syncFromAuthProvider({
        ...authData,
        emailVerified: false,
      })

      expect(initial.emailVerified).toBe(false)

      // Sync with emailVerified = true
      const synced = await userService.syncFromAuthProvider({
        ...authData,
        emailVerified: true,
      })

      expect(synced.id).toBe(initial.id)
      expect(synced.emailVerified).toBe(true)
    })
  })

  describe('getByExternalId', () => {
    it('returns user by external ID', async () => {
      await userService.syncFromAuthProvider({
        externalId: 'clerk_456',
        email: 'user@example.com',
        emailVerified: false,
      })

      const user = await userService.getByExternalId('clerk_456')

      expect(user).not.toBeNull()
      expect(user?.email).toBe('user@example.com')
    })

    it('returns null when user not found', async () => {
      const user = await userService.getByExternalId('nonexistent')
      expect(user).toBeNull()
    })
  })

  describe('getById', () => {
    it('returns user by internal ID', async () => {
      const created = await userService.syncFromAuthProvider({
        externalId: 'clerk_789',
        email: 'another@example.com',
        emailVerified: true,
      })

      const user = await userService.getById(created.id)

      expect(user).not.toBeNull()
      expect(user?.id).toBe(created.id)
    })

    it('returns null when user not found', async () => {
      const user = await userService.getById('nonexistent-id')
      expect(user).toBeNull()
    })
  })

  describe('updateEmailVerification', () => {
    it('updates email verification status', async () => {
      const user = await userService.syncFromAuthProvider({
        externalId: 'clerk_update',
        email: 'update@example.com',
        emailVerified: false,
      })

      const updated = await userService.updateEmailVerification(user.id, true)

      expect(updated.emailVerified).toBe(true)
    })
  })
})
