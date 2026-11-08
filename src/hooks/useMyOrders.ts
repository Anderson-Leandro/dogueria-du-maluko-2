import { Order } from "../types/order";
import { orderService } from "../services/orderService";
import { useApiResource } from "./useApiResource";

const EMPTY: Order[] = [];
const fetchOrders = (signal: AbortSignal) => orderService.getMyOrders(signal);

/**
 * Histórico de pedidos do usuário logado.
 * Sessão expirada (401) é tratada de forma centralizada pelo AuthProvider.
 */
export function useMyOrders() {
  const { data, loading, error, refresh } = useApiResource(fetchOrders, "Erro ao carregar seus pedidos");
  return { orders: data ?? EMPTY, loading, error, refreshOrders: refresh };
}
