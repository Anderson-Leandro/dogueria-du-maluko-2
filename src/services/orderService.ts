import { CreateOrderItem, Order } from "../types/order";
import { apiFetch } from "./api";

export const orderService = {
  /** Cria um pedido; preços e frete são calculados pelo servidor */
  createOrder(items: CreateOrderItem[], notes?: string): Promise<Order> {
    return apiFetch<Order>("/orders", { method: "POST", body: { items, notes }, auth: true });
  },

  /** Pedidos do usuário logado, do mais recente ao mais antigo */
  getMyOrders(signal?: AbortSignal): Promise<Order[]> {
    return apiFetch<Order[]>("/orders", { auth: true, signal });
  },
};
