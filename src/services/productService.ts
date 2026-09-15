import { Product } from "../types/product";
import { mockProducts } from "../data/products.data";
import { simulateNetworkDelay } from "./api";

export const productService = {
  /**
   * Obtém a lista completa de produtos (hot dogs)
   */
  async getProducts(): Promise<Product[]> {
    await simulateNetworkDelay(200);
    return [...mockProducts];
  },

  /**
   * Obtém um produto específico pelo ID
   */
  async getProductById(id: number): Promise<Product | null> {
    await simulateNetworkDelay(150);
    const product = mockProducts.find((p) => p.id === id);
    return product ? { ...product } : null;
  },
};
