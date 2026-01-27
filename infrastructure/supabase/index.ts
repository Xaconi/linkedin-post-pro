/**
 * Supabase Infrastructure Layer
 *
 * This module provides Supabase-specific implementations
 * of the repository interfaces defined in @/domain
 *
 * For application logic, use services from @/application
 * For domain types, use types from @/domain
 */

// Client
export { createBrowserClient, createServerClient } from './client'
export type { SupabaseClient } from './client'

// Repository implementations (access via Container)
export { SupabaseUserRepository, SupabaseSubscriptionRepository } from './repositories'

// Mappers (for advanced use cases)
export { mapDbUserToDomain, mapDbSubscriptionToDomain } from './mappers'

// Database types (only for Supabase-specific needs)
export type { Database } from './types'
