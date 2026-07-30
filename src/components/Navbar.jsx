import { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import Glass from "./Glass";
import OrderButton from "./OrderButton";
import { C, display, FULL_MENU } from "../theme";

/* ---------------------------------------------------------
   Navbar — fixed to the top of the viewport at all times,
   with a solid (non-transparent) background so it reads
   clearly over the hero photo and every section beneath it.
--------------------------------------------------------- */
export default function Navbar({ onOrder }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#story", label: "Story" },
    { href: "#visit", label: "Visit" },
  ];

  return (
    <div className="fixed z-40 top-0 left-0 right-0 px-5 sm:px-8 md:px-14 pt-4 sm:pt-5">
      <Glass
        className="rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{ background: C.ink, border: `1px solid ${C.ink}`, color: "#fff" }}
      >
        <span className="text-lg sm:text-xl tracking-wide" style={display(700, { color: "#fff" })}>
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

        <div className="hidden md:block">
          <OrderButton onClick={() => onOrder(FULL_MENU)} />
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </Glass>

      {open && (
        <Glass
          className="mt-2 rounded-2xl px-5 py-4 flex flex-col gap-4 md:hidden"
          style={{ background: C.ink, border: `1px solid ${C.ink}`, color: "#fff" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm" style={{ color: "#fff" }}>
              {l.label}
            </a>
          ))}
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
