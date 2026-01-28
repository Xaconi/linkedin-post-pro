'use client'

import Link from 'next/link'

interface ErrorFallbackProps {
  error?: Error
  resetErrorBoundary?: () => void
  title?: string
  message?: string
}

/**
 * Friendly error fallback UI
 * Used by ErrorBoundary and Next.js error pages
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
  title = 'Algo salio mal',
  message = 'Ha ocurrido un error inesperado. Por favor, intentalo de nuevo.',
}: ErrorFallbackProps) {
  // Log error for debugging (only in development)
  if (error && process.env.NODE_ENV === 'development') {
    console.error('ErrorFallback caught:', error)
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Error icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-error"
        >
          <path
            d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="mb-2 font-display text-2xl font-bold text-neutral-dark">
        {title}
      </h2>

      {/* Message */}
      <p className="mb-8 max-w-md text-neutral-medium">{message}</p>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Reintentar
          </button>
        )}
        <Link
          href="/"
          className="rounded-xl border-2 border-neutral-light px-6 py-3 font-medium text-neutral-dark transition-colors hover:bg-neutral-light"
        >
          Volver al inicio
        </Link>
      </div>

      {/* Error details in development */}
      {error && process.env.NODE_ENV === 'development' && (
        <details className="mt-8 max-w-lg text-left">
          <summary className="cursor-pointer text-sm text-neutral-medium hover:text-neutral-dark">
            Detalles del error (desarrollo)
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-neutral-light p-4 text-xs text-error">
            {error.message}
            {error.stack && `\n\n${error.stack}`}
          </pre>
        </details>
      )}
    </div>
  )
}
