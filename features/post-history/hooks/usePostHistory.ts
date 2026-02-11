'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

import type { GeneratedPost } from '@/domain/entities/generated-post'

interface PostHistoryResponse {
  posts: GeneratedPost[]
  hasMore: boolean
  page: number
}

interface UsePostHistoryReturn {
  posts: GeneratedPost[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  loadMore: () => void
  retry: () => void
}

const POSTS_PER_PAGE = 10

/**
 * Hook for fetching post history with infinite scroll support
 */
export function usePostHistory(): UsePostHistoryReturn {
  const [posts, setPosts] = useState<GeneratedPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef(1)
  const isFetchingRef = useRef(false)

  const fetchPosts = useCallback(async (page: number, append: boolean) => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/post-history?page=${page}&limit=${POSTS_PER_PAGE}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al cargar el historial')
      }

      const data: PostHistoryResponse = await response.json()

      setPosts(prev => append ? [...prev, ...data.posts] : data.posts)
      setHasMore(data.hasMore)
      pageRef.current = page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el historial')
    } finally {
      isFetchingRef.current = false
      setIsLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchPosts(1, false)
  }, [fetchPosts])

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return
    fetchPosts(pageRef.current + 1, true)
  }, [hasMore, fetchPosts])

  const retry = useCallback(() => {
    fetchPosts(pageRef.current, pageRef.current > 1)
  }, [fetchPosts])

  return {
    posts,
    isLoading,
    error,
    hasMore,
    loadMore,
    retry,
  }
}
