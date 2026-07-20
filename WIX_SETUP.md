# Wix Setup — Connecting This Project to a Live Wix Studio Site

**Status: this local folder is NOT yet connected to a Wix Studio site.**
Everything else in this repository so far (`REDESIGN_PLAN.md`,
`menu-import.csv`, `IMAGE_SOURCES.md`, `SEO_CONTENT.md`,
`WIX_EDITOR_BUILD_GUIDE.md`, `CONTENT_NEEDED.md`) is planning and content
work that doesn't require a live connection. Actual Velo page code, CMS
collections, and published pages can only be built once you complete the
steps below — doing that work against a folder with no real Wix project
behind it would produce disconnected boilerplate that doesn't match
whatever structure Wix actually generates for your site.

Follow these steps in order. None of them touch the current live
`pavillionpizza.com` site or its DNS — the existing site keeps running
exactly as it is until you explicitly publish new changes to it (see
"Publish safely" at the end).

---

## 1. Decide: new site, or the existing Wix site?

The current `pavillionpizza.com` is already built on Wix (confirmed —
its footer reads "Powered and secured by Wix"). You have two options:

- **Option A (recommended): work inside the existing Wix site.** Log in
  to the Wix account that owns `pavillionpizza.com`, open that site in
  the Wix dashboard, and use it for everything below. This preserves the
  domain connection, any existing analytics, and anything else tied to
  that site ID.
- **Option B: create a brand-new Wix Studio site** and point the domain
  at it later, once the redesign is approved. Use this only if you want
  a fully isolated staging environment completely separate from the live
  site while you work. This means redoing domain-pointing as a separate,
  deliberate step at the end — do not do this by accident.

**This guide assumes Option A** (working inside the existing site) since
that's what "redesign," not "replace," implies, and it's what
`REDESIGN_PLAN.md` assumes throughout. If you actually want Option B,
the steps are the same except step 2 below becomes "create a new site"
instead of "open the existing site," and you'll need a separate,
deliberate domain-repointing step at the very end that is **not**
covered here — ask before doing that, since it affects the live domain.

## 2. Open the site in Wix Studio

1. Go to https://manage.wix.com and log in with the account that owns
   the Pavillion Pizza site.
2. Find the Pavillion Pizza site in your site list and open it.
3. If the site was originally built in the classic Wix Editor (not Wix
   Studio), Wix will prompt you to either keep editing in the classic
   Editor or move to Wix Studio. **Wix Studio and the classic Editor are
   different products** — Velo/GitHub integration and the Wix CLI
   workflow described in this repo's other docs are Wix Studio (and
   Velo-enabled classic sites) features. Confirm which editor the site
   currently uses before proceeding:
   - If it's already a Wix Studio site, continue to step 3.
   - If it's a classic Wix site, you can still enable Velo (see step 3)
     and use GitHub integration from the classic Editor's Dev Mode — the
     steps are very similar but menu labels differ slightly. If you'd
     rather migrate the site into Wix Studio first, that's a separate
     decision with its own tradeoffs — pause and confirm with whoever
     owns this decision before migrating an existing live site's editor.

## 3. Enable coding (Velo / Dev Mode)

1. In the editor, look for **"Dev Mode"** (Wix Studio) or **"Turn on
   Dev Mode"** / the **Velo** icon (classic Editor) in the top toolbar.
2. Turn it on. This adds the code panel, the Page Code / Public / Backend
   file structure, and the ability to add npm packages — all the Velo
   features `REDESIGN_PLAN.md` and `WIX_EDITOR_BUILD_GUIDE.md` assume are
   available.
3. This step alone does not publish anything or change what visitors see
   — it only unlocks the developer tooling.

## 4. Connect the site to GitHub

