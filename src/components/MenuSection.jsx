import { useState } from "react";
import MenuCard from "./MenuCard";
import Eyebrow from "./Eyebrow";
import { C, display } from "../theme";
import { MENU } from "../data/menuData";

export default function MenuSection({ onOrder }) {
  const [active, setActive] = useState("All");
  const categories = ["All", ...Object.keys(MENU)];
  const items = active === "All" ? Object.values(MENU).flat() : MENU[active];

  return (
    <section id="menu" className="relative overflow-hidden py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.cream }}>
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
        <Eyebrow color={C.red}>The menu</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-8 max-w-xl" style={display(600, { color: C.ink })}>
          Ordered by how it's cooked, not by what's trending
        </h2>

        {/* category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={
                active === cat
                  ? { background: C.ink, color: C.cream }
                  : { background: "rgba(255,255,255,0.5)", color: C.ink, border: `1px solid ${C.ink}22` }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {items.map((item, idx) => (
            <MenuCard key={item.name} item={item} seed={idx} onOrder={onOrder} />
          ))}
        </div>
      </div>
    </section>
  );
}
