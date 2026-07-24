import thaliSpread from "../images/thali-spread.jpg";
import chickenCurryPan from "../images/chicken-curry-pan.jpg";
import spicyKadaiCurry from "../images/spicy-kadai-curry.jpg";

export const MENU = {
  Starters: [
    { name: "Charred Corn Bhel", desc: "Puffed rice, tamarind, roasted corn, mint", price: 180, spice: 1, veg: true, kind: "bowl" },
    { name: "Coal-Smoked Wings", desc: "Kashmiri chili glaze, curry-leaf oil", price: 320, spice: 3, veg: false, kind: "skewer" },
    { name: "Paneer Tikka Skewers", desc: "Charred cottage cheese, mustard marinade", price: 260, spice: 2, veg: true, kind: "skewer" },
  ],
  Mains: [
    { name: "Mustard Fish Curry", desc: "River fish, black mustard, green chili", price: 420, spice: 3, veg: false, kind: "bowl" },
    { name: "Slow Mutton Curry", desc: "12-hour simmer, whole spice, ghee finish", price: 480, spice: 3, veg: false, image: spicyKadaiCurry },
    { name: "Dalma", desc: "Lentils and vegetables, Odia five-spice tempering", price: 240, spice: 1, veg: true, kind: "bowl" },
    { name: "Butter Chicken", desc: "Tomato, cream, fenugreek, mild heat", price: 400, spice: 1, veg: false, image: chickenCurryPan },
    { name: "Full Veg Thali", desc: "Chef's spread — dal, sabzi, raita, rice, roti", price: 260, spice: 1, veg: true, image: thaliSpread },
  ],
  "Rice & Bread": [
    { name: "Ghee Rice", desc: "Whole spice, caramelised onion", price: 180, spice: 0, veg: true, kind: "rice" },
    { name: "Chicken Dum Biryani", desc: "Sealed and rested, saffron, fried onion", price: 380, spice: 2, veg: false, kind: "rice" },
    { name: "Tandoori Roti / Butter Naan", desc: "Made to order, clay-oven finish", price: 60, spice: 0, veg: true, kind: "bread" },
  ],
  "Drinks & Sweets": [
    { name: "Masala Chaas", desc: "Spiced buttermilk, roasted cumin", price: 90, spice: 1, veg: true, kind: "drink" },
    { name: "Ginger Fizz", desc: "Fresh ginger, lime, soda", price: 120, spice: 1, veg: true, kind: "drink" },
    { name: "Chhena Poda", desc: "Baked cottage-cheese dessert, caramelised", price: 160, spice: 0, veg: true, kind: "sweet" },
  ],
};
