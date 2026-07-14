# Premium Corporate Finishing Touches Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recolor the site from green to navy, turn product specs into an icon-labeled table (with data always populated from real product columns), give the 66 photo-less products a styled placeholder + a prompts file for later real photos, and replace the floating WhatsApp icon with a prominent "Get Export Quote" CTA button.

**Architecture:** Pure, unit-testable helper functions live in `src/lib/` (spec-row assembly, icon-key lookup, placeholder gradient, WhatsApp message text, image-prompt line). Presentational React components consume those helpers and are verified manually via the dev server (this codebase has no existing component-render tests — only `src/lib/*` and API routes are unit tested with Vitest, per `tests/lib/email.test.ts` and `tests/api/inquiry.test.ts`). A one-off Node script (matching the existing `scripts/seed.ts` convention) generates the image-prompts file from the live Supabase data.

**Tech Stack:** Next.js 15 (App Router) + React 19 + Tailwind CSS 3 + Supabase + Vitest + react-icons (`fa` set, already a dependency) — no new dependencies.

## Global Constraints

- New navy brand color, sampled from `public/logo.png` and confirmed with the client: `#1C3D69` (base), `#2A5490` (light), `#122A4A` (dark).
- Recolor scope is **both** the public site and the admin panel (client confirmed).
- No new npm packages.
- No changes to `InquiryForm.tsx`, the `/get-quote` page flow, or `src/lib/email.ts` (email template green is out of scope — client's ask was about "the website").
- The `products` table currently has 73 rows; only 7 (`turmeric`, `groundnuts`, `garlic`, `red-onion`, `ginger`, `pulses-lentils`, `basmati-rice`) have a non-empty `images` array. All placeholder/prompt logic must key off `images.length === 0`, never a hardcoded slug list.
- Every code step below is complete and ready to paste — no "similar to above" shorthand.

---

### Task 1: Navy color tokens

**Files:**
- Modify: `tailwind.config.ts:13-17`
- Modify: `src/app/globals.css:10,15-16,32,44`

**Interfaces:**
- Produces: Tailwind classes `brand-green`, `brand-green-light`, `brand-green-dark` now resolve to navy hex values. `--forest`, `--admin-sidebar`, `--admin-sidebar-hover`, `--primary`, `--ring` CSS vars now resolve to navy. Every later task that uses the `brand-green` Tailwind class or these CSS vars automatically repaints — no further edits needed in the ~27 files that only reference the class name.

- [ ] **Step 1: Update the Tailwind color tokens**

Edit `tailwind.config.ts`, replace:

```ts
        'brand-green': {
          DEFAULT: '#0D3B1A',
          light: '#1B5E20',
          dark: '#071F0D',
        },
```

with:

```ts
        'brand-green': {
          DEFAULT: '#1C3D69',
          light: '#2A5490',
          dark: '#122A4A',
        },
```

- [ ] **Step 2: Update the CSS custom properties**

Edit `src/app/globals.css`. Change line 10 from:

```css
  --forest: #0D3B1A;
```

to:

```css
  --forest: #1C3D69;
```

Change lines 15-16 from:

```css
  --admin-sidebar: #0D3B1A;
  --admin-sidebar-hover: #163d22;
```

to:

```css
  --admin-sidebar: #1C3D69;
  --admin-sidebar-hover: #24487D;
```

Change line 32 from:

```css
  --primary: 137 64% 14%;
```

to:

```css
  --primary: 214 58% 26%;
```

Change line 44 from:

```css
  --ring: 137 64% 14%;
```

to:

```css
  --ring: 214 58% 26%;
```

- [ ] **Step 3: Verify the app builds**

Run: `npm run build`
Expected: build completes with no type or compile errors (this is a pure value change, no logic touched).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: rebrand accent color from green to navy"
```

---

### Task 2: Hardcoded hex sweep

**Files:**
- Modify: `src/app/(frontend)/products/[slug]/page.tsx:109,396,397`
- Modify: `src/app/admin/leads/page.tsx:6`
- Modify: `src/app/admin/news/page.tsx:76`
- Modify: `src/app/admin/products/page.tsx:95-96`
- Modify: `src/app/admin/page.tsx:5`

**Interfaces:**
- Consumes: nothing new (plain literal replacement).
- Produces: no remaining literal `#0D3B1A` / `#163d22` / `rgba(13,59,26,...)` occurrences of the old green.

- [ ] **Step 1: Update the product hero gradient and checkmark icons**

In `src/app/(frontend)/products/[slug]/page.tsx`, change line 109 from:

```tsx
        style={{ background: `linear-gradient(135deg, #0D3B1A 0%, #071F0D 100%)` }}
```

to:

```tsx
        style={{ background: `linear-gradient(135deg, #1C3D69 0%, #122A4A 100%)` }}
```

Change lines 396-397 from:

```tsx
                      <circle cx="6" cy="6" r="5" fill="none" stroke="#0D3B1A" strokeWidth="1" />
                      <path d="M3.5 6l2 2 3-3" stroke="#0D3B1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
```

to:

```tsx
                      <circle cx="6" cy="6" r="5" fill="none" stroke="#1C3D69" strokeWidth="1" />
                      <path d="M3.5 6l2 2 3-3" stroke="#1C3D69" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
```

- [ ] **Step 2: Update the admin leads status pill**

In `src/app/admin/leads/page.tsx`, change line 6 from:

```ts
  contacted: { bg: 'rgba(13,59,26,0.1)', text: '#0D3B1A', label: 'Contacted' },
```

to:

```ts
  contacted: { bg: 'rgba(28,61,105,0.1)', text: '#1C3D69', label: 'Contacted' },
```

- [ ] **Step 3: Update the admin news "Published" pill**

In `src/app/admin/news/page.tsx`, change line 76 from:

```tsx
                        ? { backgroundColor: 'rgba(13,59,26,0.1)', color: '#0D3B1A' }
```

to:

```tsx
                        ? { backgroundColor: 'rgba(28,61,105,0.1)', color: '#1C3D69' }
```

- [ ] **Step 4: Update the admin products "Live" pill**

In `src/app/admin/products/page.tsx`, change lines 95-96 from:

```tsx
                        backgroundColor: 'rgba(13,59,26,0.1)',
                        color: '#0D3B1A',
```

to:

```tsx
                        backgroundColor: 'rgba(28,61,105,0.1)',
                        color: '#1C3D69',
```

- [ ] **Step 5: Update the admin dashboard stat colors**

In `src/app/admin/page.tsx`, change line 5 from:

```ts
const STAT_COLORS = ['#0D3B1A', '#C8882A', '#8B4A1A', '#1A3B2A']
```

to:

```ts
const STAT_COLORS = ['#1C3D69', '#C8882A', '#8B4A1A', '#3D5A80']
```

- [ ] **Step 6: Verify no old-green literals remain**

Run: `grep -rn "0D3B1A\|163d22\|13,59,26\|1A3B2A" src`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/app/\(frontend\)/products/\[slug\]/page.tsx src/app/admin/leads/page.tsx src/app/admin/news/page.tsx src/app/admin/products/page.tsx src/app/admin/page.tsx
git commit -m "feat: replace remaining hardcoded green hex with navy"
```

---

### Task 3: Spec-row and icon-key helpers (`src/lib/product-specs.ts`)

**Files:**
- Create: `src/lib/product-specs.ts`
- Test: `tests/lib/product-specs.test.ts`

**Interfaces:**
- Produces:
  - `type SpecRow = { label: string; value: string }`
  - `buildSpecRows(product: Product): SpecRow[]`
  - `type SpecIconKey = 'location' | 'globe' | 'shield' | 'box' | 'ship' | 'calendar' | 'file' | 'layers' | 'dot'`
  - `getSpecIconKey(label: string): SpecIconKey`
- Consumed by Task 4 (product detail page).

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/product-specs.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npx vitest run tests/lib/product-specs.test.ts`
Expected: FAIL with "Cannot find module '@/lib/product-specs'" (the file doesn't exist yet).

- [ ] **Step 3: Implement the helpers**

Create `src/lib/product-specs.ts`:

```ts
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
```

- [ ] **Step 4: Run the tests and verify they pass**

Run: `npx vitest run tests/lib/product-specs.test.ts`
Expected: PASS (all tests green).

- [ ] **Step 5: Commit**

```bash
git add src/lib/product-specs.ts tests/lib/product-specs.test.ts
git commit -m "feat: add buildSpecRows/getSpecIconKey helpers for product spec table"
```

---

### Task 4: Product detail page — spec table + hero icons

**Files:**
- Modify: `src/app/(frontend)/products/[slug]/page.tsx`

**Interfaces:**
- Consumes: `buildSpecRows`, `getSpecIconKey`, `SpecIconKey` from `@/lib/product-specs` (Task 3).
- Produces: no new exports (page component only).

- [ ] **Step 1: Import the helpers and icon components**

At the top of `src/app/(frontend)/products/[slug]/page.tsx`, add these imports below the existing `import type { Product, ProductSpec, ProductImage } from '@/types/database'` line:

```tsx
import { buildSpecRows, getSpecIconKey, type SpecIconKey } from '@/lib/product-specs'
import {
  FaMapMarkerAlt,
  FaGlobeAsia,
  FaShieldAlt,
  FaBoxOpen,
  FaShip,
  FaCalendarAlt,
  FaFileInvoice,
  FaLayerGroup,
  FaCircle,
} from 'react-icons/fa'
```

Directly below those imports, add the icon map and a small presentational helper (module scope, outside the page component):

```tsx
const SPEC_ICONS: Record<SpecIconKey, React.ComponentType<{ className?: string; size?: number }>> = {
  location: FaMapMarkerAlt,
  globe: FaGlobeAsia,
  shield: FaShieldAlt,
  box: FaBoxOpen,
  ship: FaShip,
  calendar: FaCalendarAlt,
  file: FaFileInvoice,
  layers: FaLayerGroup,
  dot: FaCircle,
}

function SpecIcon({ label, className }: { label: string; className?: string }) {
  const Icon = SPEC_ICONS[getSpecIconKey(label)]
  return <Icon className={className} size={11} aria-hidden="true" />
}
```

- [ ] **Step 2: Replace the `specs` variable with computed spec rows**

Find this line (currently near the top of the component body):

```tsx
  const specs = typedProduct.specs as ProductSpec[]
```

Replace it with:

```tsx
  const specRows = buildSpecRows(typedProduct)
```

Since `ProductSpec` is no longer referenced directly in this file, update the type import line from:

```tsx
import type { Product, ProductSpec, ProductImage } from '@/types/database'
```

to:

```tsx
import type { Product, ProductImage } from '@/types/database'
```

- [ ] **Step 3: Add icons to the hero quick-facts strip**

In the hero "quick facts" block (the `<div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-8">` section), update each label `<p>` to include its icon. Replace:

```tsx
            {typedProduct.origin && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Origin</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.origin}</p>
              </div>
            )}
            <div>
              <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Category</p>
              <p className="font-sans text-white/70 text-sm">{typedProduct.category}</p>
            </div>
            {certifications.length > 0 && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Certifications</p>
                <p className="font-sans text-white/70 text-sm">{certifications.slice(0, 3).join(' · ')}</p>
              </div>
            )}
            {typedProduct.availability && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Availability</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.availability}</p>
              </div>
            )}
            {typedProduct.moq && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">MOQ</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.moq} {typedProduct.moq_unit}</p>
              </div>
            )}
            {typedProduct.hs_code && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">HS Code</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.hs_code}</p>
              </div>
            )}
            {typedProduct.loading_capacity && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Loading Capacity</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.loading_capacity}</p>
              </div>
            )}
            {typedProduct.supply_capacity && (
              <div>
                <p className="text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">Supply Capacity/Month</p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.supply_capacity}</p>
              </div>
            )}
```

with:

```tsx
            {typedProduct.origin && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="Origin" className="text-white/30" /> Origin
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.origin}</p>
              </div>
            )}
            <div>
              <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                <SpecIcon label="Category" className="text-white/30" /> Category
              </p>
              <p className="font-sans text-white/70 text-sm">{typedProduct.category}</p>
            </div>
            {certifications.length > 0 && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="Certifications" className="text-white/30" /> Certifications
                </p>
                <p className="font-sans text-white/70 text-sm">{certifications.slice(0, 3).join(' · ')}</p>
              </div>
            )}
            {typedProduct.availability && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="Availability" className="text-white/30" /> Availability
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.availability}</p>
              </div>
            )}
            {typedProduct.moq && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="MOQ" className="text-white/30" /> MOQ
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.moq} {typedProduct.moq_unit}</p>
              </div>
            )}
            {typedProduct.hs_code && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="HS Code" className="text-white/30" /> HS Code
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.hs_code}</p>
              </div>
            )}
            {typedProduct.loading_capacity && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="Loading Capacity" className="text-white/30" /> Loading Capacity
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.loading_capacity}</p>
              </div>
            )}
            {typedProduct.supply_capacity && (
              <div>
                <p className="flex items-center gap-1.5 text-[9px] font-sans uppercase tracking-[0.3em] text-white/30 mb-1">
                  <SpecIcon label="Supply Capacity/Month" className="text-white/30" /> Supply Capacity/Month
                </p>
                <p className="font-sans text-white/70 text-sm">{typedProduct.supply_capacity}</p>
              </div>
            )}
```

- [ ] **Step 4: Replace the spec list with a real table**

Replace this block:

```tsx
            {specs.length > 0 && (
              <section>
                <h2 className="font-heading text-brand-green text-2xl font-semibold mb-6">
                  Technical Specifications
                </h2>
                <div className="border border-fog overflow-hidden">
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-stretch ${i % 2 === 0 ? 'bg-white' : 'bg-cream/60'}`}
                    >
                      <div className="w-48 shrink-0 px-5 py-4 border-r border-fog">
                        <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-stone">
                          {spec.label}
                        </p>
                      </div>
                      <div className="flex-1 px-5 py-4">
                        <p className="font-sans text-bark text-[14px]">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
```

with:

```tsx
            {specRows.length > 0 && (
              <section>
                <h2 className="font-heading text-brand-green text-2xl font-semibold mb-6">
                  Technical Specifications
                </h2>
                <table className="w-full border-collapse border border-fog">
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/60'}>
                        <td className="w-48 border-b border-r border-fog px-5 py-4 align-top">
                          <div className="flex items-center gap-2 text-stone">
                            <SpecIcon label={row.label} className="shrink-0" />
                            <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em]">
                              {row.label}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-fog px-5 py-4 align-top">
                          <p className="font-sans text-bark text-[14px]">{row.value}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
```

- [ ] **Step 5: Verify the app builds and the page renders**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors (in particular, no leftover reference to the removed `specs` variable or `ProductSpec` type).

- [ ] **Step 6: Commit**

```bash
git add "src/app/(frontend)/products/[slug]/page.tsx"
git commit -m "feat: render product specs as an icon-labeled table"
```

---

### Task 5: Placeholder gradient helper + shared placeholder component

**Files:**
- Create: `src/lib/placeholder.ts`
- Test: `tests/lib/placeholder.test.ts`
- Create: `src/components/shared/ProductImagePlaceholder.tsx`

**Interfaces:**
- Produces: `buildPlaceholderGradient(accentColor: string): string`, and `<ProductImagePlaceholder emoji={string} accentColor={string} />` (a `div` that fills its parent's size — parent must set `position: relative` and a height).
- Consumed by Task 6.

- [ ] **Step 1: Write the failing test**

Create `tests/lib/placeholder.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run tests/lib/placeholder.test.ts`
Expected: FAIL with "Cannot find module '@/lib/placeholder'".

- [ ] **Step 3: Implement the helper**

Create `src/lib/placeholder.ts`:

```ts
export function buildPlaceholderGradient(accentColor: string): string {
  return `radial-gradient(circle at 30% 30%, ${accentColor}33, ${accentColor}0D 60%, transparent 100%)`
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `npx vitest run tests/lib/placeholder.test.ts`
Expected: PASS.

- [ ] **Step 5: Create the shared placeholder component**

Create `src/components/shared/ProductImagePlaceholder.tsx`:

```tsx
import { buildPlaceholderGradient } from '@/lib/placeholder'

type Props = {
  emoji: string | null
  accentColor: string | null
  className?: string
}

export function ProductImagePlaceholder({ emoji, accentColor, className }: Props) {
  const color = accentColor ?? '#1C3D69'
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className ?? ''}`}
      style={{ background: buildPlaceholderGradient(color) }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='rgba(0,0,0,0.05)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <span className="relative select-none text-5xl" aria-hidden="true">
        {emoji || '🌾'}
      </span>
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/placeholder.ts tests/lib/placeholder.test.ts src/components/shared/ProductImagePlaceholder.tsx
git commit -m "feat: add reusable placeholder gradient card for photo-less products"
```

---

### Task 6: Wire the placeholder component into the three product image spots

**Files:**
- Modify: `src/app/(frontend)/page.tsx:59,70-77`
- Modify: `src/components/home/ProductsSection.tsx`
- Modify: `src/app/(frontend)/products/page.tsx:112-121`
- Modify: `src/app/(frontend)/products/[slug]/page.tsx` (hero image slot)

**Interfaces:**
- Consumes: `ProductImagePlaceholder` from Task 5.
- Produces: no new exports.

- [ ] **Step 1: Pass emoji/accent_color through from the homepage query**

In `src/app/(frontend)/page.tsx`, change line 59 from:

```tsx
      .select('id, name, slug, category, short_description, images')
```

to:

```tsx
      .select('id, name, slug, category, short_description, images, emoji, accent_color')
```

Change the mapping block (lines 70-77) from:

```tsx
  const products = (rawProducts ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    shortDescription: p.short_description,
    images: (p.images as ProductImage[]).map((img) => ({ image: img })),
  }))
```

to:

```tsx
  const products = (rawProducts ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    shortDescription: p.short_description,
    images: (p.images as ProductImage[]).map((img) => ({ image: img })),
    emoji: p.emoji,
    accentColor: p.accent_color,
  }))
