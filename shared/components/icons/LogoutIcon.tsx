interface LogoutIconProps {
  className?: string
}

/**
 * Logout/sign out icon
 */
export function LogoutIcon({ className = 'w-4 h-4' }: LogoutIconProps) {
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
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
