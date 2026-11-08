import { ORDER_STATUSES, type OrderStatus, type OrderWithItems } from "../models/OrderModel.js";
import { centsToReais } from "../utils/money.js";

/** Formato `Order` consumido pelo front (src/types/order.ts) */
export function orderView(o: OrderWithItems) {
  return {
    id: o.id,
    // Status desconhecido no banco é exposto como "pending" para não quebrar o front
    status: (ORDER_STATUSES as readonly string[]).includes(o.status) ? (o.status as OrderStatus) : "pending",
    items: o.items.map((i) => ({
      productId: i.productId,
      name: i.productName,
      unitPrice: centsToReais(i.unitPriceCents),
      qty: i.qty,
      lineTotal: centsToReais(i.unitPriceCents * i.qty),
    })),
    subtotal: centsToReais(o.subtotalCents),
    deliveryFee: centsToReais(o.deliveryFeeCents),
    total: centsToReais(o.totalCents),
    deliveryAddress: {
      zipCode: o.deliveryZipCode,
      street: o.deliveryStreet,
      number: o.deliveryNumber,
      ...(o.deliveryComplement && { complement: o.deliveryComplement }),
    },
    ...(o.notes && { notes: o.notes }),
    createdAt: o.createdAt.toISOString(),
  };
}
