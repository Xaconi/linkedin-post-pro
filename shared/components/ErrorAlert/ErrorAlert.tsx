'use client'

interface ErrorAlertProps {
  message: string
  onClose?: () => void
  closeLabel?: string
}

/**
 * Reusable error alert component
 * Displays an error message with optional close button
 */
export function ErrorAlert({
  message,
  onClose,
  closeLabel = 'Cerrar',
}: ErrorAlertProps) {
  return (
    <div
      className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm flex items-center justify-between"
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-error hover:text-error/80 font-medium"
          aria-label={closeLabel}
        >
          {closeLabel}
        </button>
      )}
    </div>
  )
}
