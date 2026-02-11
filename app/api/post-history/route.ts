/**
 * GET /api/post-history
 *
 * Returns paginated post history for the authenticated user.
 * Query params: ?page=1&limit=10
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import {
  getPostHistoryUseCase,
  GetPostHistoryError,
  GetPostHistoryErrorCodes,
} from '@/application/use-cases'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

function errorResponse(message: string, status: number, code?: string): NextResponse {
  return NextResponse.json({ error: message, code }, { status })
}

const errorCodeToStatus: Record<string, number> = {
  [GetPostHistoryErrorCodes.USER_NOT_FOUND]: 404,
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return errorResponse('No autenticado', 401, 'UNAUTHORIZED')
    }

    // Parse pagination params
    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get('page') ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE)
    const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT))

    // Execute use case
    const result = await getPostHistoryUseCase({
      externalUserId: clerkUserId,
      page,
      limit,
    })

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof GetPostHistoryError) {
      const status = errorCodeToStatus[error.code] ?? 500
      return errorResponse(error.message, status, error.code)
    }

    console.error('Error fetching post history:', error)
    return errorResponse('Error interno del servidor', 500, 'INTERNAL_ERROR')
  }
}
