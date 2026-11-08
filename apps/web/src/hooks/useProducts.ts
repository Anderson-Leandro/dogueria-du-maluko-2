import { Product } from "../types/product";
import { productService } from "../services/productService";
import { useApiResource } from "./useApiResource";

const EMPTY: Product[] = [];

export function useProducts() {
  const { data, loading, error, refresh } = useApiResource(
    (signal) => productService.getProducts(signal),
    "Erro ao carregar produtos"
  );

  return {
    products: data ?? EMPTY,
    loading,
    error,
    refreshProducts: refresh,
  };
}
