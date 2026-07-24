import { MessageCircle, Leaf, Drumstick } from "lucide-react";
import Glass from "./Glass";
import SpiceDots from "./SpiceDots";
import DishArt from "./DishArt";
import { C } from "../theme";

export default function MenuCard({ item, seed, onOrder }) {
  return (
    <Glass className="rounded-2xl overflow-hidden flex flex-col justify-between h-full" style={{ color: C.ink }}>
      <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <DishArt kind={item.kind} seed={seed} />
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg sm:text-xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
              {item.name}
            </h3>
            {item.veg ? (
              <Leaf size={16} style={{ color: "#3f7d3f", flexShrink: 0, marginTop: 4 }} />
            ) : (
              <Drumstick size={16} style={{ color: C.red, flexShrink: 0, marginTop: 4 }} />
            )}
          </div>
          <p className="text-sm mb-4" style={{ color: C.inkSoft }}>
            {item.desc}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
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
