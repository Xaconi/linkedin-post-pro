import { PostRegions, PostTones } from "@/domain"

export const POST_LIMITS = {
  MAX_IDEA_LENGTH: 500,
  MIN_IDEA_LENGTH: 10,
  VARIANTS_COUNT: 3,
  RATE_LIMIT_SECONDS: 10,
  MAX_TOKENS: 1500,
} as const

export const TONE_OPTIONS = [
  {
    value: PostTones.PROFESSIONAL,
    label: 'Profesional',
    description: 'Formal y corporativo',
    icon: '💼',
  },
  {
    value: PostTones.FRIENDLY,
    label: 'Cercano',
    description: 'Conversacional y personal',
    icon: '😊',
  },
  {
    value: PostTones.INSPIRATIONAL,
    label: 'Inspiracional',
    description: 'Motivacional y emotivo',
    icon: '✨',
  },
] as const

export const REGION_OPTIONS = [
  {
    value: PostRegions.SPAIN,
    label: 'España',
    description: 'Español de España',
    icon: '🇪🇸',
  },
  {
    value: PostRegions.LATAM,
    label: 'Latinoamérica',
    description: 'Español latinoamericano',
    icon: '🌎',
  },
] as const
