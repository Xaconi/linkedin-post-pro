/**
 * JSON-LD Structured Data for SEO
 * Provides rich snippets for search engines
 */
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'LinkedIn Post Pro',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Genera posts profesionales para LinkedIn en español con IA. 3 variaciones, español nativo, sin sonar a robot.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Plan Free',
        price: '0',
        priceCurrency: 'EUR',
        description: '5 posts al mes gratis',
      },
      {
        '@type': 'Offer',
        name: 'Plan Pro',
        price: '8',
        priceCurrency: 'EUR',
        description: '50 posts al mes',
        availability: 'https://schema.org/PreOrder',
      },
    ],
    // TODO: Agregar aggregateRating cuando tengamos reviews reales
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: '4.8',
    //   ratingCount: '127',
    // },
    featureList: [
      'Generación de posts con IA',
      'Español de España y Latinoamérica',
      '3 tonos: profesional, cercano, inspiracional',
      '3 variaciones por idea',
      'Copia con un clic',
    ],
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LinkedIn Post Pro',
    url: 'https://linkedinpostpro.com',
    logo: 'https://linkedinpostpro.com/logo.png',
    sameAs: [
      'https://twitter.com/linkedinpostpro',
      'https://linkedin.com/company/linkedinpostpro',
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿LinkedIn Post Pro es realmente gratis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, el plan Free es 100% gratis para siempre. Incluye 5 posts al mes, acceso a los 3 tonos y las 2 regiones. Sin tarjeta de crédito, sin trucos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿El español suena natural o traducido?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestra IA está entrenada específicamente para español. No traducimos del inglés. El contenido se genera directamente en español con expresiones, modismos y matices naturales.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Mis ideas son privadas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutamente. Tus ideas y los posts generados son privados y nunca se comparten ni se usan para entrenar la IA. Tu contenido te pertenece al 100%.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  )
}
