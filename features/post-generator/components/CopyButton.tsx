'use client'

import { useState, useCallback } from 'react'

import { CheckIcon, CopyIcon } from '@/shared/components/icons'

interface CopyButtonProps {
  text: string
  className?: string
}

/**
 * Button that copies text to clipboard with visual feedback
 */
export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [text])

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copiado' : 'Copiar al portapapeles'}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        transition-all duration-200
        ${copied
          ? 'bg-secondary/10 text-secondary'
          : 'bg-neutral-light hover:bg-neutral-light/80 text-neutral-dark'
        }
        ${className}
      `}
    >
      {copied ? (
        <>
          <CheckIcon className="w-4 h-4" strokeWidth={2} />
          Copiado
        </>
      ) : (
        <>
          <CopyIcon className="w-4 h-4" />
          Copiar
        </>
      )}
    </button>
  )
}
