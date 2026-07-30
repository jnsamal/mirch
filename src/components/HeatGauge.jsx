import { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { C } from "../theme";

/* ---------------------------------------------------------
   Signature element: the Heat Gauge — a scroll-progress rail
   that fills cream -> red, the same palette used across the site.
--------------------------------------------------------- */
export default function HeatGauge() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setPct(scrollable > 0 ? Math.min(100, (h.scrollTop / scrollable) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* mobile: top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 md:hidden"
        style={{ height: 3, background: "rgba(43,23,16,0.08)" }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${C.cream}, ${C.peach}, ${C.coral}, ${C.red})`,
            transition: "width 0.1s linear",
          }}
        />
      </div>
      {/* desktop: vertical rail on the right */}
      <div
        className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center"
        aria-hidden="true"
      >
        <div
          className="relative w-1.5 rounded-full overflow-hidden"
          style={{ height: 220, background: "rgba(43,23,16,0.10)" }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{
              height: `${pct}%`,
              background: `linear-gradient(0deg, ${C.cream}, ${C.peach}, ${C.coral}, ${C.red})`,
              transition: "height 0.1s linear",
            }}
          />
        </div>
        <Flame
          className="mt-2"
          size={16}
          style={{ color: C.red, opacity: 0.35 + pct / 150 }}
          fill={pct > 70 ? C.red : "none"}
        />
      </div>
    </>
  );
}
