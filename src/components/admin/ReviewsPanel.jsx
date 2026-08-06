import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw, Check, Trash2, Star } from "lucide-react";
import Glass from "../Glass";
import Eyebrow from "../Eyebrow";
import { C, display, mono } from "../../theme";
import { useAdmin } from "../../context/AdminContext";
import { getReviews, getPendingReviews, approveReview, deleteReview } from "../../lib/api";

function formatDate(s) {
  if (!s) return "—";
  const d = new Date(s.includes("T") ? s : `${s.replace(" ", "T")}Z`);
  if (isNaN(d)) return s;
  return d.toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < rating ? C.red : "none"} style={{ color: i < rating ? C.red : C.inkSoft, opacity: i < rating ? 1 : 0.4 }} />
      ))}
    </div>
  );
}

function ReviewCard({ review, pending, onApprove, onDelete, busy }) {
  return (
    <Glass className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.72)", border: `1px solid ${C.ink}15`, color: C.ink }}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm" style={{ background: C.ink, color: C.cream, ...mono() }}>
            {review.name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={display(600)}>{review.name}</span>
              <Stars rating={review.rating} />
            </div>
            <span className="text-xs" style={mono({ color: C.inkSoft })}>
              {review.itemName || "General"} · {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
        {pending && <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide" style={{ background: "#FFF3D6", color: "#B45309", ...mono() }}>Pending</span>}
      </div>

      <p className="text-sm my-3 leading-relaxed" style={{ color: C.inkSoft }}>
        "{review.text}"
      </p>

      <div className="flex gap-2">
        {pending ? (
          <>
            <button onClick={() => onApprove(review)} disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 disabled:opacity-60"
              style={{ background: "#15803D", color: "#fff", ...display(600) }}>
              <Check size={13} /> Approve
            </button>
            <button onClick={() => onDelete(review, true)} disabled={busy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 disabled:opacity-60"
              style={{ background: C.red, color: "#fff", ...display(600) }}>
              <Trash2 size={13} /> Reject
            </button>
          </>
        ) : (
          <button onClick={() => onDelete(review, false)} disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 disabled:opacity-60"
            style={{ background: C.ink, color: C.cream, ...display(600) }}>
            <Trash2 size={13} /> Remove
          </button>
        )}
      </div>
    </Glass>
  );
}

function Section({ title, count, reviews, pending, onApprove, onDelete, busyId, emptyText }) {
  return (
    <div className="mb-10">
      <h3 className="text-sm uppercase tracking-wider font-bold mb-4" style={mono({ color: C.ink })}>
        {title} <span className="ml-1" style={{ color: C.red }}>({count})</span>
      </h3>
      {reviews.length === 0 ? (
        <p className="text-sm py-8 text-center" style={{ color: C.inkSoft }}>{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              pending={pending}
              onApprove={onApprove}
              onDelete={onDelete}
              busy={busyId === r.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReviewsPanel() {
  const { token } = useAdmin();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, a] = await Promise.all([getPendingReviews(token), getReviews()]);
      setPending(p);
      setApproved(a);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const handleApprove = async (review) => {
    setBusyId(review.id);
    setError(null);
    try {
      await approveReview(token, review.id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (review) => {
    if (!window.confirm(`Delete this review from ${review.name}?`)) return;
    setBusyId(review.id);
    setError(null);
    try {
      await deleteReview(token, review.id);
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
        <Eyebrow color={C.red}>Review moderation</Eyebrow>
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 disabled:opacity-60"
          style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${C.ink}22`, color: C.ink }}>
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {error && (
        <p className="text-sm font-semibold px-4 py-3 rounded-xl mb-6" style={{ background: "rgba(255,55,55,0.1)", color: C.red }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm" style={{ color: C.inkSoft }}>
          <Loader2 size={18} className="animate-spin" /> Loading reviews…
        </div>
      ) : (
        <>
          <Section
            title="Awaiting approval"
            count={pending.length}
            reviews={pending}
            pending
            onApprove={handleApprove}
            onDelete={handleDelete}
            busyId={busyId}
            emptyText="Nothing waiting — the queue is clear."
          />
          <Section
            title="Live on the site"
            count={approved.length}
            reviews={approved}
            pending={false}
            onApprove={handleApprove}
            onDelete={handleDelete}
            busyId={busyId}
            emptyText="No approved reviews yet."
          />
        </>
      )}
    </div>
  );
}