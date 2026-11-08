import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { User, LoginCredentials, RegisterData, AuthContextType } from "../types";
import { toast } from "sonner";
import { ApiError, setUnauthorizedHandler } from "../services/api";
import { authService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  // Incrementado a cada login/cadastro/logout: respostas antigas de /auth/me são descartadas
  const sessionVersion = useRef(0);

  // Revalida a sessão salva no servidor; token expirado/inválido encerra a sessão
  useEffect(() => {
    if (!authService.getCurrentUser()) return;
    let cancelled = false;
    const version = sessionVersion.current;
    const isStale = () => cancelled || version !== sessionVersion.current;
    authService
      .me()
      .then((fresh) => {
        if (!isStale()) setUser(fresh);
      })
      .catch((err) => {
        // Falha de rede mantém a sessão local; só 401 derruba
        if (!isStale() && err instanceof ApiError && err.status === 401) {
          authService.logout();
          setUser(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sessão expirada em qualquer chamada autenticada: encerra e avisa uma única vez
  useEffect(() => {
    setUnauthorizedHandler(() => {
      sessionVersion.current += 1;
      authService.logout();
      setUser(null);
      toast.error("Sua sessão expirou. Entre novamente.", { id: "session-expired" });
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    if (res.success && res.user) {
      sessionVersion.current += 1;
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar login.", fields: res.fields };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authService.register(data);
    if (res.success && res.user) {
      sessionVersion.current += 1;
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar cadastro.", fields: res.fields };
  }, []);

  const logout = useCallback(() => {
    sessionVersion.current += 1;
    authService.logout();
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(user);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser utilizado dentro de um <AuthProvider>");
  }
  return context;
}
