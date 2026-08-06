import { useState } from "react";
import { Star, Send, Utensils, AlertCircle, CheckCircle } from "lucide-react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import OrderButton from "./OrderButton";
import { C, display, waLink, mono } from "../theme";
import { useData } from "../context/DataContext";
import { submitReview } from "../lib/api";

const inputStyle = {
  background: "rgba(255,255,255,0.7)",
  border: `1px solid ${C.ink}22`,
  color: C.ink,
};

const STAR_LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];

export default function ReviewSection() {
  const { allItems } = useData();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [dish, setDish] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const canSubmit = name.trim() !== "" && rating > 0 && text.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      // Submit to backend API (goes to admin panel as pending review)
      await submitReview({
        name: name.trim(),
        rating,
        text: text.trim(),
        itemName: dish || null,
      });

      setSubmitStatus("success");
      setName("");
      setRating(0);
      setDish("");
      setText("");

      // Also open WhatsApp as a backup notification
      const msg = `📝 *New Review for Mirch!*\n-----------------------------\n*Name:* ${name.trim()}\n*Rating:* ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)\n${dish ? `*Dish:* ${dish}\n` : ""}*Review:* ${text.trim()}`;
      window.open(waLink(msg), "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Review submit failed:", err);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const dishOptions = allItems.map((item) => item.name).sort();

  return (
    <section
      id="reviews-form"
      className="relative scroll-mt-24 py-20 sm:py-28 px-5 sm:px-8 md:px-14"
      style={{ background: C.cream }}
    >
      <div className="max-w-3xl mx-auto">
        <Eyebrow color={C.red}>Share your experience</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight" style={display(600, { color: C.ink })}>
          Leave a review
        </h2>
        <p className="text-sm sm:text-base mb-10" style={{ color: C.inkSoft }}>
          Your feedback helps us cook better. Reviews are sent to our team for approval
          before appearing on the site.
        </p>

        {submitStatus === "success" && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(21,128,61,0.1)", border: `1px solid #15803D` }}>
            <CheckCircle size={20} style={{ color: "#15803D", flexShrink: 0 }} />
            <span className="text-sm font-medium" style={{ color: "#15803D" }}>
              Thanks! Your review has been submitted and will appear once approved.
            </span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl" style={{ background: "rgba(255,55,55,0.1)", border: `1px solid ${C.red}` }}>
            <AlertCircle size={20} style={{ color: C.red, flexShrink: 0 }} />
            <span className="text-sm font-medium" style={{ color: C.red }}>
              Something went wrong. Please try again or message us on WhatsApp directly.
            </span>
          </div>
        )}

        <Glass className="rounded-3xl p-8 sm:p-10" style={{ color: C.ink }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="review-name" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Your Name
              </label>
              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={submitting}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-50"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Rating <span style={{ opacity: 0.6 }}>required</span>
              </label>
              <div className="flex items-center gap-2" role="radiogroup" aria-label="Rating">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => !submitting && setRating(starValue)}
                      onMouseLeave={() => !submitting && setRating(rating || 0)}
                      disabled={submitting}
                      className="p-1 rounded transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                      aria-label={`${STAR_LABELS[i]} (${starValue} stars)`}
                      aria-pressed={rating >= starValue}
                    >
                      <Star
                        size={28}
                        fill={rating >= starValue ? C.red : "none"}
                        style={{
                          color: rating >= starValue ? C.red : C.inkSoft,
                          opacity: rating >= starValue ? 1 : 0.4,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="review-dish" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Dish <span style={{ opacity: 0.6 }}>(optional)</span>
              </label>
              <select
                id="review-dish"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                disabled={submitting}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none disabled:opacity-50"
                style={{
                  ...inputStyle,
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">Select a dish (optional)</option>
                {dishOptions.map((dishName) => (
                  <option key={dishName} value={dishName}>
                    {dishName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="review-text" className="block text-sm mb-1.5" style={{ color: C.inkSoft }}>
                Your Review
              </label>
              <textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you like? What could be better?"
                rows={4}
                required
                disabled={submitting}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none resize-none disabled:opacity-50"
                style={inputStyle}
              />
            </div>

            <OrderButton
              size="lg"
              fullWidth
              type="submit"
              className={canSubmit && !submitting ? "" : "opacity-50 pointer-events-none"}
            >
              {submitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Submitting…
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Send Review
                </>
              )}
            </OrderButton>
          </form>
        </Glass>
      </div>
    </section>
  );
}