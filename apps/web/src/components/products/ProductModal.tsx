import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatters";
import { useCart } from "../../hooks/useCart";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product, qty: number) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [modalQty, setModalQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setModalQty(1);
  }, [product]);

  if (!product) return null;

  const handleAddAndClose = () => {
    if (onAddToCart) {
      onAddToCart(product, modalQty);
    } else {
      addToCart(product, modalQty);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92dvh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top image header */}
        <div className="relative h-56 sm:h-64 bg-orange-50 overflow-hidden flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-white text-xs font-black px-3 py-1 rounded-full tracking-widest shadow-md">
              {product.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4">
            <h2 className="font-display text-white text-3xl tracking-widest drop-shadow-lg leading-tight">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Scrollable description & ingredients */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          <p className="text-primary font-bold text-sm mb-3">
            {product.shortDescription}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {product.fullDescription}
          </p>
          <div className="mb-5">
            <h4 className="font-bold text-foreground text-xs tracking-widest uppercase mb-2">
              Ingredientes
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full border border-border"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with quantity and add to cart */}
        <div className="border-t border-border p-4 sm:p-5 flex-shrink-0 bg-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center bg-muted rounded-full overflow-hidden border border-border">
              <button
                onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black text-foreground text-sm">
                {modalQty}
              </span>
              <button
                onClick={() => setModalQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 text-right">
              <div className="text-xs text-muted-foreground font-semibold">TOTAL</div>
              <div className="font-black text-2xl text-primary leading-none">
                {formatPrice(product.price * modalQty)}
              </div>
            </div>
          </div>
          <button
            onClick={handleAddAndClose}
            className="w-full bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
}
