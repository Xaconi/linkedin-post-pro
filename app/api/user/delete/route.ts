/**
 * DELETE /api/user/delete
 *
 * Deletes user account from Supabase and Clerk
 */

import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

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
 * DELETE handler - Delete user account
 */
export async function DELETE(): Promise<NextResponse> {
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

    // 3. Delete from Supabase via service (cascades to subscriptions and posts)
    await userService.deleteAccount(user.id)

    // 4. Delete from Clerk
    try {
      const clerk = await clerkClient()
      await clerk.users.deleteUser(clerkUserId)
    } catch (clerkError) {
      // Log but don't fail - user is already deleted from our DB
      console.error('Error deleting user from Clerk:', clerkError)
    }

    // 5. Return success
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return errorResponse('Error al eliminar la cuenta', 500, 'INTERNAL_ERROR')
  }
}
