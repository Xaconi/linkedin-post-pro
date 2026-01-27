'use client'

import { useState, useCallback } from 'react'

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
          <CheckIcon className="w-4 h-4" />
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

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
