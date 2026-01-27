import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

const TEST_FIXTURES = {
  activeText: 'Active',
  onlineText: 'Online',
  offlineText: 'Offline',
  statusText: 'Status',
}

const CSS_CLASSES = {
  pulseAnimation: '.animate-ping',
  inlineFlex: 'inline-flex',
  roundedFull: 'rounded-full',
}

describe('StatusBadge', () => {
  it('renders text', () => {
    render(<StatusBadge text={TEST_FIXTURES.activeText} />)

    expect(screen.getByText(TEST_FIXTURES.activeText)).toBeInTheDocument()
  })

  it('shows pulse animation by default', () => {
    const { container } = render(<StatusBadge text={TEST_FIXTURES.onlineText} />)

    const pulseElement = container.querySelector(CSS_CLASSES.pulseAnimation)
    expect(pulseElement).toBeInTheDocument()
  })

  it('hides pulse animation when pulse=false', () => {
    const { container } = render(
      <StatusBadge text={TEST_FIXTURES.offlineText} pulse={false} />
    )

    const pulseElement = container.querySelector(CSS_CLASSES.pulseAnimation)
    expect(pulseElement).not.toBeInTheDocument()
  })

  it('applies badge styling', () => {
    const { container } = render(<StatusBadge text={TEST_FIXTURES.statusText} />)

    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass(CSS_CLASSES.inlineFlex)
    expect(badge).toHaveClass(CSS_CLASSES.roundedFull)
  })
})
