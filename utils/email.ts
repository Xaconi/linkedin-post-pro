/**
 * Email validation utilities
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns true if email is valid format
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Normalize email (lowercase, trim)
 * @param email - Email string to normalize
 * @returns Normalized email
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}
