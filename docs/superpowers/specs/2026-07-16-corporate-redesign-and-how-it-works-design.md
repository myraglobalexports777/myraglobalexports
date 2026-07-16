# Corporate Redesign + "How It Works" Section — Design

## 1. Goal

Replace the site's current cream/gold/serif-italic theme with a strict
white / navy / steel-grey / dark-slate corporate palette, enforce a
non-italic Playfair Display heading hierarchy and Montserrat button
type, and add a new animated 8-step "How It Works" timeline section on
the homepage, directly before the footer.

Scope: all public pages **and** the admin panel.

## 2. Design tokens

`src/app/globals.css` + `tailwind.config.ts`:

- `--background` / body bg → `#FFFFFF`.
- `navy` → `#1C3D69` (existing brand-green value, renamed/reused) — headings, header bg, footer bg.
- `steel` → `#707B7C` — content boxes, highlight panels, product-card "VIEW DETAILS" buttons.
- `slate` → `#2F4F4F` (Dark Slate Grey) — primary/global CTA buttons (Get a Quote, WhatsApp Us, Contact Us, hero CTA, admin primary actions).
- Remove `cream`, `fog`, `stone`, `bark`, `brand-gold` tokens; replace all usages (~20 files) with the tokens above or neutral grays for body text (`neutral-800`/`neutral-600`).
- Admin tokens (`--admin-bg`, `--admin-sidebar`, `--admin-accent`, etc.) remapped onto the same navy/steel/slate/white palette — no separate gold accent.

### Reconciling button color instructions

The brief specifies two things that would conflict if applied globally:
CTA buttons = Dark Slate Grey (general instruction), and product
"VIEW DETAILS" buttons = Steel Grey (specific instruction). Resolution:
product-card action buttons use Steel Grey exactly as specified in the
detailed button section; all other CTA buttons site-wide (hero,
contact, inquiry, admin, the new section's final CTA) use Dark Slate
Grey. This keeps every explicit instruction satisfied in its own
stated context.

## 3. Typography

- Headings: Playfair Display (swap out Fraunces), loaded via
  `next/font/google`, **normal style only** (no italic weight loaded,
  no `italic` class used anywhere in the codebase).
  - Section titles: `text-[26px] md:text-[28px] font-semibold`.
  - Product names: `text-[18px] md:text-[20px] font-semibold` (smaller than section titles).
- Body/buttons: Montserrat (swap out Plus Jakarta Sans), weights 400/500/600.
- Buttons specifically: Montserrat, 14–16px, semibold, uppercase where copy calls for it (e.g. "VIEW DETAILS").

## 4. Component sweep

- `Header.tsx`, `Footer.tsx`: solid navy background, white text/logo.
- `ProductsSection.tsx` (and any product card component): steel-grey
  "VIEW DETAILS" button, white text, `rounded-md` (6–8px), `py-3 px-6`,
  bottom-left aligned within the card.
- All other buttons across home sections, forms, and admin: dark
  slate grey background, white text, same radius/padding conventions.
- Any orange/yellow accent remnants removed.

## 5. New "How It Works" section

- New component: `src/components/home/HowItWorksSection.tsx`.
- Rendered on the homepage immediately before `Footer`.
- Content: verbatim 8-step copy supplied by the user (Send Your
  Inquiry → After-Sales Support), each with a lucide-react icon,
  numbered navy circle, connecting vertical line.
- Scroll animation: `IntersectionObserver`-based reveal per step,
  reusing the existing `fade-up` Tailwind keyframe/animation already
  defined in `tailwind.config.ts` (no new animation library added).
- Ends with the final CTA block: "Ready to Import Premium Agricultural
  Products from India?" copy + three buttons (Get a Quote, WhatsApp
  Us, Contact Us) styled per the dark-slate CTA rule above.
- Mobile: identical full vertical timeline (no accordion/condensing),
  narrower spacing and type scale.
- Fully responsive, matches surrounding section width/padding
  conventions already used by sibling home components.

## 6. Out of scope

- No new animation dependency (framer-motion etc.) — CSS + IntersectionObserver only.
- No content/copy changes beyond what's specified.
- No restructuring of unrelated sections beyond palette/type/button token swaps.
