import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Container } from '../container'
import {
  generatePostUseCase,
  GeneratePostError,
  GeneratePostErrorCodes,
} from './generate-post'
import {
  MockUserRepository,
  MockSubscriptionRepository,
  MockGeneratedPostRepository,
} from '@/tests/mocks/repositories'
import type { User } from '@/domain/entities/user'
import type { Subscription } from '@/domain/entities/subscription'

// Mock the Claude API
vi.mock('@/infrastructure/claude', () => ({
  generatePost: vi.fn(),
  isClaudeApiError: (error: unknown) => {
    return (
      error !== null &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error
    )
  },
}))

import { generatePost as mockClaudeApi } from '@/infrastructure/claude'

describe('generatePostUseCase', () => {
  let mockUserRepo: MockUserRepository
  let mockSubscriptionRepo: MockSubscriptionRepository
  let mockPostRepo: MockGeneratedPostRepository
  let testUser: User
  let testSubscription: Subscription

  const validInput = {
    externalUserId: 'clerk_123',
    idea: 'Una idea para un post sobre productividad en el trabajo remoto',
    tone: 'professional' as const,
    region: 'spain' as const,
  }

  const mockVariants: [string, string, string] = [
    'Post variant 1 about remote work productivity...',
    'Post variant 2 about remote work productivity...',
    'Post variant 3 about remote work productivity...',
  ]

  beforeEach(async () => {
    mockUserRepo = new MockUserRepository()
    mockSubscriptionRepo = new MockSubscriptionRepository()
    mockPostRepo = new MockGeneratedPostRepository()

    Container.setUserRepository(mockUserRepo)
    Container.setSubscriptionRepository(mockSubscriptionRepo)
    Container.setGeneratedPostRepository(mockPostRepo)

    // Create test user with verified email
    testUser = await mockUserRepo.create({
      externalId: 'clerk_123',
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: true,
    })

    // Create subscription with posts remaining
    testSubscription = await mockSubscriptionRepo.create({
      userId: testUser.id,
      plan: 'free',
    })

    // Mock Claude API to return variants
    vi.mocked(mockClaudeApi).mockResolvedValue({ variants: mockVariants })
  })

  afterEach(() => {
    Container.reset()
    mockUserRepo.clear()
    mockSubscriptionRepo.clear()
    mockPostRepo.clear()
    vi.clearAllMocks()
  })

  describe('successful generation', () => {
    it('generates post and returns variants', async () => {
      const result = await generatePostUseCase(validInput)

      expect(result.post.variants).toEqual(mockVariants)
      expect(result.post.inputIdea).toBe(validInput.idea)
      expect(result.post.tone).toBe(validInput.tone)
      expect(result.post.region).toBe(validInput.region)
    })

    it('saves generated post to database', async () => {
      await generatePostUseCase(validInput)

      const savedPosts = await mockPostRepo.findByUserId(testUser.id)
      expect(savedPosts).toHaveLength(1)
      expect(savedPosts[0].variants).toEqual(mockVariants)
    })

    it('decrements posts remaining', async () => {
      const initialRemaining = testSubscription.postsRemaining

      const result = await generatePostUseCase(validInput)

      expect(result.postsRemaining).toBe(initialRemaining - 1)

      const updatedSub = await mockSubscriptionRepo.findByUserId(testUser.id)
      expect(updatedSub?.postsRemaining).toBe(initialRemaining - 1)
    })

    it('calls Claude API with correct parameters', async () => {
      await generatePostUseCase(validInput)

      expect(mockClaudeApi).toHaveBeenCalledWith({
        idea: validInput.idea,
        tone: validInput.tone,
        region: validInput.region,
      })
    })
  })

  describe('user validation errors', () => {
    it('throws USER_NOT_FOUND when user does not exist', async () => {
      const input = { ...validInput, externalUserId: 'nonexistent' }

      await expect(generatePostUseCase(input)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(input)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.USER_NOT_FOUND,
      })
    })

    it('throws EMAIL_NOT_VERIFIED when email is not verified', async () => {
      // Update user to have unverified email
      await mockUserRepo.update(testUser.id, { emailVerified: false })

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.EMAIL_NOT_VERIFIED,
      })
    })
  })

  describe('subscription validation errors', () => {
    it('throws SUBSCRIPTION_NOT_FOUND when subscription does not exist', async () => {
      // Delete subscription
      await mockSubscriptionRepo.delete(testSubscription.id)

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.SUBSCRIPTION_NOT_FOUND,
      })
    })

    it('throws NO_POSTS_REMAINING when user has no posts left', async () => {
      // Set posts remaining to 0
      await mockSubscriptionRepo.update(testSubscription.id, { postsRemaining: 0 })

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.NO_POSTS_REMAINING,
      })
    })
  })

  describe('Claude API errors', () => {
    it('throws CLAUDE_RATE_LIMIT on rate limit error', async () => {
      vi.mocked(mockClaudeApi).mockRejectedValue({
        code: 'RATE_LIMIT',
        message: 'Rate limit exceeded',
      })

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.CLAUDE_RATE_LIMIT,
      })
    })

    it('throws CLAUDE_TIMEOUT on timeout error', async () => {
      vi.mocked(mockClaudeApi).mockRejectedValue({
        code: 'TIMEOUT',
        message: 'Request timeout',
      })

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.CLAUDE_TIMEOUT,
      })
    })

    it('throws CLAUDE_ERROR on other API errors', async () => {
      vi.mocked(mockClaudeApi).mockRejectedValue({
        code: 'API_ERROR',
        message: 'API error',
      })

      await expect(generatePostUseCase(validInput)).rejects.toThrow(GeneratePostError)
      await expect(generatePostUseCase(validInput)).rejects.toMatchObject({
        code: GeneratePostErrorCodes.CLAUDE_ERROR,
      })
    })

    it('does not decrement posts on Claude API failure', async () => {
      vi.mocked(mockClaudeApi).mockRejectedValue({
        code: 'API_ERROR',
        message: 'API error',
      })

      const initialRemaining = testSubscription.postsRemaining

      try {
        await generatePostUseCase(validInput)
      } catch {
        // Expected to throw
      }

      const subscription = await mockSubscriptionRepo.findByUserId(testUser.id)
      expect(subscription?.postsRemaining).toBe(initialRemaining)
    })

    it('does not save post on Claude API failure', async () => {
      vi.mocked(mockClaudeApi).mockRejectedValue({
        code: 'API_ERROR',
        message: 'API error',
      })

      try {
        await generatePostUseCase(validInput)
      } catch {
        // Expected to throw
      }

      const posts = await mockPostRepo.findByUserId(testUser.id)
      expect(posts).toHaveLength(0)
    })
  })

  describe('different tones and regions', () => {
    it('generates post with friendly tone', async () => {
      const input = { ...validInput, tone: 'friendly' as const }

      const result = await generatePostUseCase(input)

      expect(result.post.tone).toBe('friendly')
      expect(mockClaudeApi).toHaveBeenCalledWith(
        expect.objectContaining({ tone: 'friendly' })
      )
    })

    it('generates post with inspirational tone', async () => {
      const input = { ...validInput, tone: 'inspirational' as const }

      const result = await generatePostUseCase(input)

      expect(result.post.tone).toBe('inspirational')
    })

    it('generates post for LATAM region', async () => {
      const input = { ...validInput, region: 'latam' as const }

      const result = await generatePostUseCase(input)

      expect(result.post.region).toBe('latam')
      expect(mockClaudeApi).toHaveBeenCalledWith(
        expect.objectContaining({ region: 'latam' })
      )
    })
  })
})
