import { LoadingSpinner } from '@/shared'

/**
 * Global loading page for Next.js App Router
 * Shown during page transitions and data fetching
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-light/30">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-neutral-medium">Cargando...</p>
      </div>
    </div>
  )
}
