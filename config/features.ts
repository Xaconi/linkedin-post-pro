/**
 * Feature Flags for LinkedIn Post Pro
 *
 * These flags control features in development.
 * Set to true to enable, false to disable.
 *
 * For production, these can be overridden via environment variables:
 * NEXT_PUBLIC_ENABLE_PRO_PAYMENTS=true
 */

export const FEATURE_FLAGS = {
  /**
   * Enable Stripe payment integration for Pro plan
   * Currently disabled - using waitlist instead
   */
  ENABLE_PRO_PAYMENTS: process.env.NEXT_PUBLIC_ENABLE_PRO_PAYMENTS === 'true',

  /**
   * Enable post history feature
   */
  ENABLE_POST_HISTORY: true,

  /**
   * Enable post scheduling feature
   * Currently disabled - future roadmap
   */
  ENABLE_POST_SCHEDULING: false,

  /**
   * Enable analytics dashboard
   * Currently disabled - future roadmap
   */
  ENABLE_ANALYTICS: false,
} as const

// Type for feature flag keys
export type FeatureFlag = keyof typeof FEATURE_FLAGS

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return FEATURE_FLAGS[feature]
}
