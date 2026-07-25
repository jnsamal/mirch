import beetrootTikkiPlate from "../images/beetroot-tikki-plate.png";
import palakKoftaBowl from "../images/palak-kofta-bowl.png";
import sabudanaKhichdiBowl from "../images/sabudana-khichdi-bowl.png";
import fusionBurgerFries from "../images/fusion-burger-fries.png";
import thaliSpread from "../images/thali-spread.png";
import loadedSweetPotatoFries from "../images/loaded-sweet-potato-fries.png";
import kanikaCornChat from "../images/kanika-corn-chart.png";
import chilliGarlicMushroom from "../images/chilli-garlic-mushroom.png"
import tandooriPrawn from "../images/tandoori-prawns.png"
import garlicNaan from "../images/Garlic-Naan.png"
import gheeRice from "../images/Ghee-Rice.png"
import lacchaParatha from "../images/Laccha-Paratha.png"
import lemonRasamRice from "../images/Lemon-Rasam-Rice.png"
import muttonBiryani from "../images/Mutton-Biryani.png"
import drinks from "../images/drinks.png"
/**
 * Menu items by category. Items with a real `image` show that
 * photo; everything else falls back to the illustrated DishArt.
 * Card sizing is enforced in MenuCard itself (fixed aspect ratio,
 * clamped title/description height), so mixing photos and
 * illustrations here no longer breaks row alignment.
 */
export const MENU = {
  Starters: [
    { name: "Kanika Corn Chaat", desc: "Sweet corn, tamarind, roasted peanut", price: 170, spice: 1, veg: true, kind: "bowl", image: kanikaCornChat },
    { name: "Tandoori Prawns", desc: "Clay-oven prawns, byadgi chili marinade", price: 340, spice: 2, veg: false, kind: "skewer", image: tandooriPrawn },
    { name: "Beetroot Tikki", desc: "Beetroot and potato, mint chutney, microgreens", price: 160, spice: 1, veg: true, image: beetrootTikkiPlate },
    { name: "Chili Garlic Mushroom", desc: "Wok-tossed button mushroom, dry red chili", price: 220, spice: 2, veg: true, kind: "bowl", image: chilliGarlicMushroom },
    { name: "Lamb Seekh Kebab", desc: "Hand-minced lamb, charcoal grilled", price: 360, spice: 2, veg: false, kind: "skewer", image: kanikaCornChat },
    { name: "Crispy Okra Fry", desc: "Thin-cut bhindi, chickpea flour, chaat masala", price: 180, spice: 1, veg: true, kind: "bowl", image: kanikaCornChat },
    { name: "Sabudana Khichdi", desc: "Tapioca pearls, peanut, potato, curry leaf", price: 190, spice: 1, veg: true, image: sabudanaKhichdiBowl },
    { name: "Loaded Sweet Potato Fries", desc: "Chili-bean salsa, garlic yogurt, guacamole", price: 240, spice: 1, veg: true, image: loadedSweetPotatoFries },
  ],
  Mains: [
    { name: "Chicken Chettinad", desc: "Roasted spice blend, curry leaf, coconut", price: 440, spice: 3, veg: false, kind: "bowl", image: fusionBurgerFries },
    { name: "Paneer Lababdar", desc: "Cashew-tomato gravy, cream, kasuri methi", price: 360, spice: 1, veg: true, kind: "bowl", image: thaliSpread  },
    { name: "Odia Prawn Curry", desc: "Mustard-poppy seed paste, raw mango", price: 460, spice: 3, veg: false, kind: "bowl", image: fusionBurgerFries },
    { name: "Palak Kofta", desc: "Spinach dumplings, light onion-tomato gravy", price: 300, spice: 1, veg: true, image: palakKoftaBowl },
    { name: "Mutton Rogan Josh", desc: "Kashmiri chili, yogurt, slow-braised", price: 480, spice: 2, veg: false, kind: "bowl", image: fusionBurgerFries },
    { name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering", price: 240, spice: 1, veg: true, kind: "bowl", image: thaliSpread },
    { name: "Full Veg Thali", desc: "Chef's spread — dal, sabzi, raita, rice, roti", price: 260, spice: 1, veg: true, image: thaliSpread },
    { name: "Chef's Fusion Burger", desc: "Spiced patty, cheddar, herb mayo, sweet potato wedges", price: 380, spice: 1, veg: false, image: fusionBurgerFries },
  ],
  "Rice & Bread": [
    { name: "Lemon Rasam Rice", desc: "Tangy tempered rice, curry leaf, mustard", price: 190, spice: 1, veg: true, kind: "rice", image: lemonRasamRice },
    { name: "Mutton Biryani", desc: "Sealed and rested, saffron, fried onion", price: 420, spice: 2, veg: false, kind: "rice",image: muttonBiryani },
    { name: "Ghee Rice", desc: "Whole spice, caramelised onion", price: 180, spice: 0, veg: true, kind: "rice", image: gheeRice },
    { name: "Laccha Paratha", desc: "Layered clay-oven flatbread", price: 70, spice: 0, veg: true, kind: "bread", image: lacchaParatha },
    { name: "Garlic Naan", desc: "Roasted garlic, coriander, butter finish", price: 80, spice: 0, veg: true, kind: "bread", image: garlicNaan },
  ],
  "Drinks & Sweets": [
    { name: "Jaljeera", desc: "Cumin, mint, black salt, tamarind", price: 90, spice: 1, veg: true, kind: "drink", image: drinks},
    { name: "Watermelon Cooler", desc: "Fresh watermelon, lime, mint", price: 130, spice: 0, veg: true, kind: "drink", image: drinks },
    { name: "Masala Chaas", desc: "Spiced buttermilk, roasted cumin", price: 90, spice: 1, veg: true, kind: "drink", image: drinks },
    { name: "Rasabali", desc: "Flattened cottage-cheese patties, saffron milk", price: 170, spice: 0, veg: true, kind: "sweet", image: drinks },
    { name: "Rice Kheer", desc: "Slow-simmered rice pudding, cardamom", price: 150, spice: 0, veg: true, kind: "sweet", image: drinks },
    { name: "Chhena Poda", desc: "Baked cottage-cheese dessert, caramelised", price: 160, spice: 0, veg: true, kind: "sweet", image: drinks },
  ],
};
