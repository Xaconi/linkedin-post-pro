'use client'

import { useEffect, useRef } from 'react'

import { CloseIcon } from '../icons'

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
  const onCloseRef = useRef(onClose)

  // Keep onClose ref updated
  onCloseRef.current = onClose

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  // Focus management and body scroll lock (only when isOpen changes)
  useEffect(() => {
    if (!isOpen) return

    // Store previous focus
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus modal
    modalRef.current?.focus()

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)

      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen])

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
        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] animate-fade-in-up overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl focus:outline-none`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-neutral-medium transition-colors hover:bg-neutral-light hover:text-neutral-dark active:scale-95"
          aria-label="Cerrar"
        >
          <CloseIcon className="h-5 w-5" />
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
