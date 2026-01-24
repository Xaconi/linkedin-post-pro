/**
 * Site metadata and configuration
 */

export const siteConfig = {
  name: 'LinkedIn Post Pro',
  description: 'Genera posts optimizados para LinkedIn en español usando IA',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://linkedinpostpro.com',

  // SEO
  keywords: [
    'LinkedIn',
    'posts',
    'español',
    'IA',
    'generador',
    'content creator',
    'social media',
    'profesional',
  ],

  // Social
  links: {
    twitter: '',
    linkedin: '',
    github: '',
  },

  // Contact
  contact: {
    email: 'support@linkedinpostpro.com',
  },

  // Legal
  legal: {
    termsUrl: '/terms',
    privacyUrl: '/privacy',
  },

  // Author
  author: {
    name: 'LinkedIn Post Pro',
    url: 'https://linkedinpostpro.com',
  },
} as const

export type SiteConfig = typeof siteConfig
