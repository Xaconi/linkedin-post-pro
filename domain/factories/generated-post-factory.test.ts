import { describe, it, expect } from 'vitest'
import { GeneratedPostFactory, GeneratedPostValidationError } from './generated-post-factory'
import type { RawGeneratedPostData } from './generated-post-factory'
import { CreateGeneratedPostData, PostRegions, PostTones } from '../entities/generated-post'

const TEST_FIXTURES = {
  validRawData: {
    id: 'post-123',
    userId: 'user-456',
    inputIdea: 'Cómo la IA está transformando el trabajo remoto',
    tone: PostTones.PROFESSIONAL,
    region: PostRegions.SPAIN,
    variants: [
      'Post variante 1 con contenido completo',
      'Post variante 2 con contenido diferente',
      'Post variante 3 con otro enfoque',
    ] as [string, string, string],
    createdAt: '2024-01-15T10:00:00Z',
  } as RawGeneratedPostData,
  validCreateData: {
    userId: 'user-456',
    inputIdea: 'Cómo la IA está transformando el trabajo remoto',
    tone: PostTones.PROFESSIONAL,
    region: PostRegions.SPAIN,
    variants: [
      'Post variante 1',
      'Post variante 2',
      'Post variante 3',
    ],
  } as CreateGeneratedPostData,
  tones: [PostTones.PROFESSIONAL, PostTones.FRIENDLY, PostTones.INSPIRATIONAL] as const,
  regions: [PostRegions.SPAIN, PostRegions.LATAM] as const,
  minIdeaLength: 10,
  maxIdeaLength: 500,
}

