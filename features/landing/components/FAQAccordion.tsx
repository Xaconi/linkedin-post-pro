'use client'

import { useState } from 'react'

import { FAQItem } from './FAQItem'

interface FAQ {
  question: string
  answer: string
}

interface FAQAccordionProps {
  faqs: FAQ[]
  defaultOpenIndex?: number
}

/**
 * Client component for FAQ accordion state management
 * FAQ data is passed from server, ensuring content is in initial HTML
 */
export function FAQAccordion({ faqs, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  )
}
