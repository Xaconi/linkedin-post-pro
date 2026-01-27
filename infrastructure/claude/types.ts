/**
 * Claude API Types
 * Types for post generation parameters and responses
 */

import { PostRegion, PostTone } from "@/domain/entities/generated-post"


export interface GeneratePostParams {
  idea: string
  tone: PostTone
  region: PostRegion
}

export interface GeneratePostResult {
  variants: [string, string, string]
}

export interface ClaudeApiError {
  code: 'TIMEOUT' | 'RATE_LIMIT' | 'INVALID_RESPONSE' | 'API_ERROR' | 'UNKNOWN'
  message: string
  originalError?: unknown
}
