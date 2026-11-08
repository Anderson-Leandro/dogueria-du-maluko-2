import { Product } from "../types/product";
import { apiFetch, ApiError } from "./api";

export const productService = {
  /** Lista os dogues ativos */
  getProducts(signal?: AbortSignal): Promise<Product[]> {
    return apiFetch<Product[]>("/products", { signal });
  },

  /** Obtém um dogue pelo ID (null se não existir) */
  async getProductById(id: number): Promise<Product | null> {
    try {
      return await apiFetch<Product>(`/products/${id}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  },
};
