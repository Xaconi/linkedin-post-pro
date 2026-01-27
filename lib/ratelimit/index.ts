/**
 * Rate Limiting for Post Generation
 *
 * Limits users to 1 request per 10 seconds to prevent abuse.
 */

import { rateLimitStore } from './store'

const DEFAULT_WINDOW_MS = 10000 // 10 seconds

export interface RateLimitResult {
  allowed: boolean
  remainingSeconds: number
}

export interface RateLimitOptions {
  windowMs?: number
}

/**
 * Check if a user is allowed to make a request
 *
 * @param userId - The user's ID
 * @param options - Rate limit options
 * @returns Result with allowed status and remaining wait time
 */
export function checkRateLimit(
  userId: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS
  const key = `ratelimit:${userId}`

  const remainingSeconds = rateLimitStore.check(key, windowMs)

  if (remainingSeconds > 0) {
    return {
      allowed: false,
      remainingSeconds,
    }
  }

  return {
    allowed: true,
    remainingSeconds: 0,
  }
}

/**
 * Record a request for rate limiting
 *
 * @param userId - The user's ID
 */
export function recordRequest(userId: string): void {
  const key = `ratelimit:${userId}`
  rateLimitStore.record(key)
}

/**
 * Check and record a request in one operation
 * Returns rate limit result - if allowed, the request is recorded
 *
 * @param userId - The user's ID
 * @param options - Rate limit options
 * @returns Result with allowed status and remaining wait time
 */
export function rateLimit(
  userId: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const result = checkRateLimit(userId, options)

  if (result.allowed) {
    recordRequest(userId)
  }

  return result
}

// Re-export for testing
export { rateLimitStore } from './store'
