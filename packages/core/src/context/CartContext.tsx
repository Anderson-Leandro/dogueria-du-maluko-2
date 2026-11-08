import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { CartItem, CartContextType, Purchasable } from "../types";
import { getCoreConfig, isPromise, safeStorageWrite } from "../config";

const CART_STORAGE_KEY = "maluko_cart_items";

function parseItems(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** Soma quantidades de itens repetidos (carrinho salvo + itens adicionados antes de carregar) */
function mergeItems(saved: CartItem[], current: CartItem[]): CartItem[] {
  const merged = saved.map((item) => ({ ...item }));
  for (const item of current) {
    const existing = merged.find((i) => i.id === item.id);
    if (existing) existing.qty += item.qty;
    else merged.push(item);
  }
  return merged;
}

/** Itens salvos, sem esperar; `undefined` se o storage for assíncrono */
function peekSavedItems(): CartItem[] | undefined {
  try {
    const raw = getCoreConfig().storage.getItem(CART_STORAGE_KEY);
    return isPromise(raw) ? undefined : parseItems(raw);
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Storage síncrono (web): itens disponíveis no primeiro render.
  // Storage assíncrono (mobile): carregados logo após montar.
  const [initialItems] = useState(peekSavedItems);
  const [items, setItems] = useState<CartItem[]>(initialItems ?? []);
  const [isHydrated, setIsHydrated] = useState(initialItems !== undefined);

  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (initialItems !== undefined) return;
    let active = true;
    Promise.resolve(getCoreConfig().storage.getItem(CART_STORAGE_KEY))
      .then((raw) => {
        // Junta o carrinho salvo com o que foi adicionado antes da leitura terminar
        if (active) setItems((current) => mergeItems(parseItems(raw), current));
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setIsHydrated(true);
      });
    return () => {
      active = false;
    };
  }, [initialItems]);

  // Sincroniza com o storage sempre que items mudar (só depois de carregar, para não apagar o salvo)
  useEffect(() => {
    if (!isHydrated) return;
    safeStorageWrite(() => getCoreConfig().storage.setItem(CART_STORAGE_KEY, JSON.stringify(items)));
  }, [items, isHydrated]);

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
