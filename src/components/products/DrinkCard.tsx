import React, { useState } from "react";
import { Drink } from "../../types/drink";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";

interface DrinkCardProps {
  drink: Drink;
  onAddToCart?: (drink: Drink) => void;
}

export function DrinkCard({ drink, onAddToCart }: DrinkCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(drink);
    } else {
      addToCart(drink, 1);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
      <div>
        <div className="h-36 overflow-hidden bg-muted">
          <img
            src={drink.imageUrl}
            alt={drink.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg tracking-widest text-foreground mb-0.5">
            {drink.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-snug mb-3">
            {drink.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="font-black text-lg text-primary">
            {formatPrice(drink.price)}
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
    </div>
  );
}
