import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RegionSelector, REGION_OPTIONS } from './RegionSelector'
import { PostRegions } from '@/domain/entities/generated-post'

describe('RegionSelector', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('rendering', () => {
    it('renders both region options', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      expect(screen.getByLabelText(/españa/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/latinoamérica/i)).toBeInTheDocument()
    })

    it('renders fieldset legend', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      expect(screen.getByText(/región/i)).toBeInTheDocument()
    })

    it('renders descriptions for each option', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      expect(screen.getByText(/español de españa/i)).toBeInTheDocument()
      expect(screen.getByText(/español latinoamericano/i)).toBeInTheDocument()
    })

    it('renders flag icons for each option', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      expect(screen.getByText('🇪🇸')).toBeInTheDocument()
      expect(screen.getByText('🌎')).toBeInTheDocument()
    })
  })

  describe('selection', () => {
    it('shows Spain as selected when value is spain', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      const radio = screen.getByRole('radio', { name: /españa/i })
      expect(radio).toBeChecked()
    })

    it('shows LATAM as selected when value is latam', () => {
      render(
        <RegionSelector value={PostRegions.LATAM} onChange={mockOnChange} />
      )

      const radio = screen.getByRole('radio', { name: /latinoamérica/i })
      expect(radio).toBeChecked()
    })

    it('calls onChange when selecting different option', async () => {
      const user = userEvent.setup()
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      const latamOption = screen.getByLabelText(/latinoamérica/i)
      await user.click(latamOption)

      expect(mockOnChange).toHaveBeenCalledWith(PostRegions.LATAM)
    })

    it('calls onChange when switching from LATAM to Spain', async () => {
      const user = userEvent.setup()
      render(
        <RegionSelector value={PostRegions.LATAM} onChange={mockOnChange} />
      )

      const spainOption = screen.getByLabelText(/españa/i)
      await user.click(spainOption)

      expect(mockOnChange).toHaveBeenCalledWith(PostRegions.SPAIN)
    })
  })

  describe('disabled state', () => {
    it('disables all options when disabled is true', () => {
      render(
        <RegionSelector
          value={PostRegions.SPAIN}
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
        <RegionSelector
          value={PostRegions.SPAIN}
          onChange={mockOnChange}
          disabled
        />
      )

      const latamLabel = screen.getByText(/latinoamérica/i).closest('label')
      if (latamLabel) await user.click(latamLabel)

      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('uses fieldset and legend for grouping', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('has radio role for options', () => {
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      const radios = screen.getAllByRole('radio')
      expect(radios).toHaveLength(2)
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(
        <RegionSelector value={PostRegions.SPAIN} onChange={mockOnChange} />
      )

      const firstRadio = screen.getByRole('radio', { name: /españa/i })
      firstRadio.focus()

      await user.keyboard('{ArrowRight}')
      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  describe('REGION_OPTIONS constant', () => {
    it('exports correct number of options', () => {
      expect(REGION_OPTIONS).toHaveLength(2)
    })

    it('contains all expected regions', () => {
      const values = REGION_OPTIONS.map((o) => o.value)
      expect(values).toContain(PostRegions.SPAIN)
      expect(values).toContain(PostRegions.LATAM)
    })
  })
})
