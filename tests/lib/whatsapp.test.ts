import { describe, it, expect } from 'vitest'
import { buildWhatsAppMessage } from '@/lib/whatsapp'

describe('buildWhatsAppMessage', () => {
  it('mentions the product name when one is given', () => {
    expect(buildWhatsAppMessage('Basmati Rice')).toBe(
      'Hi, I am interested in Basmati Rice and would like to request a quote.',
    )
  })

  it('falls back to a generic message when there is no product', () => {
    expect(buildWhatsAppMessage(null)).toBe(
      'Hi, I am interested in your products and would like to request a quote.',
    )
  })
})
