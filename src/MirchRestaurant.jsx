import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import HeatGauge from "./components/HeatGauge";
import Navbar from "./components/Navbar";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import OrderDialog from "./components/OrderDialog";
import CartDrawer from "./components/CartDrawer";
import FloatingCartBar from "./components/FloatingCartBar";
import Toast from "./components/Toast";
import { CartProvider } from "./context/CartContext";
import { FULL_MENU } from "./theme";

/* ---------------------------------------------------------
   App — the shared shell around every page. Global chrome
   (nav, footer, WhatsApp FAB, heat gauge, order dialog, cart)
   stays mounted across route changes; <Routes> swaps out just
   the page content. Order-dialog & cart state live here so they
   work identically no matter which page an action is taken on.
--------------------------------------------------------- */
export default function MirchRestaurant() {
  const [orderItem, setOrderItem] = useState(null);

  const openOrder = useCallback((itemOrSentinel) => {
    setOrderItem(itemOrSentinel === FULL_MENU ? { name: FULL_MENU } : itemOrSentinel);
  }, []);

  const closeOrder = useCallback(() => setOrderItem(null), []);

  return (
    <CartProvider>
      <GlobalStyles />
      <ScrollManager />
      <HeatGauge />
      <Navbar onOrder={openOrder} />
      <Routes>
        <Route path="/" element={<HomePage onOrder={openOrder} />} />
        <Route path="/about" element={<AboutPage onOrder={openOrder} />} />
        <Route path="/item/:name" element={<ItemDetailPage onOrder={openOrder} />} />
      </Routes>
      <Footer />
      <WhatsAppFab onOrder={openOrder} />
      <OrderDialog item={orderItem} onClose={closeOrder} />
      <CartDrawer />
      <FloatingCartBar />
      <Toast />
    </CartProvider>
  );
}


