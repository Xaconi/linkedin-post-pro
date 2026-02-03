import { StepsInteractive } from './StepsInteractive'

const steps = [
  {
    number: '01',
    icon: '✍️',
    title: 'Escribe tu idea',
    description:
      'Describe en pocas palabras sobre qué quieres hablar. No necesitas ser perfecto, solo auténtico.',
    color: 'from-primary to-primary-hover',
  },
  {
    number: '02',
    icon: '🎯',
    title: 'Elige tono y región',
    description:
      'Selecciona si quieres sonar profesional, cercano o inspiracional. Y elige español de España o LATAM.',
    color: 'from-secondary to-secondary-hover',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Genera 3 variaciones',
    description:
      'En segundos, nuestra IA crea 3 posts únicos. Cada uno explora tu idea desde un ángulo diferente.',
    color: 'from-primary-light to-primary',
  },
  {
    number: '04',
    icon: '📋',
    title: 'Copia y publica',
    description:
      'Elige tu favorito, cópialo con un clic y pégalo directamente en LinkedIn. Así de simple.',
    color: 'from-secondary-light to-secondary',
  },
]

/**
 * How it works section with animated steps
 * Server component - data defined here, interactivity in StepsInteractive
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Cómo funciona
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            De idea a post en{' '}
            <span className="relative inline-block">
              segundos
              <span className="absolute -bottom-1 left-0 h-3 w-full bg-primary/10" />
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-neutral-medium">
            Un proceso simple de 4 pasos que te ahorra horas de trabajo cada semana
          </p>
        </div>

        {/* Steps - data from server, interactivity in client */}
        <StepsInteractive steps={steps} />
      </div>
    </section>
  )
}
