import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@features/landing'

export const metadata: Metadata = {
  title: 'Política de Privacidad | LinkedIn Post Pro',
  description: 'Política de privacidad y protección de datos de LinkedIn Post Pro.',
}

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <h1 className="font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mt-4 text-neutral-medium">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="mt-12 space-y-8 text-neutral-dark">
            <section>
              <h2 className="font-display text-xl font-semibold">1. Responsable del tratamiento</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                LinkedIn Post Pro es responsable del tratamiento de tus datos personales.
                Puedes contactarnos a través de{' '}
                <Link
                  href="https://www.linkedin.com/in/nicol%C3%A1s-joel-giacconi-fern%C3%A1ndez-75820823/"
                  target="_blank"
                  className="text-primary hover:text-primary-hover"
                >
                  LinkedIn
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">2. Datos que recopilamos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Recopilamos los siguientes datos:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li><strong>Datos de registro:</strong> Email, nombre (opcional) proporcionados al crear cuenta.</li>
                <li><strong>Datos de uso:</strong> Posts generados, preferencias de tono, estadísticas de uso.</li>
                <li><strong>Datos técnicos:</strong> Dirección IP, tipo de navegador, dispositivo.</li>
                <li><strong>Datos de pago (próximamente):</strong> Cuando estén disponibles los planes de pago, serán gestionados por Stripe. No almacenaremos datos de tarjeta.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">3. Finalidad del tratamiento</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Usamos tus datos para:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li>Proporcionar y mantener el servicio.</li>
                <li>Gestionar tu cuenta y suscripción.</li>
                <li>Enviarte comunicaciones relacionadas con el servicio.</li>
                <li>Mejorar y personalizar la experiencia de usuario.</li>
                <li>Cumplir obligaciones legales.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">4. Base legal</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                El tratamiento de tus datos se basa en: la ejecución del contrato de servicio,
                tu consentimiento cuando sea necesario, nuestro interés legítimo en mejorar el
                servicio, y el cumplimiento de obligaciones legales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">5. Compartir datos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Solo compartimos datos con:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li><strong>Clerk:</strong> Para autenticación de usuarios.</li>
                <li><strong>Supabase:</strong> Para almacenamiento de datos.</li>
                <li><strong>Anthropic (Claude):</strong> Para generación de contenido IA.</li>
                <li><strong>Stripe (próximamente):</strong> Para procesamiento de pagos cuando estén disponibles los planes de pago.</li>
                <li><strong>Vercel:</strong> Para hosting de la aplicación.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Estos proveedores cumplen con estándares de protección de datos adecuados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">6. Retención de datos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Conservamos tus datos mientras mantengas tu cuenta activa. Si eliminas tu cuenta,
                borraremos tus datos en un plazo de 30 días, excepto aquellos que debamos conservar
                por obligaciones legales.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">7. Tus derechos</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Tienes derecho a:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-neutral-medium">
                <li><strong>Acceso:</strong> Solicitar una copia de tus datos.</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
                <li><strong>Supresión:</strong> Eliminar tu cuenta y datos.</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
                <li><strong>Oposición:</strong> Oponerte a ciertos tratamientos.</li>
                <li><strong>Limitación:</strong> Limitar el uso de tus datos.</li>
              </ul>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Para ejercer estos derechos, contacta con nosotros por LinkedIn.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">8. Seguridad</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Implementamos medidas técnicas y organizativas para proteger tus datos:
                cifrado en tránsito (HTTPS), autenticación segura, acceso restringido a datos,
                y proveedores con certificaciones de seguridad.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">9. Cookies</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Usamos cookies esenciales para el funcionamiento del servicio. Para más información,
                consulta nuestra{' '}
                <Link href="/cookies" className="text-primary hover:text-primary-hover">
                  Política de Cookies
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">10. Cambios en esta política</h2>
              <p className="mt-3 leading-relaxed text-neutral-medium">
                Podemos actualizar esta política ocasionalmente. Te notificaremos cambios
                significativos por email o mediante aviso en la aplicación.
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
