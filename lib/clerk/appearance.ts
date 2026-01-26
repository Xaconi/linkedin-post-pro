import type { Appearance } from '@clerk/types'

/**
 * Clerk appearance configuration
 * Uses variables for colors/fonts and CSS file for element styling
 * CSS overrides are in app/styles/_clerk.scss
 */
export const clerkAppearance: Appearance = {
  variables: {
    // Colors
    colorPrimary: '#0A66C2',
    colorTextOnPrimaryBackground: '#FFFFFF',
    colorBackground: 'transparent',
    colorInputBackground: '#FFFFFF',
    colorInputText: '#191919',
    colorText: '#191919',
    colorTextSecondary: '#666666',
    colorDanger: '#CC1016',
    colorSuccess: '#057642',

    // Typography
    fontFamily: 'var(--font-body), system-ui, sans-serif',
    fontSize: '16px',

    // Borders & Radius
    borderRadius: '12px',
  },
  elements: {
    // Hide header and footer - we use our own
    header: { display: 'none' },
    footer: { display: 'none' },
    footerAction: { display: 'none' },
  },
}

/**
 * Layout options for SignIn component
 */
export const signInLayout = {
  socialButtonsPlacement: 'top' as const,
  socialButtonsVariant: 'blockButton' as const,
}

/**
 * Layout options for SignUp component
 */
export const signUpLayout = {
  socialButtonsPlacement: 'top' as const,
  socialButtonsVariant: 'blockButton' as const,
}

/**
 * Layout options for forgot password flow
 */
export const forgotPasswordLayout = {
  socialButtonsPlacement: 'bottom' as const,
}
