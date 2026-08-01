import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Drumstick, Clock, Flame, Plus, Minus, ShoppingBag, CheckCircle2, Utensils } from "lucide-react";
import Glass from "../components/Glass";
import DishArt from "../components/DishArt";
import MenuCard from "../components/MenuCard";
import { useCart } from "../context/CartContext";
import { C, display, mono, waLink, buildOrderMessage } from "../theme";
import { MENU } from "../data/menuData";

const ALL_ITEMS = Object.entries(MENU).flatMap(([category, items]) =>
  items.map((item) => ({ ...item, category }))
);

export default function ItemDetailPage({ onOrder }) {
  const { name: paramName } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const item = useMemo(() => {
    if (!paramName) return null;
    let decoded = paramName;
    try {
      decoded = decodeURIComponent(paramName);
    } catch (e) {
      // ignore malformed URI error and use raw paramName
    }
    const target = decoded.trim().toLowerCase();
    return ALL_ITEMS.find((i) => i.name.trim().toLowerCase() === target);
  }, [paramName]);


  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ background: C.cream, color: C.ink }}>
        <h2 className="text-2xl font-bold mb-4" style={display(600)}>
          Dish Not Found
        </h2>
        <p className="text-sm mb-6 opacity-80">We couldn't find the dish you were looking for.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
          style={{ background: C.ink, color: C.cream }}
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  const currentCartQty = getItemQuantity(item.name);

  // Related items from the same category (excluding current item)
  const relatedItems = ALL_ITEMS.filter(
    (i) => i.category === item.category && i.name !== item.name
  ).slice(0, 6);



  const handleAddToCart = () => {
    addToCart(item, quantity, notes);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDirectWhatsAppOrder = () => {
    const message = buildOrderMessage({ name: item.name, quantity, price: item.price, notes });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 sm:px-8 md:px-14 relative" style={{ background: C.cream, color: C.ink }}>
      {/* Background ambient blurs */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl"
        style={{ background: C.coral }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-24 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{ background: C.red }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-transform hover:-translate-x-1"
          style={{ color: C.inkSoft }}
        >
          <ArrowLeft size={18} /> Back to menu
        </button>

        {/* Main Dish Details Layout */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Dish Image / Art Showcase */}
          <div className="md:col-span-6">
            <Glass className="rounded-3xl overflow-hidden shadow-2xl relative border" style={{ borderColor: `${C.ink}15` }}>
              <div className="w-full aspect-[4/3] sm:aspect-square relative">
                {item.image ? (
                  <img
                    src={item.image}
                    srcSet={item.imageMobile ? `${item.imageMobile} 480w, ${item.image} 900w` : undefined}
                    sizes="(max-width: 768px) 100vw, 500px"
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DishArt kind={item.kind} seed={0} />
                )}

                {/* Dietary Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-md"
                  style={{
                    background: item.veg ? "rgba(235, 247, 235, 0.9)" : "rgba(255, 235, 235, 0.9)",
                    color: item.veg ? "#2e692e" : C.red,
                    border: `1px solid ${item.veg ? "#2e692e44" : C.red + "44"}`,
                  }}
                >
                  {item.veg ? (
                    <>
                      <Leaf size={14} /> Vegetarian
                    </>
                  ) : (
                    <>
                      <Drumstick size={14} /> Non-Vegetarian
                    </>
                  )}
                </div>

                {/* Category Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-md"
                  style={{ background: C.ink, color: C.cream, ...mono() }}
                >
                  {item.category}
                </div>
              </div>
            </Glass>
          </div>

          {/* Dish Information & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Spice & Prep Info Bar */}
              <div className="flex items-center gap-4 mb-4 text-xs font-semibold" style={{ color: C.inkSoft, ...mono() }}>
                {item.prepTime && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5">
                    <Clock size={14} style={{ color: C.red }} />
                    <span>{item.prepTime} prep</span>
                  </div>
                )}

                {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5">
                    <Flame size={14} style={{ color: C.red }} />
                    <div className="flex gap-0.5">
                      {Array.from({ length: item.spiceLevel }).map((_, i) => (
                        <span key={i} style={{ color: C.red }}>🔥</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={display(700)}>
                {item.name}
              </h1>

              <p className="text-base sm:text-lg mb-6 leading-relaxed opacity-85" style={{ color: C.inkSoft }}>
                {item.desc}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-3xl sm:text-4xl font-extrabold" style={mono({ color: C.red })}>
                  ₹{item.price}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold opacity-70" style={mono()}>
                  Taxes Included
                </span>
              </div>

              {/* Ingredients Section */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mb-8 p-5 rounded-2xl border" style={{ background: "rgba(255,255,255,0.6)", borderColor: `${C.ink}15` }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={mono({ color: C.ink })}>
                    <Utensils size={16} style={{ color: C.red }} /> Ingredients & Spices
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs px-3 py-1.5 rounded-xl font-medium border"
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          borderColor: `${C.ink}18`,
                          color: C.ink,
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions Input */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={mono({ color: C.inkSoft })}>
                  Customization & Preferences
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g. extra spicy, no onions, less oil..."
                  className="w-full text-sm px-4 py-3 rounded-xl outline-none border transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    borderColor: `${C.ink}22`,
                    color: C.ink,
                  }}
                />
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-semibold" style={{ color: C.inkSoft }}>
                  Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style={{ background: C.ink, color: C.cream }}
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-8 text-center text-lg font-bold" style={mono()}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                    style={{ background: C.ink, color: C.cream }}
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg"
                  style={{ background: C.ink, color: C.cream, ...display(600) }}
                >
                  {added ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-400" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> Add to Cart (₹{item.price * quantity})
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectWhatsAppOrder}
                  className="py-3.5 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] border"
                  style={{
                    background: C.red,
                    color: "#fff",
                    borderColor: C.red,
                    ...display(600),
                  }}
                >
                  Order on WhatsApp
                </button>
              </div>

              {currentCartQty > 0 && (
                <p className="text-xs text-center mt-3 font-semibold" style={mono({ color: C.red })}>
                  ✓ Currently {currentCartQty} of this dish in your cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Dishes Section */}
        {relatedItems.length > 0 && (
          <div className="pt-12 border-t" style={{ borderColor: `${C.ink}15` }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={display(600)}>
              More from {item.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
              {relatedItems.map((relItem, idx) => (
                <MenuCard key={relItem.name} item={relItem} seed={idx} onOrder={onOrder} />
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
