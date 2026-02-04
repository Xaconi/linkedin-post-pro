import Link from 'next/link'

import { PostCardPreview } from './PostCardPreview'
import { ScrollButton } from './ScrollButton'
import { FeaturePill } from '@/shared/components'

/**
 * Hero section with compelling headline, CTAs, and animated post previews
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-64 w-64 bg-dots opacity-30" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,102,194,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(10,102,194,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-0">
        {/* Left content */}
        <div className="flex-1 lg:py-20">
          <div className="animate-fade-in-up mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Ya disponible
            </span>
          </div>

          <h1 className="animate-fade-in-up mb-6 text-balance leading-[1.1]">
            <span className="font-display text-4xl font-bold text-neutral-dark md:text-5xl lg:text-6xl">
              Generador de Posts para LinkedIn
            </span>
            <br />
            <span className="text-gradient font-display text-4xl font-bold md:text-5xl lg:text-6xl">
              con IA en Español
            </span>
          </h1>

          <p className="animate-fade-in-up-delayed mb-8 max-w-lg text-lg text-neutral-medium md:text-xl">
            Crea contenido profesional para LinkedIn en segundos.{' '}
            <span className="font-medium text-neutral-dark">3 variaciones en español nativo</span>,
            sin sonar a robot.
          </p>

          <div className="animate-fade-in-up-delayed mb-10 flex flex-wrap gap-3">
            <FeaturePill icon="✦" text="Español nativo" />
            <FeaturePill icon="◎" text="3 tonos diferentes" />
            <FeaturePill icon="◇" text="5 posts gratis/mes" />
          </div>

          <div className="animate-fade-in-up-delayed-2 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/signup" className="btn-primary text-center hover:text-white">
              Crea tu primer post gratis
            </Link>
            <ScrollButton
              targetId="how-it-works"
              className="btn-secondary text-center"
            >
              Ver cómo funciona
            </ScrollButton>
          </div>

          <p className="animate-fade-in-up-delayed-2 mt-4 text-sm text-neutral-medium">
            Sin tarjeta de crédito · Configuración en 30 segundos
          </p>
        </div>

        {/* Right content - Post previews */}
        <div className="relative mt-16 flex-1 lg:mt-0">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Main card */}
            <div className="animate-float relative z-20 rounded-2xl border border-neutral-light bg-white p-6 shadow-xl shadow-neutral-dark/5">
              <PostCardPreview
                tone="Profesional"
                toneColor="text-primary"
                content="Después de 10 años en marketing, he aprendido que el mejor contenido no es el que más tiempo te lleva escribir. Es el que conecta con tu audiencia en los primeros 3 segundos..."
              />
            </div>

            {/* Secondary card */}
            <div className="animate-float-delayed absolute -right-4 top-8 z-10 w-full rounded-2xl border border-neutral-light bg-white/90 p-6 shadow-lg shadow-neutral-dark/5 backdrop-blur-sm lg:-right-8">
              <PostCardPreview
                tone="Cercano"
                toneColor="text-secondary"
                content="Os cuento algo: el marketing que funciona no es el que parece marketing. Es el que cuenta historias reales de personas reales..."
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -left-4 bottom-0 z-0 h-32 w-32 rounded-2xl bg-primary/5 lg:-left-8" />
            <div className="absolute -bottom-4 right-8 z-0 h-20 w-20 rounded-full bg-secondary/10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ScrollButton
          targetId="problem-solution"
          className="flex flex-col items-center gap-2 text-neutral-medium transition-colors hover:text-primary"
          ariaLabel="Scroll para ver más"
        >
          <span className="text-xs">Descubre más</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </ScrollButton>
      </div>
    </section>
  )
}
