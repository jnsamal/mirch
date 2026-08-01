import { useEffect } from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import Glass from "./Glass";
import { useCart } from "../context/CartContext";
import { C, display } from "../theme";

export default function Toast() {
  const { toastMessage, clearToast, openCart } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80] max-w-sm animate-bounce-short">
      <Glass
        className="px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border"
        style={{
          background: C.ink,
          borderColor: C.red,
          color: "#fff",
        }}
      >
        <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-medium flex-1 line-clamp-1">{toastMessage}</span>
        <button
          onClick={() => {
            clearToast();
            openCart();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-transform hover:scale-105"
          style={{ background: C.red, color: "#fff", ...display(600) }}
        >
          <ShoppingBag size={14} /> View
        </button>
        <button
          onClick={clearToast}
          className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </Glass>
    </div>
  );
}
