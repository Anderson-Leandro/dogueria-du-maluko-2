import { Purchasable } from "./product";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
}

export interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartBounce: boolean;
  addToCart: (item: Purchasable, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}
