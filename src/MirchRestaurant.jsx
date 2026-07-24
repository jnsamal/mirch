import { useCallback } from "react";
import GlobalStyles from "./components/GlobalStyles";
import HeatGauge from "./components/HeatGauge";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Story from "./components/Story";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import { waLink } from "./theme";

/* ---------------------------------------------------------
   App — wires the sections together and owns the single
   WhatsApp order handler every section calls into.
--------------------------------------------------------- */
export default function MirchRestaurant() {
  const handleOrder = useCallback((itemName) => {
    const msg =
      itemName === "the full menu"
        ? "Hi Mirch! I'd like to place an order."
        : `Hi Mirch! I'd like to order: ${itemName}.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div style={{ fontFamily: "'Sora', sans-serif" }}>
      <GlobalStyles />
      <HeatGauge />
      <Hero onOrder={handleOrder} />
      <MenuSection onOrder={handleOrder} />
      <Story />
      <Visit onOrder={handleOrder} />
      <Footer />
      <WhatsAppFab onOrder={handleOrder} />
    </div>
  );
}
