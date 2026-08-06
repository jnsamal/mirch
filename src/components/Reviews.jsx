import { Star, Quote } from "lucide-react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import { C, display, mono } from "../theme";
import { useData } from "../context/DataContext";

// Generate a warm-toned hue from a string for avatar backgrounds.
function nameToHue(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return ((hash % 40) + 350) % 360; // keep hues in warm reds/oranges/ambers
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

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
  const hue = nameToHue(r.name);
  const initials = getInitials(r.name);

  return (
    <Glass
      className="review-card rounded-2xl p-6 flex flex-col mr-5"
      style={{ color: C.ink }}
      aria-hidden={hidden || undefined}
    >
      <div className="flex items-center justify-between mb-3">
        <Stars rating={r.rating} />
        <Quote
          size={20}
          style={{ color: C.red, opacity: 0.25 }}
        />
      </div>
      <p className="text-sm my-4 flex-1" style={{ color: C.inkSoft }}>
        "{r.text}"
      </p>
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid ${C.ink}14` }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm"
          style={{
            background: `hsl(${hue}, 65%, 55%)`,
            color: "#fff",
            ...mono(),
          }}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-tight" style={display(600)}>
            {r.name}
          </span>
          <span className="text-xs leading-tight mt-0.5" style={mono({ color: C.inkSoft })}>
            {r.dish}
          </span>
        </div>
      </div>
    </Glass>
  );
}


export default function Reviews() {
  const { reviews } = useData();
  if (!reviews || reviews.length === 0) return null;

  // Rendered twice back to back so the marquee loop point is
  // invisible — see the .reviews-track animation in index.css.
  const trackItems = [...reviews, ...reviews];

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
          {trackItems.map((r, idx) => (
            <ReviewCard key={`${r.name}-${idx}`} r={r} hidden={idx >= reviews.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
