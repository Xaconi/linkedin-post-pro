/**
 * Dependency Injection Container
 * Single point where infrastructure implementations are selected
 * To swap Supabase for another DB, only modify this file
 */

import type { IUserRepository } from '@/domain/repositories/user-repository'
import type { ISubscriptionRepository } from '@/domain/repositories/subscription-repository'
import { SupabaseUserRepository } from '@/infrastructure/supabase/repositories/supabase-user-repository'
import { SupabaseSubscriptionRepository } from '@/infrastructure/supabase/repositories/supabase-subscription-repository'

class Container {
  private static userRepository: IUserRepository | null = null
  private static subscriptionRepository: ISubscriptionRepository | null = null

  /**
   * Get user repository instance
   * Returns Supabase implementation by default
   */
  static getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      this.userRepository = new SupabaseUserRepository()
    }
    return this.userRepository
  }

  /**
   * Get subscription repository instance
   * Returns Supabase implementation by default
   */
  static getSubscriptionRepository(): ISubscriptionRepository {
    if (!this.subscriptionRepository) {
      this.subscriptionRepository = new SupabaseSubscriptionRepository()
    }
    return this.subscriptionRepository
  }

  /**
   * Override user repository (for testing or switching implementations)
   */
  static setUserRepository(repo: IUserRepository): void {
    this.userRepository = repo
  }

  /**
   * Override subscription repository (for testing or switching implementations)
   */
  static setSubscriptionRepository(repo: ISubscriptionRepository): void {
    this.subscriptionRepository = repo
  }

  /**
   * Reset all repositories to null (useful for tests)
   */
  static reset(): void {
    this.userRepository = null
    this.subscriptionRepository = null
  }
}

export { Container }
