import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * Protege rotas destinadas exclusivamente a usuários não autenticados.
 * Se o usuário já possuir sessão ativa, redireciona para a tela inicial.
 */
export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
