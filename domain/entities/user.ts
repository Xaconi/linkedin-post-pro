/**
 * User Entity - Pure business domain type
 * Technology-agnostic, no dependencies on Supabase/Clerk/etc.
 */

export interface User {
  id: string
  externalId: string // ID from auth provider (Clerk, Auth0, etc.)
  email: string
  name: string | null
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Data required to create a new user
 */
export interface CreateUserData {
  externalId: string
  email: string
  name?: string | null
  emailVerified?: boolean
}

/**
 * Data allowed for user updates
 */
export interface UpdateUserData {
  email?: string
  name?: string | null
  emailVerified?: boolean
}
