/**
 * POST /api/generate-post
 *
 * API endpoint for generating LinkedIn post variants.
 * Handles authentication and input validation, delegates business logic to use case.
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

import {
  generatePostUseCase,
  GeneratePostError,
  GeneratePostErrorCodes,
} from '@/application/use-cases'
import { PostTones, PostRegions, IdeaConstraints } from '@/domain/entities/generated-post'
import type { PostTone, PostRegion } from '@/domain/entities/generated-post'
import { rateLimit } from '@/lib/ratelimit'

/**
 * Input validation schema
 */
const generatePostSchema = z.object({
  idea: z
    .string()
    .min(IdeaConstraints.MIN_LENGTH, `La idea debe tener al menos ${IdeaConstraints.MIN_LENGTH} caracteres`)
    .max(IdeaConstraints.MAX_LENGTH, `La idea no puede superar ${IdeaConstraints.MAX_LENGTH} caracteres`),
  tone: z.enum([PostTones.PROFESSIONAL, PostTones.FRIENDLY, PostTones.INSPIRATIONAL], {
    error: 'Tono no válido',
  }),
  region: z.enum([PostRegions.SPAIN, PostRegions.LATAM], {
    error: 'Región no válida',
  }),
})

type GeneratePostInput = z.infer<typeof generatePostSchema>

/**
 * Map use case error codes to HTTP status codes
 */
const errorCodeToStatus: Record<string, number> = {
  [GeneratePostErrorCodes.USER_NOT_FOUND]: 404,
  [GeneratePostErrorCodes.EMAIL_NOT_VERIFIED]: 403,
  [GeneratePostErrorCodes.SUBSCRIPTION_NOT_FOUND]: 404,
  [GeneratePostErrorCodes.NO_POSTS_REMAINING]: 403,
  [GeneratePostErrorCodes.CLAUDE_RATE_LIMIT]: 429,
  [GeneratePostErrorCodes.CLAUDE_TIMEOUT]: 504,
  [GeneratePostErrorCodes.CLAUDE_ERROR]: 502,
  [GeneratePostErrorCodes.SAVE_FAILED]: 500,
}

/**
 * Error response helper
 */
function errorResponse(message: string, status: number, code?: string): NextResponse {
  return NextResponse.json({ error: message, code }, { status })
}

/**
 * POST handler
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Authenticate user (infrastructure concern - Clerk specific)
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return errorResponse('No autenticado', 401, 'UNAUTHORIZED')
    }

    const rateLimitResult = rateLimit(clerkUserId)

    if (!rateLimitResult.allowed) {
      return errorResponse(
        `Espera ${rateLimitResult.remainingSeconds} segundos antes de generar otro post`,
        429,
        'RATE_LIMITED'
      )
    }

    // 3. Parse and validate input (infrastructure concern - HTTP specific)
    let input: GeneratePostInput

    try {
      const body = await request.json()
      input = generatePostSchema.parse(body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstIssue = error.issues[0]
        return errorResponse(firstIssue.message, 400, 'VALIDATION_ERROR')
      }
      return errorResponse('Cuerpo de la petición inválido', 400, 'INVALID_BODY')
    }

    // 4. Execute use case (business logic)
    const result = await generatePostUseCase({
      externalUserId: clerkUserId,
      idea: input.idea,
      tone: input.tone as PostTone,
      region: input.region as PostRegion,
    })

    // 5. Return success response
    return NextResponse.json({
      variants: result.post.variants,
      postsRemaining: result.postsRemaining,
    })
  } catch (error) {
    // Handle use case errors
    if (error instanceof GeneratePostError) {
      const status = errorCodeToStatus[error.code] ?? 500
      return errorResponse(error.message, status, error.code)
    }

    // Handle unexpected errors
    console.error('Error generating post:', error)
    return errorResponse('Error interno del servidor', 500, 'INTERNAL_ERROR')
  }
}
