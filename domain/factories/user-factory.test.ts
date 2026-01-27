import { describe, it, expect } from 'vitest'
import { UserFactory, UserValidationError } from './user-factory'

/**
 * Test fixtures - centralized test data to avoid magic strings
 */
const TEST_FIXTURES = {
  validUser: {
    id: '123e4567-e89b-12d3-a456-426614174000',
    externalId: 'clerk_123',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  emails: {
    valid: 'test@example.com',
    uppercase: 'TEST@EXAMPLE.COM',
    invalid: 'invalid-email',
  },
  dates: {
    isoString: '2024-01-01T00:00:00.000Z',
    alternativeDate: new Date('2024-06-15T12:00:00Z'),
  },
}

const ERROR_MESSAGES = {
  userIdRequired: 'User ID is required',
  externalIdRequired: 'External ID is required',
  emailRequired: 'Email is required',
  invalidEmailFormat: 'Invalid email format',
  emailVerifiedRequired: 'Email verified status is required',
}

describe('UserFactory', () => {
  describe('create', () => {
    it('creates a valid user entity', () => {
      const user = UserFactory.create(TEST_FIXTURES.validUser)

      expect(user.id).toBe(TEST_FIXTURES.validUser.id)
      expect(user.externalId).toBe(TEST_FIXTURES.validUser.externalId)
      expect(user.email).toBe(TEST_FIXTURES.emails.valid)
      expect(user.name).toBe(TEST_FIXTURES.validUser.name)
      expect(user.emailVerified).toBe(TEST_FIXTURES.validUser.emailVerified)
      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.updatedAt).toBeInstanceOf(Date)
    })

    it('normalizes email to lowercase', () => {
      const user = UserFactory.create({
        ...TEST_FIXTURES.validUser,
        email: TEST_FIXTURES.emails.uppercase,
      })

      expect(user.email).toBe(TEST_FIXTURES.emails.valid)
    })

    it('handles null name', () => {
      const user = UserFactory.create({
        ...TEST_FIXTURES.validUser,
        name: null,
      })

      expect(user.name).toBeNull()
    })

    it('converts string dates to Date objects', () => {
      const user = UserFactory.create(TEST_FIXTURES.validUser)

      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.createdAt.toISOString()).toBe(TEST_FIXTURES.dates.isoString)
    })

    it('accepts Date objects directly', () => {
      const date = TEST_FIXTURES.dates.alternativeDate
      const user = UserFactory.create({
        ...TEST_FIXTURES.validUser,
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
        UserFactory.validate({ ...TEST_FIXTURES.validUser, id: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, id: '' })
      ).toThrow(ERROR_MESSAGES.userIdRequired)
    })

    it('throws error for missing externalId', () => {
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, externalId: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, externalId: '' })
      ).toThrow(ERROR_MESSAGES.externalIdRequired)
    })

    it('throws error for missing email', () => {
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, email: '' })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, email: '' })
      ).toThrow(ERROR_MESSAGES.emailRequired)
    })

    it('throws error for invalid email format', () => {
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, email: TEST_FIXTURES.emails.invalid })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({ ...TEST_FIXTURES.validUser, email: TEST_FIXTURES.emails.invalid })
      ).toThrow(ERROR_MESSAGES.invalidEmailFormat)
    })

    it('throws error for missing emailVerified', () => {
      expect(() =>
        UserFactory.validate({
          ...TEST_FIXTURES.validUser,
          emailVerified: undefined as unknown as boolean,
        })
      ).toThrow(UserValidationError)
      expect(() =>
        UserFactory.validate({
          ...TEST_FIXTURES.validUser,
          emailVerified: undefined as unknown as boolean,
        })
      ).toThrow(ERROR_MESSAGES.emailVerifiedRequired)
    })

    it('accepts valid data without throwing', () => {
      expect(() => UserFactory.validate(TEST_FIXTURES.validUser)).not.toThrow()
    })
  })

  describe('validateCreateData', () => {
    const validCreateData = {
      externalId: TEST_FIXTURES.validUser.externalId,
      email: TEST_FIXTURES.emails.valid,
    }

    it('validates correct create data', () => {
      expect(() => UserFactory.validateCreateData(validCreateData)).not.toThrow()
    })

    it('throws error for missing externalId', () => {
      expect(() =>
        UserFactory.validateCreateData({ ...validCreateData, externalId: '' })
      ).toThrow(ERROR_MESSAGES.externalIdRequired)
    })

    it('throws error for invalid email', () => {
      expect(() =>
        UserFactory.validateCreateData({ ...validCreateData, email: TEST_FIXTURES.emails.invalid })
      ).toThrow(ERROR_MESSAGES.invalidEmailFormat)
    })
  })
})
