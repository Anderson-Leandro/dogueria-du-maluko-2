import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { User, LoginCredentials, RegisterData, AuthContextType } from "../types";
import { authService } from "../services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar login." };
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authService.register(data);
    if (res.success && res.user) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, error: res.error || "Erro ao realizar cadastro." };
  }, []);

  const logout = useCallback(() => {
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
