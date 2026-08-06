import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Plus, Pencil, Trash2, X, Leaf, Drumstick } from "lucide-react";
import Glass from "../Glass";
import DishArt from "../DishArt";
import Eyebrow from "../Eyebrow";
import { C, display, mono } from "../../theme";
import { useAdmin } from "../../context/AdminContext";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../../lib/api";

export const CATEGORIES = ["Starters", "Mains", "Rice & Bread", "Drinks & Sweets"];
export const KINDS = ["bowl", "skewer", "rice", "bread", "drink", "sweet"];

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: CATEGORIES[0],
  veg: true,
  kind: "",
  imageUrl: "",
  prepTimeMin: "",
  spiceLevel: "",
  ingredients: "",
};

function toForm(item) {
  return {
    name: item.name || "",
    description: item.description || "",
    price: item.price != null ? String(item.price) : "",
    category: item.category || CATEGORIES[0],
    veg: !!item.veg,
    kind: item.kind || "",
    imageUrl: item.imageUrl || "",
    prepTimeMin: item.prepTimeMin != null ? String(item.prepTimeMin) : "",
    spiceLevel: item.spiceLevel != null ? String(item.spiceLevel) : "",
    ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(", ") : "",
  };
}

function MenuItemForm({ item, onClose, onSaved }) {
  const { token } = useAdmin();
  const [form, setForm] = useState(item ? toForm(item) : EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.price === "" || isNaN(Number(form.price))) {
      setError("Name and a valid price are required.");
      return;
    }
    setBusy(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      veg: form.veg,
      kind: form.kind || undefined,
      imageUrl: form.imageUrl.trim() || undefined,
      prepTimeMin: form.prepTimeMin === "" ? undefined : Number(form.prepTimeMin),
      spiceLevel: form.spiceLevel === "" ? undefined : Number(form.spiceLevel),
      ingredients: form.ingredients.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (item) await updateMenuItem(token, item.id, payload);
      else await createMenuItem(token, payload);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.8)",
    border: `1px solid ${C.ink}20`,
    color: C.ink,
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-5" style={{ background: "rgba(43,23,16,0.55)" }} onClick={onClose}>
      <Glass
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{ background: "rgba(255,237,206,0.98)", color: C.ink }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2 className="text-xl sm:text-2xl leading-tight" style={display(600)}>
            {item ? `Edit — ${item.name}` : "Add menu item"}
          </h2>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-full transition-colors hover:bg-black/5">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Name *</label>
              <input value={form.name} onChange={set("name")} placeholder="Mutton Rogan Josh" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Description</label>
              <input value={form.description} onChange={set("description")} placeholder="Kashmiri chili, yogurt, slow-braised" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Price (₹) *</label>
              <input value={form.price} onChange={set("price")} type="number" min="0" placeholder="480" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Prep time (min)</label>
              <input value={form.prepTimeMin} onChange={set("prepTimeMin")} type="number" min="0" placeholder="45" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Category</label>
              <select value={form.category} onChange={set("category")} className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Art style (kind)</label>
              <select value={form.kind} onChange={set("kind")} className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle}>
                <option value="">— none —</option>
                {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Spice level (0–3)</label>
              <input value={form.spiceLevel} onChange={set("spiceLevel")} type="number" min="0" max="3" placeholder="2" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div className="flex items-end pb-0.5">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer select-none" style={{ color: C.inkSoft }}>
                <input type="checkbox" checked={form.veg} onChange={(e) => setForm((f) => ({ ...f, veg: e.target.checked }))} className="accent-[#3f7d3f] w-4 h-4" />
                {form.veg ? <Leaf size={14} style={{ color: "#3f7d3f" }} /> : <Drumstick size={14} style={{ color: C.red }} />}
                Vegetarian
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Image URL (leave empty for illustrated art)</label>
              <input value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://images.unsplash.com/…" className="w-full text-sm px-3 py-2 rounded-xl outline-none" style={inputStyle} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1 font-medium" style={{ color: C.inkSoft }}>Ingredients (comma-separated)</label>
              <textarea value={form.ingredients} onChange={set("ingredients")} rows={2} placeholder="Chicken, Kashmiri chili, Yogurt, …" className="w-full text-sm px-3 py-2 rounded-xl outline-none resize-none" style={inputStyle} />
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "rgba(255,55,55,0.1)", color: C.red }}>{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-full text-sm font-semibold transition-colors"
              style={{ background: "rgba(255,255,255,0.7)", color: C.ink, border: `1px solid ${C.ink}20` }}>
              Cancel
            </button>
            <button type="submit" disabled={busy}
              className="flex-1 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-60"
              style={{ background: C.ink, color: C.cream, ...display(600) }}>
              {busy && <Loader2 size={15} className="animate-spin" />}
              {item ? "Save changes" : "Add item"}
            </button>
          </div>
        </form>
      </Glass>
    </div>
  );
}

