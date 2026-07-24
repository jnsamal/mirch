import Glass from "./Glass";
import { C } from "../theme";

/**
 * ProductCard — a generic, reusable card that shows a product's
 * photo alongside its data (name, description, price, tags).
 * Not tied to the restaurant menu specifically: pass any product
 * shape and it renders the same way. Optional action button.
 *
 * Props:
 *   product: {
 *     name: string,
 *     image: string        (imported image or URL)
 *     description?: string
 *     price?: string | number
 *     tags?: string[]       (short labels, e.g. ["Veg", "Bestseller"])
 *   }
 *   actionLabel?: string        (button text — omit to hide the button)
 *   onAction?: (product) => void
 */
export default function ProductCard({ product, actionLabel, onAction }) {
  const { name, image, description, price, tags = [] } = product;

  return (
    <Glass className="rounded-2xl overflow-hidden flex flex-col h-full" style={{ color: C.ink }}>
      <div className="w-full aspect-[4/3] bg-black/5">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: C.inkSoft }}>
            No image
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-lg sm:text-xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
              {name}
            </h3>
            {price != null && price !== "" && (
              <span
                className="text-sm font-bold whitespace-nowrap"
                style={{ fontFamily: "'Space Mono', monospace", color: C.red }}
              >
                {typeof price === "number" ? `₹${price}` : price}
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm mb-3" style={{ color: C.inkSoft }}>
              {description}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(43,23,16,0.08)", color: C.inkSoft }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {actionLabel && (
          <button
            onClick={() => onAction && onAction(product)}
            className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-transform hover:scale-105"
            style={{ background: C.ink, color: C.cream }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </Glass>
  );
}
