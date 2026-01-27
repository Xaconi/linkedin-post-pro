'use client'

interface SelectorOptionProps {
  id: string
  name: string
  value: string
  label: string
  description: string
  icon: string
  checked: boolean
  onChange: (value: string) => void
  disabled?: boolean
}

/**
 * Reusable radio option component for selectors
 * Card-style with icon, label, and description
 */
export function SelectorOption({
  id,
  name,
  value,
  label,
  description,
  icon,
  checked,
  onChange,
  disabled = false,
}: SelectorOptionProps) {
  return (
    <label
      htmlFor={id}
      className={`
        relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${checked
          ? 'border-primary bg-primary/5'
          : 'border-neutral-light hover:border-neutral-medium/50'
        }
      `}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="sr-only"
      />
      <span className="text-2xl flex-shrink-0" aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <span className={`
          block font-medium text-sm
          ${checked ? 'text-primary' : 'text-neutral-dark'}
        `}>
          {label}
        </span>
        <span className="block text-xs text-neutral-medium mt-0.5">
          {description}
        </span>
      </div>
      {checked && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
      )}
    </label>
  )
}
