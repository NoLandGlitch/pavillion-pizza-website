# Pavillion Ristorante & Pizzeria — Website Redesign

## 🔗 Live demo

**https://nolandglitch.github.io/pavillion-pizza-website/**

A static, fully responsive demo site (plain HTML/CSS/vanilla JS, no
framework, no build step) — see "Static Demo Site" below for what it is
and its limitations. This was added on top of the original Wix Studio
plan per an explicit later request; it is a **separate deliverable**,
not a replacement for the Wix work described in the rest of this README.

## Project purpose

A complete redesign of `pavillionpizza.com` (Pavillion Ristorante &
Pizzeria, 211 South Harding Highway, Landisville, NJ 08326, family-owned
since 1998). The original scope was **Wix Studio with Velo** — staying
editable by a nontechnical restaurant owner through the Wix Studio editor
and Wix CMS, not a standalone codebase. That plan is fully documented
below and in `WIX_SETUP.md`/`REDESIGN_PLAN.md`/`WIX_EDITOR_BUILD_GUIDE.md`
and is still the right path for a real production build.

**Current status of the Wix track: this repository is a planning and
content workspace, not yet connected to a live Wix Studio site.** See
`WIX_SETUP.md` for the exact steps to connect it. Everything else there —
the plan, the menu data, the image sourcing, the SEO content, the build
instructions — is ready to use the moment that connection exists.

## Static Demo Site (`docs/`)

A working, fully responsive static site lives in `docs/` and is what
GitHub Pages serves at the live demo link above. It reuses the exact same
verified content, menu data, design system, and sourced images as the
Wix plan — it's the same redesign, built as static HTML instead of Wix
pages, so it can be previewed instantly without a Wix account.

**What it includes:**
- All 6 primary pages (Home, Menu, Order Online, About, Catering,
  Contact) plus Accessibility and Privacy pages.
- The complete 202-item menu (generated from `menu-import.csv` into
  `docs/assets/js/menu-data.js`), grouped into 141 cards, with working
  client-side search and category navigation.
- The same design tokens as `REDESIGN_PLAN.md` §2 (colors, Playfair
  Display + Inter typefaces).
- Mobile-first responsive layout: sticky header with hamburger menu and
  a persistent Call/Menu/Order action bar on mobile; full nav and
  click-to-call on desktop. Verified with Playwright across 375px,
  820px, 1280px, and 1600px viewports — zero horizontal overflow, zero
  console errors, on every page.
- The 14 sourced images from `IMAGE_SOURCES.md`, actually downloaded
  (free-license only — one originally-listed candidate turned out to be
  an Unsplash+ premium photo and was swapped out before use; see
  `IMAGE_SOURCES.md` for the correction note).

**What it does *not* include (by design, since it's static):**
- **No real backend.** The Catering and Contact forms validate input
  client-side and show a demo success message, but nothing is actually
  sent anywhere. To make them functional, connect the `<form>` elements
  in `docs/catering.html`/`docs/contact.html` to a real form backend
  (e.g. [Formspree](https://formspree.io), Netlify Forms, or a custom
  endpoint) — see the comment at the top of `docs/assets/js/forms.js`.
- **No online ordering integration** — same as the Wix plan's finding:
  the current live site's own "Order Now" link is broken/unconfigured,
  so this demo's Order Online page is phone-forward by design (see
  `CONTENT_NEEDED.md`).
- **No CMS.** Menu content lives in a generated JS data file, not an
  editable database — a nontechnical owner cannot update it directly.
  This is the core tradeoff versus the Wix plan: static HTML is
  instantly previewable but isn't owner-editable the way Wix Studio +
  Wix CMS is. For a real production site the owner will actually
  maintain, follow the Wix plan instead.

### Local development (static site)

No build step or dependencies required:

```bash
cd docs
python3 -m http.server 8000
# then open http://localhost:8000/
```

To regenerate `assets/js/menu-data.js` after editing `menu-import.csv`,
see the Python snippet in the project's commit history (it reads the
CSV and writes the two `window.PAVILLION_MENU_*` arrays) — a proper
build script can replace this if the static site becomes the long-term
path rather than a demo.

### Deploying changes to the live demo

```bash
git add -A
git commit -m "..."
git push
```

GitHub Pages is configured to serve `docs/` from the `main` branch, so a
push to `main` republishes the live demo automatically (typically within
a minute or two) — there is no separate "publish" step for this static
site, unlike the Wix workflow below, which deliberately requires one.

## What's in this repository

