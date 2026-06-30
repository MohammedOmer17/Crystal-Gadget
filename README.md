# Project: Crystal Gadgets (Phonias Website)

## Overview / Aim
A ** multi-page e-commerce showcase website** for a mobile accessories brand ("Crystal Gadgets — Simply Accessories"). It presents and lets users browse three product categories — phone cases, earbuds/headphones, and chargers — through a stylized home page that links out to three dedicated, richly animated category pages with filtering and lightbox image galleries. There's no backend, cart, or checkout logic — it's a front-end visual/marketing site, not a full transactional store.

## Technical Stack
- **Markup:** Plain HTML5 
- **Styling:** Vanilla CSS3 — custom properties (`:root` variables), CSS Grid (bento layouts), Flexbox, keyframe animations, `backdrop-filter`, responsive `@media` breakpoints. No Sass/Tailwind/CSS framework.
- **Scripting:** Vanilla JavaScript (ES6+) — no React/Vue/build tooling, no bundler, no `package.json`. Uses native browser APIs: `IntersectionObserver` (lazy-load + scroll-reveal), DOM events, `dataset`, CSS class toggling.
- **Fonts:** Google Fonts, loaded via `<link>` — Fraunces + DM Sans (home page), Cormorant Garamond + Montserrat (category pages)
- **Media:** JPG/JPEG/PNG images, MP4 videos
- **Version control:** Git (`.git/` present, history preserved)
- **Hosting model:** Designed to be served as static files (GitHub Pages and vercel) 

## File Structure
```
phonias_website/
├── index.html              — Home page (nav, hero, category grid, collection, footer)
├── headphone.html          — Earbuds/headphones catalog page
├── charger.html            — Chargers catalog page
├── back-cover.html         — Phone cases catalog page
├── .git/                   — Version history
└── assets/
    ├── css/
    │   ├── style.css        — Home page styles
    │   ├── headphone.css    — Headphones page styles
    │   ├── charger.css      — Chargers page styles
    │   └── backCover.css    — Phone cases page styles
    ├── js/
    │   ├── pages/
    │   │   ├── script.js     — Home page interactions
    │   │   ├── headphone.js  — Headphones page logic
    │   │   ├── charger.js    — Chargers page logic
    │   │   └── backCover.js  — Phone cases page logic
    │   └── shared/
    │       ├── lazy-load.js  — Reusable IntersectionObserver image lazy-loader
    │       ├── reveal.js     — Reusable staggered scroll-reveal animator
    │       └── lightbox.js   — Reusable image lightbox (open/close/nav/swipe/keyboard)
    └── images/
        ├── headphones/       — 13 product photos + promo-video.mp4
        ├── chargers/         — 8 product photos + head-video.mp4
        ├── back-covers/      — 14 product photos
        └── (root-level)      — hero-bg.png, title-pic.png, charger.jpg, iphone-main.mp4,
                                 magsafe-case.jpg, poerbank.jpg, power-cable.jpg, etc.
```

## Page-by-Page Breakdown
| Page | Purpose | Key features |
|---|---|---|
| `index.html` | Landing/home | Sticky nav with scroll-darkening, parallax hero, tilting hero cards, category grid, scroll-reveal sections, footer |
| `headphone.html` | Headphones catalog | Promo video w/ placeholder fallback, filter pills (Over-Ear/In-Ear/Wireless/Studio), lazy-loaded grid, lightbox w/ swipe & keyboard nav |
| `charger.html` | Chargers catalog | Bento-grid layout, scrolling spec ticker, voltage stat panel, category filter pills, lightbox |
| `back-cover.html` | Phone cases catalog | Card grid, filter pills (cosmetic only — no actual filtering wired up), lightbox (no name label, count only) |

