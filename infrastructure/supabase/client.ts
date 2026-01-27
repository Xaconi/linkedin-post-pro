import { createClient } from '@supabase/supabase-js'

import type { Database } from './types'

/**
 * Environment variables
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

function validateEnvVars() {
  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  if (!supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY environment variable')
  }
  return { supabaseUrl, supabaseKey }
}

/**
 * Supabase client for browser/client components
 */
export function createBrowserClient() {
  const { supabaseUrl, supabaseKey } = validateEnvVars()
  return createClient<Database>(supabaseUrl, supabaseKey)
}

/**
 * Supabase client for server-side operations
 * Used in API routes and server components
 */
export function createServerClient() {
  const { supabaseUrl, supabaseKey } = validateEnvVars()
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Type-safe Supabase client type export
 */
export type SupabaseClient = ReturnType<typeof createBrowserClient>
