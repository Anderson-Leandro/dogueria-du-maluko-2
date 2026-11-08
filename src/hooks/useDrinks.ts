import { Drink, DrinkCategoryInfo } from "../types/drink";
import { drinkService } from "../services/drinkService";
import { useApiResource } from "./useApiResource";

const EMPTY_DRINKS: Drink[] = [];
const EMPTY_CATEGORIES: DrinkCategoryInfo[] = [];

export function useDrinks() {
  const { data, loading, error, refresh } = useApiResource(
    async (signal) => {
      const [drinks, categories] = await Promise.all([
        drinkService.getDrinks(signal),
        drinkService.getCategories(signal),
      ]);
      return { drinks, categories };
    },
    "Erro ao carregar bebidas"
  );

  return {
    drinks: data?.drinks ?? EMPTY_DRINKS,
    categories: data?.categories ?? EMPTY_CATEGORIES,
    loading,
    error,
    refreshDrinks: refresh,
  };
}
