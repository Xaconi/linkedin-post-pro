/**
 * Mappers - Convert between Supabase DB types and Domain entities
 * This isolation allows changing the database without affecting domain logic
 */

import type { User, Subscription, SubscriptionPlan, SubscriptionStatus } from '@/domain'
import type { Database } from './types'

type DbUser = Database['public']['Tables']['users']['Row']
type DbSubscription = Database['public']['Tables']['user_subscriptions']['Row']

/**
 * Map Supabase user row to domain User entity
 */
export function mapDbUserToDomain(dbUser: DbUser): User {
  return {
    id: dbUser.id,
    externalId: dbUser.clerk_user_id,
    email: dbUser.email,
    name: dbUser.name,
    emailVerified: dbUser.email_verified,
    createdAt: new Date(dbUser.created_at),
    updatedAt: new Date(dbUser.updated_at),
  }
}

/**
 * Map Supabase subscription row to domain Subscription entity
 */
export function mapDbSubscriptionToDomain(dbSub: DbSubscription): Subscription {
  return {
    id: dbSub.id,
    userId: dbSub.user_id,
    plan: dbSub.plan as SubscriptionPlan,
    postsRemaining: dbSub.posts_remaining,
    postsLimit: dbSub.posts_limit,
    cycleStartDate: new Date(dbSub.cycle_start_date),
    status: dbSub.status as SubscriptionStatus,
    createdAt: new Date(dbSub.created_at),
    updatedAt: new Date(dbSub.updated_at),
  }
}
