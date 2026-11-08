import { useCartContext } from "../context/CartContext";

/**
 * Hook de acesso ao estado global e ações do carrinho de compras
 */
export function useCart() {
  return useCartContext();
}
