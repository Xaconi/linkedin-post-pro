/**
 * Use Case: Get Post History
 *
 * Retrieves paginated post history for an authenticated user.
 * 1. Validate user exists
 * 2. Fetch paginated posts from repository
 */

import { Container } from '../container'
import { userService } from '../services/user-service'
import type { GeneratedPost } from '@/domain/entities/generated-post'

export interface GetPostHistoryInput {
  externalUserId: string
  page: number
  limit: number
}

export interface GetPostHistoryResult {
  posts: GeneratedPost[]
  hasMore: boolean
  page: number
}

export const GetPostHistoryErrorCodes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
} as const

export type GetPostHistoryErrorCode =
  (typeof GetPostHistoryErrorCodes)[keyof typeof GetPostHistoryErrorCodes]

export class GetPostHistoryError extends Error {
  constructor(
    public readonly code: GetPostHistoryErrorCode,
    message: string
  ) {
    super(message)
    this.name = 'GetPostHistoryError'
  }
}

export async function getPostHistoryUseCase(
  input: GetPostHistoryInput
): Promise<GetPostHistoryResult> {
  // 1. Get user from database
  const user = await userService.getByExternalId(input.externalUserId)

  if (!user) {
    throw new GetPostHistoryError(
      GetPostHistoryErrorCodes.USER_NOT_FOUND,
      'Usuario no encontrado en el sistema'
    )
  }

  // 2. Fetch paginated posts
  const postRepo = Container.getGeneratedPostRepository()
  const result = await postRepo.findByUserIdPaginated(user.id, input.page, input.limit)

  return {
    posts: result.data,
    hasMore: result.hasMore,
    page: input.page,
  }
}
