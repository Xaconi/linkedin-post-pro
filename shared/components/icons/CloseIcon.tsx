interface CloseIconProps {
  className?: string
}

/**
 * Close/X icon for dismissing modals and dialogs
 */
export function CloseIcon({ className = 'w-5 h-5' }: CloseIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  )
}
