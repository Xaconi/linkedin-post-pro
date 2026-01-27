/**
 * Application Layer
 * Contains business logic services that are agnostic to infrastructure
 * Uses Container for dependency injection of repositories
 */

export { Container } from './container'
export {
  UserService,
  userService,
  SubscriptionService,
  subscriptionService,
} from './services'
export type { SyncUserFromAuthData } from './services'

// Use Cases
export { syncUserFromAuth } from './use-cases'
export type { AuthProviderUserData, SyncUserResult } from './use-cases'
