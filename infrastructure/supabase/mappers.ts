/**
 * Mappers - Convert between Supabase DB types and Domain entities
 *
 * These mappers transform DB structure (snake_case) to domain structure (camelCase)
 * and delegate validation/creation to domain factories.
 */

import type { User, Subscription } from '@/domain'
import { UserFactory, SubscriptionFactory } from '@/domain'
import type { Database } from './types'

type DbUser = Database['public']['Tables']['users']['Row']
type DbSubscription = Database['public']['Tables']['user_subscriptions']['Row']

/**
 * Map Supabase user row to domain User entity
 * Transforms DB structure and delegates to domain factory for validation
 */
export function mapDbUserToDomain(dbUser: DbUser): User {
  return UserFactory.create({
    id: dbUser.id,
    externalId: dbUser.clerk_user_id,
    email: dbUser.email,
    name: dbUser.name,
    emailVerified: dbUser.email_verified,
    createdAt: dbUser.created_at,
    updatedAt: dbUser.updated_at,
  })
}

/**
 * Map Supabase subscription row to domain Subscription entity
 * Transforms DB structure and delegates to domain factory for validation
 */
export function mapDbSubscriptionToDomain(dbSub: DbSubscription): Subscription {
  return SubscriptionFactory.create({
    id: dbSub.id,
    userId: dbSub.user_id,
    plan: dbSub.plan,
    postsRemaining: dbSub.posts_remaining,
    postsLimit: dbSub.posts_limit,
    cycleStartDate: dbSub.cycle_start_date,
    status: dbSub.status,
    createdAt: dbSub.created_at,
    updatedAt: dbSub.updated_at,
  })
}
