/**
 * Supabase User Repository Implementation
 * Implements IUserRepository interface from domain layer
 */

import type { IUserRepository } from '@/domain/repositories/user-repository'
import type { User, CreateUserData, UpdateUserData } from '@/domain/entities/user'
import { createServerClient } from '../client'
import { mapDbUserToDomain } from '../mappers'

export class SupabaseUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching user by ID:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', externalId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching user by external ID:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      console.error('Error fetching user by email:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async create(userData: CreateUserData): Promise<User> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_user_id: userData.externalId,
        email: userData.email,
        name: userData.name ?? null,
        email_verified: userData.emailVerified ?? false,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async update(id: string, updates: UpdateUserData): Promise<User> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .update({
        ...(updates.email !== undefined && { email: updates.email }),
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.emailVerified !== undefined && { email_verified: updates.emailVerified }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async upsert(userData: CreateUserData): Promise<User> {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('users')
      .upsert(
        {
          clerk_user_id: userData.externalId,
          email: userData.email,
          name: userData.name ?? null,
          email_verified: userData.emailVerified ?? false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'clerk_user_id' }
      )
      .select()
      .single()

    if (error) {
      console.error('Error upserting user:', error)
      throw error
    }

    return mapDbUserToDomain(data)
  }

  async delete(id: string): Promise<void> {
    const supabase = createServerClient()

    const { error } = await supabase.from('users').delete().eq('id', id)

    if (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }
}
