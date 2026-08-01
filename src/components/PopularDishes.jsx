import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MenuCard from "./MenuCard";
import Eyebrow from "./Eyebrow";
import { C, display } from "../theme";
import { MENU } from "../data/menuData";

const POPULAR_NAMES = [
  "Mutton Biryani",
  "Chicken Chettinad",
  "Full Veg Thali",
  "Tandoori Prawns",
  "Mutton Rogan Josh",
  "Rasabali",
];

const ALL_ITEMS = Object.values(MENU).flat();
const POPULAR_ITEMS = POPULAR_NAMES
  .map((name) => ALL_ITEMS.find((item) => item.name === name))
  .filter(Boolean);

/* ---------------------------------------------------------
   PopularDishes — six crowd-favourite dishes shown right below
   the hero carousel. Each card is the shared MenuCard, so it
   supports add-to-cart, quantity, and the detail page.
--------------------------------------------------------- */
export default function PopularDishes({ onOrder }) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.cream }}>
      {/* soft backdrop shapes for glass to sit on */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-40 blur-3xl"
        style={{ background: C.coral }}
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: C.red }}
      />

      <div className="relative max-w-6xl mx-auto">
        <Eyebrow color={C.red}>Popular right now</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 max-w-xl" style={display(600, { color: C.ink })}>
          The dishes everyone orders
        </h2>
        <p className="text-sm sm:text-base mb-10" style={{ color: C.inkSoft }}>
          A snapshot of the menu — see every dish on the products page.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {POPULAR_ITEMS.map((item, idx) => (
            <MenuCard
              key={item.name}
              item={item}
              seed={idx}
              onOrder={onOrder}
              animationDelay={(idx % 3) * 60}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
            style={{ background: C.ink, color: C.cream, ...display(600) }}
          >
            See all products <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
