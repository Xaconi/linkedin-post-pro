/**
 * Mappers - Convert between Supabase DB types and Domain entities
 *
 * These mappers transform DB structure (snake_case) to domain structure (camelCase)
 * and delegate validation/creation to domain factories.
 */

import type { User, Subscription, GeneratedPost } from '@/domain'
import { UserFactory, SubscriptionFactory, GeneratedPostFactory } from '@/domain'
import type { Database } from './types'

type DbUser = Database['public']['Tables']['users']['Row']
type DbSubscription = Database['public']['Tables']['user_subscriptions']['Row']
type DbGeneratedPost = Database['public']['Tables']['generated_posts']['Row']

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
    emailTips: dbUser.email_tips ?? true,
    emailUpdates: dbUser.email_updates ?? true,
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

/**
 * Map Supabase generated post row to domain GeneratedPost entity
 * Transforms DB structure and delegates to domain factory for validation
 */
export function mapDbGeneratedPostToDomain(dbPost: DbGeneratedPost): GeneratedPost {
  return GeneratedPostFactory.create({
    id: dbPost.id,
    userId: dbPost.user_id,
    inputIdea: dbPost.input_idea,
    tone: dbPost.tone,
    region: dbPost.region,
    variants: [dbPost.variant_1, dbPost.variant_2, dbPost.variant_3],
    createdAt: dbPost.created_at,
  })
}
