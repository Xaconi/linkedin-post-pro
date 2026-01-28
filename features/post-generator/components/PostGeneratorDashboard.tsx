'use client'

import { usePostGenerator } from '../hooks/usePostGenerator'
import { PostCounter } from './PostCounter'
import { PostVariants } from './PostVariants'
import { ToneSelector } from './ToneSelector'
import { RegionSelector } from './RegionSelector'
import { IdeaTextarea } from './IdeaTextarea'
import { LoadingSpinner } from '@/components/shared'
import { ErrorAlert } from '@/shared/components'
import { IdeaConstraints } from '@/domain/entities/generated-post'
import type { SubscriptionPlan } from '@/domain/entities/subscription'

interface PostGeneratorDashboardProps {
  userName: string
}

/**
 * Main dashboard component integrating all post generator features
 * Handles the complete flow: form, generation, and results display
 */
export function PostGeneratorDashboard({ userName }: PostGeneratorDashboardProps) {
  const {
    formState,
    setIdea,
    setTone,
    setRegion,
    variants,
    isGenerating,
    error,
    subscription,
    isLoadingSubscription,
    generate,
    clearError,
  } = usePostGenerator()

  const charCount = formState.idea.length
  const isValidLength =
    charCount >= IdeaConstraints.MIN_LENGTH && charCount <= IdeaConstraints.MAX_LENGTH
  const hasPostsRemaining = (subscription?.postsRemaining ?? 0) > 0
  const canSubmit = isValidLength && hasPostsRemaining && !isGenerating

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    await generate()
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-neutral-dark">
          ¡Hola, {userName}!
        </h1>
        <p className="mt-2 text-neutral-medium">
          Genera posts profesionales para LinkedIn en segundos.
        </p>
      </div>

      {/* Post Counter */}
      {isLoadingSubscription ? (
        <div className="flex items-center justify-center p-4 bg-white rounded-xl border border-neutral-light">
          <LoadingSpinner />
        </div>
      ) : subscription ? (
        <PostCounter
          postsRemaining={subscription.postsRemaining}
          postsLimit={subscription.postsLimit}
          plan={subscription.plan as SubscriptionPlan}
        />
      ) : null}

      {/* Error Message */}
      {error && <ErrorAlert message={error} onClose={clearError} />}

      {/* Generator Form */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Idea Input */}
          <IdeaTextarea
            value={formState.idea}
            onChange={setIdea}
            disabled={isGenerating || !hasPostsRemaining}
          />

          {/* Tone Selector */}
          <ToneSelector
            value={formState.tone}
            onChange={setTone}
            disabled={isGenerating || !hasPostsRemaining}
          />

          {/* Region Selector */}
          <RegionSelector
            value={formState.region}
            onChange={setRegion}
            disabled={isGenerating || !hasPostsRemaining}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            aria-busy={isGenerating}
            className={`
              w-full py-3 px-6 rounded-xl font-medium text-white
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
              disabled:cursor-not-allowed
              ${
                canSubmit
                  ? 'bg-primary hover:bg-primary-hover active:scale-[0.98]'
                  : 'bg-neutral-medium/50'
              }
            `}
          >
            {isGenerating ? (
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

          {/* No posts remaining message */}
          {!hasPostsRemaining && !isLoadingSubscription && (
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
      </div>

      {/* Generated Variants */}
      <PostVariants variants={variants} />
    </div>
  )
}
