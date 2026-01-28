import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { userService } from '@/application/services'
import { subscriptionService } from '@/application/services'
import { AccountInfo, EmailPreferences } from '@/features/settings'
import { Header } from '@/shared/components/layout'

export const metadata = {
  title: 'Ajustes | LinkedIn Post Pro',
  description: 'Gestiona tu cuenta y preferencias.',
}

/**
 * Settings page - User account management
 */
export default async function SettingsPage() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    redirect('/login')
  }

  // Get user from database
  const user = await userService.getByExternalId(clerkUser.id)

  if (!user) {
    redirect('/login')
  }

  // Get subscription to know the plan
  const subscription = await subscriptionService.getByUserId(user.id)
  const plan = subscription?.plan ?? 'free'

  // Clerk user portal URL for password change
  const clerkUserPortalUrl = process.env.NEXT_PUBLIC_CLERK_USER_PORTAL_URL

  return (
    <div className="min-h-screen bg-neutral-light/30">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-neutral-dark sm:text-3xl">
            Ajustes
          </h1>
          <p className="mt-1 text-neutral-medium">
            Gestiona tu cuenta y preferencias
          </p>
        </div>

        {/* Settings sections */}
        <div className="space-y-6">
          <AccountInfo
            user={user}
            plan={plan}
            clerkUserPortalUrl={clerkUserPortalUrl}
          />

          <EmailPreferences
            initialPreferences={{
              emailTips: user.emailTips,
              emailUpdates: user.emailUpdates,
            }}
          />
        </div>
      </main>
    </div>
  )
}
