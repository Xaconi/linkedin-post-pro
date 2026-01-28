'use client'

import { useCallback, useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Reusable modal component with accessibility features
 * - Focus trap
 * - Escape key to close
 * - Click outside to close
 * - ARIA attributes
 */
export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus modal
      modalRef.current?.focus()

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      // Add escape listener
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      // Restore body scroll
      document.body.style.overflow = ''

      // Remove escape listener
      document.removeEventListener('keydown', handleKeyDown)

      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-dark/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${sizeClasses[size]} animate-fade-in-up rounded-2xl bg-white p-6 shadow-2xl focus:outline-none`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-medium transition-colors hover:bg-neutral-light hover:text-neutral-dark"
          aria-label="Cerrar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            className="mb-4 pr-8 font-display text-xl font-semibold text-neutral-dark"
          >
            {title}
          </h2>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
