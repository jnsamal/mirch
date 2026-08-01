import MenuSection from "../components/MenuSection";
import OrderButton from "../components/OrderButton";
import { C, display, FULL_MENU } from "../theme";
import thaliSpread from "../images/thali-spread-1200w.webp";

/* ---------------------------------------------------------
   MenuPage — the full menu as its own route (/menu). A photo
   banner like AboutPage, then the same searchable, filterable
   MenuSection used on the home page, then a WhatsApp CTA.
--------------------------------------------------------- */
export default function MenuPage({ onOrder }) {
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
              The menu
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl"
              style={display(600, { color: "#fff" })}
            >
              Every dish, in one place
            </h1>
          </div>
        </div>
      </section>

      <MenuSection onOrder={onOrder} showAll />

      {/* CTA */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8 md:px-14 text-center" style={{ background: C.coral }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl mb-4 leading-tight" style={display(600, { color: C.ink })}>
            Can't decide? Message the kitchen, we'll sort it out.
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
