import { Drink, DrinkCategoryInfo } from "../types/drink";

export const mockDrinkCategories: DrinkCategoryInfo[] = [
  { key: "refrigerante", label: "Refrigerantes", emoji: "🥤" },
  { key: "suco", label: "Sucos da Casa", emoji: "🍊" },
  { key: "cerveja", label: "Cervejas", emoji: "🍺" },
  { key: "agua", label: "Águas", emoji: "💧" },
];

export const mockDrinks: Drink[] = [
  {
    id: 101,
    category: "refrigerante",
    name: "Coca-Cola Lata",
    description: "Lata gelada 350ml. O clássico que combina com qualquer dogue.",
    price: 6.0,
    imageUrl:
      "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 102,
    category: "refrigerante",
    name: "Guaraná Antarctica",
    description: "Lata gelada 350ml. O sabor brasileiro que todo mundo ama.",
    price: 6.0,
    imageUrl:
      "https://images.unsplash.com/photo-1674176508097-463b009c6004?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 103,
    category: "refrigerante",
    name: "Sprite Lata",
    description: "Lata gelada 350ml. Refrescante, leve e perfeita pra cortar a gordura.",
    price: 6.0,
    imageUrl:
      "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 104,
    category: "refrigerante",
    name: "Fanta Laranja Lata",
    description: "Lata gelada 350ml. Doce e frutada, a queridinha da garotada.",
    price: 6.0,
    imageUrl:
      "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 105,
    category: "suco",
    name: "Suco de Maracujá",
    description: "500ml feito na hora, bem gelado. Azedinho na medida certa.",
    price: 12.0,
    imageUrl:
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 106,
    category: "suco",
    name: "Suco de Laranja Natural",
    description: "500ml espremido na hora. Puro, sem conservante, sem frescura.",
    price: 12.0,
    imageUrl:
      "https://images.unsplash.com/photo-1622597467821-df79dcb4f94d?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 107,
    category: "cerveja",
    name: "Heineken Long Neck",
    description: "330ml bem gelada. Pra quem quer um dogue com aquela cerveja especial.",
    price: 14.0,
    imageUrl:
      "https://images.unsplash.com/photo-1642647237318-3e30ff181a3c?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 108,
    category: "cerveja",
    name: "Brahma Long Neck",
    description: "330ml gelada. O clássico brasileiro que cai muito bem com qualquer dogue.",
    price: 10.0,
    imageUrl:
      "https://images.unsplash.com/photo-1625409363042-1f7e6771ca83?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 109,
    category: "agua",
    name: "Água Mineral",
    description: "Garrafa 500ml sem gás. Simples e necessária.",
    price: 4.0,
    imageUrl:
      "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: 110,
    category: "agua",
    name: "Água com Gás",
    description: "Garrafa 500ml com gás. Para os apreciadores do borbulhante.",
    price: 5.0,
    imageUrl:
      "https://images.unsplash.com/photo-1588238142232-7108fb7dcbb6?w=400&h=300&fit=crop&auto=format",
  },
];
