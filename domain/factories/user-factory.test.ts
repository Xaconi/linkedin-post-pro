import { describe, it, expect } from 'vitest'
import { UserFactory, UserValidationError } from './user-factory'

describe('UserFactory', () => {
  const validUserData = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    externalId: 'clerk_123',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }

  describe('create', () => {
    it('creates a valid user entity', () => {
      const user = UserFactory.create(validUserData)

      expect(user.id).toBe(validUserData.id)
      expect(user.externalId).toBe(validUserData.externalId)
      expect(user.email).toBe('test@example.com')
      expect(user.name).toBe('Test User')
      expect(user.emailVerified).toBe(true)
      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.updatedAt).toBeInstanceOf(Date)
    })

    it('normalizes email to lowercase', () => {
      const user = UserFactory.create({
        ...validUserData,
        email: 'TEST@EXAMPLE.COM',
      })

      expect(user.email).toBe('test@example.com')
    })

    it('handles null name', () => {
      const user = UserFactory.create({
        ...validUserData,
        name: null,
      })

      expect(user.name).toBeNull()
    })

    it('converts string dates to Date objects', () => {
      const user = UserFactory.create(validUserData)

      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.createdAt.toISOString()).toBe('2024-01-01T00:00:00.000Z')
    })

    it('accepts Date objects directly', () => {
      const date = new Date('2024-06-15T12:00:00Z')
      const user = UserFactory.create({
        ...validUserData,
        createdAt: date,
        updatedAt: date,
      })

      expect(user.createdAt).toEqual(date)
      expect(user.updatedAt).toEqual(date)
    })
  })

  describe('validate', () => {
    it('throws error for missing id', () => {
      expect(() =>
        UserFactory.validate({ ...validUserData, id: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...validUserData, id: '' })
      ).toThrow('User ID is required')
    })

    it('throws error for missing externalId', () => {
      expect(() =>
        UserFactory.validate({ ...validUserData, externalId: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...validUserData, externalId: '' })
      ).toThrow('External ID is required')
    })

    it('throws error for missing email', () => {
      expect(() =>
        UserFactory.validate({ ...validUserData, email: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...validUserData, email: '' })
      ).toThrow('Email is required')
    })

    it('throws error for invalid email format', () => {
      expect(() =>
        UserFactory.validate({ ...validUserData, email: 'invalid-email' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...validUserData, email: 'invalid-email' })
      ).toThrow('Invalid email format')
    })

    it('throws error for missing emailVerified', () => {
      expect(() =>
        UserFactory.validate({ ...validUserData, emailVerified: undefined as unknown as boolean })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...validUserData, emailVerified: undefined as unknown as boolean })
      ).toThrow('Email verified status is required')
    })

    it('accepts valid data without throwing', () => {
      expect(() => UserFactory.validate(validUserData)).not.toThrow()
    })
  })

  describe('validateCreateData', () => {
    const validCreateData = {
      externalId: 'clerk_123',
      email: 'test@example.com',
    }

    it('validates correct create data', () => {
      expect(() => UserFactory.validateCreateData(validCreateData)).not.toThrow()
    })

    it('throws error for missing externalId', () => {
      expect(() =>
        UserFactory.validateCreateData({ ...validCreateData, externalId: '' })
      ).toThrow('External ID is required')
    })

    it('throws error for invalid email', () => {
      expect(() =>
        UserFactory.validateCreateData({ ...validCreateData, email: 'bad-email' })
      ).toThrow('Invalid email format')
    })
  })
})
