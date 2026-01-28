import Link from 'next/link'

import { ChevronRightIcon } from '@/shared/components/icons'
import type { User } from '@/domain/entities/user'
import type { SubscriptionPlan } from '@/domain/entities/subscription'

import { SettingsSection } from './SettingsSection'

interface AccountInfoProps {
  user: User
  plan: SubscriptionPlan
  clerkUserPortalUrl?: string
}

/**
 * Account information section showing user details
 */
export function AccountInfo({ user, plan, clerkUserPortalUrl }: AccountInfoProps) {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(user.createdAt)

  return (
    <SettingsSection
      title="Informacion de la cuenta"
      description="Tu informacion personal y detalles de la cuenta"
    >
      <div className="space-y-4">
        {/* Name */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-dark">Nombre</span>
          <span className="text-sm text-neutral-medium">
            {user.name || 'No especificado'}
          </span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-dark">Email</span>
          <span className="text-sm text-neutral-medium">{user.email}</span>
        </div>

        {/* Plan */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-dark">Plan</span>
          <span
            className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${plan === 'pro'
                ? 'bg-primary/10 text-primary'
                : 'bg-neutral-light text-neutral-dark'
              }`}
          >
            {plan === 'pro' ? 'Pro' : 'Free'}
          </span>
        </div>

        {/* Member since */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-neutral-dark">
            Miembro desde
          </span>
          <span className="text-sm text-neutral-medium">{formattedDate}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-light pt-4">
          {clerkUserPortalUrl ? (
            <Link
              href={clerkUserPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Cambiar contraseña
              <ChevronRightIcon className="h-4 w-4 opacity-60" />
            </Link>
          ) : (
            <span className="text-sm text-neutral-medium">
              Gestiona tu contraseña desde tu proveedor de autenticacion
            </span>
          )}
        </div>
      </div>
    </SettingsSection>
  )
}
