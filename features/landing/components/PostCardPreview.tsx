interface PostCardPreviewProps {
  tone: string
  toneColor: string
  content: string
}

export function PostCardPreview({ tone, toneColor, content }: PostCardPreviewProps) {
  return (
    <>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-hover" />
        <div>
          <p className="text-sm font-semibold text-neutral-dark">Tu nombre</p>
          <p className="text-xs text-neutral-medium">Content Creator</p>
        </div>
      </div>

      <div className="mb-3">
        <span
          className={`inline-block rounded-md bg-neutral-light px-2 py-1 text-xs font-medium ${toneColor}`}
        >
          {tone}
        </span>
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-neutral-dark">{content}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-neutral-light pt-3 text-xs text-neutral-medium">
        <span className="flex items-center gap-1">
          <span className="text-primary">♥</span> 142
        </span>
        <span className="flex items-center gap-1">
          <span className="text-primary">↩</span> 23
        </span>
        <span className="flex items-center gap-1">
          <span className="text-primary">○</span> 8.2K
        </span>
      </div>
    </>
  )
}
