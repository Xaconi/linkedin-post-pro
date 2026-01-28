'use client'

import { useState, useCallback } from 'react'

export interface EmailPreferences {
  emailTips: boolean
  emailUpdates: boolean
}

interface UseEmailPreferencesOptions {
  initialPreferences: EmailPreferences
}

interface UseEmailPreferencesReturn {
  preferences: EmailPreferences
  setEmailTips: (value: boolean) => void
  setEmailUpdates: (value: boolean) => void
  save: () => Promise<void>
  isSaving: boolean
  isDirty: boolean
  error: string | null
  success: boolean
  clearSuccess: () => void
}

/**
 * Hook for managing email preferences state and persistence
 */
export function useEmailPreferences({
  initialPreferences,
}: UseEmailPreferencesOptions): UseEmailPreferencesReturn {
  const [preferences, setPreferences] = useState<EmailPreferences>(initialPreferences)
  const [savedPreferences, setSavedPreferences] = useState<EmailPreferences>(initialPreferences)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isDirty =
    preferences.emailTips !== savedPreferences.emailTips ||
    preferences.emailUpdates !== savedPreferences.emailUpdates

  const setEmailTips = useCallback((value: boolean) => {
    setPreferences((prev) => ({ ...prev, emailTips: value }))
    setSuccess(false)
    setError(null)
  }, [])

  const setEmailUpdates = useCallback((value: boolean) => {
    setPreferences((prev) => ({ ...prev, emailUpdates: value }))
    setSuccess(false)
    setError(null)
  }, [])

  const clearSuccess = useCallback(() => {
    setSuccess(false)
  }, [])

  const save = useCallback(async () => {
    if (!isDirty) return

    setIsSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailTips: preferences.emailTips,
          emailUpdates: preferences.emailUpdates,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al guardar preferencias')
      }

      setSavedPreferences(preferences)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSaving(false)
    }
  }, [preferences, isDirty])

  return {
    preferences,
    setEmailTips,
    setEmailUpdates,
    save,
    isSaving,
    isDirty,
    error,
    success,
    clearSuccess,
  }
}
