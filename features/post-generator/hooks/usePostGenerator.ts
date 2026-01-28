'use client'

import { useState, useCallback } from 'react'

import { useSubscription } from './useSubscription'
import { PostTones, PostRegions } from '@/domain/entities/generated-post'
import type { PostTone, PostRegion } from '@/domain/entities/generated-post'

type Variants = [string, string, string]

interface GeneratorState {
  idea: string
  tone: PostTone
  region: PostRegion
}

interface UsePostGeneratorReturn {
  // Form state
  formState: GeneratorState
  setIdea: (idea: string) => void
  setTone: (tone: PostTone) => void
  setRegion: (region: PostRegion) => void

  // Generation state
  variants: Variants | null
  isGenerating: boolean
  error: string | null

  // Subscription state
  subscription: {
    postsRemaining: number
    postsLimit: number
    plan: string
  } | null
  isLoadingSubscription: boolean

  // Actions
  generate: () => Promise<void>
  clearVariants: () => void
  clearError: () => void
}

/**
 * Main hook for managing post generation flow
 * Handles form state, API calls, and subscription integration
 */
export function usePostGenerator(): UsePostGeneratorReturn {
  // Form state
  const [formState, setFormState] = useState<GeneratorState>({
    idea: '',
    tone: PostTones.PROFESSIONAL,
    region: PostRegions.SPAIN,
  })

  // Generation state
  const [variants, setVariants] = useState<Variants | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Subscription data
  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    decrementPosts,
  } = useSubscription()

  // Form setters
  const setIdea = useCallback((idea: string) => {
    setFormState((prev) => ({ ...prev, idea }))
  }, [])

  const setTone = useCallback((tone: PostTone) => {
    setFormState((prev) => ({ ...prev, tone }))
  }, [])

  const setRegion = useCallback((region: PostRegion) => {
    setFormState((prev) => ({ ...prev, region }))
  }, [])

  // Clear actions
  const clearVariants = useCallback(() => {
    setVariants(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Generate posts
  const generate = useCallback(async () => {
    // Clear previous state
    setError(null)
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: formState.idea.trim(),
          tone: formState.tone,
          region: formState.region,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 429) {
          setError('Espera unos segundos antes de generar otro post')
        } else if (response.status === 403) {
          setError(data.error || 'No tienes permisos para generar posts')
        } else {
          setError(data.error || 'Error al generar el post')
        }
        return
      }

      // Success - update variants and decrement counter
      setVariants(data.variants)
      decrementPosts()

      // Clear idea after successful generation
      setFormState((prev) => ({ ...prev, idea: '' }))
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }, [formState, decrementPosts])

  return {
    // Form state
    formState,
    setIdea,
    setTone,
    setRegion,

    // Generation state
    variants,
    isGenerating,
    error,

    // Subscription state
    subscription: subscription
      ? {
          postsRemaining: subscription.postsRemaining,
          postsLimit: subscription.postsLimit,
          plan: subscription.plan,
        }
      : null,
    isLoadingSubscription,

    // Actions
    generate,
    clearVariants,
    clearError,
  }
}
