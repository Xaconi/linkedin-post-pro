'use client'

import { useState } from 'react'

import type { WaitlistSource } from '@/types/waitlist'

interface UseWaitlistOptions {
  source: WaitlistSource
  onSuccess?: () => void
}

interface UseWaitlistReturn {
  submit: (email: string, wantsTips: boolean) => Promise<void>
  isLoading: boolean
  isSuccess: boolean
  error: string | null
  reset: () => void
}

/**
 * Hook for handling waitlist form submission
 */
export function useWaitlist({
  source,
  onSuccess,
}: UseWaitlistOptions): UseWaitlistReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (email: string, wantsTips: boolean) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source,
          wantsTips,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al unirse a la lista')
      }

      setIsSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setIsSuccess(false)
    setError(null)
  }

  return {
    submit,
    isLoading,
    isSuccess,
    error,
    reset,
  }
}
