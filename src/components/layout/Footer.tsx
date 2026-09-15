import React from "react";

interface FooterProps {
  darker?: boolean;
}

export function Footer({ darker = false }: FooterProps) {
  return (
    <footer
      className={`${
        darker ? "bg-[#0a0a14] text-white/30" : "bg-[#0f0f1a] text-white/50"
      } py-8 px-4 text-center text-xs`}
    >
      <div className="font-display text-accent text-2xl tracking-widest mb-1">
        DOGUERIA DU MALUKO
      </div>
      <p className="mb-1">Seu hot dog mais divertido de Ribeirão Pires!</p>
      <p className="text-white/30">© 2024 — Todos os direitos reservados</p>
    </footer>
  );
}
