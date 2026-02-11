'use client'

import { useState } from 'react'

import { CopyButton } from '@/features/post-generator/components/CopyButton'
import { ClockIcon, ChevronDownIcon } from '@/shared/components/icons'
import type { GeneratedPost } from '@/domain/entities/generated-post'

interface HistoryPostCardProps {
  post: GeneratedPost
}

const TONE_LABELS: Record<string, string> = {
  professional: '💼 Profesional',
  friendly: '😊 Cercano',
  inspirational: '✨ Inspiracional',
}

const REGION_LABELS: Record<string, string> = {
  spain: '🇪🇸 España',
  latam: '🌎 LATAM',
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Compact card for post history — collapsed by default, expands to show variants
 */
export function HistoryPostCard({ post }: HistoryPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeVariant, setActiveVariant] = useState(0)

  return (
    <article className="bg-white rounded-xl border border-neutral-light overflow-hidden transition-shadow duration-200 hover:shadow-sm">
      {/* Clickable header area */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs text-neutral-medium">
                <ClockIcon className="w-3.5 h-3.5" />
                {formatDate(post.createdAt)}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {TONE_LABELS[post.tone] ?? post.tone}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
                {REGION_LABELS[post.region] ?? post.region}
              </span>
            </div>

            {/* Idea — always visible */}
            <p className="text-sm font-medium text-neutral-dark leading-snug">
              {post.inputIdea}
            </p>

            {/* Preview of first variant when collapsed */}
            {!isExpanded && (
              <p className="mt-1.5 text-xs text-neutral-medium line-clamp-2 leading-relaxed">
                {post.variants[0]}
              </p>
            )}
          </div>

          {/* Expand chevron */}
          <div className="flex-shrink-0 mt-1">
            <ChevronDownIcon
              className={`w-5 h-5 text-neutral-medium transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* Expanded content — variant tabs + content */}
      {isExpanded && (
        <div className="border-t border-neutral-light">
          {/* Variant tabs */}
          <div className="flex border-b border-neutral-light">
            {post.variants.map((_, index) => (
              <button
                key={`${post.id}-tab-${index}`}
                type="button"
                onClick={() => setActiveVariant(index)}
                className={`
                  flex-1 px-4 py-2.5 text-xs font-medium transition-colors duration-150
                  ${activeVariant === index
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-neutral-medium hover:text-neutral-dark hover:bg-neutral-light/50'
                  }
                `}
              >
                Variante {index + 1}
                <span className="ml-1.5 text-neutral-medium font-normal">
                  · {post.variants[index].length} car.
                </span>
              </button>
            ))}
          </div>

          {/* Active variant content */}
          <div className="p-5">
            <p className="text-sm text-neutral-dark leading-relaxed whitespace-pre-wrap">
              {post.variants[activeVariant]}
            </p>
            <div className="flex justify-end mt-3">
              <CopyButton text={post.variants[activeVariant]} />
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
