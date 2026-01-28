'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/ErrorFallback'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error page for authenticated routes
 * Header is provided by the auth layout
 */
export default function AuthErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Auth section error:', error)
  }, [error])

  return (
    <ErrorFallback
      error={error}
      resetErrorBoundary={reset}
      title="Algo salio mal"
      message="Ha ocurrido un error. Por favor, intentalo de nuevo o vuelve al dashboard."
    />
  )
}
