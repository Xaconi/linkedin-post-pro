export const POST_LIMITS = {
  MAX_IDEA_LENGTH: 500,
  MIN_IDEA_LENGTH: 10,
  VARIANTS_COUNT: 3,
  RATE_LIMIT_SECONDS: 10,
  MAX_TOKENS: 1500,
} as const

export const TONE_OPTIONS = {
  professional: {
    id: 'professional',
    label: 'Profesional',
    description: 'Formal y corporativo',
    icon: '💼',
  },
  friendly: {
    id: 'friendly',
    label: 'Cercano',
    description: 'Conversacional y personal',
    icon: '😊',
  },
  inspirational: {
    id: 'inspirational',
    label: 'Inspiracional',
    description: 'Motivacional y emotivo',
    icon: '✨',
  },
} as const

export const REGION_OPTIONS = {
  spain: {
    id: 'spain',
    label: 'España',
    description: 'Español de España',
    icon: '🇪🇸',
  },
  latam: {
    id: 'latam',
    label: 'LATAM',
    description: 'Español latinoamericano',
    icon: '🌎',
  },
} as const
