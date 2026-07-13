# Feature Checklist — Client Requirements vs. Current State

Tracks the full feature list from `Requirements.md` and the client's WhatsApp
chat trail (psagriexports.com parity ask) against what's actually built.
Last updated: 2026-07-11.

## ✅ Done

- [x] Product listing/detail — specs, varieties, grades, packaging, MOQ, availability, related products, breadcrumb-style nav
- [x] Product schema.org + breadcrumb JSON-LD
- [x] WhatsApp floating button, click-to-call, click-to-email
- [x] Google Maps embed on Contact page
- [x] Certifications, gallery, news, products, leads — full admin CRUD
- [x] Basic admin dashboard (published products, total/new leads, published posts)
- [x] Catalogue PDF download button (component wired, file not yet uploaded)
- [x] News cover image upload (fixed RLS error — now via server action)
- [x] Admin theme CSS variables (fixed invisible Switch/Button/etc.)
- [x] Social links populated (Facebook/LinkedIn/YouTube/X) + footer visibility bug fixed
- [x] Payment Terms section (TT/LC)
- [x] Export Info section (FOB/CIF/CNF/EXW, JNPT/Mumbai port, shipping process)
- [x] Product fields: HS Code, Loading Capacity, Supply Capacity/Month
- [x] Social share buttons (WhatsApp/FB/LinkedIn/X/Email/Copy Link) on product & news pages

## 🟡 Partial — exists but not admin-manageable

- [ ] Hero banner — single static image only; no video, no multi-slide, no admin control
- [ ] Export Markets — hardcoded country list, no domestic-markets split, not DB-driven
- [ ] Site settings (phone/email/logo) — static code file; changing requires a code edit + redeploy
- [ ] Product images — only first image shown on detail page, no gallery/carousel, no zoom

## ❌ Missing

### Frontend
- [ ] Image zoom/magnifier on product photos
- [ ] Testimonials section
- [ ] Trust-building copy sections (Farm-to-Port process, Cold Chain Logistics, Pre-shipment Inspection, Export Documentation Support)
- [ ] Language switcher (no i18n)
- [ ] Favicon — not verified as the actual Myra logo

### Admin panel
- [ ] Full dashboard: category count, weekly/monthly leads, recent leads list, gallery/certification counts, visitor stats, inquiry-by-country, WhatsApp/email inquiry split, notifications, quick shortcuts
- [ ] About Us / Contact Us / Terms & Conditions page editors (currently static code)
- [ ] Banner/slider management UI
- [ ] Meta title/description/keywords editor
- [ ] Logo/phone/email admin editor
- [ ] Sub-admin / team account creation (only 1 admin user exists)
- [ ] Bank details management (internal-only, for invoices/quotes)
- [ ] Visitor analytics reporting inside admin (GA4 env var exists, nothing surfaced in admin)
- [ ] Inquiry export to CSV/Excel
- [ ] Image watermarking

## Notes

- Everything in "Missing" under Admin panel needs new architecture (roles/auth, page-editor CMS, dashboard analytics) — these are phase-2 scoping items, not quick fixes.
- Frontend "Missing" items are mostly content/design decisions (banner video, testimonials copy, trust section copy) that need client input before building.