function MenuItemRow({ item, onEdit, onDelete, onToggle }) {
  return (
    <Glass className="rounded-2xl p-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${C.ink}15`, color: C.ink }}>
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-amber-100">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <DishArt kind={item.kind} seed={item.name.length} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold truncate" style={display(600)}>{item.name}</h4>
          {item.veg ? <Leaf size={13} style={{ color: "#3f7d3f", flexShrink: 0 }} /> : <Drumstick size={13} style={{ color: C.red, flexShrink: 0 }} />}
        </div>
        <div className="text-xs mt-0.5 flex items-center gap-2 flex-wrap" style={{ color: C.inkSoft, ...mono() }}>
          <span>{item.category}</span>
          <span style={{ color: C.red, fontWeight: 700 }}>₹{item.price}</span>
          {item.ingredients?.length > 0 && <span>· {item.ingredients.length} ingredients</span>}
        </div>
      </div>

      <button
        onClick={() => onToggle(item)}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0`}
        style={{ background: item.available ? "#3f7d3f" : `${C.ink}30`, opacity: item.available ? 1 : 0.8 }}
        role="switch"
        aria-checked={item.available}
        title={item.available ? "Sold out" : "Available"}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${item.available ? "left-[26px]" : "left-0.5"}`} />
      </button>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`}
          className="p-2 rounded-xl transition-colors hover:bg-black/5" style={{ color: C.inkSoft }}>
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(item)} aria-label={`Delete ${item.name}`}
          className="p-2 rounded-xl transition-colors hover:bg-red-50" style={{ color: C.red }}>
          <Trash2 size={15} />
        </button>
      </div>
    </Glass>
  );
}

export default function MenuPanel() {
  const { token } = useAdmin();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formItem, setFormItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await getMenuItems(token));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const openAdd = () => { setFormItem(null); setShowForm(true); };
  const openEdit = (item) => { setFormItem(item); setShowForm(true); };

  const handleToggle = async (item) => {
    setBusyId(item.id);
    setError(null);
    try {
      await updateMenuItem(token, item.id, { available: !item.available });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name}" from the menu?`)) return;
    setBusyId(item.id);
    setError(null);
    try {
      await deleteMenuItem(token, item.id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const saved = async () => { setShowForm(false); await load(); };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <Eyebrow color={C.red}>Menu management</Eyebrow>
        <div className="flex gap-2">
          <button onClick={load} disabled={loading}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 disabled:opacity-60"
            style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${C.ink}22`, color: C.ink }}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:scale-105"
            style={{ background: C.ink, color: C.cream, ...display(600) }}>
            <Plus size={15} /> Add item
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm font-semibold px-4 py-3 rounded-xl mb-6" style={{ background: "rgba(255,55,55,0.1)", color: C.red }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm" style={{ color: C.inkSoft }}>
          <Loader2 size={18} className="animate-spin" /> Loading menu…
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: C.inkSoft }}>The menu is empty. Add your first item.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {showForm && (
        <MenuItemForm item={formItem} onClose={() => setShowForm(false)} onSaved={saved} />
      )}
    </div>
  );
}