import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { Header } from '@/shared/components/layout'

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Protected layout for authenticated routes
 * Redirects to login if not authenticated
 */
export default async function AuthLayout({ children }: AuthLayoutProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/login')
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
