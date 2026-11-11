export type OrderStatus = "pending" | "preparing" | "delivering" | "delivered" | "canceled";

export interface OrderItem {
  productId: number;
  name: string;
  unitPrice: number;
  qty: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
  };
  notes?: string;
  createdAt: string;
}

export interface CreateOrderItem {
  productId: number;
  qty: number;
}
