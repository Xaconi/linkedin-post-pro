import Link from 'next/link'

/**
 * FAQ preview section with links to main FAQ and signup
 * Clean call-to-action with subtle visual interest
 */
export function FAQPreview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      {/* Subtle decorative element */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-light">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-neutral-dark"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.3062 14.1652 11.4174 13 11.8293V13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
        </div>

        <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
          ¿Tienes preguntas?
        </h2>
        <p className="mx-auto mb-10 max-w-md text-lg text-neutral-medium">
          Consulta nuestras preguntas frecuentes o empieza a crear posts ahora
          mismo.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#faq"
            className="group inline-flex items-center gap-2 rounded-xl border-2 border-neutral-light bg-white px-6 py-3.5 font-semibold text-neutral-dark transition-all hover:border-primary hover:text-primary active:scale-[0.98]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="transition-colors group-hover:text-primary"
            >
              <path
                d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.75 6.75C6.75 5.50736 7.75736 4.5 9 4.5C10.2426 4.5 11.25 5.50736 11.25 6.75C11.25 7.72969 10.6239 8.56308 9.75 8.87195V9.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="9" cy="12.75" r="0.75" fill="currentColor" />
            </svg>
            Ver FAQ
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:text-white hover:shadow-primary/30 active:scale-[0.98]"
          >
            Empezar gratis
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
