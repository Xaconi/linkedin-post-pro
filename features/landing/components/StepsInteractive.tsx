'use client'

import { useEffect, useRef, useState } from 'react'

interface Step {
  number: string
  icon: string
  title: string
  description: string
  color: string
}

interface StepsInteractiveProps {
  steps: Step[]
  autoRotateInterval?: number
}

/**
 * Client component for steps interactivity
 * Handles state, IntersectionObserver, and auto-rotation
 * Step data is passed from server for SSR
 */
export function StepsInteractive({
  steps,
  autoRotateInterval = 3000,
}: StepsInteractiveProps) {
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
              }, autoRotateInterval)
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
  }, [steps.length, autoRotateInterval])

  return (
    <div ref={sectionRef}>
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
      className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all ${
        isActive
          ? 'bg-neutral-dark shadow-xl'
          : 'bg-neutral-light hover:bg-neutral-light/80'
      }`}
    >
      {/* Step number */}
      <span
        className={`absolute right-4 top-4 font-display text-5xl font-bold transition-colors ${
          isActive ? 'text-white/90' : 'text-neutral-medium/40'
        }`}
      >
        {number}
      </span>

      {/* Icon container */}
      <div
        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-2xl shadow-lg transition-transform ${
          isActive ? 'scale-110' : 'group-hover:scale-105'
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3
        className={`mb-2 font-display text-lg font-semibold transition-colors ${
          isActive ? 'text-white' : 'text-neutral-dark'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed transition-colors ${
          isActive ? 'text-white/70' : 'text-neutral-medium'
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
