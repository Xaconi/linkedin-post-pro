import { currentUser } from '@clerk/nextjs/server'

import { PostGeneratorDashboard } from '@/features/post-generator'

export const metadata = {
  title: 'Dashboard | LinkedIn Post Pro',
  description: 'Genera posts profesionales para LinkedIn en segundos.',
}

/**
 * Dashboard page - Main app view with post generator
 */
export default async function DashboardPage() {
  const user = await currentUser()
  const userName = user?.firstName || 'Usuario'
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || ''

  return <PostGeneratorDashboard userName={userName} userEmail={userEmail} />
}
