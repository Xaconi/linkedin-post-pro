'use client'

import { PostVariantCard } from './PostVariantCard'
import { SparklesIcon } from '@/shared/components/icons'

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
          <PostVariantCard
            key={`${index}-${variant.substring(0, 50)}`}
            variant={variant}
            index={index}
          />
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