```

- [ ] **Step 2: Use the placeholder in the homepage ProductsSection**

In `src/components/home/ProductsSection.tsx`, add the import at the top:

```tsx
import { ProductImagePlaceholder } from '@/components/shared/ProductImagePlaceholder'
```

Extend the `Product` type (currently lines 11-18) from:

```tsx
type Product = {
  id: string
  name: string
  slug: string
  category?: string | null
  shortDescription?: string | null
  images?: ProductImage[] | null
}
```

to:

```tsx
type Product = {
  id: string
  name: string
  slug: string
  category?: string | null
  shortDescription?: string | null
  images?: ProductImage[] | null
  emoji?: string | null
  accentColor?: string | null
}
```

Replace the image fallback block:

```tsx
                <div className="relative h-52 bg-fog/50 overflow-hidden">
                  {imgObj?.url ? (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
                      <span className="text-5xl" aria-hidden="true">🌾</span>
                    </div>
                  )}
                </div>
```

with:

```tsx
                <div className="relative h-52 bg-fog/50 overflow-hidden">
                  {imgObj?.url ? (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ProductImagePlaceholder emoji={product.emoji ?? null} accentColor={product.accentColor ?? null} />
                  )}
                </div>
```

- [ ] **Step 3: Use the placeholder in the products listing page**

In `src/app/(frontend)/products/page.tsx`, add the import at the top:

```tsx
import { ProductImagePlaceholder } from '@/components/shared/ProductImagePlaceholder'
```

Replace lines 112-121:

```tsx
                    <div
                      className="flex h-full flex-col items-center justify-center"
                      style={{ background: `${product.accent_color}15` }}
                    >
                      <span className="text-5xl" aria-hidden="true">
                        {(product.emoji as string) || '🌾'}
                      </span>
                    </div>
