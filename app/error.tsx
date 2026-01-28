'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/ErrorFallback'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Global error page for Next.js App Router
 * Catches errors in the app and displays a friendly fallback
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error to console (could send to error tracking service)
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <ErrorFallback
        error={error}
        resetErrorBoundary={reset}
        title="Algo salio mal"
        message="Ha ocurrido un error inesperado. Por favor, intentalo de nuevo."
      />
    </div>
  )
}
