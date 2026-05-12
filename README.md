# Danny Silva | Personal Blog

A minimalist, content-first personal site covering life, essays, books, travel, and the occasional tech note. 

Live at [danielsilvaperez.github.io](https://danielsilvaperez.github.io)

---

## Technical Stack

- **Framework**: [Astro](https://astro.build/) (v4+)
- **Styling**: Vanilla CSS with custom properties for theme management.
- **Content**: Markdown-driven via Astro Content Collections.
- **Deployment**: Automatic via GitHub Actions to GitHub Pages.

## Project Structure

| Path | Purpose |
|------|---------|
| `src/pages/` | Site routes (`index.astro`, `blog.astro`, etc.) |
| `src/layouts/` | Shared UI wrappers (Header, Footer, Head) |
| `src/content/blog/` | Your writing! Drop `.md` files here to publish. |
| `public/assets/` | Static files (Images, global JS, CSS) |

## Writing New Content

To publish a new post, create a `.md` file in `src/content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
description: "A short excerpt for the grid."
pubDate: 2026-05-09
category: "Life"
heroImage: "https://images.unsplash.com/..."
---

Your content here in Markdown...
```

## Features

- **Dual Theme** — Warm indie light mode and dark atmospheric mode. Supports system preference and manual toggle.
- **Zero-JS by Default** — Ships mostly plain HTML for maximum speed, with minimal JS for interaction.
- **Reading Experience** — Focused typography (Lora & Inter), 680px content width, and optimized line heights.
- **Markdown Driven** — Write posts in pure Markdown; Astro handles the rendering and layout.

## Getting Started

To run the site locally for development:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
# → http://localhost:4321
```

To build for production:

```bash
npm run build
```

## Theme System

Colors are managed via CSS custom properties in `public/assets/css/style.css`:

- **Light Mode**: Warm, paper-like background (`#f7f3eb`) with serif headings.
- **Dark Mode**: High-contrast, atmospheric dark theme with clean sans-serif headings.

## License

MIT
