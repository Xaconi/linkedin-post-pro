interface FeaturePillProps {
  icon: string
  text: string
}

export function FeaturePill({ icon, text }: FeaturePillProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-light bg-white px-4 py-2 text-sm font-medium text-neutral-dark shadow-sm">
      <span className="text-primary">{icon}</span>
      {text}
    </div>
  )
}
