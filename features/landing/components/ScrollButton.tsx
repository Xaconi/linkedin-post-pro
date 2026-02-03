'use client'

import { scrollIntoId } from '@/shared/functions/scroll'

interface ScrollButtonProps {
  targetId: string
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}

/**
 * Client component for scroll-to-section functionality
 * Keeps parent components as SSR by isolating onClick handler
 */
export function ScrollButton({
  targetId,
  className,
  children,
  ariaLabel,
}: ScrollButtonProps) {
  return (
    <button
      onClick={() => scrollIntoId(targetId)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
