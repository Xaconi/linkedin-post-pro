/**
 * GET /api/subscription
 *
 * Returns current user's subscription data
 */

import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { Container } from '@/application/container'
import { userService } from '@/application/services/user-service'

/**
 * Error response helper
 */
function errorResponse(message: string, status: number, code?: string): NextResponse {
  return NextResponse.json({ error: message, code }, { status })
}

/**
 * GET handler
 */
export async function GET(): Promise<NextResponse> {
  try {
    // 1. Authenticate user
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      return errorResponse('No autenticado', 401, 'UNAUTHORIZED')
    }

    // 2. Get user from database
    const user = await userService.getByExternalId(clerkUserId)

    if (!user) {
      return errorResponse('Usuario no encontrado', 404, 'USER_NOT_FOUND')
    }

    // 3. Get subscription
    const subscriptionRepo = Container.getSubscriptionRepository()
    const subscription = await subscriptionRepo.findByUserId(user.id)

    if (!subscription) {
      return errorResponse('Suscripción no encontrada', 404, 'SUBSCRIPTION_NOT_FOUND')
    }

    // 4. Return subscription data
    return NextResponse.json({
      postsRemaining: subscription.postsRemaining,
      postsLimit: subscription.postsLimit,
      plan: subscription.plan,
      cycleStartDate: subscription.cycleStartDate,
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return errorResponse('Error interno del servidor', 500, 'INTERNAL_ERROR')
  }
}
