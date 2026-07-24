import { useState } from "react";
import { MessageCircle, Menu as MenuIcon, X } from "lucide-react";
import Glass from "./Glass";
import { C } from "../theme";

/* ---------------------------------------------------------
   Navbar
--------------------------------------------------------- */
export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#story", label: "Story" },
    { href: "#visit", label: "Visit" },
  ];
  return (
    <div className="absolute z-20 top-0 left-0 right-0 px-5 sm:px-8 md:px-14 pt-5">
      <Glass className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between" style={{ color: "#fff" }}>
        <span
          className="text-lg sm:text-xl tracking-wide"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: "#fff" }}
        >
          Mirch<span style={{ color: C.red }}>.</span>
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide"
              style={{ color: "rgba(255,255,255,0.9)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => onOrder("the full menu")}
          className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          style={{ background: C.red, color: "#fff" }}
        >
          <MessageCircle size={15} />
          Order
        </button>

        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </Glass>

      {open && (
        <Glass className="mt-2 rounded-2xl px-5 py-4 flex flex-col gap-4 md:hidden" style={{ color: "#fff" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm" style={{ color: "#fff" }}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onOrder("the full menu");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
            style={{ background: C.red, color: "#fff" }}
          >
            <MessageCircle size={15} />
            Order on WhatsApp
          </button>
        </Glass>
      )}
    </div>
  );
}
