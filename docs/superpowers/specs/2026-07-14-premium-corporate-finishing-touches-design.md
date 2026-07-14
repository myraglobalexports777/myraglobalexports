# Premium Corporate Finishing Touches — Design

Client request (Piyush): recolor to navy, turn product specs into a table with icons, fill in missing product images with placeholders, and replace the floating WhatsApp icon with a prominent CTA button.

## 1. Color system (navy rebrand)

- `tailwind.config.ts`: change `brand-green` from green to navy:
  - `DEFAULT: '#0D3B1A'` → `'#1C3D69'`
  - `light: '#1B5E20'` → `'#2A5490'`
  - `dark: '#071F0D'` → `'#122A4A'`
  - Navy hex `#1C3D69` was sampled directly from `public/logo.png` (confirmed with client).
- `src/app/globals.css`: update `--forest` and admin sidebar vars (`--admin-sidebar`, `--admin-sidebar-hover`) to the same navy scale.
- Sweep hardcoded hex duplicates of the old green (`#0D3B1A`, `#163d22`) in:
  - `src/app/(frontend)/products/[slug]/page.tsx` (hero gradient background, checkmark icon strokes)
  - `src/app/admin/leads/page.tsx`, `src/app/admin/news/page.tsx`, `src/app/admin/products/page.tsx`, `src/app/admin/page.tsx` (stat colors, status pill colors)
  - Replace with the new navy equivalents.
- Scope: **both** the public site and the admin panel (client confirmed).
- Background palette (cream/white/fog) is unchanged — only the accent color moves from green to navy.

## 2. Spec table (product detail page)

File: `src/app/(frontend)/products/[slug]/page.tsx`

- Replace the current flex-row "Technical Specifications" block (existing lines ~257-280) with a real `<table>` built from `src/components/ui/table.tsx`.
- Add a helper (e.g. `buildSpecRows(product)`) that assembles rows from real columns — Origin, Category, MOQ (+ unit), Packaging (joined list), Grades (joined list), Certifications (joined list), Availability, HS Code, Loading Capacity, Supply Capacity/Month — including a row only when the underlying field is non-empty, then appends any custom `specs` entries after them. This guarantees the table is never empty even for the 59 products that have no custom specs.
- Apply the same icon + label + value treatment to the hero "quick facts" strip (existing lines ~188-235), converting each plain label/value pair into icon + label + value, using the same icon map as the spec table.

## 3. Icons

- Use `react-icons/fa` — already a project dependency, already used in `WhatsAppButton.tsx` / `ShareButtons.tsx`. No new package.
- Define a small keyword → icon lookup (case-insensitive match against the spec label), e.g.:
  - Origin → `FaMapMarkerAlt`
  - Category / Market → `FaGlobeAsia`
  - Certifications / Quality → `FaShieldAlt`
  - Packaging → `FaBoxOpen`
  - MOQ / Export / Loading Capacity → `FaShip`
  - Availability → `FaCalendarAlt`
  - HS Code → `FaFileInvoice`
  - Grades / Varieties → `FaLayerGroup`
  - fallback → `FaCircle` (small dot, same as today's default bullet)
- Used in both the hero quick-facts strip and the spec table's label column.

## 4. Placeholder images

- Confirmed via direct query against the live `products` table (73 rows total): only 7 products currently have a non-empty `images` array — `turmeric`, `groundnuts`, `garlic`, `red-onion`, `ginger`, `pulses-lentils`, `basmati-rice`. These keep their existing images unchanged.
- The remaining 66 products (including `cumin-seeds`, `sesame-seeds`, `red-chilli`, `wheat`, `soybean`, `coriander-seeds`, `mustard-seeds`, plus the fresh vegetables/fruits/extra spices/grains/pulses/oilseeds/herbs added after the original seed) have an empty `images` array and currently fall back to a bare emoji on a flat tint background.
- Logic must key off `images.length === 0` at render/generation time, not a hardcoded slug list, since the DB is the source of truth and may change before implementation.
- Replace that bare-emoji fallback with a consistent styled placeholder card in all three places it's rendered:
  - `src/components/home/ProductsSection.tsx` (homepage product grid)
  - `src/app/(frontend)/products/page.tsx` (products listing grid)
  - `src/app/(frontend)/products/[slug]/page.tsx` (product detail hero image slot)
  - Styling: `product.accent_color` radial/linear gradient background, larger centered emoji, subtle geometric pattern overlay (reuse the existing SVG noise/diamond pattern already used elsewhere on the site), so the card reads as an intentional "photo coming soon" treatment rather than an empty state.
- Generate `docs/product-image-prompts.txt`: for all 66 products with an empty `images` array, one line/block with name, slug, category, and a one-line photography/generation prompt (e.g. "Fresh Ginger (fresh-ginger, Fresh Vegetables) — close-up of washed fresh ginger rhizomes on a neutral background, studio lighting, export-catalogue style"), so the client can source or generate real photos later and drop the URLs into the admin product image field.

## 5. CTA button

File: `src/components/shared/WhatsAppButton.tsx` (rewritten), `src/app/(frontend)/layout.tsx` (unchanged usage site), `src/app/(frontend)/products/[slug]/page.tsx` (new: registers current product name)

- Convert `WhatsAppButton` to a pill-shaped button: WhatsApp icon + "Get Export Quote" text, same floating bottom-right position, same z-index.
- Make it a client component reading a small React context (`CurrentProductContext`, new file `src/components/shared/CurrentProductContext.tsx`) for the active product's name. The product detail page sets this via a client-side setter component rendered alongside the server-rendered content (a tiny client component that calls a context setter in `useEffect`).
- Message logic:
  - If a product name is set (i.e. on a product detail page): `Hi, I am interested in [Product Name] and would like to request a quote.`
  - Otherwise (home, about, contact, listing pages, etc.): `Hi, I am interested in your products and would like to request a quote.`
- Existing on-site `/get-quote` links and "Request a Quote"/"Get a Quote" buttons are untouched — this CTA is additive, WhatsApp-specific.

## Out of scope

- No new npm dependencies.
- No changes to the on-site inquiry form (`InquiryForm.tsx`) or `/get-quote` page flow.
- No real photography — placeholders + a prompts list only, per client's own request.
- No changes to admin image upload / product CRUD forms beyond the color sweep.
