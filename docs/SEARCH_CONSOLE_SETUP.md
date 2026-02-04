# Guía de Configuración - Google Search Console

## 1. Verificar Propiedad del Dominio

### Opción A: Verificación DNS (Recomendada)
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Añade propiedad: `https://linkedinpostpro.com`
3. Elige "Dominio" y añade el registro TXT en tu DNS
4. Espera propagación (~24h)

### Opción B: Meta Tag HTML
1. Copia el código de verificación de Google
2. Añádelo a tu `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=tu-codigo-aqui
   ```
3. El código ya está integrado en `app/layout.tsx`

---

## 2. Enviar Sitemap

Una vez verificada la propiedad:

1. Ve a "Sitemaps" en el menú lateral
2. Introduce: `https://linkedinpostpro.com/sitemap.xml`
3. Click en "Enviar"

El sitemap se genera automáticamente desde `app/sitemap.ts`.

---

## 3. Solicitar Indexación

Para acelerar la indexación inicial:

1. Ve a "Inspección de URL"
2. Introduce cada URL importante:
   - `https://linkedinpostpro.com`
   - `https://linkedinpostpro.com/pricing`
3. Click en "Solicitar indexación"

---

## 4. Monitorear Core Web Vitals

En "Experiencia" > "Métricas web principales":

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

Next.js 14 con SSR debería cumplir estos estándares.

---

## 5. Configurar Filtros de Rendimiento

Para monitorear keywords objetivo:

1. Ve a "Rendimiento"
2. Añade filtros para queries:
   - "generador posts linkedin"
   - "crear posts linkedin"
   - "linkedin post generator español"

---

## 6. Integrar con Google Analytics 4

1. Crea propiedad GA4 en [analytics.google.com](https://analytics.google.com)
2. Vincula Search Console con GA4:
   - En GA4: Admin > Vinculaciones de productos > Search Console
3. Vercel Analytics ya está integrado (`@vercel/analytics`)

---

## 7. Checklist Post-Configuración

- [ ] Propiedad verificada
- [ ] Sitemap enviado y procesado
- [ ] URLs principales indexadas
- [ ] Core Web Vitals en verde
- [ ] GA4 vinculado
- [ ] Filtros de keywords configurados

---

## Variables de Entorno Necesarias

```env
# .env.local
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=tu-codigo-de-verificacion
NEXT_PUBLIC_APP_URL=https://linkedinpostpro.com
```

---

## Tiempo Estimado de Indexación

- **Verificación**: Inmediato - 24h
- **Indexación homepage**: 1-7 días
- **Indexación completa**: 2-4 semanas
- **Posicionamiento orgánico**: 2-6 meses

---

## Recursos Adicionales

- [Documentación oficial Search Console](https://support.google.com/webmasters)
- [Guía SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Testing de Rich Results](https://search.google.com/test/rich-results)
