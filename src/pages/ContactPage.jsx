import ContactSection from "../components/ContactSection";
import { C, display } from "../theme";
import thaliSpread from "../images/thali-spread-1200w.webp";

/* ---------------------------------------------------------
   ContactPage — the WhatsApp contact form on its own route
   (/contact), fronted by a banner like the other subpages.
   The form itself lives in ContactSection so it stays a single
   source of truth.
--------------------------------------------------------- */
export default function ContactPage() {
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
              Contact
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl"
              style={display(600, { color: "#fff" })}
            >
              Message the kitchen
            </h1>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
