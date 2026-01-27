'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SubscriptionPlan } from '@/domain/entities/subscription'

interface SubscriptionData {
  postsRemaining: number
  postsLimit: number
  plan: SubscriptionPlan
}

interface UseSubscriptionReturn {
  data: SubscriptionData | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  decrementPosts: () => void
}

/**
 * Hook for fetching and managing subscription data
 * Includes optimistic updates for post count
 */
export function useSubscription(): UseSubscriptionReturn {
  const [data, setData] = useState<SubscriptionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/subscription')

      if (!response.ok) {
        throw new Error('Failed to fetch subscription')
      }

      const result = await response.json()
      setData({
        postsRemaining: result.postsRemaining,
        postsLimit: result.postsLimit,
        plan: result.plan,
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  const decrementPosts = useCallback(() => {
    setData((prev) => {
      if (!prev || prev.postsRemaining <= 0) return prev
      return {
        ...prev,
        postsRemaining: prev.postsRemaining - 1,
      }
    })
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchSubscription,
    decrementPosts,
  }
}
