import { esES } from '@clerk/localizations'

/**
 * Custom Spanish localization for Clerk
 * Extends the official esES with missing translations
 */
export const clerkLocalization = {
  ...esES,
  unstable__errors: {
    ...esES.unstable__errors,
    zxcvbn: {
      goodPassword: 'Tu contraseña cumple todos los requisitos.',
    },
  },
} as const
