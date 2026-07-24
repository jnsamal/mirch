/**
 * Menu items by category. Every item renders with the same
 * illustrated thumbnail style (see DishArt) — no mixed
 * photo/illustration items — so every card in the grid is
 * visually symmetrical regardless of category or description
 * length. Real kitchen photography lives in the hero carousel
 * and the ProductCard/ProductGrid components instead.
 */
export const MENU = {
  Starters: [
    { name: "Kanika Corn Chaat", desc: "Sweet corn, tamarind, roasted peanut", price: 170, spice: 1, veg: true, kind: "bowl" },
    { name: "Tandoori Prawns", desc: "Clay-oven prawns, byadgi chili marinade", price: 340, spice: 2, veg: false, kind: "skewer" },
    { name: "Beetroot Tikki", desc: "Beetroot and potato, mint chutney", price: 160, spice: 1, veg: true, kind: "bowl" },
    { name: "Chili Garlic Mushroom", desc: "Wok-tossed button mushroom, dry red chili", price: 220, spice: 2, veg: true, kind: "bowl" },
    { name: "Lamb Seekh Kebab", desc: "Hand-minced lamb, charcoal grilled", price: 360, spice: 2, veg: false, kind: "skewer" },
    { name: "Crispy Okra Fry", desc: "Thin-cut bhindi, chickpea flour, chaat masala", price: 180, spice: 1, veg: true, kind: "bowl" },
  ],
  Mains: [
    { name: "Chicken Chettinad", desc: "Roasted spice blend, curry leaf, coconut", price: 440, spice: 3, veg: false, kind: "bowl" },
    { name: "Paneer Lababdar", desc: "Cashew-tomato gravy, cream, kasuri methi", price: 360, spice: 1, veg: true, kind: "bowl" },
    { name: "Odia Prawn Curry", desc: "Mustard-poppy seed paste, raw mango", price: 460, spice: 3, veg: false, kind: "bowl" },
    { name: "Palak Kofta", desc: "Spinach dumplings, light onion-tomato gravy", price: 300, spice: 1, veg: true, kind: "bowl" },
    { name: "Mutton Rogan Josh", desc: "Kashmiri chili, yogurt, slow-braised", price: 480, spice: 2, veg: false, kind: "bowl" },
    { name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering", price: 240, spice: 1, veg: true, kind: "bowl" },
  ],
  "Rice & Bread": [
    { name: "Lemon Rasam Rice", desc: "Tangy tempered rice, curry leaf, mustard", price: 190, spice: 1, veg: true, kind: "rice" },
    { name: "Mutton Biryani", desc: "Sealed and rested, saffron, fried onion", price: 420, spice: 2, veg: false, kind: "rice" },
    { name: "Ghee Rice", desc: "Whole spice, caramelised onion", price: 180, spice: 0, veg: true, kind: "rice" },
    { name: "Laccha Paratha", desc: "Layered clay-oven flatbread", price: 70, spice: 0, veg: true, kind: "bread" },
    { name: "Garlic Naan", desc: "Roasted garlic, coriander, butter finish", price: 80, spice: 0, veg: true, kind: "bread" },
  ],
  "Drinks & Sweets": [
    { name: "Jaljeera", desc: "Cumin, mint, black salt, tamarind", price: 90, spice: 1, veg: true, kind: "drink" },
    { name: "Watermelon Cooler", desc: "Fresh watermelon, lime, mint", price: 130, spice: 0, veg: true, kind: "drink" },
    { name: "Masala Chaas", desc: "Spiced buttermilk, roasted cumin", price: 90, spice: 1, veg: true, kind: "drink" },
    { name: "Rasabali", desc: "Flattened cottage-cheese patties, saffron milk", price: 170, spice: 0, veg: true, kind: "sweet" },
    { name: "Rice Kheer", desc: "Slow-simmered rice pudding, cardamom", price: 150, spice: 0, veg: true, kind: "sweet" },
    { name: "Chhena Poda", desc: "Baked cottage-cheese dessert, caramelised", price: 160, spice: 0, veg: true, kind: "sweet" },
  ],
};
