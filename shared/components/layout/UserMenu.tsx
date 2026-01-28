'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

import Link from 'next/link'

import { ChevronDownIcon, LogoutIcon, SettingsIcon } from '@/shared/components/icons'

/**
 * User dropdown menu with avatar and logout
 */
export function UserMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  if (!user) return null

  const userInitial = user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0) || '?'
  const userName = user.firstName || user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Usuario'

  const handleSignOut = () => {
    signOut({ redirectUrl: '/' })
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-neutral-light transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Menú de usuario para ${userName}`}
      >
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={userName}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
            {userInitial.toUpperCase()}
          </div>
        )}
        <span className="hidden md:block text-sm font-medium text-neutral-dark max-w-[120px] truncate">
          {userName}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-neutral-medium transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-neutral-light py-1 z-50 animate-fade-in-up"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-neutral-light">
            <p className="text-sm font-medium text-neutral-dark truncate">{userName}</p>
            <p className="text-xs text-neutral-medium truncate">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              href="/app/settings"
              className="w-full px-4 py-2 text-left text-sm text-neutral-dark hover:bg-neutral-light transition-colors flex items-center gap-2"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              <SettingsIcon className="w-4 h-4 text-neutral-medium" />
              Ajustes
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-neutral-dark hover:bg-neutral-light transition-colors flex items-center gap-2"
              role="menuitem"
            >
              <LogoutIcon className="w-4 h-4 text-neutral-medium" />
              Cerrar sesion
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
