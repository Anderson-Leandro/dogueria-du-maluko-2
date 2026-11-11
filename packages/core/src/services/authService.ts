import { User, LoginCredentials, RegisterData } from "../types/user";
import { apiFetch, ApiError, getErrorMessage } from "./api";
import { clearSession, getSessionToken, loadSession, peekSession, saveSession, StoredSession } from "./session";

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  fields?: Record<string, string>;
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
      const session = await apiFetch<StoredSession>("/auth/login", { method: "POST", body: credentials });
      saveSession(session);
      return { success: true, user: session.user };
    } catch (err) {
      return toAuthResult(err);
    }
  },

  async register(data: RegisterData): Promise<AuthResult> {
    try {
      const session = await apiFetch<StoredSession>("/auth/register", { method: "POST", body: data });
      saveSession(session);
      return { success: true, user: session.user };
    } catch (err) {
      return toAuthResult(err);
    }
  },

  /**
   * Usuário salvo localmente, sem esperar (exibição imediata enquanto /auth/me valida o token).
   * `undefined` quando o storage é assíncrono e ainda não foi lido (use restoreSession).
   */
  peekUser(): User | null | undefined {
    const session = peekSession();
    return session === undefined ? undefined : (session?.user ?? null);
  },

  /** Carrega a sessão salva (assíncrono no mobile) */
  async restoreSession(): Promise<User | null> {
    return (await loadSession())?.user ?? null;
  },

  /** Valida o token salvo no servidor e retorna o usuário atualizado */
  async me(): Promise<User> {
    const sentToken = (await loadSession())?.token;
    const user = await apiFetch<User>("/auth/me", { auth: true });
    // Só atualiza se a sessão ainda for a mesma (evita gravar o perfil antigo junto a um novo login)
    const session = peekSession();
    if (session && sentToken && session.token === sentToken && getSessionToken() === sentToken) {
      saveSession({ ...session, user });
    }
    return user;
  },

  logout(): void {
    clearSession();
  },
};
