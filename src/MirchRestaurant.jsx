import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import HeatGauge from "./components/HeatGauge";
import Navbar from "./components/Navbar";
import ScrollManager from "./components/ScrollManager";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import OrderDialog from "./components/OrderDialog";
import CartDrawer from "./components/CartDrawer";
import FloatingCartBar from "./components/FloatingCartBar";
import Toast from "./components/Toast";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { AdminProvider } from "./context/AdminContext";
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
      <DataProvider>
        <GlobalStyles />
        <ScrollManager />
        <HeatGauge />
        <Navbar onOrder={openOrder} />
        <Routes>
          <Route path="/" element={<HomePage onOrder={openOrder} />} />
          {/* /menu was a redundant duplicate of /products with no UI link to it;
              redirect rather than 404 in case anything external linked to it. */}
          <Route path="/menu" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage onOrder={openOrder} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage onOrder={openOrder} />} />
          <Route path="/item/:name" element={<ItemDetailPage onOrder={openOrder} />} />
          <Route path="/admin" element={<AdminProvider><AdminPage /></AdminProvider>} />
        </Routes>
        <Footer />
        <WhatsAppFab onOrder={openOrder} />
        <OrderDialog item={orderItem} onClose={closeOrder} />
        <CartDrawer />
        <FloatingCartBar />
        <Toast />
      </DataProvider>
    </CartProvider>
  );
}


