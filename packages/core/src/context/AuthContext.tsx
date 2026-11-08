import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { User, LoginCredentials, RegisterData, AuthContextType } from "../types";
import { ApiError, setUnauthorizedHandler } from "../services/api";
import { authService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  /** Chamado quando uma requisição autenticada recebe 401 (ex.: mostrar um aviso) */
  onSessionExpired?: () => void;
}

export function AuthProvider({ children, onSessionExpired }: AuthProviderProps) {
  // Storage síncrono (web): sessão disponível já no primeiro render.
  // Storage assíncrono (mobile): começa como "não pronto" até ler a sessão.
  const [initialUser] = useState(() => authService.peekUser());
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isReady, setIsReady] = useState(initialUser !== undefined);
  // Incrementado a cada login/cadastro/logout: respostas antigas de /auth/me são descartadas
  const sessionVersion = useRef(0);
  const onSessionExpiredRef = useRef(onSessionExpired);
  onSessionExpiredRef.current = onSessionExpired;

  // Carrega (se preciso) e revalida a sessão salva; token expirado/inválido encerra a sessão
  useEffect(() => {
    let cancelled = false;
    const version = sessionVersion.current;
    const isStale = () => cancelled || version !== sessionVersion.current;

    (async () => {
      let current = initialUser;
      if (current === undefined) {
        current = await authService.restoreSession();
        if (isStale()) return;
        setUser(current);
        setIsReady(true);
      }
      if (!current) return;

      try {
        const fresh = await authService.me();
        if (!isStale()) setUser(fresh);
      } catch (err) {
        // Falha de rede mantém a sessão local; só 401 derruba
        if (!isStale() && err instanceof ApiError && err.status === 401) {
          authService.logout();
          setUser(null);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialUser]);

  // Sessão expirada em qualquer chamada autenticada: encerra e avisa uma única vez
  useEffect(() => {
    setUnauthorizedHandler(() => {
      sessionVersion.current += 1;
      authService.logout();
      setUser(null);
      setIsReady(true);
      onSessionExpiredRef.current?.();
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    if (res.success && res.user) {
      sessionVersion.current += 1;
      setUser(res.user);
      setIsReady(true);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar login.", fields: res.fields };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authService.register(data);
    if (res.success && res.user) {
      sessionVersion.current += 1;
      setUser(res.user);
      setIsReady(true);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar cadastro.", fields: res.fields };
  }, []);

  const logout = useCallback(() => {
    sessionVersion.current += 1;
    authService.logout();
    setUser(null);
    setIsReady(true);
  }, []);

  const isAuthenticated = Boolean(user);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      isReady,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isReady, login, register, logout]
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
