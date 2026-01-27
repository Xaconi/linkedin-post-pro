import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders text', () => {
    render(<StatusBadge text="Active" />)

    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('shows pulse animation by default', () => {
    const { container } = render(<StatusBadge text="Online" />)

    const pulseElement = container.querySelector('.animate-ping')
    expect(pulseElement).toBeInTheDocument()
  })

  it('hides pulse animation when pulse=false', () => {
    const { container } = render(<StatusBadge text="Offline" pulse={false} />)

    const pulseElement = container.querySelector('.animate-ping')
    expect(pulseElement).not.toBeInTheDocument()
  })

  it('applies badge styling', () => {
    const { container } = render(<StatusBadge text="Status" />)

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('rounded-full')
  })
})
