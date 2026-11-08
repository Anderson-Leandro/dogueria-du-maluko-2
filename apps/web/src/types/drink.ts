import { Purchasable } from "./product";

export type DrinkCategory = "refrigerante" | "suco" | "cerveja" | "agua";

export interface Drink extends Purchasable {
  description: string;
  category: DrinkCategory;
}

export interface DrinkCategoryInfo {
  key: DrinkCategory;
  label: string;
  emoji: string;
}
