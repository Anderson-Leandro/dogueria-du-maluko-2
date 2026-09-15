import { useState, useEffect, useCallback } from "react";
import { Drink, DrinkCategoryInfo } from "../types/drink";
import { drinkService } from "../services/drinkService";
import { mockDrinks, mockDrinkCategories } from "../data/drinks.data";

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>(mockDrinks);
  const [categories, setCategories] = useState<DrinkCategoryInfo[]>(mockDrinkCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [drinksData, categoriesData] = await Promise.all([
        drinkService.getDrinks(),
        drinkService.getCategories(),
      ]);
      setDrinks(drinksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar bebidas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  return {
    drinks,
    categories,
    loading,
    error,
    refreshDrinks: fetchDrinks,
  };
}
