import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { Header } from '@/shared/components/layout'
import { syncUserFromAuth } from '@/application'

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Protected layout for authenticated routes
 * Redirects to login if not authenticated
 * Syncs user data from Clerk to database on each visit
 */
export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect('/login')
  }

  // Sync user from Clerk to database
  // This creates user + subscription if new, updates if existing
  try {
    await syncUserFromAuth({
      externalId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? '',
      name: user.fullName,
      emailVerified: user.emailAddresses[0]?.verification?.status === 'verified',
    })
  } catch (error) {
    // Log error but don't block user access
    console.error('Failed to sync user:', error)
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
