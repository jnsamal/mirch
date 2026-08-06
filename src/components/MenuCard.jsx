import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Drumstick, Plus, Minus, Star } from "lucide-react";
import Glass from "./Glass";
import DishArt from "./DishArt";
import { useCart } from "../context/CartContext";
import { C, display, mono } from "../theme";

/**
 * MenuCard — every card uses the same thumbnail box (a real
 * photo if the item has one, illustrated DishArt otherwise) and
 * reserves fixed vertical space for the title and description,
 * so a whole row of cards lines up exactly regardless of how
 * long any one item's text is.
 *
 * The entire card is clickable and navigates to the item detail
 * page. Interactive controls (Add / quantity stepper) sit inside
 * it, so they stop propagation to avoid triggering navigation.
 */
function MenuCard({ item, seed, onOrder, animationDelay = 0 }) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(item.name);
  const detailUrl = `/item/${encodeURIComponent(item.name)}`;

  const openDetails = () => navigate(detailUrl);

  return (
    <Glass
      role="link"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetails();
        }
      }}
      className="rounded-2xl overflow-hidden flex flex-col h-full menu-card-enter transition-shadow hover:shadow-lg group cursor-pointer"
      style={{ color: C.ink, animationDelay: `${animationDelay}ms` }}
      title={`View details for ${item.name}`}
    >
      <div className="w-full menu-card-thumb block overflow-hidden relative">
        {item.image ? (
          <img
            src={item.image}
            srcSet={item.imageMobile ? `${item.imageMobile} 480w, ${item.image} 900w` : undefined}
            sizes="(max-width: 1024px) 46vw, 380px"
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <DishArt kind={item.kind} seed={seed} />
        )}
        {item.rating != null && (
          <div
            className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.92)", color: C.ink, ...mono() }}
          >
            <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
            {item.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="text-base sm:text-xl line-clamp-2 hover:text-red-600 transition-colors" style={display(600, { minHeight: "2.6em" })}>
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

        <div className="flex items-center justify-between mt-auto pt-2 gap-2">
          <span style={mono()} className="text-base font-bold flex-shrink-0">
            ₹{item.price}
          </span>

          {quantity > 0 ? (
            <div
              className="flex items-center gap-2 px-2 py-1 rounded-full border shadow-sm"
              style={{ background: C.ink, color: C.cream, borderColor: C.ink }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.name, quantity - 1);
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:bg-white/20"
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="text-xs font-bold px-1" style={mono()}>
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.name, quantity + 1);
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:bg-white/20"
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item, 1);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-transform hover:scale-105 shadow-sm"
              style={{ background: C.ink, color: C.cream, ...display(600) }}
            >
              <Plus size={14} /> Add
            </button>
          )}
        </div>
      </div>
    </Glass>
  );
}

export default memo(MenuCard);
