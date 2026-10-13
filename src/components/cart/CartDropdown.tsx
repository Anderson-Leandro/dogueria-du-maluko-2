import React, { useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatters";

interface CartDropdownProps {
  onClose: () => void;
  onCheckout?: () => void;
}

export function CartDropdown({ onClose, onCheckout }: CartDropdownProps) {
  const { items, cartTotal, removeFromCart, updateQty } = useCart();
  const isEmpty = items.length === 0;

  // Bloqueio de scroll do body e suporte a tecla Escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleCheckoutClick = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Container: Drawer lateral no Mobile, Dropdown elegante no Desktop */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-[340px] xs:max-w-[380px] h-[100dvh] sm:h-auto sm:max-h-[82vh] sm:absolute sm:top-full sm:right-0 sm:bottom-auto sm:left-auto sm:mt-3 sm:w-96 bg-[#1a1a2e] border-l sm:border border-white/10 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right sm:slide-in-from-right-0 sm:zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de Compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/10 bg-[#161628] flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-display text-lg sm:text-xl text-white tracking-widest">
              MEU CARRINHO
            </span>
            {!isEmpty && (
              <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-black px-2 py-0.5 rounded-full ml-1">
                {items.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Fechar carrinho"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Item list — scrollable & safe area */}
        <div className="overflow-y-auto flex-1 min-h-0 overscroll-contain px-3 sm:px-4 py-2">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-white/60 text-sm font-semibold">Seu carrinho está vazio</p>
              <p className="text-white/30 text-xs max-w-xs">
                Escolha seus dogues favoritos no cardápio e adicione ao pedido!
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  {/* Thumb */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 bg-orange-900/20 border border-white/5"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-white text-xs sm:text-sm tracking-widest truncate leading-tight">
                      {item.name}
                    </p>
                    <p className="text-primary font-black text-xs mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1 bg-white/5 rounded-full border border-white/10 px-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        item.qty > 1
                          ? updateQty(item.id, item.qty - 1)
                          : removeFromCart(item.id)
                      }
                      className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-primary transition-colors cursor-pointer"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-white font-black text-xs">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-primary transition-colors cursor-pointer"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0 pl-1">
                    <span className="text-white/80 font-bold text-xs">
                      {formatPrice(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors cursor-pointer"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fixed footer — always visible on screen */}
        <div className="border-t border-white/10 px-4 sm:px-5 pt-3.5 pb-5 sm:pb-4 flex-shrink-0 bg-[#13132a]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
              Total do pedido
            </span>
            <span className="font-black text-xl sm:text-2xl text-primary">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <button
            disabled={isEmpty}
            onClick={handleCheckoutClick}
            className="w-full bg-primary hover:bg-orange-400 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-white font-display text-lg sm:text-xl tracking-widest py-3 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            CONFIRMAR COMPRA
          </button>
        </div>
      </div>
    </>
  );
}
