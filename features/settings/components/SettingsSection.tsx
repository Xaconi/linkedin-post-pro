interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  variant?: 'default' | 'danger'
}

/**
 * Reusable section wrapper for settings page
 */
export function SettingsSection({
  title,
  description,
  children,
  variant = 'default',
}: SettingsSectionProps) {
  return (
    <section
      className={`rounded-2xl border p-6 ${
        variant === 'danger'
          ? 'border-error/20 bg-error/5'
          : 'border-neutral-light bg-white'
      }`}
    >
      <div className="mb-4">
        <h2
          className={`font-display text-lg font-semibold ${
            variant === 'danger' ? 'text-error' : 'text-neutral-dark'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-medium">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}
