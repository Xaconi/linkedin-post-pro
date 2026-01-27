import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PostGeneratorForm } from './PostGeneratorForm'
import { IdeaConstraints } from '@/domain/entities/generated-post'

describe('PostGeneratorForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  const validIdea = 'Esta es una idea válida para generar un post de LinkedIn sobre productividad'

  describe('rendering', () => {
    it('renders textarea and submit button', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /generar post/i })).toBeInTheDocument()
    })

    it('renders character counter', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      expect(screen.getByText(`0/${IdeaConstraints.MAX_LENGTH}`)).toBeInTheDocument()
    })

    it('renders label for textarea', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      expect(screen.getByText(/sobre qué quieres escribir/i)).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('disables submit when idea is empty', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      expect(submitButton).toBeDisabled()
    })

    it('disables submit when idea is too short', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Short')

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      expect(submitButton).toBeDisabled()
    })

    it('enables submit when idea meets minimum length', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, validIdea)

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      expect(submitButton).toBeEnabled()
    })

    it('shows minimum characters helper when too short', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Short')

      expect(screen.getByText(`Mínimo ${IdeaConstraints.MIN_LENGTH} caracteres`)).toBeInTheDocument()
    })

    it('updates character counter as user types', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hello')

      expect(screen.getByText(`5/${IdeaConstraints.MAX_LENGTH}`)).toBeInTheDocument()
    })
  })

  describe('submission', () => {
    it('calls onSubmit with form data on valid submission', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, validIdea)

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      await user.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith({
        idea: validIdea,
        tone: 'professional',
        region: 'spain',
      })
    })

    it('does not call onSubmit when form is invalid', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Short')

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      fireEvent.click(submitButton)

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('trims whitespace from idea before submitting', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, `  ${validIdea}  `)

      const submitButton = screen.getByRole('button', { name: /generar post/i })
      await user.click(submitButton)

      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ idea: validIdea })
      )
    })
  })

  describe('loading state', () => {
    it('shows loading spinner when isLoading is true', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} isLoading />)

      expect(screen.getByText(/generando/i)).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
    })

    it('disables submit button when loading', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} isLoading />)

      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disables textarea when loading', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} isLoading />)

      expect(screen.getByRole('textbox')).toBeDisabled()
    })
  })

  describe('disabled state', () => {
    it('disables form when disabled prop is true', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} disabled />)

      expect(screen.getByRole('textbox')).toBeDisabled()
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  describe('posts remaining', () => {
    it('shows "Sin posts disponibles" when postsRemaining is 0', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} postsRemaining={0} />)

      expect(screen.getByRole('button', { name: /sin posts disponibles/i })).toBeInTheDocument()
    })

    it('shows upgrade message when postsRemaining is 0', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} postsRemaining={0} />)

      expect(screen.getByText(/has agotado tus posts/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /actualiza a pro/i })).toBeInTheDocument()
    })

    it('disables submit when postsRemaining is 0 even with valid idea', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} postsRemaining={0} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, validIdea)

      const submitButton = screen.getByRole('button', { name: /sin posts disponibles/i })
      expect(submitButton).toBeDisabled()
    })
  })

  describe('accessibility', () => {
    it('has accessible label for textarea', () => {
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAccessibleName(/sobre qué quieres escribir/i)
    })

    it('marks textarea as invalid when validation fails', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Short')

      expect(textarea).toHaveAttribute('aria-invalid', 'true')
    })

    it('announces character count to screen readers', async () => {
      const user = userEvent.setup()
      render(<PostGeneratorForm onSubmit={mockOnSubmit} />)

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Test')

      const counter = screen.getByText(`4/${IdeaConstraints.MAX_LENGTH}`)
      expect(counter).toHaveAttribute('aria-live', 'polite')
    })
  })
})
