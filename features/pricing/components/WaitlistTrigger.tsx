'use client'

import { useState, ReactNode } from 'react'

import type { WaitlistSource } from '@/types/waitlist'

import { WaitlistModal } from './WaitlistModal'

interface WaitlistTriggerProps {
  children: (openWaitlist: () => void) => ReactNode
  source: WaitlistSource
}

/**
 * Client component that manages waitlist modal state
 * Uses render props to provide openWaitlist callback to children
 * Allows parent to remain a server component
 */
export function WaitlistTrigger({ children, source }: WaitlistTriggerProps) {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const openWaitlist = () => setIsWaitlistOpen(true)
  const closeWaitlist = () => setIsWaitlistOpen(false)

  return (
    <>
      {children(openWaitlist)}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={closeWaitlist}
        source={source}
      />
    </>
  )
}
