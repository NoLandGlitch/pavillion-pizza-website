# QA Checklist — Pavillion Ristorante & Pizzeria Redesign

Status key: ✅ Done · ⏳ Pending build (site not yet connected to Wix —
see `WIX_SETUP.md`) · ⚠️ Blocked on owner confirmation (see
`CONTENT_NEEDED.md`)

## Content accuracy (checkable now, before any Wix build)

- [x] ✅ **No invented prices** — every price in `menu-import.csv` was
      extracted directly from `pavillionpizza.com/menu`; none estimated.
- [x] ✅ **No invented hours** — the 3 hours lines used throughout are
      exactly what `pavillionpizza.com/hours-and-locations` states.
- [x] ✅ **No invented reviews/testimonials** — none exist on the current
      site; the redesign's testimonials section is built structurally but
      left disabled (see `WIX_EDITOR_BUILD_GUIDE.md` §5.8).
- [x] ✅ **No invented awards** — none were found or referenced anywhere.
- [x] ✅ **No invented history beyond what's sourced** — the Naples,
      Italy founder detail and 1998 founding date are both directly
      quoted from the current site's About page; no names, specific
      dates, or additional family history were added.
- [x] ✅ **No invented social media URLs** — Instagram/Twitter/Yelp links
      found on the current site were identified as generic Wix/platform
      placeholders (not real Pavillion accounts) and excluded; only the
      Facebook URL, which looks real and specific, is used pending
      confirmation.
- [x] ✅ **Menu import CSV validated** — 202 rows, 16 columns, no
      malformed rows, no duplicate slugs, all prices parse as valid
      numbers (validated with a CSV parser — see commit history).
- [x] ✅ **Stock photography sourced and documented** — 14 images in
      `IMAGE_SOURCES.md`, each with a source page, license, suggested
      placement, crop, filename, and alt text; none hotlinked.
- [ ] ⚠️ Menu prices re-confirmed as current by the owner before import
      (menus change — this is a point-in-time snapshot).
- [ ] ⚠️ Hours re-confirmed as current by the owner.
- [ ] ⚠️ Delivery area, ordering provider, catering details, logo file,
      real photography, payment methods, dietary claims, and
      accessibility contact — all pending per `CONTENT_NEEDED.md`.

## Build QA (pending — requires the site to be connected per `WIX_SETUP.md`)

### General
- [ ] ⏳ Run any available linting the generated Wix project provides
      (check `package.json` for a `lint` script once the repo exists).
- [ ] ⏳ Start local preview (`npm run dev`) and confirm it loads without
      console errors.
- [ ] ⏳ Check for broken imports in every Velo code file.
- [ ] ⏳ Confirm every element ID referenced in `WIX_EDITOR_BUILD_GUIDE.md`
      exists on its page exactly as named (`#headerOrderButton`,
      `#mobileCallButton`/`#mobileMenuToggle`, `#menuSearchInput`,
      `#categoryRepeater`, `#menuItemsRepeater`,
      `#featuredItemsRepeater`, `#cateringForm`, `#announcementBar`, and
      every other ID listed in the build guide).

### Links and buttons
- [ ] ⏳ Every nav link resolves to the correct page.
- [ ] ⏳ `#headerOrderButton`, `#heroOrderButton`, `#orderCallButton` all
      go to the correct destination (Order Online page or `tel:` link,
      per the confirmed ordering approach in `REDESIGN_PLAN.md` §5).
- [ ] ⏳ **Every phone number uses a `tel:` link** (`tel:+18566970240`) —
      header, hero, footer, Order Online page, Contact page.
- [ ] ⏳ **Directions links** open a correct Google Maps destination for
      211 South Harding Highway, Landisville, NJ 08326.
- [ ] ⏳ Footer social links: only Facebook present (or updated once real
      Instagram/Twitter/Yelp URLs are confirmed) — no link points at a
      generic Wix/platform homepage.
