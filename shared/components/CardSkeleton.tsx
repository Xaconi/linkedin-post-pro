import { Skeleton } from './Skeleton'

/**
 * Pre-built skeleton for card layouts
 */
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-light bg-white p-6 ${className}`}>
      <Skeleton variant="text" height={24} width="60%" className="mb-4" />
      <Skeleton variant="text" lines={3} height={16} className="mb-4" />
      <Skeleton variant="rectangular" height={40} />
    </div>
  )
}
