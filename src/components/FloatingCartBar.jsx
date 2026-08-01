import { ShoppingBag, ArrowRight } from "lucide-react";
import Glass from "./Glass";
import { useCart } from "../context/CartContext";
import { C, display, mono } from "../theme";

export default function FloatingCartBar() {
  const { totalCount, subtotal, openCart, isCartOpen } = useCart();

  if (totalCount === 0 || isCartOpen) return null;

  return (
    <div className="fixed z-[50] bottom-5 left-4 right-28 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-11/12 md:max-w-md animate-fade-in">
      <Glass
        className="px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-2xl cursor-pointer transition-transform hover:scale-[1.02]"
        style={{
          background: C.ink,
          color: C.cream,
          border: `1px solid ${C.red}66`,
        }}
        onClick={openCart}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: C.red, color: "#fff" }}
          >
            <ShoppingBag size={20} />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: C.cream, color: C.ink, ...mono() }}
            >
              {totalCount}
            </span>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-80" style={mono()}>
              {totalCount} {totalCount === 1 ? "Item" : "Items"} in Cart
            </div>
            <div className="text-base font-bold" style={mono({ color: C.cream })}>
              ₹{subtotal}
            </div>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{ background: C.red, color: "#fff", ...display(600) }}
        >
          View Cart <ArrowRight size={14} />
        </button>
      </Glass>
    </div>
  );
}
