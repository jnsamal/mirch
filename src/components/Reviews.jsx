import { Star } from "lucide-react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import { C, display, mono } from "../theme";
import { REVIEWS } from "../data/reviews";

// Rendered twice back to back so the marquee loop point is
// invisible — see the .reviews-track animation in index.css.
const TRACK_ITEMS = [...REVIEWS, ...REVIEWS];

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? C.red : "none"}
          style={{ color: i < rating ? C.red : C.inkSoft, opacity: i < rating ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ r, hidden }) {
  return (
    <Glass
      className="review-card rounded-2xl p-6 flex flex-col mr-5"
      style={{ color: C.ink }}
      aria-hidden={hidden || undefined}
    >
      <Stars rating={r.rating} />
      <p className="text-sm my-4 flex-1" style={{ color: C.inkSoft }}>
        "{r.text}"
      </p>
      <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${C.ink}14` }}>
        <span className="text-sm font-semibold" style={display(600)}>
          {r.name}
        </span>
        <span className="text-xs" style={mono({ color: C.inkSoft })}>
          {r.dish}
        </span>
      </div>
    </Glass>
  );
}

export default function Reviews() {
  return (
    <section className="relative py-20 sm:py-28" style={{ background: C.cream }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-14">
        <Eyebrow color={C.red}>From the chat threads</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-10 max-w-xl leading-tight" style={display(600, { color: C.ink })}>
          What people say after they order
        </h2>
      </div>

      <div className="reviews-marquee-wrapper">
        <div className="reviews-track">
          {TRACK_ITEMS.map((r, idx) => (
            <ReviewCard key={`${r.name}-${idx}`} r={r} hidden={idx >= REVIEWS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
