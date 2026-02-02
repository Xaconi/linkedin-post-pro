import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@features/landing'

export const metadata: Metadata = {
  title: 'Política de Cookies | LinkedIn Post Pro',
  description: 'Información sobre el uso de cookies en LinkedIn Post Pro.',
}

export default function CookiesPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <h1 className="font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Política de Cookies
          </h1>
          <p className="mt-4 text-neutral-medium">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-12 space-y-8 text-neutral-dark">
            <section>
              <h2 className="font-display text-xl font-semibold">1. ¿Qué son las cookies?</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu
                dispositivo. Se utilizan para recordar tus preferencias, mantener tu sesión
                activa y mejorar tu experiencia de navegación.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">2. Cookies que utilizamos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                En LinkedIn Post Pro utilizamos las siguientes categorías de cookies:
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-neutral-light p-4">
                  <h3 className="font-semibold text-neutral-dark">Cookies esenciales</h3>
                  <p className="mt-2 text-sm text-neutral-medium">
                    Necesarias para el funcionamiento básico del sitio. Incluyen cookies de
                    sesión y autenticación proporcionadas por Clerk.
                  </p>
                  <p className="mt-2 text-xs text-neutral-medium">
                    <strong>Duración:</strong> Sesión / hasta 30 días
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-light p-4">
                  <h3 className="font-semibold text-neutral-dark">Cookies de preferencias</h3>
                  <p className="mt-2 text-sm text-neutral-medium">
                    Recuerdan tus preferencias como el tono preferido para generar posts.
                  </p>
                  <p className="mt-2 text-xs text-neutral-medium">
                    <strong>Duración:</strong> 1 año
                  </p>
                </div>

                <div className="rounded-lg border border-neutral-light p-4">
                  <h3 className="font-semibold text-neutral-dark">Cookies de rendimiento</h3>
                  <p className="mt-2 text-sm text-neutral-medium">
                    Nos ayudan a entender cómo usas la aplicación para mejorarla.
                    No identifican usuarios individuales.
                  </p>
                  <p className="mt-2 text-xs text-neutral-medium">
                    <strong>Duración:</strong> 1 año
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">3. Cookies de terceros</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Algunos de nuestros proveedores pueden establecer sus propias cookies:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li><strong>Clerk:</strong> Para gestión de autenticación y sesiones.</li>
                <li><strong>Vercel:</strong> Para optimización de rendimiento y análisis básico.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">4. Gestionar cookies</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Puedes gestionar las cookies a través de la configuración de tu navegador:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos</li>
                <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
              </ul>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Ten en cuenta que bloquear las cookies esenciales puede afectar al funcionamiento
                de la aplicación, especialmente el inicio de sesión.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">5. Más información</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Para más información sobre cómo tratamos tus datos, consulta nuestra{' '}
                <Link href="/privacy" className="text-primary hover:text-primary-hover">
                  Política de Privacidad
                </Link>. Si tienes preguntas, contacta con nosotros a través de{' '}
                <Link
                  href="https://www.linkedin.com/in/nicol%C3%A1s-joel-giacconi-fern%C3%A1ndez-75820823/"
                  target="_blank"
                  className="text-primary hover:text-primary-hover"
                >
                  LinkedIn
                </Link>.
              </p>
            </section>
          </div>

          <div className="mt-12 border-t border-neutral-light pt-8">
            <Link
              href="/"
              className="text-primary hover:text-primary-hover font-medium"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
