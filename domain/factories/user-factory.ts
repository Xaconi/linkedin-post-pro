/**
 * User Factory - Domain layer
 * Validates and creates User entities
 */

import type { User, CreateUserData } from '../entities/user'

export class UserValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserValidationError'
  }
}

export interface RawUserData {
  id: string
  externalId: string
  email: string
  name?: string | null
  emailVerified: boolean
  emailTips?: boolean
  emailUpdates?: boolean
  createdAt: Date | string
  updatedAt: Date | string
}

export class UserFactory {
  /**
   * Create a User entity from raw data with validation
   */
  static create(data: RawUserData): User {
    UserFactory.validate(data)

    return {
      id: data.id,
      externalId: data.externalId,
      email: data.email.toLowerCase().trim(),
      name: data.name ?? null,
      emailVerified: data.emailVerified,
      emailTips: data.emailTips ?? true,
      emailUpdates: data.emailUpdates ?? true,
      createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
    }
  }

  /**
   * Validate user data according to domain rules
   */
  static validate(data: Partial<RawUserData>): void {
    if (!data.id || typeof data.id !== 'string') {
      throw new UserValidationError('User ID is required')
    }

    if (!data.externalId || typeof data.externalId !== 'string') {
      throw new UserValidationError('External ID is required')
    }

    if (!data.email || typeof data.email !== 'string') {
      throw new UserValidationError('Email is required')
    }

    if (!UserFactory.isValidEmail(data.email)) {
      throw new UserValidationError('Invalid email format')
    }

    if (typeof data.emailVerified !== 'boolean') {
      throw new UserValidationError('Email verified status is required')
    }
  }

  /**
   * Validate data for creating a new user
   */
  static validateCreateData(data: CreateUserData): void {
    if (!data.externalId || typeof data.externalId !== 'string') {
      throw new UserValidationError('External ID is required')
    }

    if (!data.email || typeof data.email !== 'string') {
      throw new UserValidationError('Email is required')
    }

    if (!UserFactory.isValidEmail(data.email)) {
      throw new UserValidationError('Invalid email format')
    }
  }

  /**
   * Basic email format validation
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
