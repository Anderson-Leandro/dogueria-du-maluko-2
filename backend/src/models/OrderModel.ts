import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";
import { HttpError } from "../utils/HttpError.js";
import { ProductModel } from "./ProductModel.js";
import type { CreateOrderInput } from "../validators/order.schema.js";

export const ORDER_STATUSES = ["pending", "preparing", "delivering", "delivered", "canceled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

const withItems = { items: { orderBy: { id: "asc" } } } satisfies Prisma.OrderInclude;
export type OrderWithItems = Prisma.OrderGetPayload<{ include: typeof withItems }>;

/** Regra de frete: grátis a partir do valor mínimo configurado */
export function calcDeliveryFee(subtotalCents: number): number {
  return subtotalCents >= env.FREE_DELIVERY_MIN_CENTS ? 0 : env.DELIVERY_FEE_CENTS;
}

/** Model de pedidos */
export const OrderModel = {
  /**
   * Cria o pedido calculando tudo no servidor: preços vêm do banco,
   * nunca do cliente. Endereço é copiado do cadastro do usuário.
   */
  async create(userId: string, { items, notes }: CreateOrderInput): Promise<OrderWithItems> {
    // Agrupa itens repetidos (mesmo productId)
    const qtyById = new Map<number, number>();
    for (const { productId, qty } of items) {
      qtyById.set(productId, (qtyById.get(productId) ?? 0) + qty);
    }
    for (const [productId, qty] of qtyById) {
      if (qty > 99) {
        throw new HttpError(400, "Quantidade máxima por produto é 99.", { items: `Produto ${productId}: máximo 99.` });
      }
    }

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new HttpError(401, "Sessão inválida ou expirada. Faça login novamente.");

      const ids = [...qtyById.keys()];
      const products = await ProductModel.findActiveByIds(ids, tx);
      const productById = new Map(products.map((p) => [p.id, p]));

      const missing = ids.filter((id) => !productById.has(id));
      if (missing.length > 0) {
        throw new HttpError(400, "Alguns produtos não estão mais disponíveis.", {
          items: `Produtos indisponíveis: ${missing.join(", ")}`,
        });
      }

      const lines = ids.map((id) => {
        const product = productById.get(id)!;
        return {
          productId: id,
          productName: product.name,
          unitPriceCents: product.priceCents,
          qty: qtyById.get(id)!,
        };
      });

      const subtotalCents = lines.reduce((sum, l) => sum + l.unitPriceCents * l.qty, 0);
      const deliveryFeeCents = calcDeliveryFee(subtotalCents);

      return tx.order.create({
        data: {
          userId,
          subtotalCents,
          deliveryFeeCents,
          totalCents: subtotalCents + deliveryFeeCents,
          deliveryZipCode: user.zipCode,
          deliveryStreet: user.street,
          deliveryNumber: user.number,
          deliveryComplement: user.complement,
          notes: notes || null,
          items: { create: lines },
        },
        include: withItems,
      });
    });
  },

  listByUser(userId: string): Promise<OrderWithItems[]> {
    return prisma.order.findMany({
      where: { userId },
      include: withItems,
      orderBy: { createdAt: "desc" },
    });
  },

  /** Busca só se o pedido pertencer ao usuário (evita IDOR) */
  findByIdForUser(id: number, userId: string): Promise<OrderWithItems | null> {
    return prisma.order.findFirst({ where: { id, userId }, include: withItems });
  },
};
