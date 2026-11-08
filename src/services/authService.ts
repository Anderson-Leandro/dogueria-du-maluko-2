import { User, LoginCredentials, RegisterData } from "../types/user";
import { apiFetch, ApiError, AUTH_STORAGE_KEY, getErrorMessage } from "./api";

/** Chave usada pela versão mockada: removida uma única vez, ao carregar o módulo */
const LEGACY_STORAGE_KEY = "maluko_auth_user";
try {
  localStorage.removeItem(LEGACY_STORAGE_KEY);
} catch {
  // storage indisponível
}

interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  fields?: Record<string, string>;
}

function saveSession(session: AuthResponse) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

function toAuthResult(err: unknown): AuthResult {
  return {
    success: false,
    error: getErrorMessage(err),
    fields: err instanceof ApiError ? err.fields : undefined,
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const session = await apiFetch<AuthResponse>("/auth/login", { method: "POST", body: credentials });
      saveSession(session);
      return { success: true, user: session.user };
    } catch (err) {
      return toAuthResult(err);
    }
  },

  async register(data: RegisterData): Promise<AuthResult> {
    try {
      const session = await apiFetch<AuthResponse>("/auth/register", { method: "POST", body: data });
      saveSession(session);
      return { success: true, user: session.user };
    } catch (err) {
      return toAuthResult(err);
    }
  },

  /** Usuário salvo localmente (exibição imediata enquanto /auth/me valida o token) */
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      const session = raw ? (JSON.parse(raw) as Partial<AuthResponse>) : null;
      return session?.token && session.user ? session.user : null;
    } catch {
      return null;
    }
  },

  /** Valida o token salvo no servidor e retorna o usuário atualizado */
  async me(): Promise<User> {
    const user = await apiFetch<User>("/auth/me", { auth: true });
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) saveSession({ ...JSON.parse(raw), user });
    } catch {
      // ignora falha de escrita
    }
    return user;
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
