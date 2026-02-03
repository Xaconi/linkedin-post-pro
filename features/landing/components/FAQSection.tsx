import { EMAIL_SUPPORT } from '@/config/constants'

import { FAQAccordion } from './FAQAccordion'

const faqs = [
  {
    question: '¿LinkedIn Post Pro es realmente gratis?',
    answer:
      'Sí, el plan Free es 100% gratis para siempre. Incluye 5 posts al mes, acceso a los 3 tonos y las 2 regiones. Sin tarjeta de crédito, sin trucos. Si necesitas más, puedes actualizar a Pro.',
  },
  {
    question: '¿Qué diferencia hay entre los tonos?',
    answer:
      'Profesional es ideal para contenido corporativo y ejecutivo. Cercano suena conversacional y personal, perfecto para conectar emocionalmente. Inspiracional es motivacional y emotivo, ideal para historias transformadoras.',
  },
  {
    question: '¿El español suena natural o traducido?',
    answer:
      'Nuestra IA está entrenada específicamente para español. No traducimos del inglés. El contenido se genera directamente en español con expresiones, modismos y matices naturales según la región que elijas.',
  },
  {
    question: '¿Mis ideas son privadas?',
    answer:
      'Absolutamente. Tus ideas y los posts generados son privados y nunca se comparten ni se usan para entrenar la IA. Tu contenido te pertenece al 100%.',
  },
  {
    question: '¿Puedo editar los posts generados?',
    answer:
      'Por supuesto. Los posts generados son un punto de partida. Puedes copiarlos y editarlos como quieras antes de publicar en LinkedIn. De hecho, recomendamos añadir tu toque personal.',
  },
  {
    question: '¿Qué pasa si agoto mis 5 posts?',
    answer:
      'Los posts se renuevan el día 1 de cada mes. Si necesitas más posts antes de que se renueven, puedes actualizar al plan Pro que incluye 50 posts mensuales.',
  },
  {
    question: '¿Necesito verificar mi email?',
    answer:
      'Sí, pedimos verificación de email para evitar abusos y mantener la calidad del servicio. Es un proceso rápido: recibirás un email de confirmación al registrarte.',
  },
]

/**
 * FAQ section with accordion
 */
export function FAQSection() {
  return (
    <section id="faq" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-neutral-light px-4 py-2 text-sm font-medium text-neutral-medium">
            Preguntas frecuentes
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            ¿Tienes dudas?{' '}
            <span className="text-gradient">Te las resolvemos</span>
          </h2>
        </div>

        {/* FAQ items */}
        <FAQAccordion faqs={faqs} defaultOpenIndex={0} />

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-medium">
            ¿No encuentras lo que buscas?{' '}
            <a
              href={`mailto:${EMAIL_SUPPORT}`}
              className="font-medium text-primary hover:underline"
            >
              Escríbenos
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}


