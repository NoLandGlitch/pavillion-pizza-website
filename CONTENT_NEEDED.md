# Content Needed From the Owner

Everything below must be confirmed by Pavillion Ristorante & Pizzeria's
owner before it appears on the redesigned site. Nothing in this list has
been invented — items marked **"Have (verify)"** were found on the
current live site and just need a freshness check; items marked
**"Missing"** were not found anywhere on the current site; items marked
**"Broken/placeholder on current site"** were found but appear to be
unconfigured Wix template defaults, not real Pavillion information.

## Hours

**Have (verify):** Found on `/hours-and-locations`:
- Monday – Thursday: 11 am – 8:00 pm
- Friday & Saturday: 11 am – 9 pm
- Sunday: Closed

**Action needed:** Confirm these are still accurate before publishing.

## Holiday hours

**Missing.** No holiday hours or seasonal closures are listed anywhere on
the current site. Needed before launch, especially if the announcement
bar or footer will reference holiday schedules.

## Delivery area

**Missing.** The current site says "EAT IN - PICK UP - DELIVERY" is
offered, but no delivery radius, zip codes, or minimum order for delivery
is stated anywhere. Needed for the Order Online page and any "delivery
area" copy.

## Delivery/ordering minimums and fees

**Missing.** Not stated anywhere on the current site.

## Ordering provider

**Broken/placeholder on current site.** The current site's main "Order
Now" navigation link points to `https://www.wix.com/templateslp/links` —
this is a generic Wix template placeholder URL, not a working order page
or a real third-party ordering provider link. This strongly suggests
online ordering was never fully configured on the current site, or the
integration was disconnected at some point.

**Action needed before building the Order Online page:** Confirm with the
owner whether Pavillion currently uses (a) Wix Restaurants / Wix Online
Ordering, (b) a third-party provider (ChowNow, Slice, GrubHub, DoorDash,
etc.), or (c) phone-only ordering with no online system at all. Do not
connect the new Order Online page to a real checkout until this is
confirmed — see `REDESIGN_PLAN.md`'s Order Online section for the
fallback plan (phone-forward ordering) if no working system exists yet.

## Menu prices

**Have (verify).** The full current menu (all categories, all prices) was
extracted directly from `pavillionpizza.com/menu` on the date of this
redesign and is captured in full in `menu-import.csv`. No prices were
estimated or guessed.

**Action needed:** Confirm every price is still current before importing
`menu-import.csv` into the live CMS collection — restaurant menus change
often, and this extraction is a point-in-time snapshot.

## Catering

**Missing.** No catering page, catering menu, catering pricing, or
catering policy exists anywhere on the current site (`/meals-deals`, the
closest candidate page, contains no catering content). The Catering page
being built is a **new page**, not a rebuild of existing content.

**Action needed:** Before publishing the Catering page, the owner must
confirm: whether catering is actually offered, what event types are
supported, whether delivery/drop-off catering exists or pickup-only,
typical lead time required, and whether there's a minimum order size or
guest count. Until confirmed, the Catering page will state that
availability and pricing are confirmed by phone/request only — no
specific catering menu or pricing will be published.

## Social media links

**Broken/placeholder on current site.** Found in the site footer/nav:
- **Facebook:** `https://www.facebook.com/people/Pavillion-Pizza/61551833757232/` — this looks like a real, specific Facebook page URL. Reasonably safe to reuse, but confirm it's still the correct/active page.
- **Instagram:** links to `https://www.instagram.com/wix` — this is Wix's own generic Instagram account, not Pavillion's. **Not a real link — do not reuse.**
- **Twitter/X:** links to `https://www.twitter.com/wix` — same issue, Wix's own account. **Not a real link — do not reuse.**
- **Yelp:** links to `https://www.yelp.com` (the Yelp homepage, not a specific business page). **Not a real link — do not reuse.**

**Action needed:** Get the real Instagram/Twitter/Yelp URLs from the owner
(if those accounts exist at all), or omit those icons entirely rather
than link to Wix's own accounts or a generic homepage. Per your
instructions, no social URL will be invented — only Facebook will be
included in the redesign until the others are confirmed.

## Reviews / testimonials

**Missing.** No reviews or testimonials are displayed anywhere on the
current site. The Home page's testimonials section will be built into the
page structure but left disabled/hidden until the owner supplies real
reviews or approves a Google Reviews integration.

## Photographs

**Missing.** No real photographs of the restaurant, kitchen, dining room,
staff, or owner were available from the current site's content for reuse
(only descriptive text was extractable). See `IMAGE_SOURCES.md` for the
stock photography being used as placeholder presentation imagery in the
meantime — none of it may be captioned as real Pavillion photography.

## Logo file

**Missing.** No logo file was retrievable from the current site's text
content. A vector (SVG/AI/EPS) or high-resolution PNG logo file is needed
directly from the owner before the header/footer can use a real logo
rather than a text treatment of the restaurant name.

## Payment methods accepted

**Missing.** Not stated anywhere on the current site (cash, credit cards,
Apple Pay, etc.).

## Dietary claims / allergen information

**Missing.** No allergen warnings, gluten-free options, vegetarian/vegan
labeling, or dietary claims are stated anywhere on the current menu.
**Do not add dietary labels (gluten-free, vegan, etc.) to any menu item
in the new site unless the owner explicitly confirms them** — several
items are structurally vegetarian-friendly (e.g. cheese pizza, several
salads) but must not be labeled as such without the owner's confirmation
of kitchen practices (shared fryers, cross-contact, etc.).

## Accessibility contact information

**Missing.** No accessibility statement or accessibility contact exists
on the current site. Needed for the footer's accessibility statement
link (a generic WCAG commitment statement can be drafted, but a real
contact method — phone or email — for accessibility issues should come
from the owner).

## Fax number

**Have (verify).** Found on `/hours-and-locations`: (856) 697-2140. Not
requested in the original scope, but noted here in case it's useful for
the Contact page.

## Email address

**Missing.** No public email address was found anywhere on the current
site. If the owner wants an email contact option beyond the Wix contact
form, it needs to be supplied.

## "Naples, Italy" founder connection

**Have (verified).** The current About page states the founders were
"Born and Raised in Naples, Italy." This is a real, sourced claim from
the current live site (not invented) and may be used in About page copy
per your instructions. No further names, dates, or specific family
history are available — do not add anything beyond what's quoted in
`REDESIGN_PLAN.md`'s inspection notes.
