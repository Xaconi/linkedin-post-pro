'use client'

import { useEffect } from 'react'

import { ErrorFallback } from '@/shared/components/ErrorFallback'
import { Header } from '@/shared/components/layout'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Error page for authenticated routes
 * Includes the app header for context
 */
export default function AuthErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Auth section error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <Header />
      <main>
        <ErrorFallback
          error={error}
          resetErrorBoundary={reset}
          title="Algo salio mal"
          message="Ha ocurrido un error. Por favor, intentalo de nuevo o vuelve al dashboard."
        />
      </main>
    </div>
  )
}
