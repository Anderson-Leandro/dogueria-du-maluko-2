import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface GuestRouteProps {
  children: React.ReactNode;
}

/** Aceita apenas caminhos internos (evita open redirect via state) */
function safeRedirect(from: unknown): string {
  return typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/";
}

/**
 * Protege rotas destinadas exclusivamente a usuários não autenticados.
 * Se o usuário já possuir sessão ativa, redireciona para a rota de origem
 * (quando veio de uma PrivateRoute) ou para a tela inicial.
 */
export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = (location.state as { from?: unknown } | null)?.from;
    return <Navigate to={safeRedirect(from)} replace />;
  }

  return <>{children}</>;
}
