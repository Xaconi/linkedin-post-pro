import Link from 'next/link'

const footerLinks = {
  producto: [
    { label: 'Precios', href: '/pricing' },
    { label: 'Cómo funciona', href: '/#how-it-works' },
    { label: 'FAQ', href: '/#faq' },
  ],
  cuenta: [
    { label: 'Iniciar sesión', href: '/login' },
    { label: 'Crear cuenta', href: '/signup' },
  ],
  legal: [
    { label: 'Términos de uso', href: '/terms' },
    { label: 'Privacidad', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

/**
 * Footer component with links and branding
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-light bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <span className="font-display text-xl font-bold text-neutral-dark">
                LinkedIn Post
                <span className="text-primary"> Pro</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-neutral-medium">
              Genera posts de LinkedIn en español que conectan con tu audiencia. Sin sonar a robot.
            </p>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-3 gap-8 md:col-span-3">
            <div>
              <h4 className="mb-4 font-semibold text-neutral-dark">Producto</h4>
              <ul className="space-y-3">
                {footerLinks.producto.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-neutral-dark">Cuenta</h4>
              <ul className="space-y-3">
                {footerLinks.cuenta.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-neutral-dark">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-medium transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-light pt-8 md:flex-row">
          <p className="text-sm text-neutral-medium">
            © {currentYear} LinkedIn Post Pro. Todos los derechos reservados.
          </p>
          <p className="text-sm text-neutral-medium">
            Hecho con <span className="animate-pulse-soft text-error">💖</span> para creadores de
            contenido. Cualquier duda contactadme en <a target="_blank" href="https://www.linkedin.com/in/nicol%C3%A1s-joel-giacconi-fern%C3%A1ndez-75820823/" className="underline hover:text-primary">LinkedIn</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
