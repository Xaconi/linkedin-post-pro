'use client'

import { CopyButton } from './CopyButton'

interface PostVariantCardProps {
  variant: string
  index: number
}

/**
 * Card displaying a single post variant with copy functionality
 */
export function PostVariantCard({ variant, index }: PostVariantCardProps) {
  const charCount = variant.length

  return (
    <article
      className="bg-white rounded-xl border border-neutral-light p-5 flex flex-col h-full"
      aria-label={`Variante ${index + 1}`}
    >
      <header className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-medium uppercase tracking-wide">
          Variante {index + 1}
        </span>
        <span className="text-xs text-neutral-medium">
          {charCount} caracteres
        </span>
      </header>

      <div className="flex-1 mb-4">
        <p className="text-neutral-dark text-sm leading-relaxed whitespace-pre-wrap">
          {variant}
        </p>
      </div>

      <footer className="flex justify-end">
        <CopyButton text={variant} />
      </footer>
    </article>
  )
}
