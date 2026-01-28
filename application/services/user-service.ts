/**
 * User Service - Application layer business logic
 * Handles user operations without knowing about Supabase
 */

import { Container } from '../container'
import type { User } from '@/domain/entities/user'

export interface SyncUserFromAuthData {
  externalId: string
  email: string
  name?: string | null
  emailVerified?: boolean
}

export class UserService {
  /**
   * Sync user from external auth provider (Clerk, Auth0, etc.)
   * Creates new user if doesn't exist, updates if email verification changed
   */
  async syncFromAuthProvider(authData: SyncUserFromAuthData): Promise<User> {
    const userRepo = Container.getUserRepository()

    const existingUser = await userRepo.findByExternalId(authData.externalId)

    if (existingUser) {
      // Update only if email verification status changed
      if (existingUser.emailVerified !== authData.emailVerified) {
        return userRepo.update(existingUser.id, {
          emailVerified: authData.emailVerified,
        })
      }
      return existingUser
    }

    // Create new user
    return userRepo.create({
      externalId: authData.externalId,
      email: authData.email,
      name: authData.name,
      emailVerified: authData.emailVerified ?? false,
    })
  }

  /**
   * Get user by external auth provider ID
   */
  async getByExternalId(externalId: string): Promise<User | null> {
    const userRepo = Container.getUserRepository()
    return userRepo.findByExternalId(externalId)
  }

  /**
   * Get user by internal ID
   */
  async getById(id: string): Promise<User | null> {
    const userRepo = Container.getUserRepository()
    return userRepo.findById(id)
  }

  /**
   * Update user email verification status
   */
  async updateEmailVerification(userId: string, verified: boolean): Promise<User> {
    const userRepo = Container.getUserRepository()
    return userRepo.update(userId, { emailVerified: verified })
  }

  /**
   * Update user email preferences
   */
  async updateEmailPreferences(
    userId: string,
    preferences: { emailTips?: boolean; emailUpdates?: boolean }
  ): Promise<User> {
    const userRepo = Container.getUserRepository()
    return userRepo.update(userId, preferences)
  }

  /**
   * Delete user account
   * Note: Related data (subscriptions, posts) are deleted via CASCADE in database
   */
  async deleteAccount(userId: string): Promise<void> {
    const userRepo = Container.getUserRepository()
    await userRepo.delete(userId)
  }
}

export const userService = new UserService()
