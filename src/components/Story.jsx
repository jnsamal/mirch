import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import { C, display } from "../theme";
import { useEffect, useState, useRef } from "react";

export const STATS = [
  { n: "27+", l: "dishes across the menu" },
  { n: "0", l: "delivery-app commissions" },
  { n: "12h+", l: "average curry simmer time" },
  { n: "1", l: "coal grill, hand-fed all day" },
];

function Counter({ target, suffix = "", duration = 1800, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
  const hasSuffix = target.includes("h") || target.includes("%") || target.includes("+");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
      startTimeRef.current = performance.now();
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [delay]);

  const animate = (now) => {
    if (!startTimeRef.current) startTimeRef.current = now;
    const progress = Math.min((now - startTimeRef.current) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * numericTarget);
    setCount(current);

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    }
  };

  const displayValue = hasSuffix ? `${count}${suffix || target.replace(/\d/g, "")}` : count.toString();

  return (
    <div className="text-3xl sm:text-4xl mb-1" style={display(700, { color: C.red })}>
      {displayValue}
    </div>
  );
}

export default function Story() {
  return (
    <section id="story" className="relative scroll-mt-24 py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.peach }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <Eyebrow color={C.ink} opacity={0.6}>
            Since the first batch of mustard oil
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight" style={display(600, { color: C.ink })}>
            Heat is a spectrum here, not a warning label
          </h2>
          <p className="text-sm sm:text-base mb-4" style={{ color: C.inkSoft }}>
            Mirch started as a single coal grill outside a family kitchen in Odisha.
            The colour bar that fills as you scroll runs through the same palette
            as the rest of the site — cream to red — a small nod to how the menu
            itself is built, mild to hot.
          </p>
          <p className="text-sm sm:text-base mb-5" style={{ color: C.inkSoft }}>
            No delivery apps, no middlemen. You message us directly on WhatsApp,
            we cook it fresh, and it comes straight from our kitchen to your door.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: C.ink }}
          >
            Read our full story
            <ArrowRight size={15} />
          </Link>
        </div>

        <Glass className="rounded-3xl p-8 sm:p-10" style={{ color: C.ink }}>
          <div className="grid grid-cols-2 gap-6">
            {STATS.map((s, i) => (
              <div key={s.l}>
                <Counter target={s.n} delay={i * 150} />
                <div className="text-xs sm:text-sm" style={{ color: C.inkSoft }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Glass>
      </div>
    </section>
  );
}
