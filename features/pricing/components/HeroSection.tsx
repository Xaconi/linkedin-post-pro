import Link from 'next/link'

import { CheckIcon } from '@/shared'

interface HeroSectionProps {
  children: React.ReactNode
}

const trustBadges = [
  'Sin tarjeta de crédito',
  'Configuración en 30 segundos',
  'Cancela cuando quieras',
]

/**
 * Hero section with header and trust badges
 * Editorial aesthetic with strong typography hierarchy
 */
export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-neutral-light/30 pb-24 pt-12 md:pb-32 md:pt-16">
      {/* Decorative grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#0A66C2 1px, transparent 1px), linear-gradient(90deg, #0A66C2 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Accent blobs - more subtle */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-1/3 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -right-48 top-2/3 h-96 w-96 rounded-full bg-secondary/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Navigation */}
        <nav className="mb-16 flex items-center justify-between md:mb-20">
          <Link
            href="/"
            className="group flex items-center gap-2 font-display text-xl font-bold text-neutral-dark transition-colors"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-white transition-transform group-hover:scale-105">
              LP
            </span>
            LinkedIn Post<span className="text-primary"> Pro</span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-neutral-medium transition-colors hover:text-primary"
          >
            Iniciar sesion
          </Link>
        </nav>

        {/* Header - Editorial style */}
        <div className="mb-16 md:mb-20">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary/30" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Planes y precios
            </span>
            <span className="h-px w-8 bg-primary/30" />
          </div>

          <h1 className="mb-6 text-center font-display text-4xl font-bold leading-tight text-neutral-dark md:text-5xl lg:text-6xl">
            Un plan para cada
            <span className="relative mx-2 inline-block">
              <span className="relative z-10">creador</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/10" />
            </span>
          </h1>
          <p className="mx-auto max-w-lg text-center text-lg text-neutral-medium md:text-xl">
            Empieza gratis hoy. Sin tarjeta de credito.
          </p>
        </div>

        {/* Pricing Cards */}
        {children}

        {/* Trust badges - pill style */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 md:mt-16">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 rounded-full border border-neutral-light bg-white px-4 py-2 text-sm text-neutral-medium shadow-sm"
            >
              <CheckIcon className="h-4 w-4 text-secondary" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
