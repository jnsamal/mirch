import Glass from "./Glass";
import { C } from "../theme";

export default function Story() {
  return (
    <section id="story" className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.peach }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p
            className="uppercase tracking-[0.2em] text-xs sm:text-sm mb-3"
            style={{ color: C.ink, opacity: 0.6, fontFamily: "'Space Mono', monospace" }}
          >
            Since the first batch of mustard oil
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl mb-5 leading-tight"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: C.ink }}
          >
            Heat is a spectrum here, not a warning label
          </h2>
          <p className="text-sm sm:text-base mb-4" style={{ color: C.inkSoft }}>
            Mirch started as a single coal grill outside a family kitchen in Odisha.
            Every dish on the menu still carries a spice rating — four dots, the
            same four colours you see across this page — so you choose your heat
            on purpose, not by accident.
          </p>
          <p className="text-sm sm:text-base" style={{ color: C.inkSoft }}>
            No delivery apps, no middlemen. You message us directly on WhatsApp,
            we cook it fresh, and it comes straight from our kitchen to your door.
          </p>
        </div>

        <Glass className="rounded-3xl p-8 sm:p-10" style={{ color: C.ink }}>
          <div className="grid grid-cols-2 gap-6">
            {[
              { n: "4", l: "spice levels, always shown" },
              { n: "0", l: "delivery-app commissions" },
              { n: "12h", l: "average curry simmer time" },
              { n: "1", l: "coal grill, hand-fed all day" },
            ].map((s) => (
              <div key={s.l}>
                <div
                  className="text-3xl sm:text-4xl mb-1"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: C.red }}
                >
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
