import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { C, display } from "../theme";
import { SLIDES } from "../data/heroSlides";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";

/* ---------------------------------------------------------
   Hero carousel — real kitchen photography
--------------------------------------------------------- */
const arrowBtnStyle = {
  background: "rgba(255,255,255,0.18)",
  border: "1px solid rgba(255,255,255,0.35)",
};

export default function Hero() {
  const [i, setI] = useState(0);
  const timer = useRef(null);
  const { addToCart } = useCart();
  const { allItems } = useData();

  const featuredItems = useCallback(
    (name) => allItems.find((item) => item.name === name),
    [allItems]
  );

  const go = useCallback((dir) => {
    setI((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => go(1), 5500);
    return () => clearInterval(timer.current);
  }, [go]);

  return (
    <section className="relative hero-carousel w-full overflow-hidden" style={{ background: C.ink }}>
      {SLIDES.map((s, idx) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === i ? 1 : 0 }}
          aria-hidden={idx !== i}
        >
          <img
            src={s.image}
            srcSet={s.imageMobile ? `${s.imageMobile} 960w, ${s.image} 1200w` : undefined}
            sizes="100vw"
            alt={s.alt}
            className="w-full h-full object-cover"
            fetchPriority={idx === 0 ? "high" : "auto"}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

      {/* darken for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(43,23,16,0.5) 0%, rgba(43,23,16,0.05) 32%, rgba(43,23,16,0.6) 100%)" }}
      />

      {/* slide caption — title, plus Add to Cart / View for the matching dish */}
      <div className="absolute z-10 left-5 right-5 sm:left-8 sm:right-8 md:left-14 md:right-14 bottom-24 sm:bottom-28">
        {SLIDES.map((s, idx) => {
          const item = featuredItems(s.name);
          return (
            <div
              key={s.image}
              className="absolute left-0 right-0 bottom-0 transition-opacity duration-1000"
              style={{ opacity: idx === i ? 1 : 0 }}
              aria-hidden={idx !== i}
            >
              <h1
                className="text-2xl sm:text-4xl md:text-5xl leading-tight max-w-2xl mb-4"
                style={{
                  ...display(600, { color: "#fff" }),
                  textShadow: "0 2px 16px rgba(0,0,0,0.35)",
                }}
              >
                {s.title}
              </h1>

              {item && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => addToCart(item, 1)}
                    tabIndex={idx === i ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105"
                    style={{ background: C.red, color: "#fff" }}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <Link
                    to={`/item/${encodeURIComponent(item.name)}`}
                    tabIndex={idx === i ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                    style={{ background: "rgba(255,255,255,0.16)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}
                  >
                    View
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* carousel controls */}
      <div className="absolute z-10 bottom-6 left-0 right-0 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="rounded-full p-2 backdrop-blur-md"
          style={arrowBtnStyle}
        >
          <ChevronLeft size={18} color="#fff" />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.image}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: idx === i ? 26 : 8,
                background: idx === i ? C.red : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="rounded-full p-2 backdrop-blur-md"
          style={arrowBtnStyle}
        >
          <ChevronRight size={18} color="#fff" />
        </button>
      </div>
    </section>
  );
}
