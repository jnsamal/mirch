import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import { C, display } from "../theme";
import { SLIDES } from "../data/heroSlides";

/* ---------------------------------------------------------
   Hero carousel — real kitchen photography
--------------------------------------------------------- */
export default function Hero({ onOrder }) {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  const go = useCallback((dir) => {
    setI((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => go(1), 5500);
    return () => clearInterval(timer.current);
  }, [go]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden" style={{ background: C.ink }}>
      {SLIDES.map((s, idx) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === i ? 1 : 0 }}
          aria-hidden={idx !== i}
        >
          <img src={s.image} alt={s.alt} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* darken for legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(43,23,16,0.5) 0%, rgba(43,23,16,0.05) 32%, rgba(43,23,16,0.6) 100%)" }}
      />

      {/* nav */}
      <Navbar onOrder={onOrder} />

      {/* slide caption — plain text, no card or buttons */}
      <div className="absolute z-10 left-5 right-5 sm:left-8 sm:right-8 md:left-14 md:right-14 bottom-24 sm:bottom-28">
        {SLIDES.map((s, idx) => (
          <h1
            key={s.image}
            className="absolute left-0 right-0 bottom-0 text-2xl sm:text-4xl md:text-5xl leading-tight max-w-2xl transition-opacity duration-1000"
            style={{
              ...display(600, { color: "#fff" }),
              opacity: idx === i ? 1 : 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.35)",
            }}
            aria-hidden={idx !== i}
          >
            {s.title}
          </h1>
        ))}
      </div>

      {/* carousel controls */}
      <div className="absolute z-10 bottom-6 left-0 right-0 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="rounded-full p-2 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
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
          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)" }}
        >
          <ChevronRight size={18} color="#fff" />
        </button>
      </div>
    </section>
  );
}
