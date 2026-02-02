/**
 * Clerk Configuration Helpers
 *
 * Centralized configuration for Clerk authentication.
 * All Clerk-related constants and helpers should be defined here.
 */

// Auth redirect URLs
export const CLERK_URLS = {
  signIn: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/login',
  signUp: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/signup',
  afterSignIn: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/app/dashboard',
  afterSignUp: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/app/dashboard',
} as const

// Public routes configuration (for reference, actual matching is in proxy.ts)
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup',
  '/pricing',
  '/forgot-password',
  '/terms',
  '/privacy',
  '/cookies',
] as const

// Protected route patterns
export const PROTECTED_ROUTE_PREFIX = '/app'

/**
 * Check if a path is a protected route
 */
export function isProtectedRoute(path: string): boolean {
  return path.startsWith(PROTECTED_ROUTE_PREFIX)
}

/**
 * Check if a path is a public route
 */
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route =>
    path === route || path.startsWith(`${route}/`)
  )
}
