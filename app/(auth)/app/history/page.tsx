import { PostHistoryList } from '@/features/post-history'

export const metadata = {
  title: 'Historial de posts | LinkedIn Post Pro',
  description: 'Consulta todos los posts que has generado.',
}

/**
 * Post history page - Shows all generated posts for the user
 */
export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-neutral-dark">
          Historial de posts
        </h1>
        <p className="mt-2 text-neutral-medium">
          Todos los posts que has generado, listos para copiar.
        </p>
      </div>

      <PostHistoryList />
    </div>
  )
}
