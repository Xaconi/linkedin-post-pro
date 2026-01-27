import { createClient } from '@supabase/supabase-js'

import type { Database } from './types'

/**
 * Environment variables
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/**
 * Supabase client for browser/client components
 * Uses anon key with Row Level Security (RLS)
 */
export function createBrowserClient() {
  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

/**
 * Supabase client for server-side operations
 * Uses service role key to bypass RLS
 * Only use in API routes and server components
 */
export function createServerClient() {
  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use createBrowserClient() or createServerClient() instead
 */
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient<Database>>)

/**
 * Type-safe Supabase client type export
 */
export type SupabaseClient = typeof supabase
