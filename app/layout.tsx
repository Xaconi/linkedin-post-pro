import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans, Source_Serif_4 } from 'next/font/google'

import type { Metadata } from 'next'

import './globals.scss'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'LinkedIn Post Pro - Genera posts de LinkedIn en español con IA',
  description:
    'Crea posts profesionales para LinkedIn en segundos. 3 variaciones, español nativo, sin sonar a robot. Empieza gratis.',
  keywords: ['LinkedIn', 'posts', 'español', 'IA', 'generador', 'content creator'],
  authors: [{ name: 'LinkedIn Post Pro' }],
  openGraph: {
    title: 'LinkedIn Post Pro',
    description: 'Genera posts de LinkedIn que conectan',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Post Pro',
    description: 'Genera posts de LinkedIn que conectan',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${dmSans.variable} ${sourceSerif.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
