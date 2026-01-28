interface ToggleProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
}

/**
 * Toggle switch component for boolean settings
 */
export function Toggle({
  id,
  checked,
  onChange,
  disabled = false,
  label,
  description,
}: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              htmlFor={id}
              className="block text-sm font-medium text-neutral-dark"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="mt-0.5 text-sm text-neutral-medium">{description}</p>
          )}
        </div>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? 'bg-primary' : 'bg-neutral-light'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        style={{ minWidth: '48px', minHeight: '28px' }}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
