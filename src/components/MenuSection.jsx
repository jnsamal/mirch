import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import MenuCard from "./MenuCard";
import Eyebrow from "./Eyebrow";
import { C, display, mono } from "../theme";
import { MENU } from "../data/menuData";

const PAGE_SIZE = 6;

// MENU is static, so these never need to be recomputed per render —
// derive them once at module load instead of on every re-render.
const CATEGORIES = ["All", ...Object.keys(MENU)];
const ALL_ITEMS = Object.values(MENU).flat();

// Build a lookup so we can show which category a result belongs to.
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

export default function MenuSection({ onOrder, showAll = false }) {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearching = searchQuery.trim().length > 0;

  // When searching, scan all items regardless of selected category.
  const filteredItems = useMemo(() => {
    if (!isSearching) {
      return active === "All" ? ALL_ITEMS : MENU[active];
    }
    return ALL_ITEMS.filter((item) => matchesQuery(item, searchQuery.trim()));
  }, [active, isSearching, searchQuery]);

  // Reset pagination when filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [active, searchQuery]);

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, visibleCount);
  const hasMore = !showAll && visibleCount < filteredItems.length;
  const isExpanded = !showAll && visibleCount > PAGE_SIZE;

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <section id="menu" className="relative overflow-hidden scroll-mt-24 py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.cream }}>
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

        {/* Search bar */}
        <div className="relative max-w-md mb-8">
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

          {/* Result count hint */}
          {isSearching && (
            <p className="text-xs mt-2 ml-1" style={{ color: C.inkSoft, ...mono() }}>
              {filteredItems.length} {filteredItems.length === 1 ? "dish" : "dishes"} found
              {searchQuery.trim() && (
                <> for "<span style={{ color: C.red, fontWeight: 600 }}>{searchQuery.trim()}</span>"</>
              )}
            </p>
          )}
        </div>

        {/* Category tabs — visually dimmed when a search query is active */}
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

        {/* Results grid or empty state */}
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
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {visibleItems.map((item, idx) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  seed={idx}
                  onOrder={onOrder}
                  animationDelay={(idx % PAGE_SIZE) * 60}
                />
              ))}
            </div>

            {(hasMore || isExpanded) && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() =>
                    hasMore ? setVisibleCount((v) => Math.min(v + PAGE_SIZE, filteredItems.length)) : setVisibleCount(PAGE_SIZE)
                  }
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
                  style={{ background: C.ink, color: C.cream }}
                >
                  {hasMore ? (
                    <>
                      Show more <ChevronDown size={16} />
                    </>
                  ) : (
                    <>
                      Show less <ChevronUp size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

