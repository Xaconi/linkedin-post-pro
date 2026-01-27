/**
 * GeneratedPost Entity - Pure business domain type
 * Technology-agnostic, no dependencies on Supabase/Claude/etc.
 */

/**
 * Business rules for post idea input
 */
export const IdeaConstraints = {
  MIN_LENGTH: 10,
  MAX_LENGTH: 500,
} as const

export enum PostTones {
  PROFESSIONAL = 'professional',
  FRIENDLY = 'friendly',
  INSPIRATIONAL = 'inspirational',
}
export type PostTone = PostTones.PROFESSIONAL | PostTones.FRIENDLY | PostTones.INSPIRATIONAL

export enum PostRegions {
  SPAIN = 'spain',
  LATAM = 'latam',
}
export type PostRegion = PostRegions.SPAIN | PostRegions.LATAM
export interface GeneratedPost {
  id: string
  userId: string
  inputIdea: string
  tone: PostTone
  region: PostRegion
  variants: [string, string, string]
  createdAt: Date
}

/**
 * Data required to create a new generated post
 */
export interface CreateGeneratedPostData {
  userId: string
  inputIdea: string
  tone: PostTone
  region: PostRegion
  variants: [string, string, string]
}
