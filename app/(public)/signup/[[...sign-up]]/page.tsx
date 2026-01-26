import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

import { AuthLayout } from '@/features/auth'
import { clerkAppearance, signUpLayout } from '@/lib/clerk'

export const metadata = {
  title: 'Crear cuenta | LinkedIn Post Pro',
  description:
    'Crea tu cuenta gratuita en LinkedIn Post Pro y empieza a generar posts profesionales.',
}

export default function SignupPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta gratis"
      subtitle="5 posts al mes sin coste. Sin tarjeta de crédito."
    >
      <SignUp
        appearance={{
          ...clerkAppearance,
          layout: signUpLayout,
        }}
        forceRedirectUrl="/app/dashboard"
      />

      {/* Custom footer */}
      <div className="mt-8 text-center space-y-4">
        <p className="text-neutral-medium text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-primary hover:text-primary-hover font-medium">
            Inicia sesión
          </Link>
        </p>

        <p className="text-neutral-medium text-xs leading-relaxed">
          Al registrarte, aceptas nuestros{' '}
          <Link href="/terms" className="text-primary hover:text-primary-hover">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacy" className="text-primary hover:text-primary-hover">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
