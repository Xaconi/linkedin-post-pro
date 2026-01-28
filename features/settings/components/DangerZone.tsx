'use client'

import { useState } from 'react'

import { SettingsSection } from './SettingsSection'
import { DeleteAccountModal } from './DeleteAccountModal'

/**
 * Danger zone section with account deletion option
 */
export function DangerZone() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <SettingsSection
        title="Zona de peligro"
        description="Acciones irreversibles para tu cuenta"
        variant="danger"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-neutral-dark">Eliminar mi cuenta</p>
            <p className="text-sm text-neutral-medium">
              Elimina permanentemente tu cuenta y todos tus datos
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl border-2 border-error px-4 py-2 text-sm font-medium text-error transition-colors hover:bg-error hover:text-white"
          >
            Eliminar cuenta
          </button>
        </div>
      </SettingsSection>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
