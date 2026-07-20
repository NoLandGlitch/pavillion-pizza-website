# Wix Studio Build Guide — Pavillion Ristorante & Pizzeria

Step-by-step instructions for building this redesign inside Wix Studio.
**Prerequisite: complete `WIX_SETUP.md` first** — this guide assumes you
have a live Wix Studio site with Dev Mode/Velo on and a working local
preview.

Every section below is written as manual Wix Studio editor work (drag,
drop, configure in the panel) plus, where Velo is genuinely needed, the
code to add in the corresponding code file. This guide does not claim any
of this has been visually assembled for you — it's the precise
instructions to do it yourself in the editor, per the project's own
requirement to be honest about what was and wasn't built directly.

---

## 1. Set responsive breakpoints

Wix Studio ships with default breakpoints (Desktop, Tablet, Mobile).
Before building any page:

1. Open the **Breakpoints** panel (top toolbar).
2. Confirm/add: **Large Desktop** (1400px+), **Laptop** (1024–1399px),
   **Tablet** (768–1023px), **Mobile** (up to 767px) — Wix Studio's
   default breakpoint set already covers this; just confirm the exact
   pixel ranges match your design intent before building sections, since
   every section you build should be checked against all four.
3. Build desktop-first, then switch to each smaller breakpoint and
   **adjust layout, not just scale** — reflow multi-column sections to
   single-column, resize touch targets to at least 44×44px, and shorten
   or re-wrap long headlines. Do not rely on Wix's automatic scaling
   alone for anything containing text or buttons.

## 2. Create the CMS collections

### `MenuCategories`

1. Open the **CMS** panel (Content Manager) → **+ New Collection**.
2. Name it `MenuCategories`.
3. Add fields exactly as specified in `REDESIGN_PLAN.md` §4:
   `title` (Text), `slug` (Text, set as unique), `description` (Text),
   `image` (Image), `displayOrder` (Number), `active` (Boolean).
4. Set collection permissions: **Content** → "Anyone" can read;
   "Admin" only can write (this is a content-editable-by-owner
   collection, not a user-submitted one).
5. Manually add the 8 rows listed in `REDESIGN_PLAN.md` §4 (or use
   **Import CSV** if you prepare a `menu-categories-import.csv` — not
   included in this repo since it's only 8 rows; add manually).

### `MenuItems`

1. **+ New Collection** → name it `MenuItems`.
2. Add every field listed in `REDESIGN_PLAN.md` §4: `title` (Text),
   `slug` (Text, unique), `category` (Text), `subcategory` (Text),
   `description` (Text), `price` (Number), `secondaryPrice` (Number),
   `priceLabel` (Text), `image` (Image), `imageAlt` (Text),
   `dietaryLabels` (Tags), `spiceLevel` (Text), `available` (Boolean),
   `featured` (Boolean), `displayOrder` (Number), `onlineOrderUrl`
   (Text/URL).
3. Same permissions as above: public read, admin write.
4. **Import `menu-import.csv`:**
   - In the collection's toolbar, choose **Import Content → From CSV**.
   - Upload `menu-import.csv` from this repo.
   - Map each CSV column to its matching field (Wix should auto-match by
     name since the header row matches the field names exactly).
   - Confirm the `available`/`featured` boolean columns map as
     TRUE/FALSE correctly, and `price`/`secondaryPrice`/`displayOrder`
     map as Number fields, not Text.
   - Run the import. You should see 202 items land in the collection —
     cross-check the count against `menu-import.csv`'s row count.
5. **Upload images** for the items/categories that have a filename
   referenced in `IMAGE_SOURCES.md` (via **Media Manager** — drag the
   downloaded, renamed files in), then go back into each corresponding
   `MenuItems`/`MenuCategories` row and set its `image` field to the
   uploaded asset, and fill `imageAlt` with the alt text from
   `IMAGE_SOURCES.md`. Most menu items will not have a dedicated image —
   that's expected; only the handful referenced in `IMAGE_SOURCES.md`
   and `menu-import.csv`'s `image` column need one for this first pass.

### (Optional) `Announcements`

If you want the announcement bar editable without a code change:

1. **+ New Collection** → `Announcements`.
2. Fields: `message` (Text), `active` (Boolean), `startDate` (Date),
   `endDate` (Date), `linkUrl` (Text/URL, optional).
3. Public read, admin write.

## 3. Global Header

1. Go to the site's **Header** (edit via any page — headers are shared).
2. Add a **Container** for the logo area (left), navigation (center), and
   actions (right) — use a Wix Studio **horizontal stack/flex container**
   so it reflows naturally at breakpoints rather than a fixed-position
   layout.
3. **Logo:** add a Text element or Logo element with "Pavillion
   Ristorante & Pizzeria" — replace with the real logo image once
   supplied (see `CONTENT_NEEDED.md`). Element ID: `#logoText` (or
   `#logoImage` once a real logo file is in place).
4. **Navigation:** add a Menu element with the 6 links (Home, Menu, Order
   Online, About, Catering, Contact). Element ID: `#mainNav`.
5. **Order Online button:** add a Button, label "Order Online," link to
   `/order-online`. **Element ID: `#headerOrderButton`.** Style with the
   deep tomato red (`#A92E26`) background, white text, rounded corners.
6. **Click-to-call (desktop only):** add a Text/Button element showing
   "(856) 697-0240," linked as `tel:+18566970240`. **Element ID:
   `#headerCallLink`.** Hide this element at the Mobile breakpoint (use
   the breakpoint visibility toggle) — mobile gets its own persistent
   call action instead (§5).
7. **Sticky behavior:** select the header container → **Scroll Effects**
   → **Stick to top**. Keep the sticky header's height compact (shrink
   the logo/nav padding in a "scrolled" state if Wix Studio's sticky
   settings expose that option, so it doesn't consume excessive vertical
   space on small screens).
