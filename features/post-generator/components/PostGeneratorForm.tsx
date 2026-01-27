'use client'

import { useState, useCallback } from 'react'

import { IdeaTextarea, MIN_CHARACTERS, MAX_CHARACTERS } from './IdeaTextarea'
import { PostTones, PostRegions } from '@/domain/entities/generated-post'
import type { PostTone, PostRegion } from '@/domain/entities/generated-post'

export interface PostGeneratorFormData {
  idea: string
  tone: PostTone
  region: PostRegion
}

interface PostGeneratorFormProps {
  onSubmit: (data: PostGeneratorFormData) => void | Promise<void>
  isLoading?: boolean
  disabled?: boolean
  postsRemaining?: number
}

/**
 * Main form for generating LinkedIn posts
 * Handles idea input with validation and submit
 */
export function PostGeneratorForm({
  onSubmit,
  isLoading = false,
  disabled = false,
  postsRemaining = 5,
}: PostGeneratorFormProps) {
  const [idea, setIdea] = useState('')
  const [tone] = useState<PostTone>(PostTones.PROFESSIONAL)
  const [region] = useState<PostRegion>(PostRegions.SPAIN)

  const charCount = idea.length
  const isValidLength = charCount >= MIN_CHARACTERS && charCount <= MAX_CHARACTERS
  const hasPostsRemaining = postsRemaining > 0
  const canSubmit = isValidLength && hasPostsRemaining && !isLoading && !disabled

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!canSubmit) return

      await onSubmit({ idea: idea.trim(), tone, region })
    },
    [canSubmit, idea, tone, region, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <IdeaTextarea
        value={idea}
        onChange={setIdea}
        disabled={isLoading || disabled}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        aria-busy={isLoading}
        className={`
          w-full py-3 px-6 rounded-xl font-medium text-white
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
          disabled:cursor-not-allowed
          ${canSubmit
            ? 'bg-primary hover:bg-primary-hover active:scale-[0.98]'
            : 'bg-neutral-medium/50'
          }
        `}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <LoadingSpinner />
            Generando...
          </span>
        ) : !hasPostsRemaining ? (
          'Sin posts disponibles'
        ) : (
          'Generar post'
        )}
      </button>

      {!hasPostsRemaining && (
        <p className="text-center text-sm text-neutral-medium">
          Has agotado tus posts de este mes.{' '}
          <button
            type="button"
            className="text-primary hover:underline font-medium"
          >
            Actualiza a Pro
          </button>
        </p>
      )}
    </form>
  )
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
  )
}
