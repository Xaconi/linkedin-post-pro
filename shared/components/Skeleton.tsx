interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

/**
 * Skeleton loading placeholder component
 * Supports different variants for various UI elements
 */
export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-neutral-light'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  }

  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1em' : undefined),
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: i === lines - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

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
