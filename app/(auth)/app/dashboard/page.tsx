import { currentUser } from '@clerk/nextjs/server'

import { EditIcon, ClockIcon } from '@/shared/components/icons'

export const metadata = {
  title: 'Dashboard | LinkedIn Post Pro',
  description: 'Genera posts profesionales para LinkedIn en segundos.',
}

/**
 * Dashboard page - Main app view
 * Placeholder until post generator is implemented
 */
export default async function DashboardPage() {
  const user = await currentUser()
  const userName = user?.firstName || 'Usuario'

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-neutral-dark">
          ¡Hola, {userName}!
        </h1>
        <p className="mt-2 text-neutral-medium">
          Genera posts profesionales para LinkedIn en segundos.
        </p>
      </div>

      {/* Placeholder Card */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <EditIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold text-neutral-dark mb-2">
            Generador de Posts
          </h2>
          <p className="text-neutral-medium mb-6">
            El generador de posts estará disponible pronto. Podrás crear 3 variaciones
            de posts profesionales en segundos.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg text-sm font-medium">
            <ClockIcon className="w-4 h-4" />
            Próximamente
          </div>
        </div>
      </div>

      {/* Stats Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-6">
          <p className="text-sm text-neutral-medium mb-1">Posts restantes</p>
          <p className="text-2xl font-semibold text-neutral-dark">5 / 5</p>
          <p className="text-xs text-neutral-medium mt-1">Plan gratuito</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-6">
          <p className="text-sm text-neutral-medium mb-1">Posts generados</p>
          <p className="text-2xl font-semibold text-neutral-dark">0</p>
          <p className="text-xs text-neutral-medium mt-1">Este mes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-neutral-light p-6">
          <p className="text-sm text-neutral-medium mb-1">Plan actual</p>
          <p className="text-2xl font-semibold text-neutral-dark">Free</p>
          <p className="text-xs text-primary mt-1 cursor-pointer hover:underline">
            Upgrade a Pro
          </p>
        </div>
      </div>
    </div>
  )
}
