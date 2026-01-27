import { describe, it, expect } from 'vitest'
import { buildSystemPrompt, buildUserPrompt } from './prompts'
import type { PostTone, PostRegion } from './types'

const TEST_FIXTURES = {
  idea: 'Cómo la IA está transformando el trabajo remoto',
  tones: ['professional', 'friendly', 'inspirational'] as PostTone[],
  regions: ['spain', 'latam'] as PostRegion[],
}

describe('Prompts', () => {
  describe('buildSystemPrompt', () => {
    it('includes LinkedIn copywriting context', () => {
      const prompt = buildSystemPrompt('professional', 'spain')

      expect(prompt).toContain('LinkedIn')
      expect(prompt).toContain('posts')
    })

    it('includes professional tone description', () => {
      const prompt = buildSystemPrompt('professional', 'spain')

      expect(prompt).toContain('Formal')
      expect(prompt).toContain('corporativo')
    })

    it('includes friendly tone description', () => {
      const prompt = buildSystemPrompt('friendly', 'spain')

      expect(prompt).toContain('Conversacional')
      expect(prompt).toContain('personal')
    })

    it('includes inspirational tone description', () => {
      const prompt = buildSystemPrompt('inspirational', 'spain')

      expect(prompt).toContain('Motivacional')
      expect(prompt).toContain('emotivo')
    })

    it('includes Spain region instructions', () => {
      const prompt = buildSystemPrompt('professional', 'spain')

      expect(prompt).toContain('España')
      expect(prompt).toContain('vosotros')
    })

    it('includes LATAM region instructions', () => {
      const prompt = buildSystemPrompt('professional', 'latam')

      expect(prompt).toContain('latinoamericano')
      expect(prompt).toContain('ustedes')
    })

    it('includes format rules', () => {
      const prompt = buildSystemPrompt('professional', 'spain')

      expect(prompt).toContain('3000')
      expect(prompt).toContain('emojis')
      expect(prompt).toContain('hashtags')
    })

    it('includes structure recommendations', () => {
      const prompt = buildSystemPrompt('professional', 'spain')

      expect(prompt).toContain('Hook')
      expect(prompt).toContain('llamada a la acción')
    })

    it('generates different prompts for each tone', () => {
      const prompts = TEST_FIXTURES.tones.map((tone) =>
        buildSystemPrompt(tone, 'spain')
      )

      const uniquePrompts = new Set(prompts)
      expect(uniquePrompts.size).toBe(3)
    })

    it('generates different prompts for each region', () => {
      const prompts = TEST_FIXTURES.regions.map((region) =>
        buildSystemPrompt('professional', region)
      )

      const uniquePrompts = new Set(prompts)
      expect(uniquePrompts.size).toBe(2)
    })
  })

  describe('buildUserPrompt', () => {
    it('includes the idea in the prompt', () => {
      const prompt = buildUserPrompt(TEST_FIXTURES.idea)

      expect(prompt).toContain(TEST_FIXTURES.idea)
    })

    it('requests 3 variants', () => {
      const prompt = buildUserPrompt(TEST_FIXTURES.idea)

      expect(prompt).toContain('3 variantes')
    })

    it('requests JSON format', () => {
      const prompt = buildUserPrompt(TEST_FIXTURES.idea)

      expect(prompt).toContain('JSON')
      expect(prompt).toContain('variants')
    })

    it('specifies character limits', () => {
      const prompt = buildUserPrompt(TEST_FIXTURES.idea)

      expect(prompt).toContain('500')
      expect(prompt).toContain('2500')
    })

    it('works with different ideas', () => {
      const ideas = [
        'Liderazgo en tiempos de incertidumbre',
        '5 lecciones de mi primer año como emprendedor',
        'Por qué el feedback es un regalo',
      ]

      ideas.forEach((idea) => {
        const prompt = buildUserPrompt(idea)
        expect(prompt).toContain(idea)
      })
    })
  })
})
