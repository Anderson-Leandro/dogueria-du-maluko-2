import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

const withRelations = {
  ingredients: { orderBy: { position: "asc" } },
  category: true,
} satisfies Prisma.ProductInclude;

export type ProductWithRelations = Prisma.ProductGetPayload<{ include: typeof withRelations }>;

/** Model de produtos (dogues e bebidas) */
export const ProductModel = {
  listHotdogs(): Promise<ProductWithRelations[]> {
    return prisma.product.findMany({
      where: { type: "hotdog", active: true },
      include: withRelations,
      orderBy: { id: "asc" },
    });
  },

  findHotdogById(id: number): Promise<ProductWithRelations | null> {
    return prisma.product.findFirst({
      where: { id, type: "hotdog", active: true },
      include: withRelations,
    });
  },

  listDrinks(categoryKey?: string): Promise<ProductWithRelations[]> {
    return prisma.product.findMany({
      where: {
        type: "drink",
        active: true,
        ...(categoryKey && { category: { key: categoryKey } }),
      },
      include: withRelations,
      orderBy: [{ category: { position: "asc" } }, { id: "asc" }],
    });
  },

  listDrinkCategories() {
    return prisma.drinkCategory.findMany({ orderBy: { position: "asc" } });
  },

  /** Produtos ativos (qualquer tipo) pelos ids — usado na criação de pedidos */
  findActiveByIds(ids: number[], tx: Prisma.TransactionClient = prisma) {
    return tx.product.findMany({ where: { id: { in: ids }, active: true } });
  },
};
