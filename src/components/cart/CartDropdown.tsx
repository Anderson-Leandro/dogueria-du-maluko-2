import React from "react";
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

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute top-full right-0 mt-3 z-50 w-80 sm:w-96 bg-[#1a1a2e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="font-display text-lg text-white tracking-widest">MEU CARRINHO</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)]"
            aria-label="Fechar carrinho"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Item list — scrollable */}
        <div className="overflow-y-auto flex-1 max-h-72 overscroll-contain">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-3">
              <ShoppingBag className="w-10 h-10 text-white/20" />
              <p className="text-white/40 text-sm font-semibold">Seu carrinho está vazio</p>
              <p className="text-white/25 text-xs">Adicione algum dogue para continuar!</p>
            </div>
          ) : (
            <ul className="divide-y divide-[rgba(255,255,255,0.05)]">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  {/* Thumb */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0 bg-orange-900/20"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-white text-sm tracking-widest truncate leading-tight">
                      {item.name}
                    </p>
                    <p className="text-primary font-black text-xs mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.05)] rounded-full border border-white/10 px-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        item.qty > 1
                          ? updateQty(item.id, item.qty - 1)
                          : removeFromCart(item.id)
                      }
                      className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-white font-black text-xs">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal + remove */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-white/70 font-bold text-xs">
                      {formatPrice(item.price * item.qty)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/25 hover:text-red-400 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fixed footer — always visible */}
        <div className="border-t border-white/10 px-4 pt-3 pb-4 flex-shrink-0 bg-[#13132a]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
              Total do pedido
            </span>
            <span className="font-black text-xl text-primary">{formatPrice(cartTotal)}</span>
          </div>
          <button
            disabled={isEmpty}
            onClick={onCheckout}
            className="w-full bg-primary hover:bg-orange-400 disabled:bg-[rgba(255,255,255,0.1)] disabled:text-white/30 disabled:cursor-not-allowed text-white font-display text-xl tracking-widest py-3 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            CONFIRMAR COMPRA
          </button>
        </div>
      </div>
    </>
  );
}
