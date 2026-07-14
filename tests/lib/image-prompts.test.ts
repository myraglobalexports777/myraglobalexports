import { describe, it, expect } from 'vitest'
import { buildImagePromptLine } from '@/lib/image-prompts'

describe('buildImagePromptLine', () => {
  it('includes the name, slug, category, and a photo brief', () => {
    const line = buildImagePromptLine({
      name: 'Fresh Ginger',
      slug: 'fresh-ginger',
      category: 'Fresh Vegetables',
    })
    expect(line).toContain('Fresh Ginger')
    expect(line).toContain('fresh-ginger')
    expect(line).toContain('Fresh Vegetables')
    expect(line).toContain('export-catalogue product photo of fresh ginger')
  })
})
