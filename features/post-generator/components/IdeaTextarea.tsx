'use client'

import { useId } from 'react'

const MIN_CHARACTERS = 10
const MAX_CHARACTERS = 500

interface IdeaTextareaProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

/**
 * Textarea component for entering post idea
 * Includes character counter and validation feedback
 */
export function IdeaTextarea({
  value,
  onChange,
  disabled = false,
  error,
}: IdeaTextareaProps) {
  const id = useId()
  const charCount = value.length
  const isUnderMin = charCount > 0 && charCount < MIN_CHARACTERS
  const isOverMax = charCount > MAX_CHARACTERS
  const hasError = error || isUnderMin || isOverMax

  const getCounterColor = () => {
    if (isOverMax) return 'text-error'
    if (isUnderMin) return 'text-error'
    if (charCount >= MAX_CHARACTERS - 50) return 'text-orange-500'
    return 'text-neutral-medium'
  }

  const getHelperText = () => {
    if (error) return error
    if (isOverMax) return `Máximo ${MAX_CHARACTERS} caracteres`
    if (isUnderMin) return `Mínimo ${MIN_CHARACTERS} caracteres`
    return null
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-dark"
      >
        ¿Sobre qué quieres escribir?
      </label>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Ej: Cómo aumentar la productividad trabajando desde casa..."
          rows={4}
          maxLength={MAX_CHARACTERS + 10}
          aria-describedby={`${id}-counter ${id}-helper`}
          aria-invalid={hasError ? 'true' : 'false'}
          className={`
            w-full px-4 py-3 rounded-xl border bg-white
            text-neutral-dark placeholder:text-neutral-medium/60
            resize-none transition-colors
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            disabled:bg-neutral-light/50 disabled:cursor-not-allowed
            ${hasError ? 'border-error focus:ring-error/20 focus:border-error' : 'border-neutral-light'}
          `}
        />
        <div
          id={`${id}-counter`}
          className={`absolute bottom-3 right-3 text-xs ${getCounterColor()}`}
          aria-live="polite"
        >
          {charCount}/{MAX_CHARACTERS}
        </div>
      </div>
      {getHelperText() && (
        <p
          id={`${id}-helper`}
          className="text-xs text-error"
          role="alert"
        >
          {getHelperText()}
        </p>
      )}
    </div>
  )
}

export { MIN_CHARACTERS, MAX_CHARACTERS }
