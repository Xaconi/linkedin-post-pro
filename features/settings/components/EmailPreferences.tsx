'use client'

import { Toggle } from '@/shared/components/Toggle'
import { CheckIcon } from '@/shared/components/icons'

import { SettingsSection } from './SettingsSection'
import { useEmailPreferences, type EmailPreferencesType } from '../hooks'

interface EmailPreferencesProps {
  initialPreferences: EmailPreferencesType
}

/**
 * Email preferences section with toggles for tips and updates
 */
export function EmailPreferences({ initialPreferences }: EmailPreferencesProps) {
  const {
    preferences,
    setEmailTips,
    setEmailUpdates,
    save,
    isSaving,
    isDirty,
    error,
    success,
  } = useEmailPreferences({ initialPreferences })

  return (
    <SettingsSection
      title="Preferencias de email"
      description="Controla que emails quieres recibir"
    >
      <div className="space-y-4">
        <Toggle
          id="email-tips"
          checked={preferences.emailTips}
          onChange={setEmailTips}
          disabled={isSaving}
          label="Tips de LinkedIn"
          description="Recibe consejos para mejorar tus posts"
        />

        <Toggle
          id="email-updates"
          checked={preferences.emailUpdates}
          onChange={setEmailUpdates}
          disabled={isSaving}
          label="Novedades del producto"
          description="Enterate de nuevas funcionalidades"
        />

        {/* Error message */}
        {error && (
          <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="flex items-center gap-2 rounded-lg bg-secondary/10 p-3 text-sm text-secondary">
            <CheckIcon className="h-4 w-4" />
            Preferencias guardadas
          </div>
        )}

        {/* Save button */}
        <div className="pt-2">
          <button
            onClick={save}
            disabled={!isDirty || isSaving}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </SettingsSection>
  )
}
