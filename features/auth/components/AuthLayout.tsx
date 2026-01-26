'use client'

import Link from 'next/link'

import { CheckIcon, LogoIcon } from '@/shared/components/icons'
import { NetworkPattern } from '@/shared/components/patterns'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

/**
 * Split-screen authentication layout
 * Left: Branded panel with network pattern
 * Right: Auth form content
 */
export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Network Pattern Background */}
        <div className="absolute inset-0">
          <NetworkPattern />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:text-white/90">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <LogoIcon className="w-6 h-6" />
            </div>
            <span className="font-display text-xl font-semibold">LinkedIn Post Pro</span>
          </Link>

          {/* Value Proposition */}
          <div className="max-w-md animate-fade-in-up">
            <h1 className="font-display text-4xl font-semibold leading-tight mb-6">
              Genera posts que conectan con tu audiencia
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              3 variaciones en 30 segundos. Español nativo de España o LATAM. Sin sonar a robot.
            </p>

            {/* Features highlight */}
            <div className="mt-8 space-y-3">
              {[
                'Genera 3 variaciones de cada post',
                'Elige entre tono profesional, cercano o inspiracional',
                '5 posts gratis cada mes',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckIcon className="w-3 h-3" />
                  </div>
                  <span className="text-white/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} LinkedIn Post Pro
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-neutral-light">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <LogoIcon className="w-5 h-5" />
            </div>
            <span className="font-display text-lg font-semibold text-neutral-dark">
              LinkedIn Post Pro
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md animate-fade-in-up">
            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-neutral-dark mb-2">
                {title}
              </h2>
              <p className="text-neutral-medium">{subtitle}</p>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
