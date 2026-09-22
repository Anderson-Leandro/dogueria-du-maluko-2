import React, { useState } from "react";
import { ShoppingCart, User, ArrowLeft } from "lucide-react";
import logoComTexto from "../../imports/cachorro_e_texto_sem_fundo.png";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { CartDropdown } from "../cart/CartDropdown";

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Header({ currentPath = "/", onNavigate }: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, cartBounce } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isAuthPath = currentPath === "/login" || currentPath === "/cadastro" || currentPath === "login" || currentPath === "register";

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setCartOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navLinks = [
    { label: "INÍCIO", path: "/" },
    { label: "CARDÁPIO", path: "/cardapio" },
    { label: "SOBRE NÓS", path: "/sobre" },
    // { label: "DELIVERY", path: "/cardapio" },
    // { label: "CONTATO", path: "/sobre" },
  ];

  return (
    <header className="bg-[#1a1a2e] sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <button
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center flex-shrink-0 focus:outline-none cursor-pointer"
          aria-label="Ir para página inicial"
        >
          <img
            src={logoComTexto}
            alt="Dogueria Du Maluko"
            className="h-12 w-auto object-contain"
          />
        </button>

        {/* Nav — visible on store, cardapio & about */}
        {!isAuthPath && (
          <nav className="hidden lg:flex items-center gap-5 ml-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.label}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-xs font-bold tracking-widest transition-colors duration-200 ${isActive ? "text-accent" : "text-white/70 hover:text-accent"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        )}

        <div className="flex-1" />

        {/* Delivery badge */}
        {!isAuthPath && (
          <div className="hidden sm:flex items-center gap-1.5 text-white/60 text-xs font-semibold">
            <span className="text-green-400">🛵</span>
            DELIVERY EM RIBEIRÃO PIRES
          </div>
        )}

        {/* Back button — only on auth screens */}
        {isAuthPath && (
          <button
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">VOLTAR À LOJA</span>
          </button>
        )}

        {/* User button */}
        <button
          onClick={(e) => handleNavClick(e, isAuthenticated ? "/perfil" : "/login")}
          className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${isAuthPath || isAuthenticated
              ? "border-primary/60 text-primary bg-primary/10"
              : "border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-[rgba(255,255,255,0.1)]"
            }`}
          title={isAuthenticated ? `Logado como ${user?.name || user?.email}` : "Entrar ou Cadastrar"}
          aria-label="Perfil do usuário"
        >
          <User className="w-4 h-4" />
        </button>

        {/* Cart button + dropdown */}
        <div className="relative">
          <button
            onClick={() => setCartOpen((v) => !v)}
            className={`relative flex items-center gap-2 bg-primary hover:bg-orange-400 text-white px-4 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${cartBounce ? "scale-110" : ""
              } ${cartOpen ? "ring-2 ring-white/30" : ""}`}
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">CARRINHO</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-foreground rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-xs font-black shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {cartOpen && (
            <CartDropdown
              onClose={() => setCartOpen(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
