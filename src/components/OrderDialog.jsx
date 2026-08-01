import { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Glass from "./Glass";
import OrderButton from "./OrderButton";
import { useCart } from "../context/CartContext";
import { C, display, mono, FULL_MENU, waLink, buildOrderMessage } from "../theme";

/**
 * OrderDialog — shown before every WhatsApp redirect or quick item add.
 * Lets the person set a quantity, add preferences/changes in a free-text
 * box, and either add to cart or order directly.
 */
export default function OrderDialog({ item, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const { addToCart } = useCart();

  // Reset the form every time a new item is opened.
  useEffect(() => {
    setQuantity(1);
    setNotes("");
  }, [item]);

  // Lock background scroll while the dialog is open.
  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [item]);

  if (!item) return null;

  const isGeneral = item.name === FULL_MENU;
  const hasPrice = typeof item.price === "number";
  const total = hasPrice ? item.price * quantity : null;

  const handleAddToCart = () => {
    addToCart(item, quantity, notes);
    onClose();
  };

  const handleConfirm = () => {
    const message = buildOrderMessage({ name: item.name, quantity, price: item.price, notes });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-5"
      style={{ background: "rgba(43,23,16,0.55)" }}
      onClick={onClose}
    >
      <Glass
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
        style={{ background: "rgba(255,237,206,0.97)", color: C.ink }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2 className="text-xl sm:text-2xl leading-tight" style={display(600)}>
            {isGeneral ? "Start your order" : item.name}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-full transition-colors hover:bg-black/5 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {hasPrice && !isGeneral && (
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm" style={{ color: C.inkSoft }}>
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: C.ink, color: C.cream }}
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-semibold" style={mono()}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                style={{ background: C.ink, color: C.cream }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}

        <label className="block text-sm mb-2" style={{ color: C.inkSoft }}>
          {isGeneral ? "What would you like to order? Any preferences?" : "Any preferences or changes?"}
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder={
            isGeneral ? "E.g. 2 Butter Chicken, less spicy, one Garlic Naan..." : "E.g. less spicy, no onions..."
          }
          className="w-full rounded-xl px-3 py-2 text-sm mb-5 resize-none outline-none"
          style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${C.ink}22`, color: C.ink }}
        />

        {hasPrice && !isGeneral && (
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm" style={{ color: C.inkSoft }}>
              Total
            </span>
            <span className="text-lg font-bold" style={mono({ color: C.red })}>
              ₹{total}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {hasPrice && !isGeneral && (
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-sm"
              style={{ background: C.ink, color: C.cream, ...display(600) }}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
          )}

          <OrderButton fullWidth size={hasPrice && !isGeneral ? "md" : "lg"} onClick={handleConfirm}>
            {hasPrice && !isGeneral ? "Order Directly on WhatsApp" : "Continue on WhatsApp"}
          </OrderButton>
        </div>
      </Glass>
    </div>
  );
}

