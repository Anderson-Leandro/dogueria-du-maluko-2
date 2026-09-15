import React from "react";
import { useAbout } from "../hooks/useAbout";
import { Footer } from "../components/layout/Footer";

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { aboutData } = useAbout();

  const handleGoMenu = () => {
    if (onNavigate) {
      onNavigate("/cardapio");
    }
  };

  if (!aboutData) return null;

  return (
    <div className="bg-[#0f0f1a] text-white min-h-[calc(100vh-64px)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1779430901079-07d4b6f0481c?w=1400&h=600&fit=crop&auto=format"
            alt="Nossa cozinha"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-accent font-bold text-xs tracking-widest uppercase mb-3">
            🐕 Ribeirão Pires, SP
          </p>
          <h1 className="font-display tracking-widest leading-none mb-4">
            <span className="block text-white text-5xl sm:text-7xl">NOSSA</span>
            <span className="block text-accent text-5xl sm:text-7xl">HISTÓRIA</span>
          </h1>
          <p className="text-white/70 max-w-md text-base leading-relaxed">
            De um carrinho vermelho na feira ao delivery mais pedido de Ribeirão Pires. Essa é a história da dogueria mais maluca da cidade.
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {aboutData.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-white text-3xl sm:text-4xl tracking-widest">
                {s.value}
              </div>
              <div className="text-white/70 text-xs font-bold tracking-wider uppercase mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-4xl text-accent tracking-widest mb-12 text-center">
          COMO TUDO COMEÇOU
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px hidden sm:block" />

          <div className="flex flex-col gap-12">
            {aboutData.timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 ${
                  i % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 sm:text-right last:text-left">
                  {i % 2 === 1 && <div className="hidden sm:block" />}
                  <div
                    className={`bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl p-6 ${
                      i % 2 === 1 ? "sm:ml-8" : "sm:mr-8"
                    }`}
                  >
                    <span className="font-display text-primary text-2xl tracking-widest">
                      {item.year}
                    </span>
                    <h3 className="font-display text-white text-xl tracking-widest mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>

                {/* Year dot on the line */}
                <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 bg-primary rounded-full items-center justify-center shadow-lg flex-shrink-0 z-10">
                  <span className="text-white font-black text-xs">
                    {item.year.slice(2)}
                  </span>
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-[#13132a] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl text-accent tracking-widest mb-2 text-center">
            NOSSO TIME
          </h2>
          <p className="text-white/40 text-sm text-center mb-10">
            As pessoas por trás de cada dogue
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {aboutData.team.map((member) => (
              <div
                key={member.name}
                className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-white text-xl tracking-widest leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-primary font-bold text-xs tracking-widest uppercase mt-0.5 mb-3">
                    {member.role}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-4xl text-accent tracking-widest mb-10 text-center">
          NOSSOS VALORES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {aboutData.values.map((v) => (
            <div
              key={v.title}
              className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-2xl p-7 text-center"
            >
              <div className="text-5xl mb-4">{v.icon}</div>
              <h3 className="font-display text-white text-xl tracking-widest mb-2">
                {v.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-secondary py-16 px-4 text-center">
        <h2 className="font-display text-accent text-5xl sm:text-6xl tracking-widest leading-none mb-3">
          BORA PEDIR
        </h2>
        <h2 className="font-display text-white text-5xl sm:text-6xl tracking-widest leading-none mb-8">
          UM DOGUE?
        </h2>
        <button
          onClick={handleGoMenu}
          className="bg-primary hover:bg-orange-400 text-white font-display text-2xl tracking-widest px-12 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
        >
          VER O CARDÁPIO
        </button>
      </section>

      {/* Footer */}
      <Footer darker />
    </div>
  );
}
