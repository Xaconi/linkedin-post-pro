import Link from 'next/link'

import { PLAN_FEATURES, PLAN_LIMITS } from '@/config/plans'
import { CheckIcon } from '@/shared'

interface ComparisonTableProps {
  onProClick: () => void
}

const comparisonFeatures = [
  {
    feature: 'Posts al mes',
    free: String(PLAN_LIMITS.FREE.postsPerMonth),
    pro: String(PLAN_LIMITS.PRO.postsPerMonth),
  },
  {
    feature: 'Tonos disponibles',
    free: `Todos (${PLAN_FEATURES.tonesAvailable})`,
    pro: `Todos (${PLAN_FEATURES.tonesAvailable})`,
  },
  {
    feature: 'Regiones',
    free: 'España + LATAM',
    pro: 'España + LATAM',
  },
  {
    feature: 'Variaciones por idea',
    free: String(PLAN_FEATURES.variationsPerIdea),
    pro: String(PLAN_FEATURES.variationsPerIdea),
  },
  { feature: 'Copia con un clic', free: true, pro: true },
  {
    feature: 'Historial de posts',
    free: PLAN_LIMITS.FREE.hasPostHistory,
    pro: PLAN_LIMITS.PRO.hasPostHistory,
  },
  {
    feature: 'Soporte prioritario',
    free: PLAN_LIMITS.FREE.hasPrioritySupport,
    pro: PLAN_LIMITS.PRO.hasPrioritySupport,
  },
]

/**
 * Feature comparison table between Free and Pro plans
 * Clean editorial design with visual hierarchy
 */
export function ComparisonTable({ onProClick }: ComparisonTableProps) {
  return (
    <section className="bg-neutral-light py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
            Comparativa
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-neutral-dark md:text-4xl">
            Compara los planes
          </h2>
          <p className="mx-auto max-w-md text-neutral-medium">
            Todo lo que necesitas saber sobre cada plan
          </p>
        </div>

        {/* Table container with shadow */}
        <div className="overflow-hidden rounded-2xl border border-white/50 bg-white shadow-xl shadow-neutral-dark/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-neutral-light">
                  <th className="px-6 py-5 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-medium">
                      Caracteristica
                    </span>
                  </th>
                  <th className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-2 text-neutral-dark">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-light text-xs font-bold">
                        F
                      </span>
                      <span className="font-display font-semibold">
                        {PLAN_LIMITS.FREE.name}
                      </span>
                    </span>
                  </th>
                  <th className="bg-gradient-to-b from-primary/5 to-primary/10 px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-2 text-primary">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
                        P
                      </span>
                      <span className="font-display font-semibold">
                        {PLAN_LIMITS.PRO.name}
                      </span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors hover:bg-neutral-light/30 ${
                      index !== comparisonFeatures.length - 1
                        ? 'border-b border-neutral-light'
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-neutral-dark">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10">
                            <CheckIcon className="h-3.5 w-3.5 text-secondary" />
                          </span>
                        ) : (
                          <span className="text-neutral-light">—</span>
                        )
                      ) : (
                        <span className="font-medium text-neutral-dark">
                          {row.free}
                        </span>
                      )}
                    </td>
                    <td className="bg-gradient-to-b from-primary/5 to-primary/10 px-6 py-4 text-center">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                            <CheckIcon className="h-3.5 w-3.5 text-primary" />
                          </span>
                        ) : (
                          <span className="text-neutral-light">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-primary">
                          {row.pro}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-light">
                  <td className="px-6 py-8"></td>
                  <td className="px-6 py-8 text-center">
                    <Link
                      href="/signup"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white active:scale-[0.98]"
                    >
                      Empezar gratis
                    </Link>
                  </td>
                  <td className="bg-gradient-to-b from-primary/5 to-primary/10 px-6 py-8 text-center">
                    <button
                      onClick={onProClick}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
                    >
                      Me interesa
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
