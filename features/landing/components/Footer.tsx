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
            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://twitter.com/linkedinpostpro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-light text-neutral-medium transition-colors hover:bg-primary hover:text-white"
                aria-label="Twitter"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/linkedinpostpro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-light text-neutral-medium transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
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
            Hecho con <span className="animate-pulse-soft text-error">♥</span> para creadores de
            contenido
          </p>
        </div>
      </div>
    </footer>
  )
}
