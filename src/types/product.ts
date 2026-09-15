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
}