8. **Mobile nav:** add a hamburger/menu icon element (Wix Studio's
   built-in mobile menu component), configured to open the same 6 links
   in an overlay. Element ID: `#mobileMenuToggle`.

## 4. Global Footer

1. Add a multi-column container (reflows to single column on mobile):
   - **Column 1:** Restaurant name, address (as plain text, not an
     image, for accessibility/SEO), click-to-call phone number
     (`tel:+18566970240`).
   - **Column 2:** Business hours (the 3 verified lines from
     `REDESIGN_PLAN.md` §1 — do not add hours not listed there).
   - **Column 3:** Navigation links (Menu, Order Online, Catering,
     Contact).
   - **Column 4:** Social links — **Facebook only** for now (see
     `CONTENT_NEEDED.md`); add Instagram/Twitter/Yelp icons only once
     real URLs are supplied.
2. **Map:** embed a Wix Maps element or Google Maps embed pointed at
   211 South Harding Highway, Landisville, NJ 08326. Element ID:
   `#footerMap`.
3. **Bottom bar:** copyright notice (`© [current year] Pavillion
   Ristorante & Pizzeria. All rights reserved.` — use Wix's dynamic year
   text if available so it doesn't go stale), plus text links to an
   Accessibility Statement and Privacy Policy page (create simple content
   pages for these if they don't exist yet — flagged as needed in
   `CONTENT_NEEDED.md` for the accessibility contact specifically).

## 5. Home page

Build sections top to bottom exactly as `REDESIGN_PLAN.md` describes.
Use a **Section** container per numbered block below so each can be
independently reordered/hidden later.

1. **Announcement bar** (`#announcementBar`): thin full-width bar above
   the header. If using the `Announcements` collection, connect a
   **Dataset** (`#announcementDataset`) filtered to `active = true`,
   sorted by `startDate` descending, limit 1; bind a Text element to
   `message` and make the whole bar a link if `linkUrl` is set. If
   skipping the collection for now, use a plain Text element the owner
   edits directly in the editor.
2. **Hero section:** full-width image container using
   `pavillion-cheese-pepperoni-pizza-hero.jpg` (from `IMAGE_SOURCES.md`)
   as the background, with a headline, supporting text, and 4 actions:
   - Headline (H1): "Landisville's Neighborhood Pizzeria Since 1998"
   - Supporting text: "Family-owned Italian favorites, freshly made
     pizza, hearty dinners, subs, salads and more."
   - Primary button "Order Online" → `/order-online`. Element ID:
     `#heroOrderButton`.
   - Secondary button "View Our Menu" → `/menu`. Element ID:
     `#heroMenuButton`.
   - "Call (856) 697-0240" → `tel:+18566970240`. Element ID:
     `#heroCallLink`.
   - "Get Directions" → a Google Maps directions URL for the verified
     address. Element ID: `#heroDirectionsLink`.
3. **Quick info bar:** a row of 4–5 short items (Family-owned since 1998
   · Dine-in · Pickup · Delivery *(only if confirmed — see
   `CONTENT_NEEDED.md`)* · Address · Phone) as icon+text pairs in a
   horizontal container that wraps to 2 columns on mobile.
4. **Popular menu categories:** a **Repeater** (`#categoryRepeater`)
   connected to a Dataset (`#categoryDataset`) reading from
   `MenuCategories` where `active = true`, sorted by `displayOrder`.
   Each repeater item: category image, title, short description, and a
   click action that navigates to `/menu?category={slug}` (or, simpler,
   to `/menu` with an in-page anchor/filter set via `wixLocation` query
   params — see the Menu page's code in §7 for how that's read).
5. **Featured dishes:** a **Repeater** (`#featuredItemsRepeater`)
   connected to a Dataset (`#featuredItemsDataset`) filtered to
   `MenuItems` where `featured = true`, sorted by `displayOrder`. With
   the current data this shows the 4 Margherita Pizza size rows — group
   them in the repeater item design (one card, 4 price rows) using the
   same grouping approach as the Menu page (§7), not 4 separate cards.
6. **Our story section:** headline + body text using only the verified
   facts from `REDESIGN_PLAN.md` §1 (family-owned, established 1998,
   founders born and raised in Naples, Italy, local Landisville
   community). Pair with `hand-tossed-dough-prep.jpg` or
   `fresh-italian-ingredients.jpg` from `IMAGE_SOURCES.md`.
7. **Catering promotional section:** headline, short pitch, event-type
   icons/list (parties, family gatherings, office lunches, team events,
   celebrations), and a button "Request Catering Information" →
   `/catering`. Element ID: `#homeCateringButton`. Do not state specific
   catering services/pricing here — that's gated behind confirmation per
   `CONTENT_NEEDED.md`.
8. **Testimonials section:** build the section container and repeater
   structure (`#testimonialsRepeater` connected to a `Testimonials`
   collection you can create with `quote`/`author`/`rating`/`active`
   fields), but **set the section to Hidden** (Wix Studio's
   show/hide-on-publish toggle, not just visually scrolled past) until
   real reviews exist. Do not populate it with placeholder or fabricated
   quotes.
9. **Location section:** address, phone, hours (verified only), a map
   (`#locationMap`), "Get Directions" button, "Call Now" button.

## 6. Menu page

1. **Category navigation:** a horizontal repeater/menu bar
   (`#categoryNavBar`) listing the 8 `MenuCategories` (desktop: sticky
   under the header via Scroll Effects; mobile: horizontally scrollable
   chip row — set the container's overflow to scroll and disable wrap).
   Clicking a category scrolls to that section's anchor (use
   `wixWindow.scrollTo()` in code, or native anchor links if the
   container supports it) and updates the active-chip styling.
2. **Search:** a text input, **Element ID: `#menuSearchInput`**, with a
   debounce (see code below) that filters `#menuItemsRepeater`'s dataset
   by `title`/`description` contains the query.
3. **Menu items repeater:** **Element ID: `#menuItemsRepeater`**,
   connected to a Dataset (`#menuItemsDataset`) reading `MenuItems`
   sorted by `category`, then `subcategory`, then `displayOrder`. Design
   the repeater item as a card: title, description, dietary
   label badges (if present), and a right-aligned price column. For
   items with multiple size rows sharing the same `title`+`category`
   (see grouping code below), show all sizes/prices in one card rather
   than duplicate cards.
4. **Availability:** bind each card's visual state to `available` —
   when `false`, apply a muted style and an "Currently Unavailable"
   label instead of a price/order action.
5. **Order Online CTA:** only show a per-item "Order" action if
   `onlineOrderUrl` is non-empty for that item (which, per
   `REDESIGN_PLAN.md` §5, is currently empty for all 202 imported items
   until a real provider is confirmed) — otherwise show nothing extra on
   the card (the page-level Order Online button in the header/hero
   already covers the general case).

### Example Velo code — Menu page (`src/pages/Menu.js` or similar, per your generated project's page file naming)

```javascript
// Paste into the Menu page's code panel. Element IDs referenced below
// must exist on the page exactly as named — see steps 1-3 above.
import { local } from "wix-storage";

let allItems = [];       // full MenuItems dataset, loaded once
let searchTimeout;

$w.onReady(function () {
  $w("#menuItemsDataset").onReady(() => {
    allItems = $w("#menuItemsDataset").getItems(0, 1000).items;
    renderGroupedItems(allItems);
  });

  $w("#menuSearchInput").onInput((event) => {
    clearTimeout(searchTimeout);
    const query = event.target.value.trim().toLowerCase();
    searchTimeout = setTimeout(() => {
      const filtered = query
        ? allItems.filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              (item.description || "").toLowerCase().includes(query)
          )
        : allItems;
      renderGroupedItems(filtered);
    }, 250); // debounce so we don't re-filter on every keystroke
  });
});

// Groups same-title+category rows (the multiple pizza sizes, etc.) into
// one card with several price rows, instead of one card per CSV row.
function renderGroupedItems(items) {
  const groups = new Map();
  for (const item of items) {
    const key = `${item.category}::${item.title}`;
    if (!groups.has(key)) {
      groups.set(key, { ...item, sizes: [] });
    }
    groups.get(key).sizes.push({
      label: item.priceLabel || "",
      price: item.price,
    });
  }
  $w("#menuItemsRepeater").data = Array.from(groups.values());
}

// Repeater item renderer — bind text/price elements inside each card.
$w("#menuItemsRepeater").onItemReady(($item, itemData) => {
  $item("#itemTitle").text = itemData.title;
  $item("#itemDescription").text = itemData.description || "";
  $item("#itemAvailabilityBadge").text = itemData.available
    ? ""
    : "Currently Unavailable";
  $item("#itemAvailabilityBadge").collapsed = itemData.available;

  // Render one price line per size (or a single price if there's only one).
  const priceText = itemData.sizes
    .map((s) => (s.label ? `${s.label}: $${s.price.toFixed(2)}` : `$${s.price.toFixed(2)}`))
    .join("   ");
  $item("#itemPrice").text = priceText;
});
```

## 7. Order Online page

1. Sections: "Pickup" and "Dine-in" info blocks (verified hours only),
   a "Call to Order" primary button (`tel:+18566970240`, **Element ID:
   `#orderCallButton`**), and — only once confirmed per
   `CONTENT_NEEDED.md` — a real ordering system link/embed.
2. Do not add a checkout form, cart, or payment field of any kind on
   this page.

## 8. About page

Sections per `REDESIGN_PLAN.md`: Our Story, Serving Landisville Since
1998, Our Approach to Food, Family and Community, Visit Us. Use verified
facts only (§1). Add clearly labeled photo placeholders (e.g. a bordered
container with overlay text "Add a real photo of the dining room here")
wherever a stock image stands in — see `IMAGE_SOURCES.md`'s caution
about not implying stock photos are real Pavillion photography.

## 9. Catering page

1. Sections: intro message, event types, popular food categories (drawn
   from menu categories, not invented catering-specific dishes), a
   notice that "Final availability and pricing are confirmed by phone
   or request," the request form, and a "Call Us" fallback.
2. **Form (Element ID: `#cateringForm`):** build with **Wix Forms**, not
   custom Velo form handling — this gets you built-in spam protection,
   validation, and submission storage for free. Fields: Name, Email,
   Phone, Event Date, Event Time, Guest Count, Event Type (dropdown),
   Pickup or Delivery (radio), Requested Dishes (long text), Budget
   Range (dropdown or text), Additional Details (long text).
3. Set every field's **Label** properly (Wix Forms does this by default
   when you name the field — don't rely on placeholder text alone as the
   label, for accessibility).