1. With Dev Mode/Velo on, open the **Code panel**.
2. Look for **"Git Integration"** (Wix Studio: usually under the code
   panel's top menu or the site's Dev Mode settings; classic Editor:
   under the Velo sidebar's version control icon).
3. Choose **Connect to GitHub** (sometimes labeled "Set up Git
   Integration" or similar).
4. Authorize Wix to access your GitHub account when prompted (this opens
   a GitHub OAuth screen — sign in to the GitHub account you want this
   project tied to, not a random one).
5. Wix will either:
   - **Create a new GitHub repository for you** and push the site's
     current generated code into it, or
   - Let you **choose an existing empty repository** to push into.
6. **Do not point this at an unrelated existing repository with content
   in it** — Wix expects to own the repository structure it generates.
   If you want the code to end up in a specific existing GitHub
   organization/repo name, create an empty repo there first and select
   it during this step, rather than reusing a populated one.
7. Once connected, Wix pushes an initial commit containing the site's
   current generated project structure (its own `wix.config.json`,
   `src/` layout for pages/backend/public code, `package.json`, etc.).
   **This generated structure is authoritative** — it's what the Wix CLI
   and Wix's build process expect. Don't restructure it by hand.

## 5. Clone the Wix-generated repository locally

Once step 4 has pushed the initial commit:

```bash
git clone <the-repo-url-wix-created-or-you-selected> pavillion-pizza-wix
cd pavillion-pizza-wix
```

This is a **separate clone** from the current planning-only folder this
document lives in. Once you have the real Wix-generated repo cloned,
the content/planning files from this folder (`menu-import.csv`,
`IMAGE_SOURCES.md`, `SEO_CONTENT.md`, `WIX_EDITOR_BUILD_GUIDE.md`,
`REDESIGN_PLAN.md`, `CONTENT_NEEDED.md`, this file, and the eventual
`QA_CHECKLIST.md`/`README.md`) should be copied into that real repo's
root (or a `/docs` subfolder inside it) so everything lives together
going forward. Do not try to force-merge this folder's git history into
the Wix-generated repo — just copy the files over and commit them fresh
there.

## 6. Install the Wix CLI requirements

Inside the cloned Wix-generated repo:

```bash
node --version   # confirm Node.js 18+ is installed; install from nodejs.org if not
npm install      # installs the project's own dependencies, including the Wix CLI itself
```

Most Wix-generated projects declare the Wix CLI as a dev dependency and
expose it through `npm run` scripts (check the generated `package.json`
for the exact script names — they're typically something like `dev`,
`preview`, `release`/`publish`). If you'd rather have the CLI available
globally as well:

```bash
npm install -g @wix/cli
```

Run `wix --version` (or `npx wix --version` if not installed globally)
to confirm it's available.

## 7. Preview the site locally

From the cloned repo:

```bash
npm run dev
```

(or `wix dev` / `npx wix dev` if the generated `package.json` doesn't
define an `npm run dev` script — check `package.json` first). This
starts a local development server that mirrors your Wix site with your
local code changes applied, without publishing anything. Open the URL it
prints (typically a `localhost` address, sometimes tunneled through a
Wix-hosted preview URL) to see your changes live before anyone else
does.

**Every code change described in `WIX_EDITOR_BUILD_GUIDE.md` should be
verified here first**, before publishing.

## 8. Publish changes safely

**Do not publish automatically.** Per this project's working rules,
publishing to the live site only happens when explicitly requested.

When you are ready:

1. Confirm the local preview (step 7) looks correct on desktop, tablet,
   and mobile.
2. Run through `QA_CHECKLIST.md`.
3. Commit your changes to a feature branch, open a pull request if
   working with others, and merge to the branch Wix treats as the
   "production" branch for this repo (check the Git Integration settings
   in the Code panel — Wix lets you designate which branch auto-syncs to
   the live editor/site).
4. In the Wix Studio editor (not just the CLI), use **Publish** to push
   the currently-synced code and content live. The CLI's local preview
   step does not publish by itself — publishing is a deliberate action
   in the Wix editor UI (or via the Wix CLI's release/publish command, if
   your generated `package.json` exposes one — confirm before using it,
   since it has the same live effect as clicking Publish in the editor).
5. **Never change DNS or the connected domain** as part of this workflow
   — the domain stays pointed at whatever it's pointed at today unless
   you are explicitly asked to repoint it (see Option B above).

### Rollback

Wix Studio keeps site history/revisions accessible from the editor's
site history panel — if a publish causes a problem, you can restore a
previous version from there. On the code side, since everything is
tracked in Git, reverting the merge commit and re-syncing/republishing
is the code-level rollback path. Confirm exactly how your Git
Integration is configured (which branch is "live") before relying on
this — see the Git Integration panel from step 4.

---

## Once this is done

Come back and:
1. Copy this repo's content files into the real Wix-generated repo (see
   step 5).
2. Follow `WIX_EDITOR_BUILD_GUIDE.md` to create the CMS collections,
   import `menu-import.csv`, build each page, and wire up the Velo code
   described in `REDESIGN_PLAN.md`.
3. Preview locally (step 7) before ever publishing.
