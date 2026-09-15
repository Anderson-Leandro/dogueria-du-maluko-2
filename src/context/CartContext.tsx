import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { CartItem, CartContextType, Purchasable } from "../types";

const CART_STORAGE_KEY = "maluko_cart_items";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartBounce, setCartBounce] = useState(false);

  // Sincroniza com localStorage sempre que items mudar
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors (e.g. storage full)
    }
  }, [items]);

  const triggerCartBounce = useCallback(() => {
    setCartBounce(true);
    const timer = setTimeout(() => setCartBounce(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = useCallback(
    (item: Purchasable, qty: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i
          );
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
            qty,
          },
        ];
      });
      triggerCartBounce();
    },
    [triggerCartBounce]
  );

  const removeFromCart = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback(
    (id: number, qty: number) => {
      if (qty <= 0) {
        removeFromCart(id);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, qty } : i))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const value = useMemo<CartContextType>(
    () => ({
      items,
      cartCount,
      cartTotal,
      cartBounce,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
    }),
    [items, cartCount, cartTotal, cartBounce, addToCart, removeFromCart, updateQty, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext deve ser utilizado dentro de um <CartProvider>");
  }
  return context;
}
