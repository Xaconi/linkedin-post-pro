import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default size (md)', () => {
    render(<LoadingSpinner />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveClass('h-5', 'w-5')
  })

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveClass('h-4', 'w-4')
  })

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveClass('h-6', 'w-6')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="text-primary" />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveClass('text-primary')
  })

  it('has animate-spin class for animation', () => {
    render(<LoadingSpinner />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveClass('animate-spin')
  })

  it('is hidden from accessibility tree', () => {
    render(<LoadingSpinner />)

    const svg = screen.getByRole('img', { hidden: true })
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })
})
