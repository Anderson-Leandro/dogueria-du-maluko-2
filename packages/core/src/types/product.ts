export interface Purchasable {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Product extends Purchasable {
  shortDescription: string;
  fullDescription: string;
  badge?: string;
  ingredients: string[];
  /** Exibido na vitrine "mais pedidos" da Home */
  featured?: boolean;
}
