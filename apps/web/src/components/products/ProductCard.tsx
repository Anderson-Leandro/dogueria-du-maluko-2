import React, { useState } from "react";
import { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group border border-border flex flex-col justify-between"
    >
      <div>
        <div className="relative h-48 bg-orange-50 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest shadow-md">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-xl tracking-widest text-foreground mb-0.5">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-snug mb-3 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="font-black text-xl text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`text-[11px] font-black px-3 py-2 rounded-full tracking-wider transition-all duration-300 cursor-pointer ${
              justAdded
                ? "bg-green-500 text-white scale-95"
                : "bg-primary hover:bg-orange-400 text-white hover:scale-105 active:scale-95"
            }`}
          >
            {justAdded ? "ADICIONADO ✓" : "+ CARRINHO"}
          </button>
        </div>
      </div>
    </article>
  );
}
