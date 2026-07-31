import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Glass from "./Glass";
import Eyebrow from "./Eyebrow";
import { C, display } from "../theme";

export const STATS = [
  { n: "27", l: "dishes across the menu" },
  { n: "0", l: "delivery-app commissions" },
  { n: "12h", l: "average curry simmer time" },
  { n: "1", l: "coal grill, hand-fed all day" },
];

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
            {STATS.map((s) => (
              <div key={s.l}>
                <div className="text-3xl sm:text-4xl mb-1" style={display(700, { color: C.red })}>
                  {s.n}
                </div>
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
