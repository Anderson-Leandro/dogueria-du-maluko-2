import { Drink, DrinkCategory, DrinkCategoryInfo } from "../types/drink";
import { mockDrinks, mockDrinkCategories } from "../data/drinks.data";
import { simulateNetworkDelay } from "./api";

export const drinkService = {
  /**
   * Obtém a lista completa de bebidas
   */
  async getDrinks(): Promise<Drink[]> {
    await simulateNetworkDelay(200);
    return [...mockDrinks];
  },

  /**
   * Obtém as categorias de bebidas com labels e emojis
   */
  async getCategories(): Promise<DrinkCategoryInfo[]> {
    await simulateNetworkDelay(100);
    return [...mockDrinkCategories];
  },

  /**
   * Obtém as bebidas filtradas por categoria
   */
  async getDrinksByCategory(category: DrinkCategory): Promise<Drink[]> {
    await simulateNetworkDelay(150);
    return mockDrinks.filter((d) => d.category === category);
  },
};
