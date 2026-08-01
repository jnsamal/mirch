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
    { name: "Kanika Corn Chaat", desc: "Sweet corn, tamarind, roasted peanut", price: 170, rating: 4.4, veg: true, kind: "bowl", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80", prepTime: "10 min", ingredients: ["Sweet corn", "Tamarind chutney", "Roasted peanuts", "Red onion", "Coriander", "Chaat masala", "Lime juice", "Green chili"] },
    { name: "Tandoori Prawns", desc: "Clay-oven prawns, byadgi chili marinade", price: 340, rating: 4.7, veg: false, kind: "skewer", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80", prepTime: "20 min", ingredients: ["Tiger prawns", "Byadgi chili paste", "Hung yogurt", "Ginger-garlic paste", "Mustard oil", "Kashmiri chili", "Lemon", "Chaat masala"] },
    { name: "Beetroot Tikki", desc: "Beetroot and potato, mint chutney, microgreens", price: 160, rating: 4.5, veg: true, image: beetrootTikkiPlate900, imageMobile: beetrootTikkiPlate480, prepTime: "15 min", ingredients: ["Beetroot", "Potato", "Fresh mint chutney", "Microgreens", "Breadcrumbs", "Cumin", "Ginger", "Coriander"] },
    { name: "Chili Garlic Mushroom", desc: "Wok-tossed button mushroom, dry red chili", price: 220, rating: 4.3, veg: true, kind: "bowl", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80", prepTime: "12 min", ingredients: ["Button mushrooms", "Dry red chili", "Garlic", "Soy sauce", "Spring onion", "Sesame oil", "Black pepper", "Cornstarch"] },
    { name: "Lamb Seekh Kebab", desc: "Hand-minced lamb, charcoal grilled", price: 360, rating: 4.6, veg: false, kind: "skewer", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80", prepTime: "25 min", ingredients: ["Lamb mince", "Ginger", "Green chili", "Fresh coriander", "Garam masala", "Onion", "Egg", "Charcoal"] },
    { name: "Crispy Okra Fry", desc: "Thin-cut bhindi, chickpea flour, chaat masala", price: 180, rating: 4.2, veg: true, kind: "bowl", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=900&q=80", prepTime: "10 min", ingredients: ["Okra (bhindi)", "Chickpea flour (besan)", "Rice flour", "Chaat masala", "Turmeric", "Red chili powder", "Amchur", "Salt"] },
    { name: "Sabudana Khichdi", desc: "Tapioca pearls, peanut, potato, curry leaf", price: 190, rating: 4.4, veg: true, image: sabudanaKhichdiBowl900, imageMobile: sabudanaKhichdiBowl480, prepTime: "15 min", ingredients: ["Tapioca pearls (sabudana)", "Roasted peanuts", "Potato", "Curry leaves", "Cumin seeds", "Green chili", "Lemon juice", "Ghee"] },
    { name: "Loaded Sweet Potato Fries", desc: "Chili-bean salsa, garlic yogurt, guacamole", price: 240, rating: 4.6, veg: true, image: loadedSweetPotatoFries900, imageMobile: loadedSweetPotatoFries480, prepTime: "18 min", ingredients: ["Sweet potato", "Chili-bean salsa", "Garlic yogurt", "Guacamole", "Avocado", "Lime", "Smoked paprika", "Sea salt"] },
  ],
  Mains: [
    { name: "Chicken Chettinad", desc: "Roasted spice blend, curry leaf, coconut", price: 440, rating: 4.8, veg: false, kind: "bowl", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80", prepTime: "35 min", ingredients: ["Chicken", "Chettinad spice blend", "Curry leaves", "Coconut", "Black pepper", "Fennel seeds", "Star anise", "Poppy seeds"] },
    { name: "Paneer Lababdar", desc: "Cashew-tomato gravy, cream, kasuri methi", price: 360, rating: 4.5, veg: true, kind: "bowl", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80", prepTime: "25 min", ingredients: ["Paneer", "Cashew nuts", "Tomato", "Heavy cream", "Kasuri methi", "Ginger", "Garam masala", "Butter"] },
    { name: "Odia Prawn Curry", desc: "Mustard-poppy seed paste, raw mango", price: 460, rating: 4.7, veg: false, kind: "bowl", image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80", prepTime: "30 min", ingredients: ["Prawns", "Mustard paste", "Poppy seed paste", "Raw mango", "Turmeric", "Panch phoran", "Coconut", "Mustard oil"] },
    { name: "Palak Kofta", desc: "Spinach dumplings, light onion-tomato gravy", price: 300, rating: 4.4, veg: true, image: palakKoftaBowl900, imageMobile: palakKoftaBowl480, prepTime: "30 min", ingredients: ["Spinach", "Gram flour", "Paneer", "Onion", "Tomato", "Cream", "Garam masala", "Kasuri methi"] },
    { name: "Mutton Rogan Josh", desc: "Kashmiri chili, yogurt, slow-braised", price: 480, rating: 4.9, veg: false, kind: "bowl", image: "https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=900&q=80", prepTime: "45 min", ingredients: ["Mutton", "Kashmiri chili", "Yogurt", "Fennel powder", "Dry ginger powder", "Bay leaf", "Cardamom", "Mustard oil"] },
    { name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering", price: 240, rating: 4.3, veg: true, kind: "bowl", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80", prepTime: "25 min", ingredients: ["Chana dal", "Raw banana", "Pumpkin", "Drumstick", "Panch phoran", "Turmeric", "Coconut", "Ghee"] },
    { name: "Full Veg Thali", desc: "Chef's spread — dal, sabzi, raita, rice, roti", price: 260, rating: 4.6, veg: true, image: thaliSpread900, imageMobile: thaliSpread480, prepTime: "20 min", ingredients: ["Seasonal dal", "Seasonal sabzi", "Raita", "Steamed rice", "Tandoori roti", "Pickle", "Papad", "Salad"] },
    { name: "Chef's Fusion Burger", desc: "Spiced patty, cheddar, herb mayo, sweet potato wedges", price: 380, rating: 4.5, veg: false, image: fusionBurgerFries900, imageMobile: fusionBurgerFries480, prepTime: "20 min", ingredients: ["Spiced chicken patty", "Cheddar cheese", "Herb mayo", "Sweet potato wedges", "Brioche bun", "Lettuce", "Tomato", "Pickled onion"] },
  ],
  "Rice & Bread": [
    { name: "Lemon Rasam Rice", desc: "Tangy tempered rice, curry leaf, mustard", price: 190, rating: 4.2, veg: true, kind: "rice", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80", prepTime: "15 min", ingredients: ["Basmati rice", "Lemon juice", "Rasam powder", "Curry leaves", "Mustard seeds", "Dal", "Tomato", "Ghee"] },
    { name: "Mutton Biryani", desc: "Sealed and rested, saffron, fried onion", price: 420, rating: 4.9, veg: false, kind: "rice", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80", prepTime: "50 min", ingredients: ["Mutton", "Basmati rice", "Saffron", "Fried onion", "Whole spices", "Yogurt", "Mint", "Rose water"] },
    { name: "Ghee Rice", desc: "Whole spice, caramelised onion", price: 180, rating: 4.3, veg: true, kind: "rice", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80", prepTime: "15 min", ingredients: ["Basmati rice", "Ghee", "Whole spices", "Caramelised onion", "Bay leaf", "Cardamom", "Cloves", "Salt"] },
    { name: "Laccha Paratha", desc: "Layered clay-oven flatbread", price: 70, rating: 4.4, veg: true, kind: "bread", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80", prepTime: "8 min", ingredients: ["Whole wheat flour", "Ghee", "Salt", "Water"] },
    { name: "Garlic Naan", desc: "Roasted garlic, coriander, butter finish", price: 80, rating: 4.5, veg: true, kind: "bread", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", prepTime: "8 min", ingredients: ["Maida flour", "Roasted garlic", "Fresh coriander", "Butter", "Yogurt", "Baking powder", "Salt", "Nigella seeds"] },
  ],
  "Drinks & Sweets": [
    { name: "Jaljeera", desc: "Cumin, mint, black salt, tamarind", price: 90, rating: 4.3, veg: true, kind: "drink", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80", prepTime: "5 min", ingredients: ["Cumin powder", "Fresh mint", "Black salt", "Tamarind pulp", "Chilled water", "Lemon juice", "Chaat masala"] },
    { name: "Watermelon Cooler", desc: "Fresh watermelon, lime, mint", price: 130, rating: 4.2, veg: true, kind: "drink", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80", prepTime: "5 min", ingredients: ["Fresh watermelon", "Lime juice", "Fresh mint", "Sugar syrup", "Ice", "Black salt"] },
    { name: "Masala Chaas", desc: "Spiced buttermilk, roasted cumin", price: 90, rating: 4.4, veg: true, kind: "drink", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=900&q=80", prepTime: "5 min", ingredients: ["Buttermilk", "Roasted cumin", "Fresh coriander", "Green chili", "Ginger", "Salt", "Ice"] },
    { name: "Rasabali", desc: "Flattened cottage-cheese patties, saffron milk", price: 170, rating: 4.7, veg: true, kind: "sweet", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80", prepTime: "15 min", ingredients: ["Chhena (cottage cheese)", "Saffron", "Cardamom", "Full cream milk", "Sugar", "Ghee", "Pistachio"] },
    { name: "Rice Kheer", desc: "Slow-simmered rice pudding, cardamom", price: 150, rating: 4.5, veg: true, kind: "sweet", image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=900&q=80", prepTime: "20 min", ingredients: ["Basmati rice", "Full cream milk", "Sugar", "Cardamom", "Saffron", "Almonds", "Raisins", "Rose water"] },
    { name: "Chhena Poda", desc: "Baked cottage-cheese dessert, caramelised", price: 160, rating: 4.8, veg: true, kind: "sweet", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80", prepTime: "25 min", ingredients: ["Chhena (cottage cheese)", "Sugar", "Semolina", "Cardamom", "Raisins", "Cashew", "Ghee"] },
  ],
};
