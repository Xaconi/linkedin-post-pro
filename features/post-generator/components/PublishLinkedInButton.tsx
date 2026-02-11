'use client'

import { useState, useCallback } from 'react'

import { CheckIcon, LinkedInIcon } from '@/shared/components/icons'

interface PublishLinkedInButtonProps {
  text: string
  className?: string
}

/**
 * Button that copies text to clipboard and opens LinkedIn in a new tab
 */
export function PublishLinkedInButton({ text, className = '' }: PublishLinkedInButtonProps) {
  const [copied, setCopied] = useState(false)

  const handlePublish = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() =>
        window.open('https://www.linkedin.com/feed/', '_blank', 'noopener,noreferrer')
        , 3000)
      setTimeout(() => setCopied(false), 5000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [text])

  return (
    <button
      type="button"
      onClick={handlePublish}
      aria-label={copied ? 'Copiado - pégalo en LinkedIn' : 'Publicar en LinkedIn'}
      className={`
        inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium
        transition-all duration-200
        ${copied
          ? 'bg-primary/10 text-primary'
          : 'bg-primary text-white hover:bg-primary/90 active:scale-95'
        }
        ${className}
      `}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" strokeWidth={2} />
          Copiado - pégalo en LinkedIn
        </>
      ) : (
        <>
          <LinkedInIcon className="w-4 h-4" />
          Publicar en LinkedIn
        </>
      )}
    </button>
  )
}
