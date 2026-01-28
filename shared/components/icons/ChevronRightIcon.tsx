interface ChevronRightIconProps {
  className?: string
}

/**
 * Chevron right icon for links and navigation
 */
export function ChevronRightIcon({ className = 'w-4 h-4' }: ChevronRightIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
