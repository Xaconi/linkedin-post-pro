import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@features/landing'

export const metadata: Metadata = {
  title: 'Términos de Servicio | LinkedIn Post Pro',
  description: 'Términos y condiciones de uso de LinkedIn Post Pro.',
}

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <h1 className="font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Términos de Servicio
          </h1>
          <p className="mt-4 text-neutral-medium">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-12 space-y-8 text-neutral-dark">
            <section>
              <h2 className="font-display text-xl font-semibold">1. Aceptación de los términos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Al acceder y utilizar LinkedIn Post Pro, aceptas estos términos de servicio.
                Si no estás de acuerdo con alguna parte, no debes usar el servicio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">2. Descripción del servicio</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                LinkedIn Post Pro es una herramienta de generación de contenido mediante inteligencia
                artificial para crear posts de LinkedIn en español. Ofrecemos un plan gratuito limitado
                y planes de pago con más funcionalidades.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">3. Registro y cuenta</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li>Debes proporcionar información veraz al registrarte.</li>
                <li>Eres responsable de mantener la seguridad de tu cuenta.</li>
                <li>No puedes compartir tu cuenta con terceros.</li>
                <li>Debes tener al menos 18 años para usar el servicio.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">4. Uso aceptable</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Te comprometes a no usar el servicio para:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li>Generar contenido ilegal, difamatorio u ofensivo.</li>
                <li>Suplantar la identidad de otras personas.</li>
                <li>Violar derechos de propiedad intelectual.</li>
                <li>Intentar acceder sin autorización a nuestros sistemas.</li>
                <li>Usar el servicio de forma automatizada sin permiso.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">5. Propiedad del contenido</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                El contenido que generes usando LinkedIn Post Pro es tuyo. Sin embargo, nos reservamos
                el derecho de usar datos agregados y anónimos para mejorar el servicio. La plataforma,
                marca y código son propiedad de LinkedIn Post Pro.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">6. Limitaciones del servicio</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li>El contenido generado por IA puede requerir revisión y edición.</li>
                <li>No garantizamos resultados específicos en engagement o alcance.</li>
                <li>El servicio puede tener interrupciones por mantenimiento.</li>
                <li>Los límites de uso varían según tu plan.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">7. Pagos y reembolsos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Los planes de pago se facturan mensualmente. Puedes cancelar en cualquier momento,
                manteniendo acceso hasta el final del período pagado. No ofrecemos reembolsos por
                períodos parciales, excepto en casos excepcionales a nuestra discreción.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">8. Terminación</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Podemos suspender o cancelar tu cuenta si violas estos términos. Puedes eliminar
                tu cuenta en cualquier momento desde la configuración. Al terminar, perderás acceso
                a tu historial de contenido generado.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">9. Limitación de responsabilidad</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                LinkedIn Post Pro se proporciona &quot;tal cual&quot;. No nos hacemos responsables de daños
                indirectos derivados del uso del servicio. Nuestra responsabilidad máxima se limita
                al importe pagado en los últimos 12 meses.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">10. Modificaciones</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Podemos actualizar estos términos ocasionalmente. Te notificaremos cambios importantes
                por email. El uso continuado del servicio implica aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">11. Contacto</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Para cualquier duda sobre estos términos, contacta con nosotros a través de{' '}
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
