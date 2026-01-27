'use client'

import { useId } from 'react'

import { SelectorOption } from './SelectorOption'
import { REGION_OPTIONS } from '@/config/posts'
import type { PostRegion } from '@/domain/entities/generated-post'

interface RegionSelectorProps {
  value: PostRegion
  onChange: (value: PostRegion) => void
  disabled?: boolean
}

/**
 * Selector for post region (Spain, LATAM)
 * Radio group with card-style options
 */
export function RegionSelector({
  value,
  onChange,
  disabled = false,
}: RegionSelectorProps) {
  const groupId = useId()
  const name = `region-${groupId}`

  return (
    <fieldset className="space-y-3">
      <legend className="block text-sm font-medium text-neutral-dark mb-2">
        Región
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REGION_OPTIONS.map((option) => (
          <SelectorOption
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            icon={option.icon}
            checked={value === option.value}
            onChange={(v) => onChange(v as PostRegion)}
            disabled={disabled}
          />
        ))}
      </div>
    </fieldset>
  )
}
