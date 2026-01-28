'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'

import { AlertCircleIcon, Modal } from '@/shared/components'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

const CONFIRMATION_TEXT = 'ELIMINAR'

/**
 * Modal for confirming account deletion
 * Requires typing "ELIMINAR" to enable the delete button
 */
export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const router = useRouter()
  const { signOut } = useClerk()
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isConfirmed = confirmText === CONFIRMATION_TEXT

  const handleClose = () => {
    if (isDeleting) return
    setConfirmText('')
    setError(null)
    onClose()
  }

  const handleDelete = async () => {
    if (!isConfirmed || isDeleting) return

    setIsDeleting(true)
    setError(null)

    try {
      // 1. Delete from Supabase
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error al eliminar la cuenta')
      }

      // 2. Sign out from Clerk (this also deletes the Clerk user via webhook or we do it in API)
      await signOut({ redirectUrl: '/' })

      // 3. Redirect to home
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setIsDeleting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <div className="text-center">
        {/* Warning icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error/10">
          <AlertCircleIcon className="h-7 w-7 text-error" />
        </div>

        {/* Title */}
        <h3 className="mb-2 font-display text-xl font-semibold text-neutral-dark">
          Eliminar cuenta
        </h3>

        {/* Warning message */}
        <p className="mb-6 text-sm text-neutral-medium">
          Esta accion es <span className="font-semibold text-error">permanente</span> y no se puede deshacer.
          Se eliminaran todos tus datos, incluyendo posts generados e historial.
        </p>

        {/* Confirmation input */}
        <div className="mb-6">
          <label
            htmlFor="delete-confirm"
            className="mb-2 block text-sm text-neutral-medium"
          >
            Escribe <span className="font-mono font-semibold text-error">{CONFIRMATION_TEXT}</span> para confirmar
          </label>
          <input
            id="delete-confirm"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
            disabled={isDeleting}
            placeholder={CONFIRMATION_TEXT}
            className="w-full rounded-xl border border-neutral-light px-4 py-3 text-center font-mono text-neutral-dark transition-colors focus:border-error focus:outline-none focus:ring-2 focus:ring-error/20 disabled:cursor-not-allowed disabled:bg-neutral-light"
            autoComplete="off"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-lg bg-error/10 p-3 text-sm text-error">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="flex-1 rounded-xl border border-neutral-light px-4 py-3 font-medium text-neutral-dark transition-colors hover:bg-neutral-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
            className="flex-1 rounded-xl bg-error px-4 py-3 font-medium text-white transition-colors hover:bg-error/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar cuenta'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
