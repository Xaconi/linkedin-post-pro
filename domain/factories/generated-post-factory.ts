/**
 * GeneratedPost Factory - Domain layer
 * Validates and creates GeneratedPost entities
 */

import {
  type GeneratedPost,
  type CreateGeneratedPostData,
  type PostTone,
  type PostRegion,
  PostTones,
  PostRegions,
} from '@/domain/entities/generated-post'

export class GeneratedPostValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GeneratedPostValidationError'
  }
}

export interface RawGeneratedPostData {
  id: string
  userId: string
  inputIdea: string
  tone: string
  region: string
  variants: [string, string, string]
  createdAt: Date | string
}

const VALID_TONES: PostTone[] = [PostTones.PROFESSIONAL, PostTones.FRIENDLY, PostTones.INSPIRATIONAL]
const VALID_REGIONS: PostRegion[] = [PostRegions.SPAIN, PostRegions.LATAM]

export class GeneratedPostFactory {
  /**
   * Create a GeneratedPost entity from raw data with validation
   */
  static create(data: RawGeneratedPostData): GeneratedPost {
    GeneratedPostFactory.validate(data)

    return {
      id: data.id,
      userId: data.userId,
      inputIdea: data.inputIdea.trim(),
      tone: data.tone as PostTone,
      region: data.region as PostRegion,
      variants: data.variants.map((v) => v.trim()) as [string, string, string],
      createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
    }
  }

  /**
   * Validate generated post data according to domain rules
   */
  static validate(data: Partial<RawGeneratedPostData>): void {
    if (!data.id || typeof data.id !== 'string') {
      throw new GeneratedPostValidationError('Post ID is required')
    }

    if (!data.userId || typeof data.userId !== 'string') {
      throw new GeneratedPostValidationError('User ID is required')
    }

    if (!data.inputIdea || typeof data.inputIdea !== 'string') {
      throw new GeneratedPostValidationError('Input idea is required')
    }

    if (data.inputIdea.trim().length < 10) {
      throw new GeneratedPostValidationError('Input idea must be at least 10 characters')
    }

    if (data.inputIdea.trim().length > 500) {
      throw new GeneratedPostValidationError('Input idea must not exceed 500 characters')
    }

    if (!data.tone || !VALID_TONES.includes(data.tone as PostTone)) {
      throw new GeneratedPostValidationError(
        `Invalid tone. Must be one of: ${VALID_TONES.join(', ')}`
      )
    }

    if (!data.region || !VALID_REGIONS.includes(data.region as PostRegion)) {
      throw new GeneratedPostValidationError(
        `Invalid region. Must be one of: ${VALID_REGIONS.join(', ')}`
      )
    }

    if (!data.variants || !Array.isArray(data.variants) || data.variants.length !== 3) {
      throw new GeneratedPostValidationError('Exactly 3 variants are required')
    }

    for (let i = 0; i < data.variants.length; i++) {
      if (typeof data.variants[i] !== 'string' || data.variants[i].trim().length === 0) {
        throw new GeneratedPostValidationError(`Variant ${i + 1} must be a non-empty string`)
      }
    }
  }

  /**
   * Validate data for creating a new generated post
   */
  static validateCreateData(data: CreateGeneratedPostData): void {
    if (!data.userId || typeof data.userId !== 'string') {
      throw new GeneratedPostValidationError('User ID is required')
    }

    if (!data.inputIdea || typeof data.inputIdea !== 'string') {
      throw new GeneratedPostValidationError('Input idea is required')
    }

    if (data.inputIdea.trim().length < 10) {
      throw new GeneratedPostValidationError('Input idea must be at least 10 characters')
    }

    if (data.inputIdea.trim().length > 500) {
      throw new GeneratedPostValidationError('Input idea must not exceed 500 characters')
    }

    if (!VALID_TONES.includes(data.tone)) {
      throw new GeneratedPostValidationError(
        `Invalid tone. Must be one of: ${VALID_TONES.join(', ')}`
      )
    }

    if (!VALID_REGIONS.includes(data.region)) {
      throw new GeneratedPostValidationError(
        `Invalid region. Must be one of: ${VALID_REGIONS.join(', ')}`
      )
    }

    if (!data.variants || data.variants.length !== 3) {
      throw new GeneratedPostValidationError('Exactly 3 variants are required')
    }

    for (let i = 0; i < data.variants.length; i++) {
      if (typeof data.variants[i] !== 'string' || data.variants[i].trim().length === 0) {
        throw new GeneratedPostValidationError(`Variant ${i + 1} must be a non-empty string`)
      }
    }
  }
}
