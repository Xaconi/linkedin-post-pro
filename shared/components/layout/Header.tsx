'use client'

import Link from 'next/link'

import { LogoIcon } from '@/shared/components/icons'
import { UserMenu } from './UserMenu'

/**
 * Protected app header with logo and user menu
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/app/dashboard"
            className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <LogoIcon className="w-5 h-5" />
            </div>
            <span className="font-display text-lg font-semibold text-neutral-dark hidden sm:block">
              LinkedIn Post Pro
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
