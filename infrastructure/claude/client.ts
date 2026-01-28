/**
 * Claude API Client
 * Handles communication with Anthropic's Claude API
 */

import Anthropic from '@anthropic-ai/sdk'

import { buildSystemPrompt, buildUserPrompt } from './prompts'
import type {
  GeneratePostParams,
  GeneratePostResult,
  ClaudeApiError,
} from './types'
import { extractJson } from '@/shared/functions/json'

const CLAUDE_MODEL = 'claude-sonnet-4-20250514'
const MAX_TOKENS = 1500
const REQUEST_TIMEOUT_MS = 30000

function getApiKey(): string {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('Missing ANTHROPIC_API_KEY environment variable')
  }
  return apiKey
}

function createClient(): Anthropic {
  return new Anthropic({
    apiKey: getApiKey(),
    timeout: REQUEST_TIMEOUT_MS,
  })
}

function parseResponse(content: string): GeneratePostResult {
  let parsed: unknown
  const jsonContent = extractJson(content)

  try {
    parsed = JSON.parse(jsonContent)
  } catch (error) {
    throw createClaudeError(
      'INVALID_RESPONSE',
      'Failed to parse Claude response as JSON',
      error
    )
  }

  const obj = parsed as Record<string, unknown>

  if (
    !obj.variants ||
    !Array.isArray(obj.variants) ||
    obj.variants.length !== 3
  ) {
    throw createClaudeError(
      'INVALID_RESPONSE',
      'Invalid response structure: expected 3 variants'
    )
  }

  const variants = obj.variants.map((v: unknown) => {
    if (typeof v !== 'string' || v.trim().length === 0) {
      throw createClaudeError(
        'INVALID_RESPONSE',
        'Invalid variant: expected non-empty string'
      )
    }
    return v.trim()
  })

  return { variants: variants as [string, string, string] }
}

function createClaudeError(
  code: ClaudeApiError['code'],
  message: string,
  originalError?: unknown
): ClaudeApiError {
  return { code, message, originalError }
}

function isApiError(error: unknown): error is { status: number; message: string } {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  )
}

function handleApiError(error: unknown): never {
  if (isApiError(error)) {
    if (error.status === 429) {
      throw createClaudeError(
        'RATE_LIMIT',
        'Demasiadas solicitudes. Por favor, espera un momento.',
        error
      )
    }

    if (error.status === 408 || error.message?.includes('timeout')) {
      throw createClaudeError(
        'TIMEOUT',
        'La solicitud tardó demasiado. Por favor, intenta de nuevo.',
        error
      )
    }

    throw createClaudeError(
      'API_ERROR',
      `Error de API: ${error.message}`,
      error
    )
  }

  if (error instanceof Error && error.message?.includes('timeout')) {
    throw createClaudeError(
      'TIMEOUT',
      'La solicitud tardó demasiado. Por favor, intenta de nuevo.',
      error
    )
  }

  throw createClaudeError(
    'UNKNOWN',
    'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
    error
  )
}

export async function generatePost(
  params: GeneratePostParams
): Promise<GeneratePostResult> {
  const client = createClient()

  const systemPrompt = buildSystemPrompt(params.tone, params.region)
  const userPrompt = buildUserPrompt(params.idea)

  try {
    const message = await client.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const textContent = message.content.find((block) => block.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw createClaudeError(
        'INVALID_RESPONSE',
        'No text content in Claude response'
      )
    }

    return parseResponse(textContent.text)
  } catch (error) {
    if ((error as ClaudeApiError).code) {
      throw error
    }
    handleApiError(error)
  }
}

export function isClaudeApiError(error: unknown): error is ClaudeApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  )
}