```

with:

```tsx
                    <ProductImagePlaceholder
                      emoji={product.emoji as string | null}
                      accentColor={product.accent_color as string | null}
                    />
```

- [ ] **Step 4: Use the placeholder in the product detail hero**

In `src/app/(frontend)/products/[slug]/page.tsx`, add the import at the top (alongside the other component imports):

```tsx
import { ProductImagePlaceholder } from '@/components/shared/ProductImagePlaceholder'
```

Replace the hero image fallback block:

```tsx
                {firstImage?.url ? (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.alt ?? typedProduct.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <span className="text-9xl select-none" aria-hidden="true">
                      {typedProduct.emoji || '🌾'}
                    </span>
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${accentColor}20, transparent 70%)`,
                      }}
                    />
                  </>
                )}
```

with:

```tsx
                {firstImage?.url ? (
                  <Image
                    src={firstImage.url}
                    alt={firstImage.alt ?? typedProduct.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ProductImagePlaceholder emoji={typedProduct.emoji} accentColor={accentColor} />
                )}
```

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 6: Manual visual check**

Run: `npm run dev`, then in the browser open `/`, `/products`, and `/products/turmeric-finger` (a product with no image). Confirm all three show a styled gradient+emoji card instead of a bare emoji, and that `/products/turmeric` (which has a real photo) is unaffected.

- [ ] **Step 7: Commit**

```bash
git add "src/app/(frontend)/page.tsx" src/components/home/ProductsSection.tsx "src/app/(frontend)/products/page.tsx" "src/app/(frontend)/products/[slug]/page.tsx"
git commit -m "feat: use styled placeholder card for products without photos"
```

---

### Task 7: Image-prompt line helper + generation script

**Files:**
- Create: `src/lib/image-prompts.ts`
- Test: `tests/lib/image-prompts.test.ts`
- Create: `scripts/generate-image-prompts.ts`

**Interfaces:**
- Produces: `buildImagePromptLine(product: { name: string; slug: string; category: string }): string`
- The script queries live Supabase data and writes `docs/product-image-prompts.txt` — not unit tested (matches the existing `scripts/seed.ts` convention of untested one-off scripts).

- [ ] **Step 1: Write the failing test**

Create `tests/lib/image-prompts.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run tests/lib/image-prompts.test.ts`
Expected: FAIL with "Cannot find module '@/lib/image-prompts'".

- [ ] **Step 3: Implement the helper**

Create `src/lib/image-prompts.ts`:

```ts
type PromptInput = { name: string; slug: string; category: string }

export function buildImagePromptLine(product: PromptInput): string {
  return `${product.name} (${product.slug}, ${product.category}) — professional export-catalogue product photo of ${product.name.toLowerCase()}, clean neutral background, studio lighting, high resolution.`
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `npx vitest run tests/lib/image-prompts.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the generation script**

Create `scripts/generate-image-prompts.ts`:

```ts
// scripts/generate-image-prompts.ts
// Run with: npx tsx --env-file=.env.local scripts/generate-image-prompts.ts
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import type { Database } from '../src/types/database'
import { buildImagePromptLine } from '../src/lib/image-prompts'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('name, slug, category, images, display_order')
    .order('display_order')

  if (error) {
    console.error('Query failed:', error.message)
    process.exit(1)
  }

  const missing = (data ?? []).filter((p) => (p.images ?? []).length === 0)
  const lines = missing.map((p) => buildImagePromptLine(p))
  const header = `Product image prompts — ${missing.length} products need a real photo\nGenerated ${new Date().toISOString()}\n\n`
  const outPath = resolve(__dirname, '../docs/product-image-prompts.txt')

  writeFileSync(outPath, header + lines.join('\n\n') + '\n', 'utf-8')
  console.log(`Wrote ${missing.length} prompts to ${outPath}`)
}

run()
```

- [ ] **Step 6: Run the script against the live database**

Run: `npx tsx --env-file=.env.local scripts/generate-image-prompts.ts`
Expected: `Wrote 66 prompts to .../docs/product-image-prompts.txt` (the exact count may differ slightly if the client has edited product data since this plan was written — that's expected and correct, since the script always reflects live data).

- [ ] **Step 7: Commit**

```bash
git add src/lib/image-prompts.ts tests/lib/image-prompts.test.ts scripts/generate-image-prompts.ts docs/product-image-prompts.txt
git commit -m "feat: generate product-image-prompts.txt for photo-less products"
```

---

### Task 8: WhatsApp message helper

**Files:**
- Create: `src/lib/whatsapp.ts`
- Test: `tests/lib/whatsapp.test.ts`

**Interfaces:**
- Produces: `buildWhatsAppMessage(productName: string | null): string`
- Consumed by Task 10 (`WhatsAppButton.tsx`).

- [ ] **Step 1: Write the failing test**

Create `tests/lib/whatsapp.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npx vitest run tests/lib/whatsapp.test.ts`
Expected: FAIL with "Cannot find module '@/lib/whatsapp'".

- [ ] **Step 3: Implement the helper**

Create `src/lib/whatsapp.ts`:

```ts
export function buildWhatsAppMessage(productName: string | null): string {
  if (productName) {
    return `Hi, I am interested in ${productName} and would like to request a quote.`
  }
  return 'Hi, I am interested in your products and would like to request a quote.'
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run: `npx vitest run tests/lib/whatsapp.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts tests/lib/whatsapp.test.ts
git commit -m "feat: add buildWhatsAppMessage helper for CTA pre-filled text"
```

---

### Task 9: Current-product context

**Files:**
- Create: `src/components/shared/CurrentProductContext.tsx`

**Interfaces:**
- Produces:
  - `<CurrentProductProvider>{children}</CurrentProductProvider>` (client component, wraps a React state value)
  - `useCurrentProductName(): string | null` (hook)
  - `<SetCurrentProduct name={string} />` (client component with no visible output; registers `name` with the provider on mount, clears it on unmount)
- Consumed by Task 10 (`WhatsAppButton.tsx`, `(frontend)/layout.tsx`, `products/[slug]/page.tsx`).

- [ ] **Step 1: Create the context file**

Create `src/components/shared/CurrentProductContext.tsx`:

```tsx
'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ContextValue = {
  productName: string | null
  setProductName: (name: string | null) => void
}

const CurrentProductContext = createContext<ContextValue | null>(null)

export function CurrentProductProvider({ children }: { children: ReactNode }) {
  const [productName, setProductName] = useState<string | null>(null)
  return (
    <CurrentProductContext.Provider value={{ productName, setProductName }}>
      {children}
    </CurrentProductContext.Provider>
  )
}

export function useCurrentProductName(): string | null {
  const ctx = useContext(CurrentProductContext)
  return ctx?.productName ?? null
}

export function SetCurrentProduct({ name }: { name: string }) {
  const ctx = useContext(CurrentProductContext)
  useEffect(() => {
    ctx?.setProductName(name)
    return () => ctx?.setProductName(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return null
}
```

- [ ] **Step 2: Verify the app builds**

Run: `npm run build`
Expected: build succeeds (this file isn't wired in anywhere yet, so it should compile in isolation with no errors).

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/CurrentProductContext.tsx
git commit -m "feat: add CurrentProductContext for cross-component product name access"
```

---

### Task 10: Prominent "Get Export Quote" CTA button

**Files:**
- Modify: `src/components/shared/WhatsAppButton.tsx`
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: `src/app/(frontend)/products/[slug]/page.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppMessage` (Task 8), `CurrentProductProvider` / `useCurrentProductName` / `SetCurrentProduct` (Task 9).
- Produces: no new exports — `WhatsAppButton` keeps its existing `{ phone: string }` prop signature.

- [ ] **Step 1: Rewrite the button as a prominent pill CTA**

Replace the full contents of `src/components/shared/WhatsAppButton.tsx`:

```tsx
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
```

- [ ] **Step 2: Wrap the frontend layout in the provider**

Replace the full contents of `src/app/(frontend)/layout.tsx`:

```tsx
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { CurrentProductProvider } from '@/components/shared/CurrentProductContext'
import { siteSettings } from '@/data/site-settings'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <CurrentProductProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer
          contact={siteSettings.contact}
          social={siteSettings.social}
          sections={siteSettings.sections}
        />
        <WhatsAppButton phone={siteSettings.contact.whatsapp} />
      </div>
    </CurrentProductProvider>
  )
}
```

- [ ] **Step 3: Register the current product on the product detail page**

In `src/app/(frontend)/products/[slug]/page.tsx`, add the import at the top:

```tsx
import { SetCurrentProduct } from '@/components/shared/CurrentProductContext'
```

In the returned JSX, immediately after the opening `<div className="bg-cream min-h-screen">` (right after the two `<script type="application/ld+json" ...>` tags), add:

```tsx
      <SetCurrentProduct name={typedProduct.name} />
```

- [ ] **Step 4: Verify the app builds**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`. In the browser:
1. Open `/` (homepage) — confirm the floating button now reads "Get Export Quote" with a WhatsApp icon, pill-shaped, bottom-right.
2. Click it — confirm it opens `wa.me` with the pre-filled text "Hi, I am interested in your products and would like to request a quote."
3. Open `/products/turmeric` — confirm the button is still visible, then click it and confirm the pre-filled text is "Hi, I am interested in Turmeric and would like to request a quote."
4. Navigate from the product page back to `/` — confirm the button reverts to the generic message (i.e. `SetCurrentProduct`'s cleanup on unmount is working).

- [ ] **Step 6: Commit**

```bash
git add src/components/shared/WhatsAppButton.tsx "src/app/(frontend)/layout.tsx" "src/app/(frontend)/products/[slug]/page.tsx"
git commit -m "feat: replace floating WhatsApp icon with prominent Get Export Quote CTA"
```

---

### Task 11: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: all tests pass, including the four new `tests/lib/*.test.ts` files and the pre-existing `tests/api/inquiry.test.ts` / `tests/lib/email.test.ts`.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors (warnings acceptable only if they pre-exist on `main`).

- [ ] **Step 3: Run a full production build**

Run: `npm run build`
Expected: build completes successfully.

- [ ] **Step 4: Manual browser walkthrough**

With `npm run dev` running, check in the browser:
1. `/` — hero, header, footer, and "Our Products" section all show navy instead of green; CTA button is the new pill.
2. `/products` — category pill hero banner is navy; grid cards for photo-less products show the styled placeholder, not a bare emoji.
3. `/products/turmeric-finger` (no photo) — hero shows the placeholder card; quick-facts strip shows icons; "Technical Specifications" is a table with icon-labeled rows and is not empty.
4. `/products/turmeric` (has a photo) — real photo still displays; spec table still renders correctly.
5. `/admin/login` and `/admin` (admin dashboard) — sidebar and accent colors are navy, not green.
6. Confirm `docs/product-image-prompts.txt` exists and lists every product currently without a photo.

- [ ] **Step 5: Report completion**

No commit for this task — it's verification only. If any check fails, return to the relevant task above and fix before considering the plan complete.
