# kni-next-cascade

A lean, CMS-neutral Next.js starter with the kni-cascade SCSS foundation.
App Router, TypeScript, native Sass, and postcss-pxv. No Gulp or custom Webpack pipeline.

## Start a project

Use this repository as a GitHub template (or clone it), then run:

```sh
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Update the package name and repository URL for your project.
Node 22.13+ on the Node 22 line is used to match both Next.js and kni-cascade's engines.

## How the one-time seed works

On first install, the postinstall script fetches the newest stable **kni-cascade
1.x** from npm, even when the template lockfile pins an older release. It saves
that version in the project's dependency and lockfile, then copies its `scss/`
into `src/styles/scss/`. Major 2 and prereleases are excluded. Registry access is
required for first setup; a failed refresh fails setup instead of seeding an old
version. `--ignore-scripts` bypasses automatic setup.

The template intentionally does not contain the Sass folder. **Commit the seeded
SCSS in your new project**, then customize it freely. Once `src/styles/scss/`
exists—even if empty—the setup script skips the package refresh and preserves the
entire folder. Subsequent installs use the project's lockfile. The same guard
applies to `cascade:seed`, development, and build hooks; deleting the folder opts
back into first setup. Fresh `npm ci` also refreshes Cascade before seeding and
intentionally updates the copied template lockfile.

Keep the lockfile and seeded styles in the resulting project. For existing projects,
review upstream changes and merge relevant SCSS manually. Do not delete customized
styles to force a reseed. `npm run cascade:seed` safely skips existing styles.

## Configure the project

- `src/config/site.ts`: site name, description, and navigation.
- `.env.local` / deployment environment: `SITE_URL` sets the canonical origin.
- Set `SITE_INDEXABLE=true` **only for production**, with a real production `SITE_URL`.
  Local development and previews are noindex by default. This controls crawler
  directives, not access protection; add hosting-level protection if previews are private.
- `src/styles/scss/00-sass/_variables.scss`: project typography and Sass settings.
- `src/styles/scss/01-base/_scaling.scss`: mobile/desktop reference dimensions.
- `src/styles/global.scss`: global project styles; imports the foundation once.

The starter uses the published kni-cascade package, not unpublished repository changes.
The small ActionLink component is a project styling example, not an unreleased `[btn]` port.

## Structure

```text
src/
  app/                 # Routes, root layout, metadata, sitemap, robots, and 404
  components/          # Header, footer, and project-level link example
  config/site.ts       # Shared site configuration
  styles/
    global.scss        # Global entry point
    scss/              # Seeded once; commit and customize in your project
scripts/seed-cascade.mjs
```

Use ordinary `.module.scss` files beside components. `pxv` values work in global
styles and CSS Modules. postcss-pxv runs after Sass with `writeVars: false` because
kni-cascade supplies the responsive variables. Import config-only `00-sass` when
using shared mixins in modules; do not import the global styles into every component.

## Commands

```sh
npm run dev          # Development + live reload
npm run check        # ESLint, TypeScript, seed tests, and formatting
npm run build        # Production build
npm start            # Serve the production build
npx playwright install chromium
npm run test:e2e     # Desktop/mobile smoke tests against the production build
```

GitHub Actions runs checks, the production build, and browser tests. No deployment
service is assumed. Import the repository into Vercel or deploy to a Node-capable
host with the environment variables above. No static-export assumptions are baked in.

## Included / optional

Included: responsive site shell, skip link, keyboard focus, typography/scaling
showcase, canonical metadata, generated social image, sitemap, robots, and 404.

Add a CMS, animation library, authentication, sliders, or Storybook only when a
project needs them. Sample content lives in route components; replace it with a
small data layer when connecting a CMS.

## Dependency notes

kni-cascade 1.5.1 brings its own Gulp tooling transitively. This starter does not use
Gulp to build or serve the site. Some transitive development dependencies can carry
upstream advisories; review `npm audit` when updating rather than applying a forced
major-version downgrade. Keep kni-cascade's published release and the lockfile current.
