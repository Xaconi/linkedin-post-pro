/**
 * Problem/Solution section highlighting pain points and how we solve them
 */
export function ProblemSolution() {
  return (
    <section className="relative bg-neutral-light py-20 md:py-28">
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(10,102,194,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,118,66,0.03),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-medium shadow-sm">
            El problema
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Escribir en LinkedIn es{' '}
            <span className="relative">
              agotador
              <svg
                className="absolute -bottom-2 left-0 w-full text-error/30"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8 T200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Problem cards */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          <ProblemCard
            icon="⏱️"
            title="Consume demasiado tiempo"
            description="Escribir un post decente te lleva 30-60 minutos. Tiempo que podrías usar en tu negocio."
          />
          <ProblemCard
            icon="🤖"
            title="Suena a robot"
            description="Los generadores de IA en inglés producen textos que traducidos suenan artificiales y fríos."
          />
          <ProblemCard
            icon="😅"
            title="Bloqueo creativo"
            description="Sabes qué quieres decir, pero no encuentras las palabras para conectar con tu audiencia."
          />
        </div>

        {/* Solution */}
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
            La solución
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            IA que entiende el{' '}
            <span className="text-gradient">español de verdad</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-medium">
            LinkedIn Post Pro está entrenado específicamente para crear contenido en español
            nativo. Elige entre español de España o Latinoamérica, con expresiones y matices
            que suenan <span className="font-medium text-neutral-dark">naturales y auténticos</span>.
          </p>
        </div>

        {/* Solution features */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <SolutionCard
            icon="🇪🇸"
            title="Español de España"
            description="Con el 'vosotros', expresiones locales y ese tono que tu audiencia española espera."
          />
          <SolutionCard
            icon="🌎"
            title="Español Latinoamericano"
            description="Neutro, profesional y adaptado para conectar con audiencias de toda Latinoamérica."
          />
          <SolutionCard
            icon="🎯"
            title="3 tonos diferentes"
            description="Profesional, cercano o inspiracional. Elige el que mejor encaje con tu marca personal."
          />
        </div>
      </div>
    </section>
  )
}

function ProblemCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="relative">
        <span className="mb-4 inline-block text-3xl">{icon}</span>
        <h3 className="mb-2 font-display text-lg font-semibold text-neutral-dark">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-medium">{description}</p>
      </div>
    </div>
  )
}

function SolutionCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-secondary/20 bg-white p-6 transition-all hover:border-secondary/40 hover:shadow-md">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="relative">
        <span className="mb-4 inline-block text-3xl">{icon}</span>
        <h3 className="mb-2 font-display text-lg font-semibold text-neutral-dark">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-medium">{description}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-secondary to-secondary-light transition-all group-hover:w-full" />
    </div>
  )
}
