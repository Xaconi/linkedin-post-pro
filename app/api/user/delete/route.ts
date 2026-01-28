/**
 * DELETE /api/user/delete
 *
 * Deletes user account (orchestrated by application service)
 */

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { userService } from '@/application/services'

/**
 * DELETE handler - Delete user account
 */
export async function DELETE(): Promise<NextResponse> {
  try {
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return NextResponse.json(
        { error: 'No autorizado', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    await userService.deleteAccount(clerkUserId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)

    if (error instanceof Error && error.message === 'Usuario no encontrado') {
      return NextResponse.json(
        { error: 'Usuario no encontrado', code: 'USER_NOT_FOUND' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Error al eliminar la cuenta', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
