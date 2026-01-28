/**
 * Supabase Waitlist Repository Implementation
 * Implements IWaitlistRepository interface from domain layer
 */

import type { IWaitlistRepository } from '@/domain/repositories/waitlist-repository'
import type { WaitlistEntry, CreateWaitlistData, WaitlistSource } from '@/domain/entities/waitlist'
import { createServerClient } from '../client'

export class SupabaseWaitlistRepository implements IWaitlistRepository {
  /**
   * Add or update waitlist entry (upsert by email)
   */
  async upsert(data: CreateWaitlistData): Promise<WaitlistEntry> {
    const supabase = createServerClient()

    const { data: result, error } = await supabase
      .from('pro_waitlist')
      .upsert(
        {
          email: data.email,
          source: data.source,
          wants_tips: data.wantsTips,
          user_id: data.userId ?? null,
        },
        {
          onConflict: 'email',
        }
      )
      .select()
      .single()

    if (error) {
      console.error('Error upserting waitlist entry:', error)
      throw error
    }

    return this.mapToEntity(result)
  }

  /**
   * Find waitlist entry by email
   */
  async findByEmail(email: string): Promise<WaitlistEntry | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('pro_waitlist')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching waitlist entry:', error)
      throw error
    }

    return this.mapToEntity(data)
  }

  /**
   * Get total waitlist count
   */
  async count(): Promise<number> {
    const supabase = createServerClient()

    const { count, error } = await supabase
      .from('pro_waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error counting waitlist:', error)
      throw error
    }

    return count ?? 0
  }

  /**
   * Map database row to domain entity
   */
  private mapToEntity(row: {
    id: string
    user_id: string | null
    email: string
    source: string
    wants_tips: boolean
    created_at: string
  }): WaitlistEntry {
    return {
      id: row.id,
      userId: row.user_id,
      email: row.email,
      source: row.source as WaitlistSource,
      wantsTips: row.wants_tips,
      createdAt: new Date(row.created_at),
    }
  }
}
