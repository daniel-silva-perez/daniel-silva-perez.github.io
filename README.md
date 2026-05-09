# Minimal.

A thoughtfully designed personal blog built with clean HTML, CSS, and JavaScript. Featuring an editorial aesthetic with generous whitespace, refined typography, and smooth micro-interactions.

## Pages

- **blog.html** — Homepage with hero featured post and latest posts grid
- **archive.html** — Complete archive of all posts with category filtering
- **post.html** — Individual blog post template with optimized reading experience
- **about.html** — About page with author bio and story
- **index.html** — Existing portfolio/landing page

## Design System

Located in `.stitch/DESIGN.md`, the design system defines:

- **Color Palette**: Blue primary (#2563EB), warm grays for secondary text
- **Typography**: Plus Jakarta Sans for headlines, Inter for body text
- **Components**: Hero cards, post grids, newsletter sections, sticky navigation
- **Motion**: Smooth cubic-bezier transitions, scroll animations, hover states

## Project Structure

```
.
├── blog.html          # Main blog homepage
├── archive.html        # Post archive with filtering
├── post.html          # Single post template
├── about.html         # About page
├── index.html         # Portfolio landing page
└── .stitch/
    ├── DESIGN.md      # Design system documentation
    └── designs/       # Generated design assets
```

## Features

- **Responsive Design**: Mobile-first with breakpoints at 640px, 768px, and 1024px
- **Performance**: Optimized images via Unsplash, lazy loading-ready
- **Accessibility**: Semantic HTML, proper heading hierarchy, focus states
- **Newsletter**: Built-in email subscription form with validation
- **Category Tags**: Visual category chips on post cards
- **Author Attribution**: Avatar initials, name, and date per post

## Getting Started

Simply open any HTML file in a browser. No build step required.

```bash
# Open directly
open blog.html

# Or serve locally
python -m http.server 8000
```

Then visit `http://localhost:8000/blog.html`

## Customization

### Colors
Edit CSS variables in the `:root` selector:
```css
--primary: #2563EB;
--secondary: #6B7280;
--accent: #1A1A1A;
--background: #FAFAFA;
```

### Fonts
Fonts are loaded via Google Fonts. Modify the `<link>` tag and font-family declarations to change typography.

### Content
Replace placeholder posts by updating the post cards in `blog.html` or the post list in `archive.html`.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License — feel free to use this template for your own blog.