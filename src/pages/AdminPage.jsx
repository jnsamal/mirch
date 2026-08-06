import { useState } from "react";
import { Shield, Lock, Eye, EyeOff, LogOut, Loader2, ShoppingBag, UtensilsCrossed, Star } from "lucide-react";
import Glass from "../components/Glass";
import { C, display, mono } from "../theme";
import { useAdmin } from "../context/AdminContext";
import { getOrders } from "../lib/api";
import OrdersPanel from "../components/admin/OrdersPanel";
import MenuPanel from "../components/admin/MenuPanel";
import ReviewsPanel from "../components/admin/ReviewsPanel";

const TABS = [
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "reviews", label: "Reviews", icon: Star },
];

function LoginGate() {
  const { login } = useAdmin();
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      // Admin endpoints reject a wrong key with 401, so probing the
      // order queue doubles as a login check.
      await getOrders(key.trim());
      login(key);
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("Unauthorized")) setError("That admin key isn't right.");
      else if (msg.includes("Failed to fetch") || msg.includes("load failed"))
        setError("Can't reach the backend — is the server running?");
      else setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 sm:px-8 md:px-14 relative flex items-start justify-center" style={{ background: C.cream, color: C.ink }}>
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: C.coral }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: C.red }} />

      <div className="relative z-10 w-full max-w-md mt-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield size={20} style={{ color: C.red }} />
          <span className="text-xs uppercase tracking-widest" style={mono({ color: C.inkSoft })}>
            Restricted area
          </span>
        </div>

        <Glass className="rounded-3xl p-8 shadow-2xl" style={{ background: "rgba(255,237,206,0.97)" }}>
          <h1 className="text-3xl mb-1" style={display(700)}>Mirch Admin</h1>
          <p className="text-sm mb-6" style={{ color: C.inkSoft }}>
            Enter the admin key to manage orders, the menu, and reviews.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                Admin key
              </label>
              <div className="flex items-center gap-2 rounded-xl px-3 border transition-colors"
                style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20` }}>
                <Lock size={15} style={{ color: C.inkSoft }} />
                <input
                  type={showKey ? "text" : "password"}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Paste ADMIN_KEY"
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none text-sm py-2.5"
                  style={{ color: C.ink }}
                />
                <button type="button" onClick={() => setShowKey((v) => !v)} aria-label="Toggle key visibility"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(255,55,55,0.1)", color: C.red }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !key.trim()}
              className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              style={{ background: C.ink, color: C.cream, ...display(600), opacity: busy || !key.trim() ? 0.6 : 1 }}
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
              {busy ? "Checking…" : "Unlock admin"}
            </button>
          </form>
        </Glass>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthed, logout } = useAdmin();
  const [active, setActive] = useState("orders");

  if (!isAuthed) return <LoginGate />;

  return (
    <div className="min-h-screen pt-24 pb-20 px-5 sm:px-8 md:px-14 relative" style={{ background: C.cream, color: C.ink }}>
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: C.coral }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: C.red }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={18} style={{ color: C.red }} />
              <span className="text-xs uppercase tracking-widest" style={mono({ color: C.inkSoft })}>
                Mirch control room
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl" style={display(700)}>Admin</h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5"
            style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${C.ink}22`, color: C.ink }}
          >
            <LogOut size={15} /> Lock
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={
                  isActive
                    ? { background: C.ink, color: C.cream, ...display(600) }
                    : { background: "rgba(255,255,255,0.5)", color: C.ink, border: `1px solid ${C.ink}22` }
                }
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>

        {active === "orders" && <OrdersPanel />}
        {active === "menu" && <MenuPanel />}
        {active === "reviews" && <ReviewsPanel />}
      </div>
    </div>
  );
}