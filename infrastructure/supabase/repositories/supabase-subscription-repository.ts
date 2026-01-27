/**
 * Supabase Subscription Repository Implementation
 * Implements ISubscriptionRepository interface from domain layer
 */

import type { ISubscriptionRepository } from '@/domain/repositories/subscription-repository'
import type {
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  SubscriptionPlan,
} from '@/domain/entities/subscription'
import { DEFAULT_PLAN, DEFAULT_STATUS, getPostsLimitForPlan } from '@/domain'
import { createServerClient } from '../client'
import { mapDbSubscriptionToDomain } from '../mappers'

export class SupabaseSubscriptionRepository implements ISubscriptionRepository {
  async findById(id: string): Promise<Subscription | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching subscription by ID:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching subscription by user ID:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async create(subscriptionData: CreateSubscriptionData): Promise<Subscription> {
    const supabase = createServerClient()

    const plan = subscriptionData.plan ?? DEFAULT_PLAN
    const postsLimit = subscriptionData.postsLimit ?? getPostsLimitForPlan(plan)

    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: subscriptionData.userId,
        plan,
        posts_remaining: subscriptionData.postsRemaining ?? postsLimit,
        posts_limit: postsLimit,
        status: subscriptionData.status ?? DEFAULT_STATUS,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating subscription:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async update(id: string, updates: UpdateSubscriptionData): Promise<Subscription> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        ...(updates.plan !== undefined && { plan: updates.plan }),
        ...(updates.postsRemaining !== undefined && { posts_remaining: updates.postsRemaining }),
        ...(updates.postsLimit !== undefined && { posts_limit: updates.postsLimit }),
        ...(updates.cycleStartDate !== undefined && {
          cycle_start_date: updates.cycleStartDate.toISOString().split('T')[0],
        }),
        ...(updates.status !== undefined && { status: updates.status }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating subscription:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async decrementPostsRemaining(userId: string): Promise<Subscription | null> {
    const supabase = createServerClient()

    // First check if user has posts remaining
    const { data: current, error: fetchError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      console.error('Error fetching subscription for decrement:', fetchError)
      throw fetchError
    }

    if (!current || current.posts_remaining <= 0) {
      return null
    }

    // Decrement posts_remaining
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        posts_remaining: current.posts_remaining - 1,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error decrementing posts:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async resetPostsForCycle(userId: string): Promise<Subscription> {
    const supabase = createServerClient()

    // Get current subscription to determine limit
    const { data: current, error: fetchError } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      console.error('Error fetching subscription for reset:', fetchError)
      throw fetchError
    }

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        posts_remaining: current.posts_limit,
        cycle_start_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error resetting posts:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async upgradePlan(userId: string, plan: SubscriptionPlan): Promise<Subscription> {
    const supabase = createServerClient()

    const postsLimit = getPostsLimitForPlan(plan)

    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        plan,
        posts_remaining: postsLimit,
        posts_limit: postsLimit,
        cycle_start_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error upgrading plan:', error)
      throw error
    }

    return mapDbSubscriptionToDomain(data)
  }

  async delete(id: string): Promise<void> {
    const supabase = createServerClient()

    const { error } = await supabase.from('user_subscriptions').delete().eq('id', id)

    if (error) {
      console.error('Error deleting subscription:', error)
      throw error
    }
  }
}
