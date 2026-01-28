export function FAQItem({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string
    answer: string
    isOpen: boolean
    onClick: () => void
}) {
    return (
        <div
            className={`overflow-hidden rounded-xl border transition-all ${isOpen ? 'border-primary/30 bg-primary/5' : 'border-neutral-light bg-white hover:border-neutral-light/80'
                }`}
        >
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between p-6 text-left"
                aria-expanded={isOpen}
            >
                <span className="pr-4 font-display font-semibold text-neutral-dark">{question}</span>
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${isOpen ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-medium'
                        }`}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M4 6l4 4 4-4" />
                    </svg>
                </span>
            </button>

            <div
                className={`grid transition-all ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-neutral-medium">{answer}</p>
                </div>
            </div>
        </div>
    )
}