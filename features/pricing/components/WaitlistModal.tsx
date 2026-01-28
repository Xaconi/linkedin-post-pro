'use client'

import { Modal } from '@/shared/components'
import type { WaitlistSource } from '@/types/waitlist'

import { useWaitlist } from '../hooks/useWaitlist'
import { WaitlistForm } from './WaitlistForm'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  source: WaitlistSource
  defaultEmail?: string
}

/**
 * Modal for Pro waitlist signup
 * Shows form initially, then success message after submission
 */
export function WaitlistModal({
  isOpen,
  onClose,
  source,
  defaultEmail,
}: WaitlistModalProps) {
  const { submit, isLoading, isSuccess, error, reset } = useWaitlist({
    source,
  })

  const handleClose = () => {
    onClose()
    // Reset state after modal animation
    setTimeout(reset, 300)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      {isSuccess ? (
        // Success state
        <div className="py-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className="mb-2 font-display text-xl font-semibold text-neutral-dark">
            ¡Estás en la lista!
          </h3>
          <p className="mb-6 text-neutral-medium">
            Te avisaremos cuando el plan Pro esté disponible.
          </p>
          <button
            onClick={handleClose}
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-hover"
          >
            Entendido
          </button>
        </div>
      ) : (
        // Form state
        <>
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-2xl">
              🚀
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-neutral-dark">
              Únete a la lista de espera
            </h3>
            <p className="text-sm text-neutral-medium">
              Sé el primero en acceder al plan Pro cuando esté disponible.
            </p>
          </div>

          <WaitlistForm
            defaultEmail={defaultEmail}
            isLoading={isLoading}
            error={error}
            onSubmit={submit}
          />

          <p className="mt-4 text-center text-xs text-neutral-medium">
            No spam. Solo te avisaremos cuando lancemos Pro.
          </p>
        </>
      )}
    </Modal>
  )
}
