import { PostRegions, PostTones, IdeaConstraints } from "@/domain"

export const POST_LIMITS = {
  MAX_IDEA_LENGTH: IdeaConstraints.MAX_LENGTH,
  MIN_IDEA_LENGTH: IdeaConstraints.MIN_LENGTH,
  VARIANTS_COUNT: 3,
  RATE_LIMIT_SECONDS: 10,
  MAX_TOKENS: 1500,
} as const

export const TONE_OPTIONS = {
  professional: {
    id: PostTones.PROFESSIONAL,
    label: 'Profesional',
    description: 'Formal y corporativo',
    icon: '💼',
  },
  friendly: {
    id: PostTones.FRIENDLY,
    label: 'Cercano',
    description: 'Conversacional y personal',
    icon: '😊',
  },
  inspirational: {
    id: PostTones.INSPIRATIONAL,
    label: 'Inspiracional',
    description: 'Motivacional y emotivo',
    icon: '✨',
  },
} as const

export const REGION_OPTIONS = {
  spain: {
    id: PostRegions.SPAIN,
    label: 'España',
    description: 'Español de España',
    icon: '🇪🇸',
  },
  latam: {
    id: PostRegions.LATAM,
    label: 'LATAM',
    description: 'Español latinoamericano',
    icon: '🌎',
  },
} as const
