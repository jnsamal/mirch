import { Flame, Utensils, MessageCircle, MapPin } from "lucide-react";
import Glass from "../components/Glass";
import Eyebrow from "../components/Eyebrow";
import OrderButton from "../components/OrderButton";
import { C, display, FULL_MENU } from "../theme";
import { STATS } from "../components/Story";
import thaliSpread from "../images/thali-spread-1200w.webp";

const VALUES = [
  {
    Icon: Flame,
    title: "Cooked to order",
    blurb: "Nothing is held under a heat lamp — we start cooking once your chat comes in.",
  },
  {
    Icon: MessageCircle,
    title: "No delivery apps",
    blurb: "Every order goes straight to our kitchen over WhatsApp, not through a commission-taking middleman.",
  },
  {
    Icon: Utensils,
    title: "Real ingredients",
    blurb: "Mustard oil, whole spice, and produce sourced the way a home kitchen would, just at scale.",
  },
  {
    Icon: MapPin,
    title: "Rooted in Odisha",
    blurb: "The recipes carry an Odia core, even where the menu wanders into other regional and fusion plates.",
  },
];

export default function AboutPage({ onOrder }) {
  return (
    <>
      {/* Banner */}
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden" style={{ background: C.ink }}>
        <img
          src={thaliSpread}
          alt="Full thali spread with curries, rice, roti, and raita"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(43,23,16,0.55) 0%, rgba(43,23,16,0.75) 100%)" }}
        />
        <div className="absolute inset-0 flex items-end px-5 sm:px-8 md:px-14 pb-12 sm:pb-16">
          <div className="max-w-6xl mx-auto w-full">
            <p
              className="uppercase tracking-[0.2em] text-xs sm:text-sm mb-3"
              style={{ color: C.peach, fontFamily: "'Space Mono', monospace" }}
            >
              About us
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl"
              style={display(600, { color: "#fff" })}
            >
              A kitchen first, a website second
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.peach }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <Eyebrow color={C.ink} opacity={0.6}>
              How Mirch started
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl mb-5 leading-tight" style={display(600, { color: C.ink })}>
              One coal grill, outside a family kitchen
            </h2>
            <p className="text-sm sm:text-base mb-4" style={{ color: C.inkSoft }}>
              Mirch didn't start as a restaurant concept — it started as a single
              coal grill set up outside a family kitchen in Odisha, cooking for
              neighbours who kept asking for more. The menu grew the same way:
              one dish at a time, only added once it was worth repeating.
            </p>
            <p className="text-sm sm:text-base mb-4" style={{ color: C.inkSoft }}>
              We never signed on with a delivery app. Partly because of the cut
              they take, and partly because we'd rather know who's ordering —
              which is why everything still runs through a WhatsApp chat instead
              of a checkout page.
            </p>
            <p className="text-sm sm:text-base" style={{ color: C.inkSoft }}>
              The name is direct on purpose: <em>mirch</em> means chili. Heat is
              the whole point, cooked in on purpose, not added as an afterthought.
            </p>
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

      {/* Values */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 md:px-14" style={{ background: C.cream }}>
        <div className="max-w-6xl mx-auto">
          <Eyebrow color={C.red}>What we care about</Eyebrow>
          <h2 className="text-3xl sm:text-4xl mb-10 max-w-xl leading-tight" style={display(600, { color: C.ink })}>
            A short list, kept short on purpose
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map(({ Icon, title, blurb }) => (
              <Glass key={title} className="rounded-2xl p-6 flex items-start gap-4" style={{ color: C.ink }}>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(43,23,16,0.08)" }}
                >
                  <Icon size={20} style={{ color: C.red }} />
                </div>
                <div>
                  <h3 className="mb-1.5" style={display(600, { fontSize: 18 })}>
                    {title}
                  </h3>
                  <p className="text-sm" style={{ color: C.inkSoft }}>
                    {blurb}
                  </p>
                </div>
              </Glass>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8 md:px-14 text-center" style={{ background: C.coral }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-4 leading-tight" style={display(600, { color: C.ink })}>
            Hungry? Skip the app, message the kitchen.
          </h2>
          <div className="flex justify-center">
            <OrderButton size="lg" onClick={() => onOrder && onOrder(FULL_MENU)}>
              Order on WhatsApp
            </OrderButton>
          </div>
        </div>
      </section>
    </>
  );
}
