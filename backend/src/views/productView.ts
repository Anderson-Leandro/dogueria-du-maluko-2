import type { DrinkCategory } from "@prisma/client";
import type { ProductWithRelations } from "../models/ProductModel.js";
import { centsToReais } from "../utils/money.js";

/** Formato `Product` do front (src/types/product.ts) */
export function hotdogView(p: ProductWithRelations) {
  return {
    id: p.id,
    name: p.name,
    price: centsToReais(p.priceCents),
    imageUrl: p.imageUrl,
    shortDescription: p.shortDescription ?? "",
    fullDescription: p.fullDescription ?? "",
    ...(p.badge && { badge: p.badge }),
    ingredients: p.ingredients.map((i) => i.name),
    featured: p.featured,
  };
}

/** Formato `Drink` do front (src/types/drink.ts) */
export function drinkView(p: ProductWithRelations) {
  return {
    id: p.id,
    name: p.name,
    price: centsToReais(p.priceCents),
    imageUrl: p.imageUrl,
    description: p.shortDescription ?? "",
    category: p.category?.key ?? "",
  };
}

/** Formato `DrinkCategoryInfo` do front */
export function drinkCategoryView(c: DrinkCategory) {
  return { key: c.key, label: c.label, emoji: c.emoji };
}
