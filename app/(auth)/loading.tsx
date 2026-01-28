import { LoadingSpinner } from '@/shared'

/**
 * Loading page for authenticated routes
 * Header is provided by the auth layout
 */
export default function AuthLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <LoadingSpinner size="xl" className="text-primary" />
      <p className="mt-4 text-sm text-neutral-medium">
        Cargando...
      </p>
    </div>
  )
}
