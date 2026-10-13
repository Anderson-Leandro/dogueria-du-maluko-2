import React, { useEffect } from "react";
import { X, Home, UtensilsCrossed, Info, User, ChevronRight, LogIn } from "lucide-react";
import logoComTexto from "../../imports/cachorro_e_texto_sem_fundo.png";
import { useAuth } from "../../hooks/useAuth";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate?: (path: string) => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  currentPath,
  onNavigate,
}: MobileNavDrawerProps) {
  const { isAuthenticated, user } = useAuth();

  // Bloqueio de rolagem do body quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fechar com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (path: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navLinks = [
    { label: "INÍCIO", path: "/", icon: Home },
    { label: "CARDÁPIO", path: "/cardapio", icon: UtensilsCrossed },
    { label: "SOBRE NÓS", path: "/sobre", icon: Info },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-72 sm:w-80 max-w-[85vw] bg-[#1a1a2e] border-r border-white/10 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-250 ease-out">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#161628]">
          <div className="flex items-center gap-2">
            <img
              src={logoComTexto}
              alt="Dogueria Du Maluko"
              className="h-10 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/40 px-3 mb-1">
            Navegação
          </p>
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-display tracking-widest text-base transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 font-black"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-primary"
                    }`}
                  />
                  <span>{link.label}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-white/30"
                  }`}
                />
              </button>
            );
          })}

          {/* Delivery notice */}
          <div className="mt-5 p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2.5 text-xs text-green-300 font-bold">
            <span className="text-base flex-shrink-0">🛵</span>
            <div>
              <p className="leading-tight">Delivery em Ribeirão Pires</p>
              <p className="text-[10px] text-green-400/80 font-normal mt-0.5">
                Entrega rápida & quentinha!
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Footer / User section */}
        <div className="p-4 border-t border-white/10 bg-[#141424]">
          <button
            onClick={() => handleLinkClick(isAuthenticated ? "/perfil" : "/login")}
            className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {isAuthenticated ? user?.name || "Minha Conta" : "Entrar ou Cadastrar"}
                </p>
                <p className="text-[10px] text-white/50 truncate">
                  {isAuthenticated ? user?.email || "Ver perfil" : "Acesse seus pedidos"}
                </p>
              </div>
            </div>
            {isAuthenticated ? (
              <ChevronRight className="w-4 h-4 text-white/30" />
            ) : (
              <LogIn className="w-4 h-4 text-white/50" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
