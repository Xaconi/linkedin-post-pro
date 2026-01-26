import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

import { AuthLayout } from '@/features/auth'
import { clerkAppearance, forgotPasswordLayout } from '@/lib/clerk'

export const metadata = {
  title: 'Recuperar contraseña | LinkedIn Post Pro',
  description: 'Recupera el acceso a tu cuenta de LinkedIn Post Pro.',
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Recupera tu contraseña"
      subtitle="Te enviaremos un enlace para restablecer tu contraseña"
    >
      <SignIn
        appearance={{
          ...clerkAppearance,
          layout: forgotPasswordLayout,
        }}
        forceRedirectUrl="/app/dashboard"
      />

      {/* Custom footer */}
      <div className="mt-8 text-center space-y-4">
        <p className="text-neutral-medium text-sm">
          ¿Recordaste tu contraseña?{' '}
          <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
            Volver a iniciar sesión
          </Link>
        </p>

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
