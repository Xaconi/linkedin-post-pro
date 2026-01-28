import { CardSkeleton } from './CardSkeleton'
import { InputSkeleton } from './InputSkeleton'
import { Skeleton } from './Skeleton'

/**
 * Pre-built skeleton for the dashboard
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" height={32} width={200} />
        <Skeleton variant="rectangular" height={40} width={120} />
      </div>

      {/* Form skeleton */}
      <div className="rounded-2xl border border-neutral-light bg-white p-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <InputSkeleton />
          <InputSkeleton />
        </div>
        <Skeleton variant="rectangular" height={120} className="mb-4" />
        <Skeleton variant="rectangular" height={48} width={160} />
      </div>

      {/* Results skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
