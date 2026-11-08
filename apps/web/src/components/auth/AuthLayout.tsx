import React from "react";
import logoComTexto from "../../imports/cachorro_e_texto_sem_fundo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  wide?: boolean;
}

export function AuthLayout({ children, wide = false }: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f0f1a] flex items-start justify-center px-4 py-10">
      {/* Background glow circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main card */}
      <div
        className={`relative w-full ${
          wide ? "max-w-xl" : "max-w-md"
        } bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm`}
      >
        <div className="flex justify-center mb-6">
          <img
            src={logoComTexto}
            alt="Dogueria Du Maluko"
            className="h-16 w-auto object-contain"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
