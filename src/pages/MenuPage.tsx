import React, { useState } from "react";
import { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";
import { useDrinks } from "../hooks/useDrinks";
import { ProductCard } from "../components/products/ProductCard";
import { DrinkCard } from "../components/products/DrinkCard";
import { ProductModal } from "../components/products/ProductModal";
import { Footer } from "../components/layout/Footer";

export function MenuPage() {
  const { products } = useProducts();
  const { drinks, categories } = useDrinks();
  const [tab, setTab] = useState<"dogues" | "bebidas">("dogues");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background flex flex-col justify-between">
      <div>
        {/* Sticky Tab Header */}
        <div className="bg-[#1a1a2e] px-4 sm:px-6 pt-4 pb-0 sticky top-[72px] z-30 shadow-xl">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-white text-3xl tracking-widest leading-none mb-3">
              CARDÁPIO
            </h1>

            {/* Tabs */}
            <div className="flex gap-1">
              {[
                { id: "dogues", label: "🌭  DOGUES", count: products.length },
                { id: "bebidas", label: "🥤  BEBIDAS", count: drinks.length },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as "dogues" | "bebidas")}
                  className={`px-6 py-2.5 font-display text-lg tracking-widest rounded-t-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    tab === t.id
                      ? "bg-background text-foreground"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {t.label}
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      tab === t.id
                        ? "bg-primary text-white"
                        : "bg-[rgba(255,255,255,0.1)] text-white/50"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DOGUES Tab */}
        {tab === "dogues" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* BEBIDAS Tab */}
        {tab === "bebidas" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">
            {categories.map((cat) => {
              const items = drinks.filter((d) => d.category === cat.key);
              if (items.length === 0) return null;

              return (
                <div key={cat.key}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{cat.emoji}</span>
                    <h2 className="font-display text-2xl text-foreground tracking-widest">
                      {cat.label}
                    </h2>
                    <span className="flex-1 h-px bg-border" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map((drink) => (
                      <DrinkCard key={drink.id} drink={drink} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </div>
  );
}
