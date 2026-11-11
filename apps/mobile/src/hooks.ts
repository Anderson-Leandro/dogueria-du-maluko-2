import { useCallback, useEffect, useRef, useState } from "react";
import { Purchasable, useCart } from "@dogueria/core";

/** Adiciona ao carrinho e mostra "ADICIONADO ✓" por 1,5 s (usado nos cards de dogue e bebida) */
export function useJustAdded(item: Purchasable) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleAdd = useCallback(() => {
    addToCart(item, 1);
    setJustAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1500);
  }, [addToCart, item]);

  return { justAdded, handleAdd };
}

/**
 * Trava contra toques duplos: o estado do React só desabilita o botão no próximo render,
 * então dois toques no mesmo frame passariam. A ref bloqueia na hora.
 */
export function useSingleFlight() {
  const busy = useRef(false);
  return useCallback(async <T,>(task: () => Promise<T>): Promise<T | undefined> => {
    if (busy.current) return undefined;
    busy.current = true;
    try {
      return await task();
    } finally {
      busy.current = false;
    }
  }, []);
}
