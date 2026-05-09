# daniel-silva-perez.github.io

Personal blog and writing space. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step.

Live at [daniel-silva-perez.github.io](https://daniel-silva-perez.github.io)

---

## Overview

A magazine-first personal site covering tech, life, theories, and whatever else crosses my mind. The design prioritizes reading: clean typography, generous whitespace, and a dual light/dark theme that respects your system preference.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `blog.html` | Blog homepage with featured posts |
| `post.html` | Individual post template |
| `about.html` | About page |
| `archive.html` | Full archive with category filtering |
| `tags.html` | Tag index |
| `404.html` | Custom error page |

## Features

- **Dual theme** — Warm light mode and dark atmospheric mode. Switches automatically with your OS preference; manual toggle saves to `localStorage`
- **Reading experience** — 680px content width, 18px body, 1.75 line-height, drop caps, styled blockquotes
- **Scroll progress bar** — Reading progress indicator on post pages
- **Responsive** — Mobile-first, tested across all screen sizes
- **Accessible** — Keyboard navigation, focus-visible states, reduced-motion support, semantic HTML
- **No dependencies** — Pure HTML/CSS/JS, opens in any browser

## Theme System

Colors are defined as CSS custom properties with three layers of specificity:

```css
:root { /* light mode defaults */ }
[data-theme="dark"] { /* manual dark override */ }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { /* system dark */ } }
```

### Light mode — Warm Indie
- Background: `#f7f3eb` · Text: `#1c1714` · Accent: `#c0603a`
- Headings: Lora (serif)

### Dark mode — Dark Atmospheric
- Background: `#0c0c10` · Text: `#e9e4d9` · Accent: `#f5a623`
- Headings: Inter 300

## Getting Started

No build step required. Open any file directly or serve locally:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## Customization

Edit the CSS custom properties in each file's `:root` block to change colors, or swap the Google Fonts link in `<head>` to change typography.

## Design System

Documented in [`.stitch/DESIGN.md`](.stitch/DESIGN.md).

## License

MIT
