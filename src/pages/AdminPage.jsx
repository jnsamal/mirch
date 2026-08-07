import { useState, useEffect } from "react";
import { Shield, Lock, Eye, EyeOff, LogOut, Loader2, ShoppingBag, UtensilsCrossed, Star, Mail, User, ChevronRight } from "lucide-react";
import Glass from "../components/Glass";
import Navbar from "../components/Navbar";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password || busy) return;
    setBusy(true);
    setError(null);
    try {
      await login(email.trim().toLowerCase(), password);
    } catch (err) {
      const msg = err?.message || "";
      if (msg.includes("Invalid email or password") || msg.includes("401")) {
        setError("Invalid email or password.");
      } else if (msg.includes("Failed to fetch") || msg.includes("load failed") || msg.includes("network")) {
        setError("Can't reach the backend — is the server running?");
      } else {
        setError(msg);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 sm:px-8 md:px-14 relative flex items-start justify-center" style={{ background: C.cream, color: C.ink }}>
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: C.coral }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: C.red }} />

      <div className="relative z-10 w-full max-w-md mt-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield size={20} style={{ color: C.red }} />
          <span className="text-xs uppercase tracking-widest" style={mono({ color: C.inkSoft })}>
            Restricted area
          </span>
        </div>

        <Glass className="rounded-3xl p-8 shadow-2xl relative overflow-hidden" style={{ background: "rgba(255,237,206,0.97)" }}>
          <div className="absolute inset-0 rounded-3xl" style={{ 
            boxShadow: `0 0 0 1px ${C.red}40, 0 0 30px 4px ${C.red}30, inset 0 0 30px 4px ${C.red}10`,
            pointerEvents: 'none'
          }} />
          <h1 className="text-3xl mb-1" style={display(700)}>Mirch Admin</h1>
          <p className="text-sm mb-6" style={{ color: C.inkSoft }}>
            Sign in to manage orders, the menu, and reviews.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                Email
              </label>
              <div className="flex items-center gap-2 rounded-xl px-3 border transition-colors"
                style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20` }}>
                <Mail size={15} style={{ color: C.inkSoft }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mirch.example"
                  autoComplete="email"
                  className="flex-1 bg-transparent outline-none text-sm py-2.5"
                  style={{ color: C.ink }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>
                Password
              </label>
              <div className="flex items-center gap-2 rounded-xl px-3 border transition-colors"
                style={{ background: "rgba(255,255,255,0.8)", border: `1px solid ${C.ink}20` }}>
                <Lock size={15} style={{ color: C.inkSoft }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="flex-1 bg-transparent outline-none text-sm py-2.5"
                  style={{ color: C.ink }}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label="Toggle password visibility"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
              disabled={busy || !email.trim() || !password}
              className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              style={{ background: C.ink, color: C.cream, ...display(600), opacity: busy || !email.trim() || !password ? 0.6 : 1 }}
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <User size={15} />}
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </Glass>
      </div>
    </div>
  );
}

function AdminSidebar({ active, setActive, onLogout, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - fixed on desktop, drawer on mobile */}
      <aside 
        className={`w-64 flex-shrink-0 fixed left-0 transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:z-30 ${isOpen ? "z-50" : "z-30"}`}
        style={{ 
          background: C.coral, 
          borderRight: `1px solid ${C.ink}15`,
          top: "var(--navbar-height, 0px)",
          height: "calc(100vh - var(--navbar-height, 0px))",
        }}
      >
        <nav className="p-4 space-y-1 h-full overflow-y-auto pt-4 md:pt-8">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActive(tab.id); onClose(); }}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                style={{
                  background: isActive ? C.ink : "transparent",
                  color: isActive ? C.cream : C.cream,
                  border: isActive ? "none" : `1px solid rgba(255,255,255,0.2)`,
                }}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{tab.label}</span>
                {isActive && <ChevronRight size={16} />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t absolute bottom-0 left-0 right-0" style={{ borderColor: `rgba(255,255,255,0.15)` }}>
          <button
            onClick={onLogout}
            className="w-full inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 justify-center"
            style={{ background: "rgba(255,255,255,0.15)", border: `1px solid rgba(255,255,255,0.2)`, color: C.cream }}
          >
            <LogOut size={15} /> Lock
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminPage() {
  const { isAuthed, logout } = useAdmin();
  const [active, setActive] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector('nav[class*="fixed"]') || document.querySelector('[class*="z-40"]');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  if (!isAuthed) return <LoginGate />;

  return (
    <div className="min-h-screen relative" style={{ background: C.cream, color: C.ink, "--navbar-height": `${navbarHeight}px` }}>
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-3xl" style={{ background: C.coral }} />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: C.red }} />

      <Navbar onOrder={() => {}} />
      
      <div className="relative z-10 flex min-h-screen pt-20">
        <AdminSidebar 
          active={active} 
          setActive={setActive} 
          onLogout={logout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-14 overflow-auto md:ml-64">
          {/* Mobile sidebar toggle button */}
          <button
            className="md:hidden mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
            style={{ background: C.ink, color: C.cream }}
            onClick={() => setSidebarOpen(true)}
          >
            <ShoppingBag size={16} /> {active === "orders" ? "Orders" : active === "menu" ? "Menu" : "Reviews"}
          </button>
          
          {active === "orders" && <OrdersPanel />}
          {active === "menu" && <MenuPanel />}
          {active === "reviews" && <ReviewsPanel />}
        </main>
      </div>
    </div>
  );
}