// Menu-card photos are served at two sizes so mobile devices
// download the small (480w) variant instead of the same large
// file used elsewhere on the page — see `image`/`imageMobile`
// below and how MenuCard turns them into a srcset.
import beetrootTikkiPlate480 from "../images/beetroot-tikki-plate-480w.webp";
import beetrootTikkiPlate900 from "../images/beetroot-tikki-plate-900w.webp";
import palakKoftaBowl480 from "../images/palak-kofta-bowl-480w.webp";
import palakKoftaBowl900 from "../images/palak-kofta-bowl-900w.webp";
import sabudanaKhichdiBowl480 from "../images/sabudana-khichdi-bowl-480w.webp";
import sabudanaKhichdiBowl900 from "../images/sabudana-khichdi-bowl-900w.webp";
import fusionBurgerFries480 from "../images/fusion-burger-fries-480w.webp";
import fusionBurgerFries900 from "../images/fusion-burger-fries-900w.webp";
import thaliSpread480 from "../images/thali-spread-480w.webp";
import thaliSpread900 from "../images/thali-spread-900w.webp";
import loadedSweetPotatoFries480 from "../images/loaded-sweet-potato-fries-480w.webp";
import loadedSweetPotatoFries900 from "../images/loaded-sweet-potato-fries-900w.webp";

/**
 * Menu items by category. Items with a real `image` show that
 * photo; everything else falls back to the illustrated DishArt.
 * Card sizing is enforced in MenuCard itself (fixed aspect ratio,
 * clamped title/description height), so mixing photos and
 * illustrations here no longer breaks row alignment.
 *
 * `image` = ~900px-wide WebP (tablet/desktop card size)
 * `imageMobile` = ~480px-wide WebP (phone card size)
 * MenuCard combines both into a srcset so phones never download
 * the larger file.
 */
export const MENU = {
  Starters: [
    { name: "Kanika Corn Chaat", desc: "Sweet corn, tamarind, roasted peanut", price: 170, veg: true, kind: "bowl" },
    { name: "Tandoori Prawns", desc: "Clay-oven prawns, byadgi chili marinade", price: 340, veg: false, kind: "skewer" },
    { name: "Beetroot Tikki", desc: "Beetroot and potato, mint chutney, microgreens", price: 160, veg: true, image: beetrootTikkiPlate900, imageMobile: beetrootTikkiPlate480 },
    { name: "Chili Garlic Mushroom", desc: "Wok-tossed button mushroom, dry red chili", price: 220, veg: true, kind: "bowl" },
    { name: "Lamb Seekh Kebab", desc: "Hand-minced lamb, charcoal grilled", price: 360, veg: false, kind: "skewer" },
    { name: "Crispy Okra Fry", desc: "Thin-cut bhindi, chickpea flour, chaat masala", price: 180, veg: true, kind: "bowl" },
    { name: "Sabudana Khichdi", desc: "Tapioca pearls, peanut, potato, curry leaf", price: 190, veg: true, image: sabudanaKhichdiBowl900, imageMobile: sabudanaKhichdiBowl480 },
    { name: "Loaded Sweet Potato Fries", desc: "Chili-bean salsa, garlic yogurt, guacamole", price: 240, veg: true, image: loadedSweetPotatoFries900, imageMobile: loadedSweetPotatoFries480 },
  ],
  Mains: [
    { name: "Chicken Chettinad", desc: "Roasted spice blend, curry leaf, coconut", price: 440, veg: false, kind: "bowl" },
    { name: "Paneer Lababdar", desc: "Cashew-tomato gravy, cream, kasuri methi", price: 360, veg: true, kind: "bowl" },
    { name: "Odia Prawn Curry", desc: "Mustard-poppy seed paste, raw mango", price: 460, veg: false, kind: "bowl" },
    { name: "Palak Kofta", desc: "Spinach dumplings, light onion-tomato gravy", price: 300, veg: true, image: palakKoftaBowl900, imageMobile: palakKoftaBowl480 },
    { name: "Mutton Rogan Josh", desc: "Kashmiri chili, yogurt, slow-braised", price: 480, veg: false, kind: "bowl" },
    { name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering", price: 240, veg: true, kind: "bowl" },
    { name: "Full Veg Thali", desc: "Chef's spread — dal, sabzi, raita, rice, roti", price: 260, veg: true, image: thaliSpread900, imageMobile: thaliSpread480 },
    { name: "Chef's Fusion Burger", desc: "Spiced patty, cheddar, herb mayo, sweet potato wedges", price: 380, veg: false, image: fusionBurgerFries900, imageMobile: fusionBurgerFries480 },
  ],
  "Rice & Bread": [
    { name: "Lemon Rasam Rice", desc: "Tangy tempered rice, curry leaf, mustard", price: 190, veg: true, kind: "rice" },
    { name: "Mutton Biryani", desc: "Sealed and rested, saffron, fried onion", price: 420, veg: false, kind: "rice" },
    { name: "Ghee Rice", desc: "Whole spice, caramelised onion", price: 180, veg: true, kind: "rice" },
    { name: "Laccha Paratha", desc: "Layered clay-oven flatbread", price: 70, veg: true, kind: "bread" },
    { name: "Garlic Naan", desc: "Roasted garlic, coriander, butter finish", price: 80, veg: true, kind: "bread" },
  ],
  "Drinks & Sweets": [
    { name: "Jaljeera", desc: "Cumin, mint, black salt, tamarind", price: 90, veg: true, kind: "drink" },
    { name: "Watermelon Cooler", desc: "Fresh watermelon, lime, mint", price: 130, veg: true, kind: "drink" },
    { name: "Masala Chaas", desc: "Spiced buttermilk, roasted cumin", price: 90, veg: true, kind: "drink" },
    { name: "Rasabali", desc: "Flattened cottage-cheese patties, saffron milk", price: 170, veg: true, kind: "sweet" },
    { name: "Rice Kheer", desc: "Slow-simmered rice pudding, cardamom", price: 150, veg: true, kind: "sweet" },
    { name: "Chhena Poda", desc: "Baked cottage-cheese dessert, caramelised", price: 160, veg: true, kind: "sweet" },
  ],
};
