import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturePill } from './FeaturePill'

const TEST_FIXTURES = {
  icon: '✨',
  text: 'New Feature',
  alternativeIcon: '🚀',
  alternativeText: 'Launch',
}

describe('FeaturePill', () => {
  it('renders icon and text', () => {
    render(<FeaturePill icon={TEST_FIXTURES.icon} text={TEST_FIXTURES.text} />)

    expect(screen.getByText(TEST_FIXTURES.icon)).toBeInTheDocument()
    expect(screen.getByText(TEST_FIXTURES.text)).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = render(
      <FeaturePill icon={TEST_FIXTURES.alternativeIcon} text={TEST_FIXTURES.alternativeText} />
    )

    const pill = container.firstChild as HTMLElement
    expect(pill).toHaveClass('inline-flex')
    expect(pill).toHaveClass('rounded-full')
    expect(pill).toHaveClass('bg-white')
  })

  it('renders different icons correctly', () => {
    const icons = ['⚡', '🔒']
    const { rerender } = render(<FeaturePill icon={icons[0]} text="Fast" />)
    expect(screen.getByText(icons[0])).toBeInTheDocument()

    rerender(<FeaturePill icon={icons[1]} text="Secure" />)
    expect(screen.getByText(icons[1])).toBeInTheDocument()
  })
})
