/**
 * Waitlist Entity
 * Represents a Pro waitlist signup
 */

export const WaitlistSources = {
  PRICING_PAGE: 'pricing_page',
  DASHBOARD: 'dashboard',
} as const

export type WaitlistSource = (typeof WaitlistSources)[keyof typeof WaitlistSources]

export interface WaitlistEntry {
  id: string
  userId: string | null
  email: string
  source: WaitlistSource
  wantsTips: boolean
  createdAt: Date
}

export interface CreateWaitlistData {
  email: string
  source: WaitlistSource
  wantsTips: boolean
  userId?: string | null
}
