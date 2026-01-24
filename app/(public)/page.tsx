import { PostCardPreview } from '@features/landing'
import { FeaturePill, StatusBadge } from '@shared/ui'

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-64 w-64 bg-dots opacity-30" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-0">
        <div className="flex-1 lg:py-20">
          <div className="animate-fade-in-up mb-8">
            <StatusBadge text="Próximamente" />
          </div>

          <h1 className="animate-fade-in-up mb-6 text-balance leading-[1.1]">
            <span className="text-neutral-dark">Posts de LinkedIn</span>
            <br />
            <span className="text-gradient">que conectan</span>
          </h1>

          <p className="animate-fade-in-up-delayed mb-8 max-w-lg text-lg text-neutral-medium md:text-xl">
            Genera contenido profesional en español con IA.
            <span className="font-medium text-neutral-dark"> 3 variaciones en segundos</span>,
            sin sonar a robot.
          </p>

          <div className="animate-fade-in-up-delayed-2 mb-10 flex flex-wrap gap-3">
            <FeaturePill icon="✦" text="Español nativo" />
            <FeaturePill icon="◎" text="3 tonos diferentes" />
            <FeaturePill icon="◇" text="5 posts gratis/mes" />
          </div>

          <div className="animate-fade-in-up-delayed-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-sm">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  disabled
                  className="input pr-4 opacity-60"
                />
              </div>
              <button disabled className="btn-primary whitespace-nowrap opacity-60">
                Únete a la waitlist
              </button>
            </div>
            <p className="mt-3 text-sm text-neutral-medium">
              Sin spam. Te avisamos cuando esté listo.
            </p>
          </div>
        </div>

        <div className="relative mt-16 flex-1 lg:mt-0">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="animate-float relative z-20 rounded-2xl border border-neutral-light bg-white p-6 shadow-xl shadow-neutral-dark/5">
              <PostCardPreview
                tone="Profesional"
                toneColor="text-primary"
                content="Después de 10 años en marketing, he aprendido que el mejor contenido no es el que más tiempo te lleva escribir..."
              />
            </div>

            <div className="animate-float-delayed absolute -right-4 top-8 z-10 w-full rounded-2xl border border-neutral-light bg-white/80 p-6 shadow-lg shadow-neutral-dark/5 lg:-right-8">
              <PostCardPreview
                tone="Cercano"
                toneColor="text-secondary"
                content="Os cuento algo: el marketing que funciona no es el que parece marketing..."
              />
            </div>

            <div className="absolute -left-4 bottom-0 z-0 h-32 w-32 rounded-2xl bg-primary/5 lg:-left-8" />
            <div className="absolute -bottom-4 right-8 z-0 h-20 w-20 rounded-full bg-secondary/10" />
          </div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-6 text-center text-sm text-neutral-medium">
        <p>
          Hecho con <span className="inline-block animate-pulse-soft">♥</span> para creadores de
          contenido
        </p>
      </footer>
    </main>
  )
}
