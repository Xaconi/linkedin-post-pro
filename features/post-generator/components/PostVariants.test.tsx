import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PostVariants } from './PostVariants'
import { CopyButton } from './CopyButton'
import { PostVariantCard } from './PostVariantCard'

// Mock clipboard API
const mockWriteText = vi.fn()

beforeEach(() => {
  mockWriteText.mockResolvedValue(undefined)
  vi.stubGlobal('navigator', {
    ...navigator,
    clipboard: {
      writeText: mockWriteText,
    },
  })
})

afterEach(() => {
  vi.clearAllMocks()
  vi.unstubAllGlobals()
})

describe('PostVariants', () => {
  const mockVariants: [string, string, string] = [
    'Este es el primer post sobre productividad y trabajo remoto que conectará con tu audiencia.',
    'Segundo post con un enfoque diferente sobre cómo mejorar tu rendimiento laboral.',
    'Tercer post inspiracional sobre encontrar el equilibrio entre trabajo y vida personal.',
  ]

  describe('with variants', () => {
    it('renders all 3 variant cards', () => {
      render(<PostVariants variants={mockVariants} />)

      expect(screen.getByText(/variante 1/i)).toBeInTheDocument()
      expect(screen.getByText(/variante 2/i)).toBeInTheDocument()
      expect(screen.getByText(/variante 3/i)).toBeInTheDocument()
    })

    it('renders section heading', () => {
      render(<PostVariants variants={mockVariants} />)

      expect(screen.getByText(/tus posts generados/i)).toBeInTheDocument()
    })

    it('displays variant content', () => {
      render(<PostVariants variants={mockVariants} />)

      expect(screen.getByText(mockVariants[0])).toBeInTheDocument()
      expect(screen.getByText(mockVariants[1])).toBeInTheDocument()
      expect(screen.getByText(mockVariants[2])).toBeInTheDocument()
    })

    it('renders copy button for each variant', () => {
      render(<PostVariants variants={mockVariants} />)

      const copyButtons = screen.getAllByRole('button', { name: /copiar/i })
      expect(copyButtons).toHaveLength(3)
    })

    it('has accessible section label', () => {
      render(<PostVariants variants={mockVariants} />)

      expect(screen.getByRole('region', { name: /posts generados/i })).toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('renders empty state when variants is null', () => {
      render(<PostVariants variants={null} />)

      expect(screen.getByText(/tus posts aparecerán aquí/i)).toBeInTheDocument()
    })

    it('shows instructions in empty state', () => {
      render(<PostVariants variants={null} />)

      expect(screen.getByText(/escribe tu idea/i)).toBeInTheDocument()
    })

    it('has accessible section label for empty state', () => {
      render(<PostVariants variants={null} />)

      expect(screen.getByRole('region', { name: /sin posts generados/i })).toBeInTheDocument()
    })
  })
})

describe('PostVariantCard', () => {
  const variant = 'Este es un post de ejemplo sobre productividad.'

  it('renders variant text', () => {
    render(<PostVariantCard variant={variant} index={0} />)

    expect(screen.getByText(variant)).toBeInTheDocument()
  })

  it('renders variant number', () => {
    render(<PostVariantCard variant={variant} index={1} />)

    expect(screen.getByText(/variante 2/i)).toBeInTheDocument()
  })

  it('displays character count', () => {
    render(<PostVariantCard variant={variant} index={0} />)

    expect(screen.getByText(`${variant.length} caracteres`)).toBeInTheDocument()
  })

  it('has accessible article label', () => {
    render(<PostVariantCard variant={variant} index={2} />)

    expect(screen.getByRole('article', { name: /variante 3/i })).toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<PostVariantCard variant={variant} index={0} />)

    expect(screen.getByRole('button', { name: /copiar/i })).toBeInTheDocument()
  })
})

describe('CopyButton', () => {
  const text = 'Text to copy'

  it('renders copy label by default', () => {
    render(<CopyButton text={text} />)

    expect(screen.getByRole('button', { name: /copiar al portapapeles/i })).toBeInTheDocument()
  })

  it('renders button with correct text', () => {
    render(<CopyButton text={text} />)

    expect(screen.getByText(/copiar/i)).toBeInTheDocument()
  })

  it('shows "Copiado" feedback after clicking', async () => {
    const user = userEvent.setup()
    render(<CopyButton text={text} />)

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText(/copiado/i)).toBeInTheDocument()
    })
  })

  it('updates aria-label when copied', async () => {
    const user = userEvent.setup()
    render(<CopyButton text={text} />)

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copiado/i })).toBeInTheDocument()
    })
  })
})
