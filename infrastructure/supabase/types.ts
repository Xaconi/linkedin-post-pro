/**
 * Supabase Database Types
 *
 * These types are ONLY for Supabase DB communication.
 * For business logic, use types from @/domain
 *
 * In production, generate these with: npx supabase gen types typescript
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_user_id: string
          email: string
          name: string | null
          email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          email: string
          name?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          email?: string
          name?: string | null
          email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: string
          posts_remaining: number
          posts_limit: number
          cycle_start_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan?: string
          posts_remaining?: number
          posts_limit?: number
          cycle_start_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: string
          posts_remaining?: number
          posts_limit?: number
          cycle_start_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_subscriptions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      generated_posts: {
        Row: {
          id: string
          user_id: string
          input_idea: string
          tone: string
          region: string
          variant_1: string
          variant_2: string
          variant_3: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          input_idea: string
          tone: string
          region: string
          variant_1: string
          variant_2: string
          variant_3: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          input_idea?: string
          tone?: string
          region?: string
          variant_1?: string
          variant_2?: string
          variant_3?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'generated_posts_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
