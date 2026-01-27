import { PostTone as PostToneDomain, PostRegion as PostRegionDomain } from "@/domain"

export type PostTone = PostToneDomain

export type PostRegion = PostRegionDomain
export interface PostParams {
  idea: string
  tone: PostTone
  region: PostRegion
}

export interface PostVariants {
  variants: [string, string, string]
}
