import { LogoIcon } from '@/shared/components/icons'

/**
 * Global loading page for Next.js App Router
 * Beautiful branded loading experience
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white via-neutral-light/50 to-primary/5">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-4 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-secondary/5 blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulse animation */}
        <div className="mb-8 animate-pulse">
          <LogoIcon className="h-16 w-16 text-primary" />
        </div>

        {/* Loading indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        {/* Brand text */}
        <p className="mt-6 font-display text-lg font-medium text-neutral-dark">
          LinkedIn Post Pro
        </p>
        <p className="mt-1 text-sm text-neutral-medium">
          Preparando tu experiencia...
        </p>
      </div>
    </div>
  )
}
