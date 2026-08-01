import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import Glass from "./Glass";
import OrderButton from "./OrderButton";
import { useCart } from "../context/CartContext";
import { C, display, mono, FULL_MENU } from "../theme";

/* ---------------------------------------------------------
   Navbar — fixed to the top of the viewport at all times,
   with a solid (non-transparent) background so it reads
   clearly over the hero photo and every section beneath it.

   "Menu"/"Story"/"Contact" are plain anchors to sections on the
   home page (prefixed with "/" so they resolve correctly from
   any page, e.g. "/about"); "About" is a real route, navigated
   via React Router's Link for a client-side page transition.
--------------------------------------------------------- */
export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  const sectionLinks = [
    { href: "/#menu", label: "Menu" },
    { href: "/#story", label: "Story" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <div className="fixed z-40 top-0 left-0 right-0 px-5 sm:px-8 md:px-14 pt-4 sm:pt-5">
      <Glass
        className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{ background: C.ink, border: `1px solid ${C.ink}`, color: "#fff" }}
      >
        <Link to="/" className="text-lg sm:text-xl tracking-wide" style={display(700, { color: "#fff" })}>
          Mirch<span style={{ color: C.red }}>.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide transition-colors hover:text-amber-200"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {l.label}
            </a>
          ))}
          <Link to="/about" className="text-sm tracking-wide transition-colors hover:text-amber-200" style={{ color: "rgba(255,255,255,0.9)" }}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Cart Icon Button */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2.5 rounded-xl transition-transform hover:scale-105 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)", color: C.cream }}
          >
            <ShoppingBag size={20} />
            {totalCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 px-1.5 min-w-[20px] h-[20px] rounded-full flex items-center justify-center text-[11px] font-bold shadow-md animate-pulse-subtle"
                style={{ background: C.red, color: "#fff", ...mono() }}
              >
                {totalCount}
              </span>
            )}
          </button>

          <div className="hidden md:block">
            <OrderButton onClick={() => onOrder(FULL_MENU)} />
          </div>

          <button className="md:hidden text-white ml-1" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </Glass>

      {open && (
        <Glass
          className="mt-2 rounded-2xl px-5 py-4 flex flex-col gap-4 md:hidden"
          style={{ background: C.ink, border: `1px solid ${C.ink}`, color: "#fff" }}
        >
          {sectionLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm" style={{ color: "#fff" }}>
              {l.label}
            </a>
          ))}
          <Link to="/about" onClick={() => setOpen(false)} className="text-sm" style={{ color: "#fff" }}>
            About
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              openCart();
            }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            style={{ background: "rgba(255,255,255,0.15)", color: C.cream }}
          >
            <ShoppingBag size={18} /> View Cart ({totalCount})
          </button>
          <OrderButton
            fullWidth
            onClick={() => {
              setOpen(false);
              onOrder(FULL_MENU);
            }}
          >
            Order on WhatsApp
          </OrderButton>
        </Glass>
      )}
    </div>
  );
}

