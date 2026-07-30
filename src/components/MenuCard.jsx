import { memo } from "react";
import { Leaf, Drumstick } from "lucide-react";
import Glass from "./Glass";
import DishArt from "./DishArt";
import OrderButton from "./OrderButton";
import { C, display, mono } from "../theme";

/**
 * MenuCard — every card uses the same thumbnail box (a real
 * photo if the item has one, illustrated DishArt otherwise) and
 * reserves fixed vertical space for the title and description,
 * so a whole row of cards lines up exactly regardless of how
 * long any one item's text is.
 */
function MenuCard({ item, seed, onOrder, animationDelay = 0 }) {
  return (
    <Glass
      className="rounded-2xl overflow-hidden flex flex-col h-full menu-card-enter"
      style={{ color: C.ink, animationDelay: `${animationDelay}ms` }}
    >
      <div className="w-full menu-card-thumb">
        {item.image ? (
          <img
            src={item.image}
            srcSet={item.imageMobile ? `${item.imageMobile} 480w, ${item.image} 900w` : undefined}
            sizes="(max-width: 1024px) 46vw, 380px"
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <DishArt kind={item.kind} seed={seed} />
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-base sm:text-xl line-clamp-2" style={display(600, { minHeight: "2.6em" })}>
            {item.name}
          </h3>
          {item.veg ? (
            <Leaf size={16} style={{ color: "#3f7d3f", flexShrink: 0, marginTop: 4 }} />
          ) : (
            <Drumstick size={16} style={{ color: C.red, flexShrink: 0, marginTop: 4 }} />
          )}
        </div>

        <p className="text-sm mb-3 sm:mb-4 line-clamp-2" style={{ color: C.inkSoft, minHeight: "2.6em" }}>
          {item.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span style={mono()} className="text-base font-bold">
            ₹{item.price}
          </span>
          <OrderButton size="sm" variant="ink" onClick={() => onOrder(item)} />
        </div>
      </div>
    </Glass>
  );
}

export default memo(MenuCard);
