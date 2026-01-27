'use client'

import { useId } from 'react'

import { SelectorOption } from './SelectorOption'
import { TONE_OPTIONS } from '@/config/posts'
import type { PostTone } from '@/domain/entities/generated-post'

interface ToneSelectorProps {
  value: PostTone
  onChange: (value: PostTone) => void
  disabled?: boolean
}

/**
 * Selector for post tone (professional, friendly, inspirational)
 * Radio group with card-style options
 */
export function ToneSelector({
  value,
  onChange,
  disabled = false,
}: ToneSelectorProps) {
  const groupId = useId()
  const name = `tone-${groupId}`

  return (
    <fieldset className="space-y-3">
      <legend className="block text-sm font-medium text-neutral-dark mb-2">
        Tono del post
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TONE_OPTIONS.map((option) => (
          <SelectorOption
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            checked={value === option.value}
            onChange={(v) => onChange(v as PostTone)}
            disabled={disabled}
          />
        ))}
      </div>
    </fieldset>
  )
}
