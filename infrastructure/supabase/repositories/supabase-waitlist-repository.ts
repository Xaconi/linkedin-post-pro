/**
 * Supabase Waitlist Repository Implementation
 * Handles Pro waitlist signups
 */

import { createServerClient } from '../client'

export interface WaitlistEntry {
  id: string
  userId: string | null
  email: string
  source: 'pricing_page' | 'dashboard'
  wantsTips: boolean
  createdAt: Date
}

export interface CreateWaitlistData {
  email: string
  source: 'pricing_page' | 'dashboard'
  wantsTips: boolean
  userId?: string | null
}

export class SupabaseWaitlistRepository {
  /**
   * Add email to waitlist (upsert to handle duplicates)
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

    return {
      id: result.id,
      userId: result.user_id,
      email: result.email,
      source: result.source as 'pricing_page' | 'dashboard',
      wantsTips: result.wants_tips,
      createdAt: new Date(result.created_at),
    }
  }

  /**
   * Check if email is already in waitlist
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

    return {
      id: data.id,
      userId: data.user_id,
      email: data.email,
      source: data.source as 'pricing_page' | 'dashboard',
      wantsTips: data.wants_tips,
      createdAt: new Date(data.created_at),
    }
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
}
