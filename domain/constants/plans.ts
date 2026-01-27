/**
 * Business Constants - Subscription Plans
 * Central source of truth for all plan-related values
 * Technology-agnostic, no dependencies
 */

import type { SubscriptionPlan, SubscriptionStatus } from '../entities/subscription'

/**
 * Plan configuration type
 */
export interface PlanConfig {
  id: SubscriptionPlan
  name: string
  postsLimit: number
  priceMonthly: number // in cents (0 = free)
  features: string[]
}

/**
 * All available plans configuration
 */
export const PLANS: Record<SubscriptionPlan, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Plan Gratuito',
    postsLimit: 5,
    priceMonthly: 0,
    features: [
      '5 posts por mes',
      '3 variaciones por generación',
      'Tonos: profesional, cercano, inspiracional',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Plan Pro',
    postsLimit: 50,
    priceMonthly: 800, // 8.00 EUR in cents
    features: [
      '50 posts por mes',
      '3 variaciones por generación',
      'Tonos: profesional, cercano, inspiracional',
      'Historial de posts',
      'Soporte prioritario',
    ],
  },
} as const

/**
 * Default plan for new users
 */
export const DEFAULT_PLAN: SubscriptionPlan = 'free'

/**
 * Default subscription status for new subscriptions
 */
export const DEFAULT_STATUS: SubscriptionStatus = 'active'

/**
 * Get posts limit for a plan
 */
export function getPostsLimitForPlan(plan: SubscriptionPlan): number {
  return PLANS[plan].postsLimit
}

/**
 * Get plan configuration
 */
export function getPlanConfig(plan: SubscriptionPlan): PlanConfig {
  return PLANS[plan]
}

/**
 * Check if a plan is paid
 */
export function isPaidPlan(plan: SubscriptionPlan): boolean {
  return PLANS[plan].priceMonthly > 0
}

/**
 * Get all available plan IDs
 */
export function getAvailablePlans(): SubscriptionPlan[] {
  return Object.keys(PLANS) as SubscriptionPlan[]
}
