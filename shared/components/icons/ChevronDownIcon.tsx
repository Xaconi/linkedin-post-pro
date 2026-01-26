interface ChevronDownIconProps {
  className?: string
}

/**
 * Chevron down arrow icon for dropdowns
 */
export function ChevronDownIcon({ className = 'w-4 h-4' }: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