- [ ] ⏳ Footer Accessibility Statement and Privacy Policy links resolve
      (create simple pages for these if they don't exist).

### Menu functionality
- [ ] ⏳ Category navigation scrolls/filters correctly on desktop
      (sticky bar) and mobile (scrollable chips).
- [ ] ⏳ Search filters items by title and description, debounced, with
      no console errors.
- [ ] ⏳ Multi-size items (pizzas, calzones, stromboli) render as one
      grouped card with all sizes/prices, not duplicate cards.
- [ ] ⏳ Prices are clearly right-aligned/scannable at every breakpoint.
- [ ] ⏳ Featured styling appears only on the Margherita Pizza rows.
- [ ] ⏳ Availability toggle (`available = false`) visibly changes a
      card's state.
- [ ] ⏳ No "Order" button appears next to an item unless its
      `onlineOrderUrl` is populated (should be none, initially — see
      `REDESIGN_PLAN.md` §5).

### Forms
- [ ] ⏳ Catering form (`#cateringForm`) submits successfully, shows a
      success message that does not imply a confirmed order, and
      triggers an owner email notification (once the owner's email is
      supplied).
- [ ] ⏳ Contact form submits successfully with a clear success message.
- [ ] ⏳ Every form field has a visible, accessible label (not
      placeholder-only).
- [ ] ⏳ Spam protection is active on both forms (Wix Forms' built-in
      protection, confirmed on).

### Responsive design
- [ ] ⏳ Header/nav behavior checked at Large Desktop, Laptop, Tablet, and
      Mobile breakpoints — not just scaled down.
- [ ] ⏳ Long menu item names/descriptions (e.g. "Buffalo or BBQ Chicken
      Pizza," "White, with mozzarella, grilled chicken, and BBQ or hot
      buffalo sauce; blue cheese included with buffalo") wrap cleanly
      without breaking card layout at every breakpoint.
- [ ] ⏳ Touch targets (buttons, nav items, form fields) are comfortably
      sized on mobile (44×44px minimum).
- [ ] ⏳ Images crop sensibly at every breakpoint (no awkward cropping of
      key subjects).
- [ ] ⏳ Footer reflows to a usable single/double column on mobile.

### Accessibility
- [ ] ⏳ Heading hierarchy is correct on every page (one H1, logical
      H2/H3 nesting).
- [ ] ⏳ Full keyboard navigation works (tab order, no keyboard traps).
- [ ] ⏳ Focus states are visible on every interactive element.
- [ ] ⏳ Every image has descriptive alt text (per `IMAGE_SOURCES.md`).
- [ ] ⏳ Color contrast meets WCAG 2.2 AA (4.5:1 body text, 3:1 large
      text/UI) — spot-check the deep tomato red / warm cream / gold
      combinations specifically, since accent colors are the most likely
      to fail contrast if used for text.
- [ ] ⏳ No information is conveyed by color alone (e.g. the availability
      badge uses text, not just a red/green dot).
- [ ] ⏳ Reduced-motion preference is respected (disable/simplify any
      scroll animation for users with `prefers-reduced-motion`).

### CMS editability
- [ ] ⏳ A nontechnical user can add/edit a `MenuItems` row (price,
      description, availability) through the Wix CMS panel without
      touching code, and see it reflected on the live Menu page.
- [ ] ⏳ Same check for `MenuCategories` and (if used) `Announcements`.

### Publishing safety
- [ ] ⏳ Confirm the live `pavillionpizza.com` site is not overwritten
      until explicitly approved for publish.
- [ ] ⏳ Confirm DNS/domain settings were not touched.
- [ ] ⏳ Confirm redirects (`SEO_CONTENT.md`) are in place before any old
      URL is removed or renamed.

## Unresolved issues

- Order Online page cannot be finalized until the owner confirms whether
  a real ordering system exists or should be built fresh (see
  `REDESIGN_PLAN.md` §5, `CONTENT_NEEDED.md`).
- Catering page content is provisional (no real catering program was
  found on the current site) until the owner confirms actual offerings.
- Desserts category has zero real items — category card should stay
  hidden/marked "coming soon" until real items exist.
- Logo and real photography are outstanding — see `CONTENT_NEEDED.md`
  and `IMAGE_SOURCES.md`.
