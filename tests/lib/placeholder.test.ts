import { describe, it, expect } from 'vitest'
import { buildPlaceholderGradient } from '@/lib/placeholder'

describe('buildPlaceholderGradient', () => {
  it('builds a radial gradient using the accent color at three stops', () => {
    const result = buildPlaceholderGradient('#C8882A')
    expect(result).toBe(
      'radial-gradient(circle at 30% 30%, #C8882A33, #C8882A0D 60%, transparent 100%)',
    )
  })
})
