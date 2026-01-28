/**
 * POST /api/waitlist
 *
 * Adds an email to the Pro waitlist
 */

import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { userService } from '@/application/services/user-service'
import { SupabaseWaitlistRepository } from '@/infrastructure/supabase/repositories'
import { waitlistSchema } from '@/types/waitlist'

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
    // 1. Parse and validate request body
    const body = await request.json()
    const validationResult = waitlistSchema.safeParse(body)

    if (!validationResult.success) {
      return errorResponse(
        validationResult.error.errors[0]?.message || 'Datos inválidos',
        400,
        'VALIDATION_ERROR'
      )
    }

    const { email, source, wantsTips } = validationResult.data

    // 2. Get user ID if authenticated (optional)
    let userId: string | null = null

    try {
      const { userId: clerkUserId } = await auth()

      if (clerkUserId) {
        const user = await userService.getByExternalId(clerkUserId)
        userId = user?.id ?? null
      }
    } catch {
      // User not authenticated, continue without user_id
    }

    // 3. Save to waitlist (upsert to handle duplicates)
    const waitlistRepo = new SupabaseWaitlistRepository()

    await waitlistRepo.upsert({
      email,
      source,
      wantsTips,
      userId,
    })

    // 4. Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return errorResponse('Error al unirse a la lista', 500, 'INTERNAL_ERROR')
  }
}
