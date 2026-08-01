import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "mirch_cart_items";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addToCart = useCallback((item, qty = 1, notes = "") => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.item.name === item.name);
      if (existingIdx > -1) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const combinedNotes = notes?.trim()
          ? existing.notes ? `${existing.notes}; ${notes.trim()}` : notes.trim()
          : existing.notes;
        updated[existingIdx] = {
          ...existing,
          quantity: existing.quantity + qty,
          notes: combinedNotes,
        };
        return updated;
      }
      return [...prev, { item, quantity: qty, notes: notes?.trim() || "" }];
    });
    showToast(`Added ${item.name} to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((itemName) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.name !== itemName));
  }, []);

  const updateQuantity = useCallback((itemName, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemName);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.name === itemName ? { ...ci, quantity } : ci))
    );
  }, [removeFromCart]);

  const updateNotes = useCallback((itemName, notes) => {
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.name === itemName ? { ...ci, notes } : ci))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback(
    (itemName) => {
      const found = cartItems.find((ci) => ci.item.name === itemName);
      return found ? found.quantity : 0;
    },
    [cartItems]
  );

  const totalCount = useMemo(
    () => cartItems.reduce((acc, ci) => acc + ci.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((acc, ci) => acc + (ci.item.price || 0) * ci.quantity, 0),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      toastMessage,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateNotes,
      clearCart,
      getItemQuantity,
      totalCount,
      subtotal,
      showToast,
      clearToast,
    }),
    [
      cartItems,
      isCartOpen,
      toastMessage,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateNotes,
      clearCart,
      getItemQuantity,
      totalCount,
      subtotal,
      showToast,
      clearToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
