import { Drink, DrinkCategory, DrinkCategoryInfo } from "../types/drink";
import { apiFetch } from "./api";

export const drinkService = {
  /** Lista todas as bebidas ativas */
  getDrinks(signal?: AbortSignal): Promise<Drink[]> {
    return apiFetch<Drink[]>("/drinks", { signal });
  },

  /** Categorias de bebidas com labels e emojis */
  getCategories(signal?: AbortSignal): Promise<DrinkCategoryInfo[]> {
    return apiFetch<DrinkCategoryInfo[]>("/drinks/categories", { signal });
  },

  /** Bebidas de uma categoria */
  getDrinksByCategory(category: DrinkCategory): Promise<Drink[]> {
    return apiFetch<Drink[]>(`/drinks?category=${encodeURIComponent(category)}`);
  },
};
