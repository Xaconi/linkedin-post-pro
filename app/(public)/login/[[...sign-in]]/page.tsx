import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

import { AuthLayout } from '@/features/auth'
import { clerkAppearance, signInLayout } from '@/lib/clerk'

export const metadata = {
  title: 'Iniciar sesión | LinkedIn Post Pro',
  description: 'Accede a tu cuenta de LinkedIn Post Pro para generar posts profesionales.',
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión para empezar a generar contenido"
    >
      <SignIn
        appearance={{
          ...clerkAppearance,
          layout: signInLayout,
        }}
        forceRedirectUrl="/app/dashboard"
      />

      {/* Custom footer */}
      <div className="mt-8 text-center">
        <p className="text-neutral-medium text-sm">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
