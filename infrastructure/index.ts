/**
 * Infrastructure Layer
 *
 * Contains technology-specific implementations:
 * - Database adapters (Supabase, Prisma, etc.)
 * - External API clients
 * - Third-party service integrations
 *
 * Access via Container from @/application for dependency injection
 */

export * from './supabase'
