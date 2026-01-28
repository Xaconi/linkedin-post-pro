/**
 * Plan configuration and limits
 * Single source of truth for plan-related values
 */

export const PLAN_FEATURES = {
  tonesAvailable: 3,
  regionsAvailable: 2,
  variationsPerIdea: 3,
} as const

export const PLAN_LIMITS = {
  FREE: {
    name: 'Free',
    price: 0,
    postsPerMonth: 5,
    hasPostHistory: false,
    hasPrioritySupport: false,
  },
  PRO: {
    name: 'Pro',
    price: 8,
    postsPerMonth: 50,
    hasPostHistory: true,
    hasPrioritySupport: true,
  },
} as const

export type PlanType = keyof typeof PLAN_LIMITS
