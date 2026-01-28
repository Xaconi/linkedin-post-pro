import { Skeleton } from './Skeleton'

/**
 * Pre-built skeleton for form inputs
 */
export function InputSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton variant="text" height={16} width="30%" className="mb-2" />
      <Skeleton variant="rectangular" height={48} />
    </div>
  )
}
