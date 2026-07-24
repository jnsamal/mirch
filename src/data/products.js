import thaliSpread from "../images/thali-spread.jpg";
import chickenCurryPan from "../images/chicken-curry-pan.jpg";
import spicyKadaiCurry from "../images/spicy-kadai-curry.jpg";

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
    id: "butter-chicken",
    name: "Butter Chicken",
    image: chickenCurryPan,
    description: "Tomato, cream, fenugreek, mild heat",
    price: 400,
    tags: ["Non-veg"],
  },
  {
    id: "mutton-curry",
    name: "Slow Mutton Curry",
    image: spicyKadaiCurry,
    description: "12-hour simmer, whole spice, ghee finish",
    price: 480,
    tags: ["Non-veg", "Spicy"],
  },
];
