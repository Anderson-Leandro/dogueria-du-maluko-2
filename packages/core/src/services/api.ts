/**
 * Cliente HTTP base para a API da Dogueria Du Maluko (backend/).
 * A URL base e o storage vêm de configureCore() (cada plataforma define os seus).
 */
import { getCoreConfig } from "../config";
import { AUTH_STORAGE_KEY, getSessionToken } from "./session";

/** URL base configurada para a API */
export function getApiBaseUrl(): string {
  return getCoreConfig().apiBaseUrl;
}

/** Erro padronizado da API: corpo `{ error, fields? }` */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Token JWT da sessão atual (se houver) */
export function getStoredToken(): string | null {
  return getSessionToken();
}

export { AUTH_STORAGE_KEY };

/** Erro de cancelamento (AbortController); DOMException não existe no React Native */
function isAbortError(err: unknown): boolean {
  return (err as { name?: string } | null)?.name === "AbortError";
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/**
 * Registra quem trata sessão expirada (o AuthProvider). Chamado quando uma
 * requisição autenticada recebe 401 com o token que ainda é o atual.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Envia o header Authorization com o token salvo */
  auth?: boolean;
  signal?: AbortSignal;
}

export async function apiFetch<T>(path: string, { method = "GET", body, auth = false, signal }: ApiFetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const sentToken = auth ? getStoredToken() : null;
  if (sentToken) headers.Authorization = `Bearer ${sentToken}`;

  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (isAbortError(err)) throw err;
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique sua conexão.");
  }

  const data = await response.json().catch(() => undefined);

  if (response.ok && data === undefined && response.status !== 204) {
    // Ex.: URL da API errada e o servidor devolveu HTML com status 200
    throw new ApiError(response.status, "Resposta inválida do servidor. Verifique a URL da API.");
  }

  // Só derruba a sessão se o token rejeitado ainda for o atual
  // (evita que uma resposta antiga encerre um login feito depois)
  if (response.status === 401 && sentToken && sentToken === getStoredToken()) {
    unauthorizedHandler?.();
  }

  if (!response.ok) {
    const message = typeof data?.error === "string" ? data.error : "Erro inesperado. Tente novamente.";
    throw new ApiError(response.status, message, data?.fields);
  }

  return data as T;
}

/** Mensagem amigável a partir de qualquer erro */
export function getErrorMessage(err: unknown, fallback = "Erro inesperado. Tente novamente."): string {
  if (err instanceof ApiError || err instanceof Error) return err.message || fallback;
  return fallback;
}
