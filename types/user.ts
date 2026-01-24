export type PlanType = 'free' | 'pro'

export type SubscriptionStatus = 'active' | 'cancelled'

export interface UserSubscription {
  id: string
  userId: string
  plan: PlanType
  postsRemaining: number
  postsLimit: number
  cycleStartDate: Date
  status: SubscriptionStatus
}
