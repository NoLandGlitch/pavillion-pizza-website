# Redesign Plan — Pavillion Ristorante & Pizzeria

## 0. Project status

This repository is **not yet connected to a live Wix Studio site** —
see `WIX_SETUP.md` for the exact connection steps. Everything in this
document is planning and content work that doesn't require that
connection; the actual Velo code, CMS collections, and pages get built
following `WIX_EDITOR_BUILD_GUIDE.md` once the connection exists.

## 1. Inspection summary

### Current site
`https://www.pavillionpizza.com/` — confirmed built on Wix ("Powered and
secured by Wix" in the footer). No local repository or Wix project
connection existed anywhere on this machine prior to this redesign
effort.

### Verified facts (safe to reuse)
- **Business name:** Pavillion Ristorante & Pizzeria
- **Address:** 211 South Harding Highway, Landisville, NJ 08326
- **Phone:** (856) 697-0240
- **Fax:** (856) 697-2140
- **Established:** 1998 ("Serving Great Pizza Since 1998")
- **Ownership:** Family-owned. Founders "Born and Raised in Naples,
  Italy" (from the current site's About page — this is the only
  Italy/Naples claim available, and it's real, not invented).
- **Hours** (from `/hours-and-locations`, needs a freshness check —
  see `CONTENT_NEEDED.md`):
  - Monday – Thursday: 11 am – 8:00 pm
  - Friday & Saturday: 11 am – 9 pm
  - Sunday: Closed
- **Service model:** "EAT IN - PICK UP - DELIVERY" (delivery area/fees
  unverified — see `CONTENT_NEEDED.md`)
- **Full current menu:** extracted in complete detail — see
  `menu-import.csv` (202 line items across 7 categories, exact current
  prices, exact descriptions).
- **Facebook:** `https://www.facebook.com/people/Pavillion-Pizza/61551833757232/`
  (looks like a real, specific page — confirm it's current before reuse)

### Findings that change the plan
- **The current "Order Now" link is broken/unconfigured** — it points to
  `https://www.wix.com/templateslp/links`, a generic Wix template
  placeholder, not a working ordering page. **There is no evidence of a
  currently functioning online ordering system on the live site.** The
  Order Online page in this redesign will be built as a
  phone-forward/pending page (see section 5) rather than assuming an
  existing integration to preserve — there is nothing working to
  preserve. This must be confirmed with the owner before final build;
  see `CONTENT_NEEDED.md`.
- **Instagram, Twitter/X, and Yelp footer links all point to generic Wix
  or platform-homepage URLs, not real Pavillion accounts.** Only
  Facebook looks like a real, specific link. The redesign will include
  only the Facebook link until real URLs are confirmed.
- **No catering page or catering content exists on the current site at
  all.** The Catering page in this redesign is new content, not a
  rebuild — see section 5 and `CONTENT_NEEDED.md`.
- **No reviews/testimonials exist on the current site.** The Home page's
  testimonials section will be built but left disabled (per the original
  brief's explicit instruction) until real reviews are supplied.
- **No desserts section exists on the current menu.** `menu-import.csv`
  contains zero dessert items — none were invented. The Desserts card/
  category will exist in the site structure per the brief but should
  stay hidden or clearly marked "coming soon" until real dessert items
  and prices are supplied.

## 2. Design system

| Token | Value | Use |
| --- | --- | --- |
| Deep tomato red | `#A92E26` | Primary accent, CTAs, headline highlights |
| Warm cream | `#F6F0E5` | Primary background |
| Charcoal | `#242220` | Body text, headings on light backgrounds |
| Olive green | `#536342` | Secondary accent (badges, dividers, icons) |
| Warm gold | `#C99A4A` | Tertiary accent (featured-item highlight, borders) |
| White | `#FFFFFF` | Card backgrounds, header background |

**Typography:**
- Headings: an elegant serif available in Wix's font library — recommend
  **Playfair Display** or **Fraunces** (both are Google Fonts available
  directly in the Wix Studio font picker under "All Fonts").
- Body/UI: a highly readable sans-serif — recommend **Inter** or
  **Work Sans** (both in Wix's font library). Use for navigation, menu
  descriptions, buttons, and prices.
- Minimum body text size: 16px. Menu prices/titles: 16–18px, bold weight
  for scannability. Maintain 4.5:1 contrast minimum for body text,
  3:1 for large text, per WCAG 2.2 AA.

**Visual language:** generous whitespace, rounded corners (8–12px on
cards/buttons), soft drop shadows (avoid harsh/dark shadows), large food
photography, minimal motion (simple fades/slide-ins on scroll, no
parallax, no autoplay video backgrounds).

## 3. Site structure

| Page | URL slug | Purpose |
| --- | --- | --- |
| Home | `/` | Overview, hero, popular categories, featured dishes, story teaser, catering teaser, location |
| Menu | `/menu` | Full CMS-driven menu with search/filter |
| Order Online | `/order-online` | Ordering explanation + CTA (see section 5 — pending provider confirmation) |
| About | `/about` | Story, approach to food, family/community, visit us |
| Catering | `/catering` | Catering pitch + request form (new content) |
| Contact | `/contact` | Address, hours, map, contact form |

**Navigation (desktop):** Home · Menu · Order Online · About · Catering
· Contact, with a persistent "Order Online" button and click-to-call
phone number in the header.

**Navigation (mobile):** hamburger menu with the same 6 links, plus
persistent bottom or header-anchored actions: Call Now, View Menu, Order
Online.

## 4. CMS collections

### `MenuItems`

| Field | Type | Notes |
| --- | --- | --- |
| title | Text | Item name |
| slug | Text (unique) | URL-safe identifier |
| category | Text | One of the 8 site categories (see `MenuCategories`) |
| subcategory | Text | Optional grouping within a category (e.g. "Cold Subs" within "Subs and Sandwiches") |
| description | Text | |
| price | Number | |
| secondaryPrice | Number | Reserved for a genuine 2-price item; unused in the current import (see note below) |
| priceLabel | Text | Size/variant label (e.g. "Small", "Large", "Sicilian") |
| image | Image | Uploaded via Media Manager, referenced by field |
| imageAlt | Text | Required whenever `image` is set |
| dietaryLabels | Tags/Text | Left empty in the initial import — see `CONTENT_NEEDED.md` |
| spiceLevel | Text | Left empty in the initial import |
| available | Boolean | Defaults `TRUE` |
| featured | Boolean | `TRUE` only for Margherita Pizza (the one item the current site explicitly calls a "fan favorite") |
| displayOrder | Number | Sort order within category/subcategory |
| onlineOrderUrl | Text/URL | Left empty until an ordering provider is confirmed |

**Multi-size items are one row per size**, not packed into
`price`/`secondaryPrice`/`priceLabel` as a single row. With sizes running
up to 4 deep (Small/Medium/Large/Sicilian on most pizzas), a 2-price
schema can't represent them on one row without inventing more fields.
Keeping one row per size/price point makes every row a single orderable
SKU and keeps the Velo grouping logic (below) uniform across every
category. `secondaryPrice` stays in the schema as specified and is
simply unused by the current data — a future item that genuinely has
exactly two options (e.g. a bundled combo) can use it directly.

**Menu page rendering:** items sharing the same `title` + `category` are
grouped into one visual card with multiple size/price rows, sorted by
`displayOrder`. See `WIX_EDITOR_BUILD_GUIDE.md` for the exact repeater/
grouping implementation and example Velo code.

### `MenuCategories`

| Field | Type | Notes |
| --- | --- | --- |
| title | Text | |
| slug | Text (unique) | |
| description | Text | Short category blurb |
| image | Image | Category card image |
| displayOrder | Number | |
| active | Boolean | `FALSE` for Desserts until real items exist |

Seed rows (`displayOrder` in parens):

1. Pizza (10)
2. Specialty Pizza (20)
3. Stromboli and Calzones (30)
4. Subs and Sandwiches (40)
5. Pasta and Italian Dinners (50)
6. Salads (60)
7. Appetizers (70)
8. Desserts (80) — `active: FALSE`, no items yet

## 5. Order Online page — decision plan

Per the inspection finding above (no working ordering system found), and
the explicit instructions to never fabricate a checkout or replace a
working integration without documenting risk:

**Default build (until the owner confirms otherwise):** the Order Online
page explains pickup/dine-in/delivery in general terms (using only the
verified hours and address), and its primary call to action is
**"Call to Order" (`tel:+18566970240`)** rather than a broken or fabricated
"Place Order" button. If the owner confirms a real ordering system (Wix
Online Ordering already set up elsewhere in the account, or a third-party
provider), replace the phone-forward CTA with a real link/embed to that
system — this is a one-element change once confirmed, not a rebuild.

**Never build:** a custom checkout form, a fake "add to cart," or any
page that collects payment/card information directly — all explicitly
disallowed by the project brief regardless of what's confirmed.

## 6. Velo architecture (build once connected — see `WIX_SETUP.md`)

| Concern | Where it lives |
| --- | --- |
| Menu load/filter/search | Page code on Menu page, reading from `MenuItems`/`MenuCategories` datasets |
| Featured items query | Page code on Home page, filtered `MenuItems` where `featured = true` |
| Announcement bar content | Either a lightweight `Announcements` CMS collection (title, message, active, startDate, endDate) or site-wide custom element — recommend the collection approach so the owner can edit it without touching code |
| Catering form handling | Wix Forms (native), optionally a `public` module for shared validation helpers if custom validation beyond Wix Forms' built-ins is needed |
| Business hours display | Either hardcoded per verified hours (simplest, and hours change rarely) or a small `Hours` collection if the owner wants day-by-day editability without a code change |

Full field-by-field build steps, element IDs, and example code snippets:
`WIX_EDITOR_BUILD_GUIDE.md`.

## 7. What's deliberately not built yet

- Actual Velo `.js`/`.jsw` files — these need to live inside the real
  Wix-generated project structure (see `WIX_SETUP.md` step 4), not this
  planning folder, so they aren't invented against a guessed file layout.
- Actual CMS collections in a live Wix site — the schemas above are the
  spec; `WIX_EDITOR_BUILD_GUIDE.md` walks through creating them for real.
- Any content marked unverified in `CONTENT_NEEDED.md`.

## 8. Sequence of work once Wix is connected

1. Complete `WIX_SETUP.md`.
2. Create the `MenuItems` and `MenuCategories` collections
   (`WIX_EDITOR_BUILD_GUIDE.md` § CMS setup).
3. Import `menu-import.csv`.
4. Build Home, Menu, About, Contact first (verified content only).
5. Build Order Online per section 5's decision plan.
6. Build Catering with the "confirm availability by request" framing
   until real catering details are supplied.
7. Wire up header/footer, forms, SEO settings (`SEO_CONTENT.md`).
8. Run `QA_CHECKLIST.md` in full before requesting a publish.
