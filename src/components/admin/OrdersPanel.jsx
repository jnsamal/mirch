import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, MapPin, Phone, User, FileText, ShoppingBag } from "lucide-react";
import Glass from "../Glass";
import Eyebrow from "../Eyebrow";
import { C, display, mono } from "../../theme";
import { useAdmin } from "../../context/AdminContext";
import { getOrders, updateOrderStatus } from "../../lib/api";

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "ready",
  "completed",
  "cancelled",
];

const STATUS_STYLE = {
  pending: { bg: "#FFF3D6", color: "#B45309" },
  confirmed: { bg: "#DBEAFE", color: "#1D4ED8" },
  preparing: { bg: "#FFE4D6", color: "#C2410C" },
  out_for_delivery: { bg: "#EDE9FE", color: "#6D28D9" },
  ready: { bg: "#CCFBF1", color: "#0F766E" },
  completed: { bg: "#DCFCE7", color: "#15803D" },
  cancelled: { bg: "#FEE2E2", color: "#B91C1C" },
};

const TYPE_STYLE = {
  delivery: { bg: `${C.ink}12`, color: C.ink },
  takeaway: { bg: `${C.coral}33`, color: C.ink },
  "dine-in": { bg: `${C.red}22`, color: C.red },
};

function formatDate(s) {
  if (!s) return "—";
  const d = new Date(s.includes("T") ? s : `${s.replace(" ", "T")}Z`);
  if (isNaN(d)) return s;
  return d.toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }) {
  const style = STATUS_STYLE[status] || STATUS_STYLE.pending;
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide" style={{ background: style.bg, color: style.color, ...mono() }}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

function OrderCard({ order, onStatusChange, busy }) {
  return (
    <Glass className="rounded-2xl p-5 sm:p-6" style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${C.ink}15`, color: C.ink }}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-bold" style={mono({ color: C.ink })}>#{order.id}</span>
        <span className="text-xs" style={mono({ color: C.inkSoft })}>{formatDate(order.createdAt)}</span>
        <span className="px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
          style={{ background: (TYPE_STYLE[order.orderType] || TYPE_STYLE.delivery).bg, color: (TYPE_STYLE[order.orderType] || TYPE_STYLE.delivery).color, ...mono() }}>
          {order.orderType}
        </span>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold mb-3" style={mono({ color: C.inkSoft })}>
            Items
          </h4>
          <ul className="space-y-1.5">
            {order.items.map((it) => (
              <li key={it.id} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="flex-1">
                  <span className="font-semibold">{it.quantity} × {it.name}</span>
                  {it.notes && <span className="block text-xs" style={{ color: C.inkSoft }}>↳ {it.notes}</span>}
                </span>
                <span style={mono()}>₹{it.price * it.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: `${C.ink}12` }}>
            <span className="text-sm" style={{ color: C.inkSoft }}>Subtotal</span>
            <span className="font-bold" style={mono({ color: C.red })}>₹{order.subtotal}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold mb-3" style={mono({ color: C.inkSoft })}>
            Customer
          </h4>
          <div className="space-y-1.5 text-sm">
            <p className="flex items-center gap-2"><User size={13} style={{ color: C.inkSoft }} /> {order.customer.name || "—"}</p>
            <p className="flex items-center gap-2"><Phone size={13} style={{ color: C.inkSoft }} /> {order.customer.phone || "—"}</p>
            <p className="flex items-start gap-2"><MapPin size={13} style={{ color: C.inkSoft, marginTop: 2 }} /> {order.customer.address || "—"}</p>
            {order.notes && <p className="flex items-start gap-2"><FileText size={13} style={{ color: C.inkSoft, marginTop: 2 }} /> {order.notes}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-xs mb-1.5 font-medium" style={{ color: C.inkSoft }}>
              Update status
            </label>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              disabled={busy}
              className="w-full text-sm px-3 py-2 rounded-xl outline-none disabled:opacity-60"
              style={{ background: "rgba(255,255,255,0.9)", border: `1px solid ${C.ink}20`, color: C.ink }}
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replaceAll("_", " ")}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Glass>
  );
}

export default function OrdersPanel() {
  const { token } = useAdmin();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await getOrders(token, filter === "all" ? undefined : filter));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id, status) => {
    setBusyId(id);
    setError(null);
    try {
      await updateOrderStatus(token, id, status);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Eyebrow color={C.red}>Order queue</Eyebrow>
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 disabled:opacity-60"
          style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${C.ink}22`, color: C.ink }}>
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors"
            style={
              filter === s
                ? { background: C.ink, color: C.cream }
                : { background: "rgba(255,255,255,0.5)", color: C.ink, border: `1px solid ${C.ink}22` }
            }
          >
            {s === "all" ? "All" : s.replaceAll("_", " ")}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm font-semibold px-4 py-3 rounded-xl mb-6" style={{ background: "rgba(255,55,55,0.1)", color: C.red }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm" style={{ color: C.inkSoft }}>
          <Loader2 size={18} className="animate-spin" /> Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: C.inkSoft }} />
          <p className="text-sm" style={{ color: C.inkSoft }}>
            {filter === "all" ? "No orders yet." : `No ${filter.replaceAll("_", " ")} orders.`}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              busy={busyId === order.id}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}