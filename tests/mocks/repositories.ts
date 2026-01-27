/**
 * Mock repositories for testing
 * These implement the domain interfaces without any infrastructure dependency
 */

import type { IUserRepository } from '@/domain/repositories/user-repository'
import type { ISubscriptionRepository } from '@/domain/repositories/subscription-repository'
import type { IGeneratedPostRepository } from '@/domain/repositories/generated-post-repository'
import type { User, CreateUserData, UpdateUserData } from '@/domain/entities/user'
import type {
  Subscription,
  CreateSubscriptionData,
  UpdateSubscriptionData,
  SubscriptionPlan,
} from '@/domain/entities/subscription'
import type { GeneratedPost, CreateGeneratedPostData } from '@/domain/entities/generated-post'
import { getPostsLimitForPlan } from '@/domain'

export class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map()
  private externalIdIndex: Map<string, string> = new Map()
  private emailIndex: Map<string, string> = new Map()

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const id = this.externalIdIndex.get(externalId)
    return id ? this.users.get(id) ?? null : null
  }

  async findByEmail(email: string): Promise<User | null> {
    const id = this.emailIndex.get(email.toLowerCase())
    return id ? this.users.get(id) ?? null : null
  }

  async create(data: CreateUserData): Promise<User> {
    const id = `user-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const now = new Date()
    const user: User = {
      id,
      externalId: data.externalId,
      email: data.email.toLowerCase(),
      name: data.name ?? null,
      emailVerified: data.emailVerified ?? false,
      createdAt: now,
      updatedAt: now,
    }
    this.users.set(id, user)
    this.externalIdIndex.set(data.externalId, id)
    this.emailIndex.set(user.email, id)
    return user
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const user = this.users.get(id)
    if (!user) throw new Error('User not found')

    const updated: User = {
      ...user,
      ...(data.email !== undefined && { email: data.email.toLowerCase() }),
      ...(data.name !== undefined && { name: data.name }),
      ...(data.emailVerified !== undefined && { emailVerified: data.emailVerified }),
      updatedAt: new Date(),
    }
    this.users.set(id, updated)
    return updated
  }

  async upsert(data: CreateUserData): Promise<User> {
    const existing = await this.findByExternalId(data.externalId)
    if (existing) {
      return this.update(existing.id, {
        email: data.email,
        name: data.name,
        emailVerified: data.emailVerified,
      })
    }
    return this.create(data)
  }

  async delete(id: string): Promise<void> {
    const user = this.users.get(id)
    if (user) {
      this.users.delete(id)
      this.externalIdIndex.delete(user.externalId)
      this.emailIndex.delete(user.email)
    }
  }

  // Test helpers
  clear(): void {
    this.users.clear()
    this.externalIdIndex.clear()
    this.emailIndex.clear()
  }

  getAll(): User[] {
    return Array.from(this.users.values())
  }
}

export class MockSubscriptionRepository implements ISubscriptionRepository {
  private subscriptions: Map<string, Subscription> = new Map()
  private userIdIndex: Map<string, string> = new Map()

  async findById(id: string): Promise<Subscription | null> {
    return this.subscriptions.get(id) ?? null
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const id = this.userIdIndex.get(userId)
    return id ? this.subscriptions.get(id) ?? null : null
  }

  async create(data: CreateSubscriptionData): Promise<Subscription> {
    const id = `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const now = new Date()
    const plan = data.plan ?? 'free'
    const postsLimit = data.postsLimit ?? getPostsLimitForPlan(plan)

    const subscription: Subscription = {
      id,
      userId: data.userId,
      plan,
      postsRemaining: data.postsRemaining ?? postsLimit,
      postsLimit,
      cycleStartDate: now,
      status: data.status ?? 'active',
      createdAt: now,
      updatedAt: now,
    }
    this.subscriptions.set(id, subscription)
    this.userIdIndex.set(data.userId, id)
    return subscription
  }

  async update(id: string, data: UpdateSubscriptionData): Promise<Subscription> {
    const subscription = this.subscriptions.get(id)
    if (!subscription) throw new Error('Subscription not found')

    const updated: Subscription = {
      ...subscription,
      ...(data.plan !== undefined && { plan: data.plan }),
      ...(data.postsRemaining !== undefined && { postsRemaining: data.postsRemaining }),
      ...(data.postsLimit !== undefined && { postsLimit: data.postsLimit }),
      ...(data.cycleStartDate !== undefined && { cycleStartDate: data.cycleStartDate }),
      ...(data.status !== undefined && { status: data.status }),
      updatedAt: new Date(),
    }
    this.subscriptions.set(id, updated)
    return updated
  }

  async decrementPostsRemaining(userId: string): Promise<Subscription | null> {
    const subscription = await this.findByUserId(userId)
    if (!subscription || subscription.postsRemaining <= 0) {
      return null
    }
    return this.update(subscription.id, {
      postsRemaining: subscription.postsRemaining - 1,
    })
  }

  async resetPostsForCycle(userId: string): Promise<Subscription> {
    const subscription = await this.findByUserId(userId)
    if (!subscription) throw new Error('Subscription not found')

    return this.update(subscription.id, {
      postsRemaining: subscription.postsLimit,
      cycleStartDate: new Date(),
    })
  }

  async upgradePlan(userId: string, plan: SubscriptionPlan): Promise<Subscription> {
    const subscription = await this.findByUserId(userId)
    if (!subscription) throw new Error('Subscription not found')

    const postsLimit = getPostsLimitForPlan(plan)
    return this.update(subscription.id, {
      plan,
      postsRemaining: postsLimit,
      postsLimit,
      cycleStartDate: new Date(),
    })
  }

  async delete(id: string): Promise<void> {
    const subscription = this.subscriptions.get(id)
    if (subscription) {
      this.subscriptions.delete(id)
      this.userIdIndex.delete(subscription.userId)
    }
  }

  // Test helpers
  clear(): void {
    this.subscriptions.clear()
    this.userIdIndex.clear()
  }

  getAll(): Subscription[] {
    return Array.from(this.subscriptions.values())
  }
}

export class MockGeneratedPostRepository implements IGeneratedPostRepository {
  private posts: Map<string, GeneratedPost> = new Map()
  private userIdIndex: Map<string, string[]> = new Map()

  async findById(id: string): Promise<GeneratedPost | null> {
    return this.posts.get(id) ?? null
  }

  async findByUserId(userId: string): Promise<GeneratedPost[]> {
    const postIds = this.userIdIndex.get(userId) ?? []
    return postIds
      .map((id) => this.posts.get(id))
      .filter((post): post is GeneratedPost => post !== undefined)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async create(data: CreateGeneratedPostData): Promise<GeneratedPost> {
    const id = `post-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const now = new Date()

    const post: GeneratedPost = {
      id,
      userId: data.userId,
      inputIdea: data.inputIdea,
      tone: data.tone,
      region: data.region,
      variants: data.variants,
      createdAt: now,
    }

    this.posts.set(id, post)

    const userPosts = this.userIdIndex.get(data.userId) ?? []
    userPosts.push(id)
    this.userIdIndex.set(data.userId, userPosts)

    return post
  }

  // Test helpers
  clear(): void {
    this.posts.clear()
    this.userIdIndex.clear()
  }

  getAll(): GeneratedPost[] {
    return Array.from(this.posts.values())
  }
}
