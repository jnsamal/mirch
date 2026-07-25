import { MessageCircle } from "lucide-react";
import { C, FULL_MENU } from "../theme";

/* ---------------------------------------------------------
   Floating WhatsApp FAB
--------------------------------------------------------- */
export default function WhatsAppFab({ onOrder }) {
  return (
    <button
      onClick={() => onOrder(FULL_MENU)}
      aria-label="Order on WhatsApp"
      className="fixed z-40 bottom-5 right-5 sm:bottom-7 sm:right-7 rounded-full p-4 shadow-xl transition-transform hover:scale-105"
      style={{ background: C.red, color: "#fff" }}
    >
      <MessageCircle size={24} />
    </button>
  );
}
