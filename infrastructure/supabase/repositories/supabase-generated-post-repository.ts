/**
 * Supabase GeneratedPost Repository Implementation
 * Implements IGeneratedPostRepository interface from domain layer
 */

import type { IGeneratedPostRepository } from '@/domain/repositories/generated-post-repository'
import type { GeneratedPost, CreateGeneratedPostData } from '@/domain/entities/generated-post'
import { createServerClient } from '../client'
import { mapDbGeneratedPostToDomain } from '../mappers'

export class SupabaseGeneratedPostRepository implements IGeneratedPostRepository {
  async findById(id: string): Promise<GeneratedPost | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('generated_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching generated post by ID:', error)
      throw error
    }

    return mapDbGeneratedPostToDomain(data)
  }

  async findByUserId(userId: string): Promise<GeneratedPost[]> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('generated_posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching generated posts by user ID:', error)
      throw error
    }

    return data.map(mapDbGeneratedPostToDomain)
  }

  async create(postData: CreateGeneratedPostData): Promise<GeneratedPost> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('generated_posts')
      .insert({
        user_id: postData.userId,
        input_idea: postData.inputIdea,
        tone: postData.tone,
        region: postData.region,
        variant_1: postData.variants[0],
        variant_2: postData.variants[1],
        variant_3: postData.variants[2],
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating generated post:', error)
      throw error
    }

    return mapDbGeneratedPostToDomain(data)
  }
}
