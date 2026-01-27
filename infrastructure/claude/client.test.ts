import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generatePost, isClaudeApiError } from './client'
import type { GeneratePostParams, ClaudeApiError } from './types'
import { PostRegions, PostTones } from '@/domain'

const mockCreate = vi.fn()

// Define mock error creator function for use in tests
function createMockAPIError(
  status: number,
  message: string
): Error & { status: number } {
  const error = new Error(message) as Error & { status: number }
  error.status = status
  error.name = 'APIError'
  return error
}

vi.mock('@anthropic-ai/sdk', () => {
  // Mock APIError class must be defined inside the factory
  class MockAPIError extends Error {
    status: number
    constructor(
      status: number,
      _error: unknown,
      message: string,
      _headers: Record<string, unknown>
    ) {
      super(message)
      this.status = status
      this.name = 'APIError'
    }
  }

  // Create a mock class that can be instantiated with 'new'
  const MockAnthropic = class {
    messages = {
      create: mockCreate,
    }
    constructor(_options: { apiKey: string; timeout: number }) {
      // Constructor receives options but we don't need to use them in tests
    }
    // Static APIError property
    static APIError = MockAPIError
  }

  return {
    default: MockAnthropic,
  }
})

const TEST_FIXTURES = {
  params: {
    idea: 'Cómo la inteligencia artificial está transformando el trabajo remoto',
    tone: PostTones.PROFESSIONAL,
    region: PostRegions.SPAIN,
  } as GeneratePostParams,
  validResponse: {
    variants: [
      'Post 1: La IA está revolucionando el trabajo remoto...',
      'Post 2: En los últimos años, hemos visto...',
      'Post 3: El futuro del trabajo es híbrido...',
    ],
  },
  envKey: 'test-api-key',
}

describe('Claude Client', () => {
  beforeEach(() => {
    vi.stubEnv('ANTHROPIC_API_KEY', TEST_FIXTURES.envKey)
    mockCreate.mockReset()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('generatePost', () => {
    it('returns parsed variants on successful response', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(TEST_FIXTURES.validResponse),
          },
        ],
      })

      const result = await generatePost(TEST_FIXTURES.params)

      expect(result.variants).toHaveLength(3)
      expect(result.variants[0]).toBe(TEST_FIXTURES.validResponse.variants[0])
      expect(result.variants[1]).toBe(TEST_FIXTURES.validResponse.variants[1])
      expect(result.variants[2]).toBe(TEST_FIXTURES.validResponse.variants[2])
    })

    it('calls Anthropic API with correct parameters', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [{ type: 'text', text: JSON.stringify(TEST_FIXTURES.validResponse) }],
      })

      await generatePost(TEST_FIXTURES.params)

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: expect.stringContaining('claude'),
          max_tokens: expect.any(Number),
          system: expect.stringContaining('LinkedIn'),
          messages: expect.arrayContaining([
            expect.objectContaining({ role: 'user' }),
          ]),
        })
      )
    })

    it('throws INVALID_RESPONSE error for invalid JSON', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [{ type: 'text', text: 'not valid json' }],
      })

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'INVALID_RESPONSE',
      })
    })

    it('throws INVALID_RESPONSE error when variants array is wrong size', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [{ type: 'text', text: JSON.stringify({ variants: ['only one'] }) }],
      })

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'INVALID_RESPONSE',
      })
    })

    it('throws INVALID_RESPONSE error when variant is empty string', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          { type: 'text', text: JSON.stringify({ variants: ['post 1', '', 'post 3'] }) },
        ],
      })

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'INVALID_RESPONSE',
      })
    })

    it('throws INVALID_RESPONSE error when no text content in response', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [{ type: 'tool_use', id: 'test' }],
      })

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'INVALID_RESPONSE',
      })
    })

    it('throws RATE_LIMIT error on 429 response', async () => {
      const rateLimitError = createMockAPIError(429, 'Rate limited')
      mockCreate.mockRejectedValueOnce(rateLimitError)

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'RATE_LIMIT',
      })
    })

    it('throws TIMEOUT error on 408 response', async () => {
      const timeoutError = createMockAPIError(408, 'Timeout')
      mockCreate.mockRejectedValueOnce(timeoutError)

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'TIMEOUT',
      })
    })

    it('throws API_ERROR on other API errors', async () => {
      const apiError = createMockAPIError(500, 'Server error')
      mockCreate.mockRejectedValueOnce(apiError)

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'API_ERROR',
      })
    })

    it('throws UNKNOWN error on unexpected errors', async () => {
      mockCreate.mockRejectedValueOnce(new Error('Network failure'))

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toMatchObject({
        code: 'UNKNOWN',
      })
    })

    it('throws error when ANTHROPIC_API_KEY is missing', async () => {
      vi.stubEnv('ANTHROPIC_API_KEY', '')

      await expect(generatePost(TEST_FIXTURES.params)).rejects.toThrow(
        'Missing ANTHROPIC_API_KEY'
      )
    })

    it('trims whitespace from variants', async () => {
      mockCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              variants: ['  Post 1  ', '\nPost 2\n', '  Post 3  '],
            }),
          },
        ],
      })

      const result = await generatePost(TEST_FIXTURES.params)

      expect(result.variants[0]).toBe('Post 1')
      expect(result.variants[1]).toBe('Post 2')
      expect(result.variants[2]).toBe('Post 3')
    })
  })

  describe('isClaudeApiError', () => {
    it('returns true for ClaudeApiError objects', () => {
      const error: ClaudeApiError = {
        code: 'API_ERROR',
        message: 'Test error',
      }

      expect(isClaudeApiError(error)).toBe(true)
    })

    it('returns false for regular Error objects', () => {
      expect(isClaudeApiError(new Error('test'))).toBe(false)
    })

    it('returns false for null', () => {
      expect(isClaudeApiError(null)).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isClaudeApiError(undefined)).toBe(false)
    })

    it('returns false for plain objects without code', () => {
      expect(isClaudeApiError({ message: 'test' })).toBe(false)
    })
  })
})
