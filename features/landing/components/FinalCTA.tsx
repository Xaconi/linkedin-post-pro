import Link from 'next/link'

/**
 * Final call-to-action section before footer
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-neutral-dark py-20 md:py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Decorative element */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-3xl shadow-lg">
            ✨
          </span>
        </div>

        <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          Genera tu primer post para LinkedIn
          <br />
          <span className="bg-gradient-to-r from-primary-light via-white to-secondary-light bg-clip-text text-transparent">
            gratis y en segundos
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">
          Únete a los creadores de contenido que ya usan IA para escribir posts en LinkedIn
          en español de forma profesional.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-neutral-dark shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Crea tu primer post gratis
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 10h10M11 6l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/50">
          5 posts gratis al mes · Sin tarjeta de crédito · Cancela cuando quieras
        </p>
      </div>
    </section>
  )
}
