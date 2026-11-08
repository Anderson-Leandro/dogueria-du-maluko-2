import React from "react";

const promoItems = [
  { icon: "🛵", title: "ENTREGA RÁPIDA", sub: "Até 40 minutos" },
  { icon: "⭐", title: "4.9 NO GOOGLE", sub: "+500 avaliações" },
  { icon: "🔥", title: "SEMPRE FRESQUINHO", sub: "Feito na hora" },
  { icon: "💳", title: "ACEITA TODOS OS CARTÕES", sub: "Débito e crédito" },
];

export function PromoStrip() {
  return (
    <section className="bg-[#1a1a2e] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
        {promoItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="text-3xl">{item.icon}</span>
            <div className="text-left">
              <div className="font-display text-accent tracking-wider text-base">
                {item.title}
              </div>
              <div className="text-white/50 text-xs">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