| File | Purpose |
| --- | --- |
| `WIX_SETUP.md` | **Start here.** Exact steps to connect this project to a live Wix Studio site via GitHub Integration and the Wix CLI. |
| `REDESIGN_PLAN.md` | Inspection findings from the current live site, the design system, site structure, CMS collection schemas, and the build sequence. |
| `WIX_EDITOR_BUILD_GUIDE.md` | Step-by-step Wix Studio editor instructions — pages, sections, element IDs, datasets, repeaters, forms, SEO settings — plus example Velo code. |
| `menu-import.csv` | The complete current menu (202 items, all categories and sizes) extracted from the live site, formatted for the `MenuItems` CMS collection. |
| `IMAGE_SOURCES.md` | Real, licensed stock photography candidates (Unsplash/Pexels) with source, license, suggested placement, crop, and alt text — none hotlinked. |
| `SEO_CONTENT.md` | Page titles, meta descriptions, local SEO copy, structured data recommendations, and redirect plan. |
| `CONTENT_NEEDED.md` | Everything that must be confirmed by the owner before launch — nothing here was invented to fill a gap. |
| `QA_CHECKLIST.md` | What's already verified (content accuracy) vs. what's pending an actual Wix build. |
| `REDESIGN_PLAN.md` §7 | What was deliberately **not** built yet, and why. |

## Wix Studio requirements

- A Wix account with access to the Pavillion Pizza site (or permission to
  create a new Wix Studio site — see `WIX_SETUP.md` §1 for the
  tradeoffs).
- Wix Studio with **Dev Mode (Velo)** enabled.
- **GitHub Integration** connected from the Wix Studio Code panel.
- Node.js 18+ locally, for the Wix CLI.

## Local development commands

Once connected per `WIX_SETUP.md` (these run inside the **cloned
Wix-generated repository**, not this planning folder):

```bash
npm install     # install dependencies, including the Wix CLI
npm run dev     # start local preview (check package.json for the exact script name)
```

## Preview process

`npm run dev` starts a local preview mirroring the live site with your
local code changes applied — nothing is published by this step. Always
preview and run through `QA_CHECKLIST.md` before publishing.

## GitHub workflow

1. Wix's Git Integration pushes the site's generated project structure
   to a GitHub repo (created by Wix, or an empty repo you designate).
2. Clone that repo locally and do all Velo/page code work there.
3. Commit to a feature branch, review, merge to whichever branch Wix's
   Git Integration treats as the live-syncing branch.
4. Publish is a separate, deliberate action in the Wix Studio editor (or
   the CLI's release command, if exposed) — merging to the synced branch
   does not automatically publish. See `WIX_SETUP.md` §8.

## Wix CMS setup

Two required collections (`MenuItems`, `MenuCategories`) plus one
optional one (`Announcements`) — full field lists in `REDESIGN_PLAN.md`
§4, creation steps in `WIX_EDITOR_BUILD_GUIDE.md` §2.

## Menu import process

1. Create the `MenuItems` collection with the exact fields in
   `REDESIGN_PLAN.md` §4.
2. Use the CMS panel's **Import Content → From CSV**, upload
   `menu-import.csv`, and confirm the field mapping (should auto-match
   by column header name).
3. Cross-check the imported row count against 202.
4. Upload the handful of images referenced in `IMAGE_SOURCES.md` and
   `menu-import.csv`'s `image` column via Media Manager, then set each
   corresponding item/category's `image` and `imageAlt` fields.

Full detail: `WIX_EDITOR_BUILD_GUIDE.md` §2.

## Wix element IDs

Every interactive element referenced in the build guide has a fixed ID
so Velo code and Wix Studio stay in sync — see `WIX_EDITOR_BUILD_GUIDE.md`
for the full list as each page is built, including:

`#headerOrderButton` · `#headerCallLink` · `#mobileMenuToggle` ·
`#announcementBar` · `#heroOrderButton` · `#heroMenuButton` ·
`#heroCallLink` · `#heroDirectionsLink` · `#categoryRepeater` ·
`#featuredItemsRepeater` · `#menuSearchInput` · `#menuItemsRepeater` ·
`#cateringForm` · `#contactForm` · `#footerMap`

## Testing process

See `QA_CHECKLIST.md` — split into content-accuracy checks (already
done, verifiable now) and build QA (pending, needs a live site — covers
links, `tel:` links, directions, menu search/filter, forms, responsive
breakpoints, accessibility, and CMS editability).

## Publishing process

Never automatic. Once `QA_CHECKLIST.md` passes: publish from the Wix
Studio editor's **Publish** action (or the CLI's release command, if your
generated project exposes one) — see `WIX_SETUP.md` §8. DNS and the
connected domain are never touched by this workflow.

## Rollback precautions

- Wix Studio's built-in site history/revisions panel can restore a prior
  published version if something goes wrong after a publish.
- Because everything is tracked in Git, reverting the merge to the
  live-syncing branch and re-syncing is the code-level rollback path.
- Confirm which branch your Git Integration treats as "live" before
  relying on this — see `WIX_SETUP.md` §8.
