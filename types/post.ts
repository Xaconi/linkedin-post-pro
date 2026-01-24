export type PostTone = 'professional' | 'friendly' | 'inspirational'

export type PostRegion = 'spain' | 'latam'

export interface PostParams {
  idea: string
  tone: PostTone
  region: PostRegion
}

export interface PostVariants {
  variants: [string, string, string]
}
