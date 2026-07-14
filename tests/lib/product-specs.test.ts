import { describe, it, expect } from 'vitest'
import { buildSpecRows, getSpecIconKey } from '@/lib/product-specs'
import type { Product } from '@/types/database'

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'p1',
    name: 'Test Product',
    slug: 'test-product',
    category: 'Spices',
    tagline: null,
    short_description: null,
    full_description: null,
    origin: null,
    emoji: null,
    accent_color: null,
    images: [],
    specs: [],
    varieties: [],
    grades: [],
    packaging: [],
    certifications: [],
    use_cases: [],
    related_slugs: [],
    availability: null,
    moq: null,
    moq_unit: null,
    hs_code: null,
    loading_capacity: null,
    supply_capacity: null,
    display_order: 1,
    is_published: true,
    is_future: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('buildSpecRows', () => {
  it('always includes Category even with no other data', () => {
    const rows = buildSpecRows(makeProduct())
    expect(rows).toEqual([{ label: 'Category', value: 'Spices' }])
  })

  it('includes populated fields in a fixed order', () => {
    const rows = buildSpecRows(
      makeProduct({
        origin: 'India',
        availability: 'Year-round',
        moq: '5',
        moq_unit: 'MT',
        packaging: ['25 Kg PP Bags', '50 Kg Jute Bags'],
        grades: ['Grade A', 'Grade B'],
        certifications: ['APEDA', 'FSSAI'],
        hs_code: '0910.30',
        loading_capacity: '25 MT/day',
        supply_capacity: '500 MT',
      }),
    )
    expect(rows).toEqual([
      { label: 'Origin', value: 'India' },
      { label: 'Category', value: 'Spices' },
      { label: 'Availability', value: 'Year-round' },
      { label: 'MOQ', value: '5 MT' },
      { label: 'Packaging', value: '25 Kg PP Bags · 50 Kg Jute Bags' },
      { label: 'Grades', value: 'Grade A · Grade B' },
      { label: 'Certifications', value: 'APEDA · FSSAI' },
      { label: 'HS Code', value: '0910.30' },
      { label: 'Loading Capacity', value: '25 MT/day' },
      { label: 'Supply Capacity/Month', value: '500 MT' },
    ])
  })

  it('renders MOQ without a unit when moq_unit is missing', () => {
    const rows = buildSpecRows(makeProduct({ moq: '10' }))
    expect(rows).toContainEqual({ label: 'MOQ', value: '10' })
  })

  it('appends custom specs entries after the standard fields', () => {
    const rows = buildSpecRows(
      makeProduct({ specs: [{ label: 'Shelf Life', value: '24 months' }] }),
    )
    expect(rows).toEqual([
      { label: 'Category', value: 'Spices' },
      { label: 'Shelf Life', value: '24 months' },
    ])
  })
})

describe('getSpecIconKey', () => {
  it.each([
    ['Origin', 'location'],
    ['Category', 'globe'],
    ['Market', 'globe'],
    ['Certifications', 'shield'],
    ['Quality', 'shield'],
    ['Packaging', 'box'],
    ['MOQ', 'ship'],
    ['Loading Capacity', 'ship'],
    ['Supply Capacity/Month', 'ship'],
    ['Availability', 'calendar'],
    ['HS Code', 'file'],
    ['Grades', 'layers'],
    ['Varieties', 'layers'],
    ['Shelf Life', 'dot'],
  ] as const)('maps "%s" to "%s"', (label, expected) => {
    expect(getSpecIconKey(label)).toBe(expected)
  })
})
