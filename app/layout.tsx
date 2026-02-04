import { ClerkProvider } from '@clerk/nextjs'
import { DM_Sans, Source_Serif_4 } from 'next/font/google'

import type { Metadata } from 'next'

import { Analytics } from "@vercel/analytics/next"

import { clerkLocalization } from '@/lib/clerk'
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
  title: {
    default: 'Generador de Posts LinkedIn con IA en Español | LinkedIn Post Pro',
    template: '%s | LinkedIn Post Pro',
  },
  description:
    'Genera posts para LinkedIn en español con IA. 3 variaciones profesionales en segundos, sin sonar a robot. Plan gratis disponible. Pruébalo ahora.',
  keywords: [
    'generador posts linkedin',
    'crear posts linkedin',
    'linkedin post generator español',
    'escribir posts linkedin',
    'ideas posts linkedin',
    'IA para linkedin',
    'contenido linkedin',
    'posts linkedin español',
    'generador contenido linkedin gratis',
    'inteligencia artificial linkedin',
  ],
  authors: [{ name: 'LinkedIn Post Pro' }],
  creator: 'LinkedIn Post Pro',
  publisher: 'LinkedIn Post Pro',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://linkedinpostpro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Generador de Posts LinkedIn con IA | Español Nativo | LinkedIn Post Pro',
    description:
      'Genera posts profesionales para LinkedIn en segundos. 3 variaciones en español nativo. Sin sonar a robot. Empieza gratis.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'LinkedIn Post Pro',
    url: 'https://linkedinpostpro.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Post Pro - Generador de posts para LinkedIn con IA en español',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Posts LinkedIn con IA | LinkedIn Post Pro',
    description:
      'Genera posts profesionales para LinkedIn en segundos. 3 variaciones en español nativo. Sin sonar a robot.',
    images: ['/og-image.png'],
    creator: '@linkedinpostpro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={clerkLocalization}>
      <html lang="es">
        <body className={`${dmSans.variable} ${sourceSerif.variable} font-sans antialiased`}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
