import type { Product } from '@/types/database'

export type SpecRow = { label: string; value: string }

export function buildSpecRows(product: Product): SpecRow[] {
  const rows: SpecRow[] = []

  if (product.origin) rows.push({ label: 'Origin', value: product.origin })
  rows.push({ label: 'Category', value: product.category })
  if (product.availability) rows.push({ label: 'Availability', value: product.availability })
  if (product.moq) {
    rows.push({
      label: 'MOQ',
      value: product.moq_unit ? `${product.moq} ${product.moq_unit}` : product.moq,
    })
  }
  if (product.packaging.length > 0) {
    rows.push({ label: 'Packaging', value: product.packaging.join(' · ') })
  }
  if (product.grades.length > 0) {
    rows.push({ label: 'Grades', value: product.grades.join(' · ') })
  }
  if (product.certifications.length > 0) {
    rows.push({ label: 'Certifications', value: product.certifications.join(' · ') })
  }
  if (product.hs_code) rows.push({ label: 'HS Code', value: product.hs_code })
  if (product.loading_capacity) {
    rows.push({ label: 'Loading Capacity', value: product.loading_capacity })
  }
  if (product.supply_capacity) {
    rows.push({ label: 'Supply Capacity/Month', value: product.supply_capacity })
  }

  for (const spec of product.specs) {
    rows.push({ label: spec.label, value: spec.value })
  }

  return rows
}

export type SpecIconKey =
  | 'location'
  | 'globe'
  | 'shield'
  | 'box'
  | 'ship'
  | 'calendar'
  | 'file'
  | 'layers'
  | 'dot'

export function getSpecIconKey(label: string): SpecIconKey {
  const l = label.toLowerCase()
  if (l.includes('origin')) return 'location'
  if (l.includes('categor') || l.includes('market')) return 'globe'
  if (l.includes('certif') || l.includes('quality')) return 'shield'
  if (l.includes('packag')) return 'box'
  if (l.includes('moq') || l.includes('export') || l.includes('loading') || l.includes('supply')) {
    return 'ship'
  }
  if (l.includes('availab')) return 'calendar'
  if (l.includes('hs code') || l.includes('hs_code')) return 'file'
  if (l.includes('grade') || l.includes('variet')) return 'layers'
  return 'dot'
}
