/**
 * User Service - Application layer business logic
 * Handles user operations without knowing about Supabase
 */

import { clerkClient } from '@clerk/nextjs/server'

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
   * Delete user account from database and auth provider
   * Note: Related data (subscriptions, posts) are deleted via CASCADE in database
   */
  async deleteAccount(externalId: string): Promise<void> {
    const userRepo = Container.getUserRepository()

    // 1. Get user from database
    const user = await userRepo.findByExternalId(externalId)
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // 2. Delete from database (cascades to subscriptions and posts)
    await userRepo.delete(user.id)

    // 3. Delete from Clerk
    try {
      const clerk = await clerkClient()
      await clerk.users.deleteUser(externalId)
    } catch (clerkError) {
      // Log but don't fail - user is already deleted from our DB
      console.error('Error deleting user from Clerk:', clerkError)
    }
  }
}

export const userService = new UserService()
