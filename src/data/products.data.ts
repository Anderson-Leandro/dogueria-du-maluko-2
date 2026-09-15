import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "DOG MANEIRO",
    shortDescription: "Com purê, milho, batata palha",
    fullDescription:
      "O clássico que todo mundo ama! Salsicha premium grelhada no pão artesanal crocante, coberto com nosso purê cremoso especial, milho verde refogado na manteiga e bastante batata palha crocante. Uma combinação irresistível que define o sabor da Dogueria Du Maluko.",
    price: 19.9,
    imageUrl:
      "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=600&h=400&fit=crop&auto=format",
    badge: "MAIS PEDIDO",
    ingredients: ["Salsicha premium", "Purê cremoso", "Milho verde", "Batata palha", "Maionese"],
  },
  {
    id: 2,
    name: "DOG FULEIRO",
    shortDescription: "Com purê, batata palha",
    fullDescription:
      "Simples mas poderoso! Nossa salsicha selecionada no pão artesanal quentinho, com purê cremoso feito na hora e finalizado com bastante batata palha crocante. O dog perfeito para quem quer saborear o essencial sem abrir mão do sabor.",
    price: 17.5,
    imageUrl:
      "https://images.unsplash.com/photo-1613482084286-41f25b486fa2?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Salsicha", "Purê cremoso", "Batata palha", "Mostarda"],
  },
  {
    id: 3,
    name: "DOG CARAMELO",
    shortDescription: "Com farofa de bacon, bacon em fatias",
    fullDescription:
      "Para os amantes de bacon! Salsicha especial grelhada com generosas fatias de bacon tostado e farofa de bacon caseira, tudo sobre um pão macio e morno. O sabor defumado e crocante vai te conquistar na primeira mordida.",
    price: 24.0,
    imageUrl:
      "https://images.unsplash.com/photo-1678033382919-fa907632fdda?w=600&h=400&fit=crop&auto=format",
    badge: "ESPECIAL",
    ingredients: ["Salsicha especial", "Bacon fatiado", "Farofa de bacon", "Cebola caramelada"],
  },
  {
    id: 4,
    name: "DOG FRANGUINHO",
    shortDescription: "Com frango desfiado temperado",
    fullDescription:
      "Uma opção leve e deliciosa! Pão artesanal recheado com frango desfiado temperado e cozido lentamente em nosso molho secreto, coberto com maionese temperada e cebolinha fresca. Sabor de comida caseira no estilo dogueria.",
    price: 21.9,
    imageUrl:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Frango desfiado", "Molho secreto", "Maionese temperada", "Cebolinha"],
  },
  {
    id: 5,
    name: "DOG LOUCO",
    shortDescription: "Com cream cheese, calabresa defumada",
    fullDescription:
      "Esse é para os corajosos! Salsicha grelhada no pão artesanal coberta com cream cheese derretido e rodelas de calabresa defumada levemente apimentada. Uma explosão de sabor que vai deixar você com vontade de pedir de novo.",
    price: 22.9,
    imageUrl:
      "https://images.unsplash.com/photo-1721648373511-fb220d7f043f?w=600&h=400&fit=crop&auto=format",
    badge: "NOVO",
    ingredients: ["Salsicha", "Cream cheese", "Calabresa defumada", "Pimenta biquinho"],
  },
  {
    id: 6,
    name: "DOG ESPECIAL",
    shortDescription: "Com cheddar, bacon crocante, cebola crispy",
    fullDescription:
      "O mais completo da casa! Salsicha premium grelhada no pão brioche artesanal, coberta com cheddar inglês derretido, bacon crocante em pedaços, cebola crispy dourada e molho especial da casa. Uma experiência gastronômica única.",
    price: 26.9,
    imageUrl:
      "https://images.unsplash.com/photo-1695089028533-c6e9cf1ee3cb?w=600&h=400&fit=crop&auto=format",
    badge: "TOP",
    ingredients: ["Salsicha premium", "Cheddar inglês", "Bacon crocante", "Cebola crispy", "Molho especial"],
  },
  {
    id: 7,
    name: "DOG VEGANO",
    shortDescription: "Com salsicha vegetal, guacamole",
    fullDescription:
      "Pensando em todos os amigos! Salsicha 100% vegetal grelhada no pão integral, coberta com guacamole fresco, tomate picado, rúcula e molho tahine. Sabor incrível sem nenhum ingrediente de origem animal.",
    price: 23.9,
    imageUrl:
      "https://images.unsplash.com/photo-1638368593117-f87fb4ebeb74?w=600&h=400&fit=crop&auto=format",
    ingredients: ["Salsicha vegetal", "Guacamole", "Tomate", "Rúcula", "Molho tahine"],
  },
  {
    id: 8,
    name: "DOG DUPLO",
    shortDescription: "Dois dogs, dobro de prazer",
    fullDescription:
      "Para quem não consegue se decidir! Duas salsichas premium grelhadas no mesmo pão XL, com purê, milho, batata palha, cheddar derretido e nosso molho especial da casa. O dog dos campeões.",
    price: 29.9,
    imageUrl:
      "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=600&h=400&fit=crop&auto=format",
    badge: "XL",
    ingredients: ["2x Salsicha premium", "Purê", "Milho", "Batata palha", "Cheddar", "Molho especial"],
  },
];
