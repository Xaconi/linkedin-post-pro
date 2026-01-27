'use client'

import { PostVariantCard } from './PostVariantCard'

interface PostVariantsProps {
  variants: [string, string, string] | null
}

/**
 * Container component displaying 3 generated post variants
 * Shows empty state when no variants available
 */
export function PostVariants({ variants }: PostVariantsProps) {
  if (!variants) {
    return <EmptyState />
  }

  return (
    <section aria-label="Posts generados">
      <h2 className="text-lg font-semibold text-neutral-dark mb-4">
        Tus posts generados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((variant, index) => (
          <PostVariantCard key={index} variant={variant} index={index} />
        ))}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <section
      className="bg-neutral-light/50 rounded-xl p-8 text-center"
      aria-label="Sin posts generados"
    >
      <div className="w-12 h-12 bg-neutral-light rounded-xl flex items-center justify-center mx-auto mb-4">
        <SparklesIcon className="w-6 h-6 text-neutral-medium" />
      </div>
      <h3 className="text-neutral-dark font-medium mb-1">
        Tus posts aparecerán aquí
      </h3>
      <p className="text-sm text-neutral-medium">
        Escribe tu idea y genera 3 variaciones en segundos
      </p>
    </section>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  )
}
