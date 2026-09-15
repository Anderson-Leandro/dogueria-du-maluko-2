import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Product } from "../types/product";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/products/ProductCard";
import { ProductModal } from "../components/products/ProductModal";
import { PromoStrip } from "../components/layout/PromoStrip";
import { Footer } from "../components/layout/Footer";

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleGoMenu = () => {
    if (onNavigate) {
      onNavigate("/cardapio");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[rgba(255,255,255,0.05)] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[rgba(255,255,255,0.05)] rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[rgba(255,255,255,0.05)] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center relative z-10">
          <p className="text-white/80 font-bold text-sm tracking-widest uppercase mb-4">
            🔥 Seu hot dog mais divertido
          </p>
          <h1 className="font-display tracking-widest leading-none">
            <span className="block text-accent text-6xl sm:text-8xl">A DOGUERIA</span>
            <span className="block text-white text-6xl sm:text-8xl">MAIS MALUCA</span>
            <span className="block text-accent text-5xl sm:text-6xl">DE RIBEIRÃO PIRES!</span>
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={handleGoMenu}
              className="bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest px-10 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            >
              PEÇA JÁ SEU DOGUE!
            </button>
            <div className="flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full px-4 py-2 text-sm font-bold">
              🚚 Entrega grátis acima de R$60,00
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-4xl text-foreground tracking-widest">
              NOSSOS DOGUES MAIS PEDIDOS
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Clique no produto para ver os detalhes completos
            </p>
          </div>
          <button
            onClick={handleGoMenu}
            className="hidden sm:flex items-center gap-1.5 text-primary font-bold text-sm hover:underline transition-colors hover:text-orange-400 cursor-pointer"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

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

      {/* Promo strip */}
      <PromoStrip />

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
