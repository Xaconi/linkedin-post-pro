/**
 * JSON-LD Structured Data for SEO
 * Provides rich snippets for search engines
 */
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'LinkedIn Post Pro - Generador de Posts LinkedIn con IA',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Generador de posts para LinkedIn con inteligencia artificial en español. Crea contenido profesional en segundos con 3 variaciones y múltiples tonos.',
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
        name: '¿Qué es un generador de posts para LinkedIn con IA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es una herramienta que usa inteligencia artificial para crear contenido profesional para LinkedIn automáticamente. Tú escribes tu idea y la IA genera posts optimizados en español, listos para publicar.',
        },
      },
      {
        '@type': 'Question',
        name: '¿El generador de posts LinkedIn es realmente gratis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, el plan Free es 100% gratis para siempre. Incluye 5 posts al mes, acceso a los 3 tonos y las 2 regiones. Sin tarjeta de crédito, sin trucos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Los posts generados por IA suenan naturales en español?',
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

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LinkedIn Post Pro',
    url: 'https://linkedinpostpro.com',
    description: 'Generador de posts para LinkedIn con IA en español',
    inLanguage: 'es',
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo crear posts para LinkedIn con IA',
    description: 'Genera posts profesionales para LinkedIn en 4 simples pasos usando inteligencia artificial.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Escribe tu idea',
        text: 'Describe en pocas palabras sobre qué quieres hablar. No necesitas ser perfecto, solo auténtico.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Elige tono y región',
        text: 'Selecciona si quieres sonar profesional, cercano o inspiracional. Y elige español de España o LATAM.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Genera 3 variaciones',
        text: 'En segundos, nuestra IA crea 3 posts únicos. Cada uno explora tu idea desde un ángulo diferente.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Copia y publica',
        text: 'Elige tu favorito, cópialo con un clic y pégalo directamente en LinkedIn.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </>
  )
}
