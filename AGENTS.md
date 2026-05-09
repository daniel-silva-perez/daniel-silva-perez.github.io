# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 4 static site for a personal notebook. Routes live in `src/pages/`, with dynamic blog rendering in `src/pages/blog/[...slug].astro`. Shared page chrome is in `src/layouts/Layout.astro`. Blog posts are Markdown content collection entries in `src/content/blog/`; each post needs frontmatter matching `src/content/config.ts`. Static assets are served from `public/assets/`, including global CSS and small page scripts.

Generated output belongs in `dist/` and should not be edited by hand.

## Build, Test, and Development Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` or `npm start` starts the local Astro dev server, usually at `http://localhost:4321`.
- `npm run build` builds the production site into `dist/`; use this as the primary validation command.
- `npm run preview` serves the built output locally for final checks.

GitHub Actions deploys `main` to GitHub Pages using Node 20 and `npm run build`.

## Coding Style & Naming Conventions

Use ES modules and existing Astro patterns. Keep templates simple, content-first, and static where practical. Match current indentation: tabs in TypeScript config files, two spaces in YAML, and the surrounding style in `.astro`, CSS, and JS files.

Name Astro route files by URL intent, such as `about.astro` or `archive.astro`. Name blog Markdown files with lowercase kebab-case slugs, for example `the-art-of-slow-living.md`. Prefer CSS custom properties in `public/assets/css/style.css` for theme colors rather than hard-coded duplicates.

## Testing Guidelines

There is no separate test framework configured. Validate changes with `npm run build` before submitting. For visual or content changes, also run `npm run dev` or `npm run preview` and check affected pages manually, including light and dark theme behavior where relevant.

For new posts, confirm frontmatter includes `title`, `description`, and `pubDate`; optional fields are `updatedDate`, `heroImage`, and `category`.

## Commit & Pull Request Guidelines

Recent history uses short imperative subjects, often with Conventional Commit prefixes such as `fix:`, `feat:`, `style:`, and `chore:`. Keep subjects specific, for example `fix: improve blog card spacing`.

Pull requests should include a brief description, files changed, validation performed (`npm run build`, manual preview), and screenshots for visible UI changes. Link related issues when applicable.

## Security & Configuration Tips

Do not commit secrets or local environment files. Keep deployment changes scoped to `.github/workflows/deploy.yml`, `astro.config.mjs`, or package files, and verify GitHub Pages output with `npm run build`.