4. **Success message:** something like "Thanks — we've received your
   request and will follow up to confirm availability and pricing." Do
   **not** say anything implying the submission is a confirmed order.
5. Connect form submissions to an email notification (Wix Forms' built-in
   "Get notified" setting) to the owner's email — needs the owner's real
   email address (see `CONTENT_NEEDED.md`).

## 10. Contact page

1. Sections: address, phone, verified hours, contact form (**Element ID:
   `#contactForm`**, Wix Forms with Name/Email/Phone/Subject/Message),
   map (`#contactMap`), "Get Directions" button, "Call Now" button,
   ordering support note, link to Catering page, Facebook link only.
2. Same Wix Forms approach as Catering — built-in validation and spam
   protection, accessible labels by default.

## 11. SEO settings

For each page, in the Wix Studio **SEO panel** (per-page, under Page
Settings → SEO):

1. Set the **Page Title** and **Meta Description** exactly as specified
   in `SEO_CONTENT.md`.
2. Confirm the **URL slug** matches `REDESIGN_PLAN.md` §3.
3. Under **Site SEO → Structured Data** (or via a Velo `wixSeo` call in
   the Home page's code, if the plan-level structured data editor
   doesn't expose Restaurant schema directly), add the JSON-LD from
   `SEO_CONTENT.md`.
4. Set up redirects listed in `SEO_CONTENT.md` under **Marketing & SEO →
   URL Redirect Manager** — do this before unpublishing/renaming any old
   page.

## 12. Preview and publish

1. Run `npm run dev` (see `WIX_SETUP.md` §7) and click through every page
   on desktop, tablet, and mobile breakpoints.
2. Work through `QA_CHECKLIST.md` in full.
3. Only then, publish per `WIX_SETUP.md` §8 — and only when explicitly
   told to.
