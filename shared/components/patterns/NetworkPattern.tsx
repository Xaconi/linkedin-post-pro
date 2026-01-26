interface NetworkPatternProps {
  className?: string
}

/**
 * SVG network pattern representing professional connections
 * Used as background decoration in auth pages
 */
export function NetworkPattern({ className = 'absolute inset-0 w-full h-full opacity-10' }: NetworkPatternProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="network-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          {/* Connection lines */}
          <line x1="0" y1="50" x2="50" y2="0" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
          <line x1="100" y1="50" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="100" x2="0" y2="50" stroke="white" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />

          {/* Nodes */}
          <circle cx="0" cy="50" r="3" fill="white" />
          <circle cx="50" cy="0" r="3" fill="white" />
          <circle cx="100" cy="50" r="3" fill="white" />
          <circle cx="50" cy="100" r="3" fill="white" />
          <circle cx="50" cy="50" r="4" fill="white" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#network-pattern)" />
    </svg>
  )
}
