interface LogoIconProps {
  className?: string
}

/**
 * Chart-style icon used in the app logo
 */
export function LogoIcon({ className = 'w-6 h-6' }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
