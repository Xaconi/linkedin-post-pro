import { z } from 'zod'

export const waitlistSchema = z.object({
  email: z.string().email('Email inválido'),
  source: z.enum(['pricing_page', 'dashboard']),
  wantsTips: z.boolean().optional().default(false),
})

export type WaitlistInput = z.infer<typeof waitlistSchema>

export type WaitlistSource = 'pricing_page' | 'dashboard'
