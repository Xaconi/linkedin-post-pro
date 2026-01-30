'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    icon: '✍️',
    title: 'Escribe tu idea',
    description: 'Describe en pocas palabras sobre qué quieres hablar. No necesitas ser perfecto, solo auténtico.',
    color: 'from-primary to-primary-hover',
  },
  {
    number: '02',
    icon: '🎯',
    title: 'Elige tono y región',
    description: 'Selecciona si quieres sonar profesional, cercano o inspiracional. Y elige español de España o LATAM.',
    color: 'from-secondary to-secondary-hover',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Genera 3 variaciones',
    description: 'En segundos, nuestra IA crea 3 posts únicos. Cada uno explora tu idea desde un ángulo diferente.',
    color: 'from-primary-light to-primary',
  },
  {
    number: '04',
    icon: '📋',
    title: 'Copia y publica',
    description: 'Elige tu favorito, cópialo con un clic y pégalo directamente en LinkedIn. Así de simple.',
    color: 'from-secondary-light to-secondary',
  },
]

/**
 * How it works section with animated steps
 */
export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!intervalRef.current) {
              intervalRef.current = setInterval(() => {
                setActiveStep((prev) => (prev + 1) % steps.length)
              }, 3000)
            }
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
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

        {/* Steps grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              {...step}
              isActive={activeStep === index}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </div>

        {/* Connection line (desktop only) */}
        <div className="mt-8 hidden lg:block">
          <div className="relative h-1 w-full rounded-full bg-neutral-light">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  number,
  icon,
  title,
  description,
  color,
  isActive,
  onClick,
}: {
  number: string
  icon: string
  title: string
  description: string
  color: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Paso ${number}: ${title}`}
      aria-pressed={isActive}
      className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all ${isActive
        ? 'bg-neutral-dark shadow-xl'
        : 'bg-neutral-light hover:bg-neutral-light/80'
        }`}
    >
      {/* Step number */}
      <span
        className={`absolute right-4 top-4 font-display text-5xl font-bold transition-colors ${isActive ? 'text-white/90' : 'text-neutral-medium/40'
          }`}
      >
        {number}
      </span>

      {/* Icon container */}
      <div
        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-2xl shadow-lg transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'
          }`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3
        className={`mb-2 font-display text-lg font-semibold transition-colors ${isActive ? 'text-white' : 'text-neutral-dark'
          }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed transition-colors ${isActive ? 'text-white/70' : 'text-neutral-medium'
          }`}
      >
        {description}
      </p>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary-light" />
      )}
    </button>
  )
}
