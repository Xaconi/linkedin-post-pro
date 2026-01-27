import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturePill } from './FeaturePill'

describe('FeaturePill', () => {
  it('renders icon and text', () => {
    render(<FeaturePill icon="✨" text="New Feature" />)

    expect(screen.getByText('✨')).toBeInTheDocument()
    expect(screen.getByText('New Feature')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(<FeaturePill icon="🚀" text="Launch" />)

    const pill = container.firstChild as HTMLElement
    expect(pill).toHaveClass('inline-flex')
    expect(pill).toHaveClass('rounded-full')
    expect(pill).toHaveClass('bg-white')
  })

  it('renders different icons correctly', () => {
    const { rerender } = render(<FeaturePill icon="⚡" text="Fast" />)
    expect(screen.getByText('⚡')).toBeInTheDocument()

    rerender(<FeaturePill icon="🔒" text="Secure" />)
    expect(screen.getByText('🔒')).toBeInTheDocument()
  })
})
