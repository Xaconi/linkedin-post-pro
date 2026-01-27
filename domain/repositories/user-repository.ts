/**
 * User Repository Interface
 * Defines the contract for user data access
 * Implementation can be Supabase, Prisma, Firebase, etc.
 */

import type { User, CreateUserData, UpdateUserData } from '../entities/user'

export interface IUserRepository {
  /**
   * Find user by internal ID
   */
  findById(id: string): Promise<User | null>

  /**
   * Find user by external auth provider ID (Clerk, Auth0, etc.)
   */
  findByExternalId(externalId: string): Promise<User | null>

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>

  /**
   * Create a new user
   */
  create(data: CreateUserData): Promise<User>

  /**
   * Update existing user
   */
  update(id: string, data: UpdateUserData): Promise<User>

  /**
   * Upsert user - create if not exists, update if exists
   * Matches on externalId
   */
  upsert(data: CreateUserData): Promise<User>

  /**
   * Delete user by ID
   */
  delete(id: string): Promise<void>
}
