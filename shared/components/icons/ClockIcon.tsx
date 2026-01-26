interface ClockIconProps {
  className?: string
}

/**
 * Clock icon for time-related elements
 */
export function ClockIcon({ className = 'w-4 h-4' }: ClockIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
