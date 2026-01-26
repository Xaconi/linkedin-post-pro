interface CheckIconProps {
  className?: string
  strokeWidth?: number
}

/**
 * Checkmark icon for success states and feature lists
 */
export function CheckIcon({ className = 'w-3 h-3', strokeWidth = 3 }: CheckIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
