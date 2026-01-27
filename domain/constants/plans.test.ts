import { describe, it, expect } from 'vitest'
import {
  PLANS,
  DEFAULT_PLAN,
  DEFAULT_STATUS,
  getPostsLimitForPlan,
  getPlanConfig,
  isPaidPlan,
  getAvailablePlans,
} from './plans'

describe('Plans Constants', () => {
  describe('PLANS', () => {
    it('has free plan with correct configuration', () => {
      expect(PLANS.free).toBeDefined()
      expect(PLANS.free.name).toBe('Plan Gratuito')
      expect(PLANS.free.postsLimit).toBe(5)
      expect(PLANS.free.priceMonthly).toBe(0)
    })

    it('has pro plan with correct configuration', () => {
      expect(PLANS.pro).toBeDefined()
      expect(PLANS.pro.name).toBe('Plan Pro')
      expect(PLANS.pro.postsLimit).toBe(50)
      expect(PLANS.pro.priceMonthly).toBe(800)
    })
  })

  describe('DEFAULT_PLAN', () => {
    it('is free', () => {
      expect(DEFAULT_PLAN).toBe('free')
    })
  })

  describe('DEFAULT_STATUS', () => {
    it('is active', () => {
      expect(DEFAULT_STATUS).toBe('active')
    })
  })

  describe('getPostsLimitForPlan', () => {
    it('returns 5 for free plan', () => {
      expect(getPostsLimitForPlan('free')).toBe(5)
    })

    it('returns 50 for pro plan', () => {
      expect(getPostsLimitForPlan('pro')).toBe(50)
    })
  })

  describe('getPlanConfig', () => {
    it('returns config for free plan', () => {
      const config = getPlanConfig('free')
      expect(config.name).toBe('Plan Gratuito')
      expect(config.postsLimit).toBe(5)
    })

    it('returns config for pro plan', () => {
      const config = getPlanConfig('pro')
      expect(config.name).toBe('Plan Pro')
      expect(config.postsLimit).toBe(50)
    })
  })

  describe('isPaidPlan', () => {
    it('returns false for free plan', () => {
      expect(isPaidPlan('free')).toBe(false)
    })

    it('returns true for pro plan', () => {
      expect(isPaidPlan('pro')).toBe(true)
    })
  })

  describe('getAvailablePlans', () => {
    it('returns all available plans', () => {
      const plans = getAvailablePlans()
      expect(plans).toContain('free')
      expect(plans).toContain('pro')
      expect(plans).toHaveLength(2)
    })
  })
})
