/**
 * Site metadata and configuration
 */

export const siteConfig = {
  name: 'LinkedIn Post Pro',
  description: 'Generador de posts para LinkedIn con IA en español. Crea contenido profesional en segundos.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://linkedinpostpro.com',

  // SEO - Keywords optimizados para posicionamiento
  keywords: [
    'generador posts linkedin',
    'crear posts linkedin',
    'linkedin post generator español',
    'escribir posts linkedin',
    'ideas posts linkedin',
    'IA para linkedin',
    'contenido linkedin',
    'posts linkedin español',
    'generador contenido linkedin gratis',
    'inteligencia artificial linkedin',
    'crear contenido linkedin con ia',
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
