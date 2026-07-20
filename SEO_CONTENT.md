# SEO Content Plan — Pavillion Ristorante & Pizzeria

All content below uses only verified facts (see `REDESIGN_PLAN.md` §1 and
`CONTENT_NEEDED.md`). No hours, prices, awards, or claims are invented.

## Page titles, meta descriptions, and URLs

### Home (`/`)
- **Title:** Pavillion Pizza | Pizza & Italian Food in Landisville, NJ
- **Meta description:** Enjoy pizza, subs, salads, pasta and Italian dinners at Pavillion Ristorante & Pizzeria in Landisville, New Jersey. Family-owned since 1998.
- **Primary H1:** Landisville's Neighborhood Pizzeria Since 1998

### Menu (`/menu`)
- **Title:** Menu | Pavillion Ristorante & Pizzeria, Landisville NJ
- **Meta description:** Browse the full menu at Pavillion Pizza — pizza, specialty pies, stromboli, subs, pasta, salads and more. Family-owned in Landisville, NJ since 1998.
- **Primary H1:** Our Menu

### Order Online (`/order-online`)
- **Title:** Order Online | Pavillion Ristorante & Pizzeria
- **Meta description:** Order pizza, subs, and Italian favorites for pickup or delivery from Pavillion Ristorante & Pizzeria in Landisville, NJ. Call (856) 697-0240.
- **Primary H1:** Order From Pavillion

### About (`/about`)
- **Title:** About Us | Pavillion Ristorante & Pizzeria Since 1998
- **Meta description:** Family-owned and serving Landisville, NJ since 1998. Learn the story behind Pavillion Ristorante & Pizzeria and our approach to Italian food.
- **Primary H1:** Our Story

### Catering (`/catering`)
- **Title:** Catering | Pavillion Ristorante & Pizzeria, Landisville NJ
- **Meta description:** Planning a party, office lunch, or family gathering? Pavillion Ristorante & Pizzeria in Landisville, NJ offers catering for your next event — request details today.
- **Primary H1:** Catering for Every Occasion

### Contact (`/contact`)
- **Title:** Contact & Hours | Pavillion Ristorante & Pizzeria
- **Meta description:** Visit Pavillion Ristorante & Pizzeria at 211 South Harding Highway, Landisville, NJ 08326. Call (856) 697-0240 or send us a message.
- **Primary H1:** Visit Us

## Image alt text (site-wide examples)

Full per-image list is in `IMAGE_SOURCES.md`. General pattern: describe
what's shown, not "photo of pizza" — e.g. "Close-up of a fresh cheese and
pepperoni pizza with melted cheese and crisp crust," never "Pavillion
Pizza's cheese pizza" (since these are stock images, not real Pavillion
photography — see `IMAGE_SOURCES.md`'s caution note).

## Local SEO recommendations

Work these phrases naturally into body copy — never as a keyword list or
repeated verbatim block (avoid keyword stuffing):

- "pizza in Landisville, NJ" — Home hero supporting text, Menu page intro
- "Italian restaurant in Landisville" — About page, Home "Our Story"
- "pizza near Buena, NJ" — footer service-area line or Contact page (only
  if the owner confirms Buena is genuinely within the service area — see
  `CONTENT_NEEDED.md` on delivery area)
- "pizza pickup in Landisville" — Order Online page
- "Italian dinners in Landisville" — Menu page (Pasta and Italian Dinners
  category intro)
- "local family-owned pizzeria" — About page, footer tagline

## Structured data recommendations

Implement via Wix's SEO/structured-data settings or a JSON-LD script
added through Velo (`wixSeo` API in a page's `.onReady()`), using only
verified fields:

### `Restaurant` / `LocalBusiness`

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Pavillion Ristorante & Pizzeria",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "211 South Harding Highway",
    "addressLocality": "Landisville",
    "addressRegion": "NJ",
    "postalCode": "08326",
    "addressCountry": "US"
  },
  "telephone": "+1-856-697-0240",
  "servesCuisine": ["Italian", "Pizza"],
  "priceRange": "$$",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "11:00", "closes": "20:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday","Saturday"], "opens": "11:00", "closes": "21:00" }
  ]
}
```

Notes:
- `priceRange: "$$"` is a reasonable inference from the menu's actual
  price points (most entrees $11–$21) — confirm with the owner before
  publishing if you'd rather omit it than estimate.
- Sunday is intentionally omitted from `openingHoursSpecification`
  (closed) rather than listed with a closed marker — either approach is
  valid schema.org usage; omission is simplest.
- Do not add `aggregateRating`/`review` structured data until real
  reviews exist (see `CONTENT_NEEDED.md`) — fabricated or placeholder
  rating markup is a Google guidelines violation, not just a content
  problem.
- Do not add a `servesCuisine` value or menu URL claim beyond what's
  verified. `hasMenu` can point to the `/menu` page URL once live.

### `Menu` (optional, on the Menu page)

If implemented, `hasMenu` should reference the live `/menu` page URL
rather than embedding the entire 202-item menu as structured data inline
— Google's guidance favors a linked, crawlable HTML menu (which the CMS-
driven Menu page already is) over duplicating it in JSON-LD.

## Redirect recommendations

If any current URLs change during the rebuild, set 301 redirects (via
Wix's URL Redirect Manager) so existing links/bookmarks/search rankings
aren't lost:

| Current URL | New URL | Redirect needed? |
| --- | --- | --- |
| `/menu` | `/menu` | No — unchanged |
| `/about` | `/about` | No — unchanged |
| `/hours-and-locations` | `/contact` | **Yes** — content is merging into the Contact page |
| `/reservations` | *(no direct replacement planned)* | Confirm with owner whether reservations are still offered; if the page is dropped, redirect to `/contact` rather than 404 |
| `/meals-deals` | *(no direct replacement planned — no real content was found there)* | Redirect to `/menu` rather than 404 |
| `/order-online` | `/order-online` | No — unchanged |
| `/account/my-account` (Pavillion Pizza Club) | N/A | Out of scope for this redesign — confirm with owner whether this loyalty feature is still active before deciding whether to keep, redirect, or remove |

Set these up in Wix's **Marketing & SEO → URL Redirect Manager** once the
new page structure is live — do this before removing/renaming any old
page, not after, to avoid a gap where old links 404.
