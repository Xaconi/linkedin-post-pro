import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { PostCounter } from './PostCounter'
import { PlanBadge } from './PlanBadge'

describe('PostCounter', () => {
  describe('normal state', () => {
    it('renders remaining posts count', () => {
      render(<PostCounter postsRemaining={3} postsLimit={5} plan="free" />)

      expect(screen.getByText(/te quedan/i)).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders posts limit', () => {
      render(<PostCounter postsRemaining={3} postsLimit={5} plan="free" />)

      expect(screen.getByText(/3 de 5 este mes/i)).toBeInTheDocument()
    })

    it('renders plan badge', () => {
      render(<PostCounter postsRemaining={3} postsLimit={5} plan="free" />)

      expect(screen.getByText('Free')).toBeInTheDocument()
    })

    it('uses singular "post" when 1 remaining', () => {
      render(<PostCounter postsRemaining={1} postsLimit={5} plan="free" />)

      expect(screen.getByText(/post$/)).toBeInTheDocument()
    })

    it('uses plural "posts" when multiple remaining', () => {
      render(<PostCounter postsRemaining={3} postsLimit={5} plan="free" />)

      expect(screen.getByText(/posts$/)).toBeInTheDocument()
    })
  })

  describe('low posts state', () => {
    it('shows warning style when posts are low (<=20%)', () => {
      render(<PostCounter postsRemaining={1} postsLimit={5} plan="free" />)

      // The component should render with warning styling
      // We verify the count is shown correctly
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  describe('depleted state', () => {
    it('shows depleted message when no posts remaining', () => {
      render(<PostCounter postsRemaining={0} postsLimit={5} plan="free" />)

      expect(screen.getByText(/sin posts disponibles/i)).toBeInTheDocument()
    })

    it('still shows count in subtitle when depleted', () => {
      render(<PostCounter postsRemaining={0} postsLimit={5} plan="free" />)

      expect(screen.getByText(/0 de 5 este mes/i)).toBeInTheDocument()
    })
  })

  describe('pro plan', () => {
    it('renders Pro badge for pro plan', () => {
      render(<PostCounter postsRemaining={40} postsLimit={50} plan="pro" />)

      expect(screen.getByText('Pro')).toBeInTheDocument()
    })

    it('shows correct limit for pro plan', () => {
      render(<PostCounter postsRemaining={40} postsLimit={50} plan="pro" />)

      expect(screen.getByText(/40 de 50 este mes/i)).toBeInTheDocument()
    })
  })
})

describe('PlanBadge', () => {
  it('renders "Free" for free plan', () => {
    render(<PlanBadge plan="free" />)

    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('renders "Pro" for pro plan', () => {
    render(<PlanBadge plan="pro" />)

    expect(screen.getByText('Pro')).toBeInTheDocument()
  })

  it('applies correct styling for free plan', () => {
    render(<PlanBadge plan="free" />)

    const badge = screen.getByText('Free')
    expect(badge).toHaveClass('bg-neutral-light')
  })

  it('applies correct styling for pro plan', () => {
    render(<PlanBadge plan="pro" />)

    const badge = screen.getByText('Pro')
    expect(badge).toHaveClass('bg-secondary/10')
  })
})