describe('GeneratedPostFactory', () => {
  describe('create', () => {
    it('creates a valid GeneratedPost entity', () => {
      const post = GeneratedPostFactory.create(TEST_FIXTURES.validRawData)

      expect(post.id).toBe(TEST_FIXTURES.validRawData.id)
      expect(post.userId).toBe(TEST_FIXTURES.validRawData.userId)
      expect(post.inputIdea).toBe(TEST_FIXTURES.validRawData.inputIdea)
      expect(post.tone).toBe(TEST_FIXTURES.validRawData.tone)
      expect(post.region).toBe(TEST_FIXTURES.validRawData.region)
      expect(post.variants).toEqual(TEST_FIXTURES.validRawData.variants)
      expect(post.createdAt).toBeInstanceOf(Date)
    })

    it('trims whitespace from inputIdea and variants', () => {
      const data: RawGeneratedPostData = {
        ...TEST_FIXTURES.validRawData,
        inputIdea: '  Idea con espacios  ',
        variants: ['  Variant 1  ', '  Variant 2  ', '  Variant 3  '],
      }

      const post = GeneratedPostFactory.create(data)

      expect(post.inputIdea).toBe('Idea con espacios')
      expect(post.variants[0]).toBe('Variant 1')
      expect(post.variants[1]).toBe('Variant 2')
      expect(post.variants[2]).toBe('Variant 3')
    })

    it('converts string date to Date object', () => {
      const post = GeneratedPostFactory.create(TEST_FIXTURES.validRawData)

      expect(post.createdAt).toBeInstanceOf(Date)
      expect(post.createdAt.toISOString()).toBe('2024-01-15T10:00:00.000Z')
    })

    it('accepts Date object for createdAt', () => {
      const date = new Date('2024-01-15T10:00:00Z')
      const data: RawGeneratedPostData = {
        ...TEST_FIXTURES.validRawData,
        createdAt: date,
      }

      const post = GeneratedPostFactory.create(data)

      expect(post.createdAt).toBe(date)
    })

    it('accepts all valid tones', () => {
      TEST_FIXTURES.tones.forEach((tone) => {
        const data: RawGeneratedPostData = {
          ...TEST_FIXTURES.validRawData,
          tone,
        }

        const post = GeneratedPostFactory.create(data)
        expect(post.tone).toBe(tone)
      })
    })

    it('accepts all valid regions', () => {
      TEST_FIXTURES.regions.forEach((region) => {
        const data: RawGeneratedPostData = {
          ...TEST_FIXTURES.validRawData,
          region,
        }

        const post = GeneratedPostFactory.create(data)
        expect(post.region).toBe(region)
      })
    })
  })

  describe('validate', () => {
    it('throws error when id is missing', () => {
      const data = { ...TEST_FIXTURES.validRawData, id: '' }

      expect(() => GeneratedPostFactory.validate(data)).toThrow(
        GeneratedPostValidationError
      )
      expect(() => GeneratedPostFactory.validate(data)).toThrow('Post ID is required')
    })

    it('throws error when userId is missing', () => {
      const data = { ...TEST_FIXTURES.validRawData, userId: '' }

      expect(() => GeneratedPostFactory.validate(data)).toThrow('User ID is required')
    })

    it('throws error when inputIdea is missing', () => {
      const data = { ...TEST_FIXTURES.validRawData, inputIdea: '' }

      expect(() => GeneratedPostFactory.validate(data)).toThrow('Input idea is required')
    })

    it('throws error when inputIdea is too short', () => {
      const data = {
        ...TEST_FIXTURES.validRawData,
        inputIdea: 'Short',
      }

      expect(() => GeneratedPostFactory.validate(data)).toThrow(
        `Input idea must be at least ${TEST_FIXTURES.minIdeaLength} characters`
      )
    })

    it('throws error when inputIdea is too long', () => {
      const data = {
        ...TEST_FIXTURES.validRawData,
        inputIdea: 'a'.repeat(TEST_FIXTURES.maxIdeaLength + 1),
      }

      expect(() => GeneratedPostFactory.validate(data)).toThrow(
        `Input idea must not exceed ${TEST_FIXTURES.maxIdeaLength} characters`
      )
    })

    it('throws error for invalid tone', () => {
      const data = { ...TEST_FIXTURES.validRawData, tone: 'invalid' }

      expect(() => GeneratedPostFactory.validate(data)).toThrow('Invalid tone')
    })

    it('throws error for invalid region', () => {
      const data = { ...TEST_FIXTURES.validRawData, region: 'invalid' }

      expect(() => GeneratedPostFactory.validate(data)).toThrow('Invalid region')
    })

    it('throws error when variants is not an array', () => {
      const data = { ...TEST_FIXTURES.validRawData, variants: undefined }

      expect(() => GeneratedPostFactory.validate(data as unknown as RawGeneratedPostData)).toThrow(
        'Exactly 3 variants are required'
      )
    })

    it('throws error when variants count is not 3', () => {
      const data = {
        ...TEST_FIXTURES.validRawData,
        variants: ['one', 'two'] as unknown as [string, string, string],
      }

      expect(() => GeneratedPostFactory.validate(data)).toThrow(
        'Exactly 3 variants are required'
      )
    })

    it('throws error when a variant is empty', () => {
      const data = {
        ...TEST_FIXTURES.validRawData,
        variants: ['Valid', '', 'Also valid'] as [string, string, string],
      }

      expect(() => GeneratedPostFactory.validate(data)).toThrow(
        'Variant 2 must be a non-empty string'
      )
    })
  })

  describe('validateCreateData', () => {
    it('validates correct create data without throwing', () => {
      expect(() =>
        GeneratedPostFactory.validateCreateData(TEST_FIXTURES.validCreateData)
      ).not.toThrow()
    })

    it('throws error when userId is missing', () => {
      const data = { ...TEST_FIXTURES.validCreateData, userId: '' }

      expect(() => GeneratedPostFactory.validateCreateData(data)).toThrow(
        'User ID is required'
      )
    })

    it('throws error for invalid tone in create data', () => {
      const data = {
        ...TEST_FIXTURES.validCreateData,
        tone: 'invalid' as PostTones.PROFESSIONAL,
      }

      expect(() => GeneratedPostFactory.validateCreateData(data)).toThrow('Invalid tone')
    })

    it('throws error for invalid region in create data', () => {
      const data = {
        ...TEST_FIXTURES.validCreateData,
        region: 'invalid' as PostRegions.SPAIN,
      }

      expect(() => GeneratedPostFactory.validateCreateData(data)).toThrow('Invalid region')
    })
  })
})
