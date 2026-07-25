# Mirch — Restaurant Ordering Website

A React + Tailwind CSS site for a restaurant, built around WhatsApp-based
ordering instead of a delivery app. Photo hero carousel, glassmorphism menu
cards, and a scroll-based "heat gauge" that doubles as the site's own spice
legend.

## Features

- **Hero photo carousel** — auto-rotating, full-bleed, with manual controls
- **WhatsApp ordering** — every "Order" button opens a WhatsApp chat with the
  item pre-filled; no delivery-app commissions, no middleman
- **Glassmorphism UI** — frosted nav, menu cards, and info panels throughout
- **Fully responsive** — phone, tablet, laptop, and wide-monitor breakpoints
- **Category-tabbed menu** — Starters, Mains, Rice & Bread, Drinks & Sweets
- **Spice-level indicator** — a 4-dot scale using the site's own colour
  palette, so it doubles as a visual legend
- **Illustrated fallback art** — items without a photo get an original SVG
  illustration instead of a placeholder box

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) for icons

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Configuration

Almost everything you'd want to change lives in `src/theme.js` and
`src/data/`, not scattered through components.

### WhatsApp number

Open `src/theme.js` and set `WHATSAPP_NUMBER` to your real business number,
international format, digits only, no `+` or spaces:

```js
export const WHATSAPP_NUMBER = "919876543210";
```

### Colours

Also in `src/theme.js`. The four brand colours (`cream`, `peach`, `coral`,
`red`) double as the spice-level scale used throughout the site, so changing
them updates the hero, menu, spice dots, and heat gauge together.

### Menu items

Edit `src/data/menuData.js`. Each item looks like:

```js
{ name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering",
  price: 240, spice: 1, veg: true, kind: "bowl" }
```

- `spice` is 0–3 and drives the dot indicator.
- Give an item either `image: importedPhoto` (a real photo) or `kind` (one
  of `bowl`, `skewer`, `rice`, `bread`, `drink`, `sweet` — picks which
  illustrated fallback art to use). If both are present, the photo wins.
- Card sizing is fixed in `MenuCard.jsx` (4:3 image, clamped title/description
  height), so photos and illustrations can be mixed freely without breaking
  row alignment.

### Hero carousel

Edit `src/data/heroSlides.js` — an ordered list of `{ image, alt }` slides.

### Adding photos

Drop image files into `src/images/` and `import` them at the top of
whichever data file uses them (Vite handles bundling automatically):

```js
import myDish from "../images/my-dish.jpg";
```

## Project structure

```
src/
├── MirchRestaurant.jsx     # top-level: assembles all sections
├── theme.js                 # colour tokens, WhatsApp number, wa.me helper
├── App.jsx / main.jsx        # standard Vite/React entry points
├── index.css                  # Tailwind directives + global resets
│
├── data/
│   ├── menuData.js              # menu items, grouped by category
│   └── heroSlides.js             # hero carousel photo list
│
├── components/
│   ├── GlobalStyles.jsx           # font imports, focus/reduced-motion CSS
│   ├── HeatGauge.jsx              # scroll-progress "heat" rail
│   ├── Navbar.jsx                 # floating glass nav + mobile menu
│   ├── Hero.jsx                   # photo carousel section
│   ├── Glass.jsx                  # shared glassmorphism card primitive
│   ├── OrderButton.jsx            # shared WhatsApp-CTA pill button
│   ├── Eyebrow.jsx                # shared small uppercase section label
│   ├── SpiceDots.jsx              # spice-level indicator
│   ├── DishArt.jsx                # illustrated fallback thumbnail (SVG)
│   ├── MenuCard.jsx               # one menu item
│   ├── MenuSection.jsx            # category tabs + menu grid
│   ├── OrderDialog.jsx            # quantity/notes/total dialog before WhatsApp
│   ├── Story.jsx                  # about section
│   ├── Visit.jsx                  # hours / location / CTA
│   ├── Footer.jsx                 # footer
│   └── WhatsAppFab.jsx            # floating order button
│
└── images/                  # photos referenced by data/*.js
```

## Deployment

`npm run build` outputs a static `dist/` folder — deploy it to any static
host: [Vercel](https://vercel.com/), [Netlify](https://netlify.com/),
GitHub Pages, or your own server. No backend or database is required; all
"ordering" happens via WhatsApp deep links.

## Browser support

Targets evergreen browsers (Chrome, Firefox, Safari, Edge — latest two
versions). Uses modern CSS (`aspect-ratio`, `backdrop-filter`,
`100svh`) which have broad but not universal support in older browsers.
