import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ToneSelector } from './ToneSelector'
import { TONE_OPTIONS } from '@/config/posts'
import { PostTones } from '@/domain/entities/generated-post'

describe('ToneSelector', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('rendering', () => {
    it('renders all three tone options', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      expect(screen.getByLabelText(/profesional/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/cercano/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/inspiracional/i)).toBeInTheDocument()
    })

    it('renders fieldset legend', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      expect(screen.getByText(/tono del post/i)).toBeInTheDocument()
    })

    it('renders descriptions for each option', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      expect(screen.getByText(/formal y corporativo/i)).toBeInTheDocument()
      expect(screen.getByText(/conversacional y personal/i)).toBeInTheDocument()
      expect(screen.getByText(/motivacional y emotivo/i)).toBeInTheDocument()
    })

    it('renders icons for each option', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      expect(screen.getByText('💼')).toBeInTheDocument()
      expect(screen.getByText('😊')).toBeInTheDocument()
      expect(screen.getByText('✨')).toBeInTheDocument()
    })
  })

  describe('selection', () => {
    it('shows professional as selected when value is professional', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      const radio = screen.getByRole('radio', { name: /profesional/i })
      expect(radio).toBeChecked()
    })

    it('shows friendly as selected when value is friendly', () => {
      render(
        <ToneSelector value={PostTones.FRIENDLY} onChange={mockOnChange} />
      )

      const radio = screen.getByRole('radio', { name: /cercano/i })
      expect(radio).toBeChecked()
    })

    it('shows inspirational as selected when value is inspirational', () => {
      render(
        <ToneSelector value={PostTones.INSPIRATIONAL} onChange={mockOnChange} />
      )

      const radio = screen.getByRole('radio', { name: /inspiracional/i })
      expect(radio).toBeChecked()
    })

    it('calls onChange when selecting different option', async () => {
      const user = userEvent.setup()
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      const friendlyOption = screen.getByLabelText(/cercano/i)
      await user.click(friendlyOption)

      expect(mockOnChange).toHaveBeenCalledWith(PostTones.FRIENDLY)
    })

    it('calls onChange with correct value for each option', async () => {
      const user = userEvent.setup()
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      await user.click(screen.getByLabelText(/inspiracional/i))
      expect(mockOnChange).toHaveBeenCalledWith(PostTones.INSPIRATIONAL)

      mockOnChange.mockClear()

      await user.click(screen.getByLabelText(/cercano/i))
      expect(mockOnChange).toHaveBeenCalledWith(PostTones.FRIENDLY)
    })
  })

  describe('disabled state', () => {
    it('disables all options when disabled is true', () => {
      render(
        <ToneSelector
          value={PostTones.PROFESSIONAL}
          onChange={mockOnChange}
          disabled
        />
      )

      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toBeDisabled()
      })
    })

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup()
      render(
        <ToneSelector
          value={PostTones.PROFESSIONAL}
          onChange={mockOnChange}
          disabled
        />
      )

      const friendlyLabel = screen.getByText(/cercano/i).closest('label')
      if (friendlyLabel) await user.click(friendlyLabel)

      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('uses fieldset and legend for grouping', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('has radio role for options', () => {
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      const radios = screen.getAllByRole('radio')
      expect(radios).toHaveLength(3)
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(
        <ToneSelector value={PostTones.PROFESSIONAL} onChange={mockOnChange} />
      )

      const firstRadio = screen.getByRole('radio', { name: /profesional/i })
      firstRadio.focus()

      await user.keyboard('{ArrowRight}')
      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  describe('TONE_OPTIONS constant', () => {
    it('exports correct number of options', () => {
      expect(TONE_OPTIONS).toHaveLength(3)
    })

    it('contains all expected tones', () => {
      const values = TONE_OPTIONS.map((o) => o.value)
      expect(values).toContain(PostTones.PROFESSIONAL)
      expect(values).toContain(PostTones.FRIENDLY)
      expect(values).toContain(PostTones.INSPIRATIONAL)
    })
  })
})
