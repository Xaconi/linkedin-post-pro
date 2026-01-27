/**
 * Use Case: Generate LinkedIn Post
 *
 * Orchestrates the post generation flow:
 * 1. Validate user can generate (email verified, posts remaining)
 * 2. Call Claude API to generate variants
 * 3. Save generated post to database
 * 4. Decrement user's posts remaining
 */

import { Container } from '../container'
import { userService } from '../services/user-service'
import { subscriptionService } from '../services/subscription-service'
import { generatePost as callClaudeApi, isClaudeApiError } from '@/infrastructure/claude'
import { GeneratedPostFactory } from '@/domain/factories/generated-post-factory'
import type { PostTone, PostRegion, GeneratedPost, CreateGeneratedPostData } from '@/domain/entities/generated-post'

/**
 * Input parameters for generating a post
 */
export interface GeneratePostInput {
  externalUserId: string
  idea: string
  tone: PostTone
  region: PostRegion
}

/**
 * Successful result from post generation
 */
export interface GeneratePostResult {
  post: GeneratedPost
  postsRemaining: number
}

/**
 * Error codes for post generation failures
 */
export const GeneratePostErrorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  SUBSCRIPTION_NOT_FOUND: 'SUBSCRIPTION_NOT_FOUND',
  NO_POSTS_REMAINING: 'NO_POSTS_REMAINING',
  CLAUDE_RATE_LIMIT: 'CLAUDE_RATE_LIMIT',
  CLAUDE_TIMEOUT: 'CLAUDE_TIMEOUT',
  CLAUDE_ERROR: 'CLAUDE_ERROR',
  SAVE_FAILED: 'SAVE_FAILED',
} as const

export type GeneratePostErrorCode =
  (typeof GeneratePostErrorCodes)[keyof typeof GeneratePostErrorCodes]

/**
 * Custom error for post generation failures
 */
export class GeneratePostError extends Error {
  constructor(
    public readonly code: GeneratePostErrorCode,
    message: string
  ) {
    super(message)
    this.name = 'GeneratePostError'
  }
}

/**
 * Generate a LinkedIn post with 3 variants
 *
 * @throws {GeneratePostError} When validation fails or generation errors occur
 */
export async function generatePostUseCase(
  input: GeneratePostInput
): Promise<GeneratePostResult> {
  // 1. Get user from database
  const user = await userService.getByExternalId(input.externalUserId)

  if (!user) {
    throw new GeneratePostError(
      GeneratePostErrorCodes.USER_NOT_FOUND,
      'Usuario no encontrado en el sistema'
    )
  }

  // 2. Validate email is verified
  if (!user.emailVerified) {
    throw new GeneratePostError(
      GeneratePostErrorCodes.EMAIL_NOT_VERIFIED,
      'Debes verificar tu email antes de generar posts'
    )
  }

  // 3. Get subscription
  const subscription = await subscriptionService.getByUserId(user.id)

  if (!subscription) {
    throw new GeneratePostError(
      GeneratePostErrorCodes.SUBSCRIPTION_NOT_FOUND,
      'Suscripción no encontrada'
    )
  }

  // 4. Validate posts remaining
  if (subscription.postsRemaining <= 0) {
    throw new GeneratePostError(
      GeneratePostErrorCodes.NO_POSTS_REMAINING,
      'Has agotado tus posts de este mes. Actualiza a Pro para obtener más.'
    )
  }

  // 5. Call Claude API to generate variants
  let variants: [string, string, string]

  try {
    const result = await callClaudeApi({
      idea: input.idea,
      tone: input.tone,
      region: input.region,
    })
    variants = result.variants
  } catch (error) {
    if (isClaudeApiError(error)) {
      if (error.code === 'RATE_LIMIT') {
        throw new GeneratePostError(
          GeneratePostErrorCodes.CLAUDE_RATE_LIMIT,
          error.message
        )
      }
      if (error.code === 'TIMEOUT') {
        throw new GeneratePostError(
          GeneratePostErrorCodes.CLAUDE_TIMEOUT,
          error.message
        )
      }
      throw new GeneratePostError(
        GeneratePostErrorCodes.CLAUDE_ERROR,
        error.message
      )
    }
    throw error
  }

  // 6. Prepare data for creation and validate via factory
  const createData: CreateGeneratedPostData = {
    userId: user.id,
    inputIdea: input.idea,
    tone: input.tone,
    region: input.region,
    variants,
  }

  // Validate domain rules before persisting
  GeneratedPostFactory.validateCreateData(createData)

  // 7. Save to database (repository handles ID generation)
  const postRepo = Container.getGeneratedPostRepository()
  const savedPost = await postRepo.create(createData)

  // 8. Decrement posts remaining
  await subscriptionService.consumePost(user.id)

  // 9. Return result
  return {
    post: savedPost,
    postsRemaining: subscription.postsRemaining - 1,
  }
}
