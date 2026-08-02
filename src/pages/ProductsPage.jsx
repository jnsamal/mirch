import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";
import Eyebrow from "../components/Eyebrow";
import OrderButton from "../components/OrderButton";
import PageBanner from "../components/PageBanner";
import { C, display, mono, FULL_MENU } from "../theme";
import { MENU } from "../data/menuData";

const ALL_ITEMS = Object.values(MENU).flat();
const CATEGORIES = ["All", ...Object.keys(MENU)];

// Lookup for which category each item belongs to, so search can
// match against category names too ("starters", "drinks", ...).
const ITEM_CATEGORY = {};
Object.entries(MENU).forEach(([cat, items]) => {
  items.forEach((item) => {
    ITEM_CATEGORY[item.name] = cat;
  });
});

function matchesQuery(item, query) {
  const q = query.toLowerCase();
  const cat = (ITEM_CATEGORY[item.name] || "").toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    cat.includes(q) ||
    (item.veg && "veg vegetarian".includes(q)) ||
    (!item.veg && "non-veg nonveg chicken mutton prawn".includes(q))
  );
}

/* ---------------------------------------------------------
   ProductsPage — a standalone route (/products) that lists
   every available food item in one grid, with category tabs
   (All / Starters / Mains / Rice & Bread / Drinks & Sweets)
   and a search bar that filters by dish name, description,
   category, or dietary tag. Self-contained: no pagination —
   just the full range of products, each rendered with the
   shared MenuCard.
--------------------------------------------------------- */
export default function ProductsPage({ onOrder }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("All");

  const isSearching = searchQuery.trim().length > 0;

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim();
    if (query) return ALL_ITEMS.filter((item) => matchesQuery(item, query));
    return active === "All" ? ALL_ITEMS : MENU[active];
  }, [active, searchQuery]);

  const handleClearSearch = () => setSearchQuery("");
  return (
    <>
      {/* Banner */}
      <PageBanner eyebrow="Products" title="The full range of what we cook" />

      {/* All products */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.cream }}>
        <div className="relative max-w-6xl mx-auto">
          <Eyebrow color={C.red}>Available now</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 max-w-xl" style={display(600, { color: C.ink })}>
            Every dish on the menu
          </h2>
          <p className="text-sm sm:text-base mb-10" style={{ color: C.inkSoft }}>
            All {ALL_ITEMS.length} items, ready to order from the kitchen.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mb-10">
            <div
              className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-shadow"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: `1.5px solid ${isSearching ? C.red : C.ink + "22"}`,
                boxShadow: isSearching ? `0 0 0 3px ${C.red}15` : "none",
              }}
            >
              <Search
                size={18}
                className="flex-shrink-0 transition-colors"
                style={{ color: isSearching ? C.red : C.inkSoft }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients, categories..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                style={{ color: C.ink, ...mono() }}
              />
              {isSearching && (
                <button
                  onClick={handleClearSearch}
                  className="p-1 rounded-full transition-transform hover:scale-110 hover:bg-black/5"
                  aria-label="Clear search"
                >
                  <X size={16} style={{ color: C.inkSoft }} />
                </button>
              )}
            </div>

            {isSearching && (
              <p className="text-xs mt-2 ml-1" style={{ color: C.inkSoft, ...mono() }}>
                {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found
                {searchQuery.trim() && (
                  <> for "<span style={{ color: C.red, fontWeight: 600 }}>{searchQuery.trim()}</span>"</>
                )}
              </p>
            )}
          </div>

          {/* Category tabs — dimmed while a search query is active */}
          <div
            className="flex flex-wrap gap-2 mb-10 transition-opacity"
            style={{ opacity: isSearching ? 0.4 : 1, pointerEvents: isSearching ? "none" : "auto" }}
          >
            {CATEGORIES.map((cat) => (
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

          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: `${C.ink}08` }}
              >
                <Search size={28} style={{ color: C.inkSoft }} />
              </div>
              <h3 className="text-lg mb-2" style={display(600, { color: C.ink })}>
                No dishes found
              </h3>
              <p className="text-sm max-w-xs mx-auto" style={{ color: C.inkSoft }}>
                Try a different search term — like "biryani", "veg", or "starters".
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-5 px-5 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105"
                style={{ background: C.ink, color: C.cream, ...display(600) }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {filteredItems.map((item, idx) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  seed={idx}
                  onOrder={onOrder}
                  animationDelay={(idx % 6) * 60}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8 md:px-14 text-center" style={{ background: C.coral }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-4 leading-tight" style={display(600, { color: C.ink })}>
            See something you like? Order straight from the kitchen.
          </h2>
          <div className="flex justify-center">
            <OrderButton size="lg" onClick={() => onOrder && onOrder(FULL_MENU)}>
              Order on WhatsApp
            </OrderButton>
          </div>
        </div>
      </section>
    </>
  );
}
