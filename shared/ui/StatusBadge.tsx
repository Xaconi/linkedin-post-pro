interface StatusBadgeProps {
  text: string
  pulse?: boolean
}

export function StatusBadge({ text, pulse = true }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
      )}
      {text}
    </span>
  )
}
