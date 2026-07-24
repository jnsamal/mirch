import thaliSpread from "../images/thali-spread.png";
import palakKoftaBowl from "../images/palak-kofta-bowl.png";
import beetrootTikkiPlate from "../images/beetroot-tikki-plate.png";

export const PRODUCTS = [
  {
    id: "thali",
    name: "Full Veg Thali",
    image: thaliSpread,
    description: "Chef's spread — dal, sabzi, raita, rice, roti",
    price: 260,
    tags: ["Veg", "Bestseller"],
  },
  {
    id: "palak-kofta",
    name: "Palak Kofta",
    image: palakKoftaBowl,
    description: "Spinach dumplings, light onion-tomato gravy",
    price: 300,
    tags: ["Veg"],
  },
  {
    id: "beetroot-tikki",
    name: "Beetroot Tikki",
    image: beetrootTikkiPlate,
    description: "Beetroot and potato, mint chutney, microgreens",
    price: 160,
    tags: ["Veg", "Starter"],
  },
];
