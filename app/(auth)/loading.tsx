import { LoadingSpinner } from '@/shared'
import { Header } from '@/shared/components/layout'

/**
 * Loading page for authenticated routes
 * Includes the app header for context
 */
export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-neutral-light/30">
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-neutral-medium">Cargando...</p>
        </div>
      </main>
    </div>
  )
}
