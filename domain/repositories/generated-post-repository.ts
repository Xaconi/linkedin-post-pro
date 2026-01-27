/**
 * GeneratedPost Repository Interface
 * Defines the contract for generated post data access
 */

import type { GeneratedPost, CreateGeneratedPostData } from '../entities/generated-post'

export interface IGeneratedPostRepository {
  /**
   * Find generated post by ID
   */
  findById(id: string): Promise<GeneratedPost | null>

  /**
   * Find all generated posts by user ID
   */
  findByUserId(userId: string): Promise<GeneratedPost[]>

  /**
   * Create a new generated post
   */
  create(data: CreateGeneratedPostData): Promise<GeneratedPost>
}
