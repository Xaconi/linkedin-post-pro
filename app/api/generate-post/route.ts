/**
 * POST /api/generate-post
 * Generate LinkedIn post variants using Claude AI
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { z } from 'zod'

import { Container } from '@/application/container'
import { generatePost, isClaudeApiError } from '@/infrastructure/claude'
import type { PostTone, PostRegion } from '@/domain'
import { PostTones, PostRegions } from '@/domain/entities/generated-post'

/**
 * Input validation schema
 */
const generatePostSchema = z.object({
  idea: z
    .string()
    .min(10, 'La idea debe tener al menos 10 caracteres')
    .max(500, 'La idea no puede superar 500 caracteres'),
  tone: z.enum([PostTones.PROFESSIONAL, PostTones.FRIENDLY, PostTones.INSPIRATIONAL], {
    error: 'Tono no válido'
  }),
  region: z.enum([PostRegions.SPAIN, PostRegions.LATAM], {
    error: 'Región no válida',
  }),
})

type GeneratePostInput = z.infer<typeof generatePostSchema>

/**
 * Error response helper
 */
function errorResponse(
  message: string,
  status: number,
  code?: string
): NextResponse {
  return NextResponse.json({ error: message, code }, { status })
}

/**
 * POST handler
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Authenticate user
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return errorResponse('No autenticado', 401, 'UNAUTHORIZED')
    }

    // 2. Get user from Clerk
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return errorResponse('Usuario no encontrado', 401, 'UNAUTHORIZED')
    }

    // 3. Get user from our database
    const userRepo = Container.getUserRepository()
    const user = await userRepo.findByExternalId(clerkUserId)

    if (!user) {
      return errorResponse('Usuario no encontrado en el sistema', 404, 'USER_NOT_FOUND')
    }

    // 4. Check email verified
    if (!user.emailVerified) {
      return errorResponse(
        'Debes verificar tu email antes de generar posts',
        403,
        'EMAIL_NOT_VERIFIED'
      )
    }

    // 5. Parse and validate input
    let input: GeneratePostInput

    try {
      const body = await request.json()
      input = generatePostSchema.parse(body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error
        return errorResponse(firstError.message, 400, 'VALIDATION_ERROR')
      }
      return errorResponse('Cuerpo de la petición inválido', 400, 'INVALID_BODY')
    }

    // 6. Check posts remaining
    const subscriptionRepo = Container.getSubscriptionRepository()
    const subscription = await subscriptionRepo.findByUserId(user.id)

    if (!subscription) {
      return errorResponse('Suscripción no encontrada', 404, 'SUBSCRIPTION_NOT_FOUND')
    }

    if (subscription.postsRemaining <= 0) {
      return errorResponse(
        'Has agotado tus posts de este mes. Actualiza a Pro para obtener más.',
        403,
        'NO_POSTS_REMAINING'
      )
    }

    // 7. Generate posts with Claude
    let variants: [string, string, string]

    try {
      const result = await generatePost({
        idea: input.idea,
        tone: input.tone as PostTones,
        region: input.region as PostRegions,
      })
      variants = result.variants
    } catch (error) {
      if (isClaudeApiError(error)) {
        if (error.code === 'RATE_LIMIT') {
          return errorResponse(error.message, 429, 'RATE_LIMIT')
        }
        if (error.code === 'TIMEOUT') {
          return errorResponse(error.message, 504, 'TIMEOUT')
        }
        return errorResponse(error.message, 500, error.code)
      }
      throw error
    }

    // 8. Save to database
    const postRepo = Container.getGeneratedPostRepository()
    await postRepo.create({
      userId: user.id,
      inputIdea: input.idea,
      tone: input.tone as PostTone,
      region: input.region as PostRegion,
      variants,
    })

    // 9. Decrement posts remaining
    await subscriptionRepo.decrementPostsRemaining(user.id)

    // 10. Return variants
    return NextResponse.json({
      variants,
      postsRemaining: subscription.postsRemaining - 1,
    })
  } catch (error) {
    console.error('Error generating post:', error)
    return errorResponse(
      'Error interno del servidor',
      500,
      'INTERNAL_ERROR'
    )
  }
}
