import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMenu, getReviews } from "../lib/api";
import { mapMenuItem, groupMenuByCategory } from "../lib/menuMapper";
import { MENU as STATIC_MENU } from "../data/menuData";
import { REVIEWS as STATIC_REVIEWS } from "../data/reviews";

const DataContext = createContext(null);

function mapReviews(list) {
  return list.map((r) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    dish: r.itemName || "General",
    text: r.text,
  }));
}

/**
 * DataProvider — loads the menu and approved reviews from the backend
 * once on mount. Renders the existing static seed data immediately so
 * the site works even before (or without) the backend responding, then
 * swaps in live data once the API returns.
 */
export function DataProvider({ children }) {
  const [menu, setMenu] = useState(STATIC_MENU);
  const [reviews, setReviews] = useState(STATIC_REVIEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [items, reviewList] = await Promise.all([getMenu(), getReviews()]);
        if (cancelled) return;
        setMenu(groupMenuByCategory(items.map(mapMenuItem)));
        const mappedReviews = mapReviews(reviewList);
        if (mappedReviews.length > 0) setReviews(mappedReviews);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allItems = useMemo(
    () =>
      Object.entries(menu).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category }))
      ),
    [menu]
  );

  const value = useMemo(
    () => ({ menu, allItems, reviews, loading, error }),
    [menu, allItems, reviews, loading, error]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}