import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

/**
 * Protege rotas que exigem usuário autenticado.
 * Sem sessão, redireciona para /login guardando a rota de origem em `state.from`,
 * que o GuestRoute usa para devolver o usuário após o login.
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search + location.hash }} />;
  }

  return <>{children}</>;
}
