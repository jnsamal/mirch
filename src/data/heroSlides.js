// Each hero photo is served at two sizes (960w for phones, 1200w
// for larger screens) as WebP instead of the original PNGs — see
// how Hero.jsx turns image/imageMobile into a srcset.
import beetrootTikkiPlate960 from "../images/beetroot-tikki-plate-960w.webp";
import beetrootTikkiPlate1200 from "../images/beetroot-tikki-plate-1200w.webp";
import palakKoftaBowl960 from "../images/palak-kofta-bowl-960w.webp";
import palakKoftaBowl1200 from "../images/palak-kofta-bowl-1200w.webp";
import sabudanaKhichdiBowl960 from "../images/sabudana-khichdi-bowl-960w.webp";
import sabudanaKhichdiBowl1200 from "../images/sabudana-khichdi-bowl-1200w.webp";
import fusionBurgerFries960 from "../images/fusion-burger-fries-960w.webp";
import fusionBurgerFries1200 from "../images/fusion-burger-fries-1200w.webp";
import thaliSpread960 from "../images/thali-spread-960w.webp";
import thaliSpread1200 from "../images/thali-spread-1200w.webp";
import loadedSweetPotatoFries960 from "../images/loaded-sweet-potato-fries-960w.webp";
import loadedSweetPotatoFries1200 from "../images/loaded-sweet-potato-fries-1200w.webp";

export const SLIDES = [
  {
    image: thaliSpread1200,
    imageMobile: thaliSpread960,
    alt: "Full thali spread with curries, rice, roti, and raita",
    title: "One thali, the whole kitchen",
  },
  {
    image: palakKoftaBowl1200,
    imageMobile: palakKoftaBowl960,
    alt: "Spinach kofta curry with fritters, lime, and flatbread",
    title: "Slow gravies, fresh off the stove",
  },
  {
    image: beetrootTikkiPlate1200,
    imageMobile: beetrootTikkiPlate960,
    alt: "Plated beetroot tikki topped with greens and microgreens",
    title: "Small plates, big on flavour",
  },
  {
    image: sabudanaKhichdiBowl1200,
    imageMobile: sabudanaKhichdiBowl960,
    alt: "Bowl of sabudana khichdi with peanuts and coriander",
    title: "Comfort food, done properly",
  },
  {
    image: fusionBurgerFries1200,
    imageMobile: fusionBurgerFries960,
    alt: "Grilled burger with sweet potato wedges",
    title: "A fusion special, when you want it",
  },
  {
    image: loadedSweetPotatoFries1200,
    imageMobile: loadedSweetPotatoFries960,
    alt: "Loaded sweet potato fries with salsa, guacamole, and yogurt dip",
    title: "Snacks worth ordering just for the table",
  },
];
