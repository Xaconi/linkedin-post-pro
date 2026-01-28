/**
 * POST /api/waitlist
 *
 * Adds an email to the Pro waitlist
 */

import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { userService, waitlistService } from '@/application/services'
import { WaitlistSources } from '@/domain/entities/waitlist'
import { validateEmail } from '@/utils/email'

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
    // 1. Parse request body
    const body = await request.json()
    const { email, source, wantsTips } = body

    // 2. Validate email
    if (!email || !validateEmail(email)) {
      return errorResponse('Email inválido', 400, 'VALIDATION_ERROR')
    }

    // 3. Validate source
    const validSources = Object.values(WaitlistSources)
    if (!source || !validSources.includes(source)) {
      return errorResponse('Source inválido', 400, 'VALIDATION_ERROR')
    }

    // 4. Get user ID if authenticated (optional)
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

    // 5. Save to waitlist via service
    await waitlistService.join({
      email,
      source,
      wantsTips: wantsTips ?? false,
      userId,
    })

    // 6. Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return errorResponse('Error al unirse a la lista', 500, 'INTERNAL_ERROR')
  }
}
