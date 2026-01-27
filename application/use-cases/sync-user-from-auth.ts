/**
 * Use Case: Sync User from Auth Provider
 *
 * Coordinates user and subscription creation/update when a user
 * logs in from an external auth provider (Clerk, Auth0, etc.)
 *
 * This is an application layer use case that orchestrates domain services.
 */

import { userService } from '../services/user-service'
import { subscriptionService } from '../services/subscription-service'
import type { User } from '@/domain/entities/user'
import type { Subscription } from '@/domain/entities/subscription'

export interface AuthProviderUserData {
  externalId: string
  email: string
  name?: string | null
  emailVerified: boolean
}

export interface SyncUserResult {
  user: User
  subscription: Subscription
  isNewUser: boolean
}

/**
 * Sync user from external auth provider to our database
 * Creates user and subscription if new, updates if existing
 */
export async function syncUserFromAuth(
  authData: AuthProviderUserData
): Promise<SyncUserResult> {
  // Check if user already exists
  const existingUser = await userService.getByExternalId(authData.externalId)
  const isNewUser = !existingUser

  // Sync user (create or update)
  const user = await userService.syncFromAuthProvider({
    externalId: authData.externalId,
    email: authData.email,
    name: authData.name,
    emailVerified: authData.emailVerified,
  })

  // Ensure subscription exists (creates free plan if new)
  const subscription = await subscriptionService.ensureSubscription(user.id)

  return {
    user,
    subscription,
    isNewUser,
  }
}
