import { MessageCircle, Leaf, Drumstick } from "lucide-react";
import Glass from "./Glass";
import SpiceDots from "./SpiceDots";
import DishArt from "./DishArt";
import { C } from "../theme";

/**
 * MenuCard — every card uses the same illustrated thumbnail
 * treatment (DishArt) and reserves fixed vertical space for the
 * title and description, so a whole row of cards lines up
 * exactly regardless of how long any one item's text is.
 */
export default function MenuCard({ item, seed, onOrder }) {
  return (
    <Glass className="rounded-2xl overflow-hidden flex flex-col h-full" style={{ color: C.ink }}>
      <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
        <DishArt kind={item.kind} seed={seed} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className="text-lg sm:text-xl line-clamp-1"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            {item.name}
          </h3>
          {item.veg ? (
            <Leaf size={16} style={{ color: "#3f7d3f", flexShrink: 0, marginTop: 4 }} />
          ) : (
            <Drumstick size={16} style={{ color: C.red, flexShrink: 0, marginTop: 4 }} />
          )}
        </div>

        <p
          className="text-sm mb-4 line-clamp-2"
          style={{ color: C.inkSoft, minHeight: "2.6em" }}
        >
          {item.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col gap-1.5">
            <span style={{ fontFamily: "'Space Mono', monospace" }} className="text-base font-bold">
              ₹{item.price}
            </span>
            <SpiceDots level={item.spice} />
          </div>
          <button
            onClick={() => onOrder(item.name)}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-transform hover:scale-105"
            style={{ background: C.ink, color: C.cream }}
          >
            <MessageCircle size={13} />
            Order
          </button>
        </div>
      </div>
    </Glass>
  );
}
