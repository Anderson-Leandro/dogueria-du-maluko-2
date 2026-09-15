import { useAuthContext } from "../context/AuthContext";

/**
 * Hook de acesso ao estado global de autenticação e ações de login/cadastro/logout
 */
export function useAuth() {
  return useAuthContext();
}
