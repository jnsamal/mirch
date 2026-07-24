# Mirch — Restaurant Site

A React + Tailwind restaurant site with a photo hero carousel, glassmorphism
menu cards, and WhatsApp-based ordering, split into modules:

    src/
      MirchRestaurant.jsx   — assembles the sections
      theme.js               — colour tokens + WhatsApp link helper
      data/
        menuData.js           — menu items by category
        heroSlides.js          — hero carousel photos
      components/
        GlobalStyles.jsx, HeatGauge.jsx, Navbar.jsx, Hero.jsx,
        Glass.jsx, SpiceDots.jsx, DishArt.jsx, MenuCard.jsx,
        MenuSection.jsx, Story.jsx, Visit.jsx, Footer.jsx,
        WhatsAppFab.jsx
      images/
        thali-spread.jpg, chicken-curry-pan.jpg, spicy-kadai-curry.jpg

## Setup

1. npm install
2. Open src/theme.js and set WHATSAPP_NUMBER to your real business number,
   international format, digits only (e.g. 919876543210).
3. npm run dev — opens at http://localhost:5173
4. npm run build — outputs a dist/ folder ready to deploy to any static host
   (Vercel, Netlify, GitHub Pages, etc).

