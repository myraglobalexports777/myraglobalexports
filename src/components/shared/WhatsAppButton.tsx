'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { buildWhatsAppMessage } from '@/lib/whatsapp'
import { useCurrentProductName } from '@/components/shared/CurrentProductContext'

type Props = { phone: string }

export function WhatsAppButton({ phone }: Props) {
  const productName = useCurrentProductName()
  const clean = phone.replace(/\D/g, '')
  const message = buildWhatsAppMessage(productName)

  return (
    <a
      href={`https://wa.me/${clean}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get export quote on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <FaWhatsapp size={20} />
      <span className="hidden sm:inline">Get Export Quote</span>
    </a>
  )
}
