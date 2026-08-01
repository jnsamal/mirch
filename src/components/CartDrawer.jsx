import { useState, useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, Leaf, Drumstick, ArrowRight, UtensilsCrossed } from "lucide-react";
import Glass from "./Glass";
import DishArt from "./DishArt";
import OrderButton from "./OrderButton";
import { useCart } from "../context/CartContext";
import { C, display, mono, waLink, buildCartOrderMessage } from "../theme";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    updateNotes,
    removeFromCart,
    clearCart,
    subtotal,
    totalCount,
  } = useCart();

  const [orderType, setOrderType] = useState("Delivery");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Lock scroll when drawer is open
  useEffect(() => {
    if (!isCartOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const message = buildCartOrderMessage({
      cartItems,
      orderType,
      customerName,
      phone,
      address,
      notes: orderNotes,
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    closeCart();
  };

  const handleBrowseMenu = () => {
    closeCart();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex justify-end" style={{ background: "rgba(43,23,16,0.6)" }} onClick={closeCart}>
      <Glass
        className="w-full max-w-lg h-full flex flex-col shadow-2xl overflow-hidden"
        style={{
          background: "rgba(255,237,206,0.98)",
          color: C.ink,
          borderLeft: `1px solid ${C.ink}22`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b flex items-center justify-between" style={{ borderColor: `${C.ink}15` }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.ink, color: C.cream }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl leading-none" style={display(700)}>
                Your Cart
              </h2>
              <p className="text-xs mt-1" style={{ color: C.inkSoft }}>
                {totalCount} {totalCount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs px-2.5 py-1 rounded-lg transition-colors hover:bg-red-100 flex items-center gap-1"
                style={{ color: C.red }}
                title="Clear Cart"
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-1.5 rounded-full transition-colors hover:bg-black/10 flex-shrink-0"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ background: `${C.ink}08`, color: C.inkSoft }}>
              <UtensilsCrossed size={36} />
            </div>
            <h3 className="text-xl mb-2" style={display(600)}>
              Your cart is empty
            </h3>
            <p className="text-sm mb-6 max-w-xs" style={{ color: C.inkSoft }}>
              Explore our freshly cooked Odisha dishes and add your favorites to your order.
            </p>
            <button
              onClick={handleBrowseMenu}
              className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105"
              style={{ background: C.ink, color: C.cream, ...display(600) }}
            >
              Browse Menu <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Item List */}
            <div className="space-y-4">
              {cartItems.map(({ item, quantity, notes }, idx) => (
                <Glass
                  key={item.name}
                  className="p-4 rounded-2xl flex flex-col gap-3 relative"
                  style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${C.ink}15` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-amber-100">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <DishArt kind={item.kind} seed={idx} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-base" style={display(600)}>
                            {item.name}
                          </h4>
                          {item.veg ? (
                            <Leaf size={14} style={{ color: "#3f7d3f" }} />
                          ) : (
                            <Drumstick size={14} style={{ color: C.red }} />
                          )}
                        </div>
                        <div className="text-xs font-semibold mt-0.5" style={mono({ color: C.inkSoft })}>
                          ₹{item.price} each
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.name)}
                      aria-label={`Remove ${item.name}`}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.name, quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                        style={{ background: C.ink, color: C.cream }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold" style={mono()}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.name, quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                        style={{ background: C.ink, color: C.cream }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-base font-bold" style={mono({ color: C.red })}>
                      ₹{(item.price || 0) * quantity}
                    </div>
                  </div>

                  {/* Per-item note */}
                  <input
                    type="text"
                    value={notes || ""}
                    onChange={(e) => updateNotes(item.name, e.target.value)}
                    placeholder="Special request (e.g. less spicy, no onions)..."
                    className="w-full text-xs px-3 py-1.5 rounded-lg outline-none border transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      borderColor: `${C.ink}20`,
                      color: C.ink,
                    }}
                  />
                </Glass>
              ))}
            </div>

            {/* Order Details Form */}
            <div className="pt-4 border-t space-y-4" style={{ borderColor: `${C.ink}15` }}>
              <h3 className="text-sm font-semibold tracking-wider uppercase" style={mono({ color: C.inkSoft })}>
                Delivery & Order Details
              </h3>

              {/* Order Type Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {["Delivery", "Takeaway", "Dine-in"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className="py-1.5 rounded-xl text-xs font-semibold transition-colors"
                    style={
                      orderType === type
                        ? { background: C.ink, color: C.cream }
                        : { background: "rgba(255,255,255,0.6)", color: C.ink, border: `1px solid ${C.ink}20` }
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full text-xs px-3 py-2 rounded-xl outline-none"
                    style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20`, color: C.ink }}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3 py-2 rounded-xl outline-none"
                    style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20`, color: C.ink }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                  {orderType === "Dine-in" ? "Table Number" : "Delivery Address / Landmarks"}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={orderType === "Dine-in" ? "Table 4" : "House #, Street, Area"}
                  className="w-full text-xs px-3 py-2 rounded-xl outline-none"
                  style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20`, color: C.ink }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                  Overall Kitchen Instructions
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  placeholder="Extra cutlery, pack separately, etc..."
                  className="w-full text-xs px-3 py-2 rounded-xl outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20`, color: C.ink }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Summary & Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t bg-amber-50/50 space-y-4" style={{ borderColor: `${C.ink}15` }}>
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: C.inkSoft }}>Subtotal ({totalCount} items)</span>
              <span className="font-bold text-base" style={mono()}>
                ₹{subtotal}
              </span>
            </div>

            <div className="flex items-center justify-between text-lg font-bold">
              <span style={display(700)}>Total Amount</span>
              <span style={mono({ color: C.red })} className="text-xl">
                ₹{subtotal}
              </span>
            </div>

            <OrderButton fullWidth size="lg" onClick={handleCheckout}>
              Checkout on WhatsApp
            </OrderButton>
          </div>
        )}
      </Glass>
    </div>
  );
}
