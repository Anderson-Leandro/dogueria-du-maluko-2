import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ShoppingCart, User, ArrowLeft, Menu, LogOut, LogIn, UserPlus, Package } from "lucide-react";
import logoComTexto from "../../imports/cachorro_e_texto_sem_fundo.png";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { orderService } from "../../services/orderService";
import { getErrorMessage, ApiError } from "../../services/api";
import { formatPrice } from "../../utils/formatters";
import { CartDropdown } from "../cart/CartDropdown";
import { MobileNavDrawer } from "./MobileNavDrawer";

/** Marca que o usuário tentou finalizar a compra antes de entrar (vale por 15 min) */
const PENDING_CHECKOUT_KEY = "maluko_pending_checkout";
const PENDING_CHECKOUT_TTL_MS = 15 * 60 * 1000;
const AUTH_PATHS = ["/login", "/cadastro"];

function markPendingCheckout() {
  try {
    sessionStorage.setItem(PENDING_CHECKOUT_KEY, String(Date.now()));
  } catch {
    // storage indisponível
  }
}

/** Consome a marca; true se ainda estiver dentro do prazo */
function consumePendingCheckout(): boolean {
  try {
    const raw = sessionStorage.getItem(PENDING_CHECKOUT_KEY);
    sessionStorage.removeItem(PENDING_CHECKOUT_KEY);
    return raw !== null && Date.now() - Number(raw) < PENDING_CHECKOUT_TTL_MS;
  } catch {
    return false;
  }
}

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Header({ currentPath = "/", onNavigate }: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const { items, cartCount, cartBounce, clearCart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  // Fecha o dropdown de usuário ao clicar fora ou pressionar Escape
  useEffect(() => {
    if (!userMenuOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        userButtonRef.current?.focus();
      }
    };
    // Leva o foco para o primeiro item do menu ao abrir
    userMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userMenuOpen]);

  // Checkout iniciado deslogado: reabre o carrinho assim que o usuário entrar
  useEffect(() => {
    if (!isAuthenticated) return;
    if (consumePendingCheckout() && items.length > 0) setCartOpen(true);
  }, [isAuthenticated]); // só reage à mudança de autenticação

  const handleCheckout = useCallback(async () => {
    if (isSubmittingOrder || items.length === 0) return;

    if (!isAuthenticated) {
      setCartOpen(false);
      markPendingCheckout();
      toast.info("Entre na sua conta para confirmar o pedido.");
      onNavigate?.("/login");
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const order = await orderService.createOrder(
        items.map((i) => ({ productId: i.id, qty: i.qty }))
      );
      clearCart();
      setCartOpen(false);
      toast.success(`Pedido #${order.id} confirmado!`, {
        description:
          order.deliveryFee > 0
            ? `Total ${formatPrice(order.total)} (inclui frete de ${formatPrice(order.deliveryFee)})`
            : `Total ${formatPrice(order.total)} — frete grátis 🎉`,
        action: { label: "Ver pedidos", onClick: () => onNavigate?.("/meus-pedidos") },
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        // O AuthProvider já encerrou a sessão e avisou; o carrinho reabre após o novo login
        setCartOpen(false);
        markPendingCheckout();
        onNavigate?.("/login");
        return;
      }
      toast.error(getErrorMessage(err, "Não foi possível confirmar o pedido."), {
        description: err instanceof ApiError ? err.fields?.items : undefined,
      });
    } finally {
      setIsSubmittingOrder(false);
    }
  }, [isSubmittingOrder, items, isAuthenticated, onNavigate, clearCart]);

  const finishLogout = useCallback(() => {
    logout();
    toast.success("Você saiu da sua conta.");
  }, [logout]);

  /**
   * Logout único (header e drawer): primeiro navega para a loja e só então
   * encerra a sessão. Se a sessão caísse antes, o PrivateRoute da página atual
   * (ex.: /meus-pedidos) redirecionaria para /login por cima da navegação.
   */
  const pendingLogoutRef = useRef(false);
  const handleLogout = useCallback(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    if (currentPath === "/") {
      finishLogout();
      return;
    }
    pendingLogoutRef.current = true;
    onNavigate?.("/");
  }, [currentPath, onNavigate, finishLogout]);

  useEffect(() => {
    if (pendingLogoutRef.current && currentPath === "/") {
      pendingLogoutRef.current = false;
      finishLogout();
    }
  }, [currentPath, finishLogout]);

  const isAuthPath = AUTH_PATHS.includes(currentPath);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setCartOpen(false);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-4">
        {/* Mobile Hamburger Button */}
        {!isAuthPath && (
          <button
            onClick={() => {
              setUserMenuOpen(false);
              setMobileMenuOpen(true);
            }}
            className="lg:hidden p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer -ml-1 flex-shrink-0"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Logo */}
        <button
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center flex-shrink-0 focus:outline-none cursor-pointer"
          aria-label="Ir para página inicial"
        >
          <img
            src={logoComTexto}
            alt="Dogueria Du Maluko"
            className="h-9 sm:h-12 max-w-[125px] sm:max-w-none w-auto object-contain"
          />
        </button>

        {/* Nav — visible on desktop */}
        {!isAuthPath && (
          <nav className="hidden lg:flex items-center gap-5 ml-6">
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

        {/* Delivery badge — visible from medium screens up */}
        {!isAuthPath && (
          <div className="hidden md:flex items-center gap-1.5 text-white/60 text-xs font-semibold">
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

        {/*
          User button + dropdown: só no desktop (lg+). Abaixo de lg o menu hambúrguer
          concentra as ações do usuário (Meus pedidos, Sair, Entrar). Nas telas de
          login/cadastro não há hambúrguer, então o botão continua visível.
        */}
        {!mobileMenuOpen && (
          <div ref={userMenuRef} className={`relative flex-shrink-0 ${isAuthPath ? "" : "hidden lg:block"}`}>
            <button
              ref={userButtonRef}
              onClick={() => {
                setCartOpen(false);
                setUserMenuOpen((v) => !v);
              }}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${isAuthPath || isAuthenticated
                  ? "border-primary/60 text-primary bg-primary/10"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-[rgba(255,255,255,0.1)]"
                } ${userMenuOpen ? "ring-2 ring-white/30" : ""}`}
              title={isAuthenticated ? `Logado como ${user?.name || user?.email}` : "Entrar ou Cadastrar"}
              aria-label="Menu do usuário"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <User className="w-4 h-4" />
            </button>

            {userMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-xl bg-[#13132a] border border-white/10 shadow-2xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150"
              >
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name || "Minha Conta"}</p>
                      <p className="text-[10px] text-white/50 truncate">{user?.email}</p>
                    </div>
                    <button
                      role="menuitem"
                      onClick={(e) => handleNavClick(e, "/meus-pedidos")}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-primary" />
                      MEUS PEDIDOS
                    </button>
                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-t border-white/10"
                    >
                      <LogOut className="w-4 h-4 text-primary" />
                      SAIR
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      role="menuitem"
                      onClick={(e) => handleNavClick(e, "/login")}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-primary" />
                      ENTRAR
                    </button>
                    <button
                      role="menuitem"
                      onClick={(e) => handleNavClick(e, "/cadastro")}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-xs font-bold tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-t border-white/10"
                    >
                      <UserPlus className="w-4 h-4 text-primary" />
                      CADASTRAR
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cart button + dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => {
              setUserMenuOpen(false);
              setCartOpen((v) => !v);
            }}
            className={`relative flex items-center gap-2 bg-primary hover:bg-orange-400 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${cartBounce ? "scale-110" : ""
              } ${cartOpen ? "ring-2 ring-white/30" : ""}`}
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">CARRINHO</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-accent text-foreground rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-xs font-black shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {cartOpen && (
            <CartDropdown
              onClose={closeCart}
              onCheckout={handleCheckout}
              isSubmitting={isSubmittingOrder}
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onLogout={handleLogout}
      />
    </header>
  );
}
