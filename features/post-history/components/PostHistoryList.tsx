'use client'

import { useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

import { usePostHistory } from '../hooks/usePostHistory'
import { HistoryPostCard } from './HistoryPostCard'
import { LoadingSpinner } from '@/shared'
import { SparklesIcon, AlertCircleIcon } from '@/shared/components/icons'

/**
 * Post history list with infinite scroll
 */
export function PostHistoryList() {
  const { posts, isLoading, error, hasMore, loadMore, retry } = usePostHistory()
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for infinite scroll
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMore()
      }
    },
    [hasMore, isLoading, loadMore]
  )

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '200px',
    })
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [handleIntersect])

  // Error state
  if (error && posts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-light p-8 text-center">
        <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <AlertCircleIcon className="w-6 h-6 text-error" />
        </div>
        <h3 className="text-neutral-dark font-medium mb-1">
          Error al cargar el historial
        </h3>
        <p className="text-sm text-neutral-medium mb-4">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  // Empty state (after loading completes with no posts)
  if (!isLoading && posts.length === 0) {
    return (
      <div className="bg-neutral-light/50 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-neutral-light rounded-xl flex items-center justify-center mx-auto mb-4">
          <SparklesIcon className="w-6 h-6 text-neutral-medium" />
        </div>
        <h3 className="text-neutral-dark font-medium mb-1">
          No has generado posts todavía
        </h3>
        <p className="text-sm text-neutral-medium mb-4">
          Genera tu primer post y aparecerá aquí en tu historial.
        </p>
        <Link
          href="/app/dashboard"
          className="inline-flex px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Genera tu primer post
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <HistoryPostCard key={post.id} post={post} />
      ))}

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {/* Loading more */}
      {isLoading && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}

      {/* Initial loading */}
      {isLoading && posts.length === 0 && (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* End of list */}
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-sm text-neutral-medium py-4">
          Has llegado al final del historial
        </p>
      )}

      {/* Inline error (when loading more fails) */}
      {error && posts.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-error mb-2">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="text-sm text-primary font-medium hover:underline"
          >
            Reintentar
          </button>
        </div>
      )}
    </div>
  )
}
