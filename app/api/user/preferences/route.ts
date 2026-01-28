/**
 * PATCH /api/user/preferences
 *
 * Updates user email preferences
 */

import { NextResponse, type NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { userService } from '@/application/services'

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
 * PATCH handler - Update email preferences
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Check authentication
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return errorResponse('No autorizado', 401, 'UNAUTHORIZED')
    }

    // 2. Get user from database
    const user = await userService.getByExternalId(clerkUserId)

    if (!user) {
      return errorResponse('Usuario no encontrado', 404, 'USER_NOT_FOUND')
    }

    // 3. Parse request body
    const body = await request.json()
    const { emailTips, emailUpdates } = body

    // 4. Validate input
    if (typeof emailTips !== 'boolean' && typeof emailUpdates !== 'boolean') {
      return errorResponse(
        'Se requiere al menos una preferencia para actualizar',
        400,
        'VALIDATION_ERROR'
      )
    }

    // 5. Update user preferences via service
    await userService.updateEmailPreferences(user.id, {
      ...(typeof emailTips === 'boolean' && { emailTips }),
      ...(typeof emailUpdates === 'boolean' && { emailUpdates }),
    })

    // 6. Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating preferences:', error)
    return errorResponse(
      'Error al actualizar preferencias',
      500,
      'INTERNAL_ERROR'
    )
  }
}
