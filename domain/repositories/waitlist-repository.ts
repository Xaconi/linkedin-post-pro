/**
 * Waitlist Repository Interface
 * Defines the contract for waitlist data access
 */

import type { WaitlistEntry, CreateWaitlistData } from '../entities/waitlist'

export interface IWaitlistRepository {
  /**
   * Add or update waitlist entry (upsert by email)
   */
  upsert(data: CreateWaitlistData): Promise<WaitlistEntry>

  /**
   * Find waitlist entry by email
   */
  findByEmail(email: string): Promise<WaitlistEntry | null>

  /**
   * Get total waitlist count
   */
  count(): Promise<number>
}
