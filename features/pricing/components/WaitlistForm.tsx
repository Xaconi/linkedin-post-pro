'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  defaultEmail?: string
  isLoading: boolean
  error: string | null
  onSubmit: (email: string, wantsTips: boolean) => void
}

/**
 * Waitlist signup form with email and optional tips checkbox
 */
export function WaitlistForm({
  defaultEmail = '',
  isLoading,
  error,
  onSubmit,
}: WaitlistFormProps) {
  const [email, setEmail] = useState(defaultEmail)
  const [wantsTips, setWantsTips] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      setEmailError('El email es obligatorio')
      return false
    }
    if (!emailRegex.test(value)) {
      setEmailError('Email inválido')
      return false
    }
    setEmailError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(email)) {
      onSubmit(email, wantsTips)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email input */}
      <div>
        <label
          htmlFor="waitlist-email"
          className="mb-2 block text-sm font-medium text-neutral-dark"
        >
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (emailError) validateEmail(e.target.value)
          }}
          onBlur={() => validateEmail(email)}
          disabled={isLoading}
          placeholder="tu@email.com"
          className={`w-full rounded-xl border px-4 py-3 text-neutral-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-neutral-light ${
            emailError
              ? 'border-error focus:border-error'
              : 'border-neutral-light focus:border-primary'
          }`}
          autoComplete="email"
        />
        {emailError && (
          <p className="mt-1 text-sm text-error">{emailError}</p>
        )}
      </div>

      {/* Tips checkbox */}
      <div className="flex items-start gap-3">
        <input
          id="waitlist-tips"
          type="checkbox"
          checked={wantsTips}
          onChange={(e) => setWantsTips(e.target.checked)}
          disabled={isLoading}
          className="mt-1 h-4 w-4 rounded border-neutral-light text-primary focus:ring-primary"
        />
        <label
          htmlFor="waitlist-tips"
          className="text-sm text-neutral-medium"
        >
          Quiero recibir tips para mejorar mis posts de LinkedIn
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uniendo...
          </>
        ) : (
          'Unirme a la lista'
        )}
      </button>
    </form>
  )
}
