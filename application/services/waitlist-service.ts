/**
 * Waitlist Service - Application layer business logic
 * Handles waitlist operations without knowing about Supabase
 */

import { Container } from '../container'
import type { WaitlistEntry, CreateWaitlistData } from '@/domain/entities/waitlist'

export interface JoinWaitlistData {
  email: string
  source: CreateWaitlistData['source']
  wantsTips: boolean
  userId?: string | null
}

export class WaitlistService {
  /**
   * Add user to Pro waitlist
   * Upserts to handle duplicate emails gracefully
   */
  async join(data: JoinWaitlistData): Promise<WaitlistEntry> {
    const waitlistRepo = Container.getWaitlistRepository()

    return waitlistRepo.upsert({
      email: data.email,
      source: data.source,
      wantsTips: data.wantsTips,
      userId: data.userId ?? null,
    })
  }

  /**
   * Check if email is already in waitlist
   */
  async isInWaitlist(email: string): Promise<boolean> {
    const waitlistRepo = Container.getWaitlistRepository()
    const entry = await waitlistRepo.findByEmail(email)
    return entry !== null
  }

  /**
   * Get waitlist entry by email
   */
  async getByEmail(email: string): Promise<WaitlistEntry | null> {
    const waitlistRepo = Container.getWaitlistRepository()
    return waitlistRepo.findByEmail(email)
  }

  /**
   * Get total waitlist count
   */
  async getCount(): Promise<number> {
    const waitlistRepo = Container.getWaitlistRepository()
    return waitlistRepo.count()
  }
}

export const waitlistService = new WaitlistService()
