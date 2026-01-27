import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import { checkRateLimit, recordRequest, rateLimit, rateLimitStore } from './index'

describe('Rate Limiting', () => {
  beforeEach(() => {
    rateLimitStore.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('checkRateLimit', () => {
    it('allows first request', () => {
      const result = checkRateLimit('user-1')

      expect(result.allowed).toBe(true)
      expect(result.remainingSeconds).toBe(0)
    })

    it('allows request after no previous record', () => {
      const result = checkRateLimit('user-new')

      expect(result.allowed).toBe(true)
    })
  })

  describe('recordRequest', () => {
    it('records the request timestamp', () => {
      recordRequest('user-1')

      const result = checkRateLimit('user-1', { windowMs: 10000 })
      expect(result.allowed).toBe(false)
    })
  })

  describe('rateLimit (combined check and record)', () => {
    it('allows and records first request', () => {
      const result = rateLimit('user-1')

      expect(result.allowed).toBe(true)
      expect(result.remainingSeconds).toBe(0)

      // Second request should be blocked
      const secondResult = rateLimit('user-1')
      expect(secondResult.allowed).toBe(false)
    })

    it('blocks request within window', () => {
      rateLimit('user-1')

      // Advance 5 seconds (still within 10 second window)
      vi.advanceTimersByTime(5000)

      const result = rateLimit('user-1')
      expect(result.allowed).toBe(false)
      expect(result.remainingSeconds).toBe(5)
    })

    it('allows request after window expires', () => {
      rateLimit('user-1')

      // Advance past 10 second window
      vi.advanceTimersByTime(10001)

      const result = rateLimit('user-1')
      expect(result.allowed).toBe(true)
    })

    it('returns correct remaining seconds', () => {
      rateLimit('user-1')

      vi.advanceTimersByTime(3000) // 3 seconds passed

      const result = rateLimit('user-1')
      expect(result.allowed).toBe(false)
      expect(result.remainingSeconds).toBe(7) // 10 - 3 = 7
    })

    it('handles different users independently', () => {
      rateLimit('user-1')

      const result = rateLimit('user-2')
      expect(result.allowed).toBe(true)
    })

    it('uses custom window when provided', () => {
      rateLimit('user-1', { windowMs: 5000 })

      vi.advanceTimersByTime(3000)

      const result = rateLimit('user-1', { windowMs: 5000 })
      expect(result.allowed).toBe(false)
      expect(result.remainingSeconds).toBe(2)

      vi.advanceTimersByTime(2001)

      const result2 = rateLimit('user-1', { windowMs: 5000 })
      expect(result2.allowed).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('handles rapid successive requests', () => {
      const result1 = rateLimit('user-1')
      expect(result1.allowed).toBe(true)

      const result2 = rateLimit('user-1')
      expect(result2.allowed).toBe(false)

      const result3 = rateLimit('user-1')
      expect(result3.allowed).toBe(false)
    })

    it('handles exactly at window boundary', () => {
      rateLimit('user-1', { windowMs: 10000 })

      vi.advanceTimersByTime(10000) // Exactly 10 seconds

      const result = rateLimit('user-1', { windowMs: 10000 })
      expect(result.allowed).toBe(true)
    })

    it('does not record blocked requests', () => {
      rateLimit('user-1')

      vi.advanceTimersByTime(5000)
      rateLimit('user-1') // Blocked, should not reset timer

      vi.advanceTimersByTime(5001) // Total 10.001 seconds from first request

      const result = rateLimit('user-1')
      expect(result.allowed).toBe(true)
    })
  })
})

describe('rateLimitStore', () => {
  beforeEach(() => {
    rateLimitStore.clear()
  })

  it('can be cleared', () => {
    rateLimitStore.record('test-key')
    rateLimitStore.clear()

    const remaining = rateLimitStore.check('test-key', 10000)
    expect(remaining).toBe(0)
  })

  it('returns 0 for non-existent keys', () => {
    const remaining = rateLimitStore.check('non-existent', 10000)
    expect(remaining).toBe(0)
  })
})
