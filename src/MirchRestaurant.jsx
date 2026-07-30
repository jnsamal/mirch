import { useCallback, useState } from "react";
import GlobalStyles from "./components/GlobalStyles";
import HeatGauge from "./components/HeatGauge";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Story from "./components/Story";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import OrderDialog from "./components/OrderDialog";
import { FULL_MENU } from "./theme";

/* ---------------------------------------------------------
   App — wires the sections together and owns the order dialog
   state. Every "Order" button calls onOrder with either a menu
   item ({ name, price, ... }) or the FULL_MENU sentinel; either
   way it opens OrderDialog, which handles the actual WhatsApp
   redirect once the person confirms.
--------------------------------------------------------- */
export default function MirchRestaurant() {
  const [orderItem, setOrderItem] = useState(null);

  const openOrder = useCallback((itemOrSentinel) => {
    setOrderItem(itemOrSentinel === FULL_MENU ? { name: FULL_MENU } : itemOrSentinel);
  }, []);

  const closeOrder = useCallback(() => setOrderItem(null), []);

  return (
    <>
      <GlobalStyles />
      <HeatGauge />
      <Navbar onOrder={openOrder} />
      <Hero />
      <MenuSection onOrder={openOrder} />
      <Story />
      <Footer />
      <WhatsAppFab onOrder={openOrder} />
      <OrderDialog item={orderItem} onClose={closeOrder} />
    </>
  );
}
