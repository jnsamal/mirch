/**
 * Maps backend (/api/menu) items onto the shape the frontend
 * components expect ({ desc, image, imageMobile, prepTime, rating, ... }).
 * Backend fields not present (rating, imageMobile) fall back to the
 * static seed data so existing UI keeps working.
 */
import { MENU as STATIC_MENU } from "../data/menuData";

const STATIC_BY_NAME = {};
Object.values(STATIC_MENU)
  .flat()
  .forEach((item) => {
    STATIC_BY_NAME[item.name] = item;
  });

export function mapMenuItem(item) {
  const seed = STATIC_BY_NAME[item.name] || {};
  return {
    id: item.id,
    name: item.name,
    desc: item.description ?? "",
    price: item.price,
    rating: typeof item.rating === "number" ? item.rating : (seed.rating ?? null),
    veg: !!item.veg,
    kind: item.kind ?? seed.kind ?? null,
    image: item.imageUrl ?? seed.image ?? null,
    imageMobile: seed.imageMobile ?? null,
    prepTime:
      typeof item.prepTimeMin === "number"
        ? `${item.prepTimeMin} min`
        : seed.prepTime ?? null,
    ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
    available: item.available !== false,
    category: item.category,
  };
}

export function groupMenuByCategory(items) {
  const grouped = {};
  for (const item of items) {
    (grouped[item.category] ??= []).push(item);
  }
  return grouped;
}