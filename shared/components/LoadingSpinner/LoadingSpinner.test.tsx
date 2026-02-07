import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default size (md)', () => {
    const { container } = render(<LoadingSpinner />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-6', 'w-6')
  })

  it('renders with small size', () => {
    const { container } = render(<LoadingSpinner size="sm" />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-4', 'w-4')
  })

  it('renders with large size', () => {
    const { container } = render(<LoadingSpinner size="lg" />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-10', 'w-10')
  })

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="text-primary" />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('text-primary')
  })

  it('has animate-spin class for animation', () => {
    const { container } = render(<LoadingSpinner />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('animate-spin')
  })

  it('is hidden from accessibility tree', () => {
    const { container } = render(<LoadingSpinner />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
