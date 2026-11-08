import { User } from "../types/user";
import { getCoreConfig, isPromise, safeStorageWrite } from "../config";

export const AUTH_STORAGE_KEY = "maluko_auth";

export interface StoredSession {
  token: string;
  user: User;
}

/**
 * Sessão em memória, espelhada no storage da plataforma.
 * `undefined` = ainda não carregada; `null` = sem sessão.
 */
let cache: StoredSession | null | undefined;

function parse(raw: string | null): StoredSession | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredSession>;
    return typeof value?.token === "string" && value.user ? (value as StoredSession) : null;
  } catch {
    return null;
  }
}

/**
 * Lê a sessão sem esperar: com storage síncrono (web) retorna o valor na hora;
 * com storage assíncrono ainda não carregado retorna `undefined`.
 */
export function peekSession(): StoredSession | null | undefined {
  if (cache !== undefined) return cache;
  try {
    const raw = getCoreConfig().storage.getItem(AUTH_STORAGE_KEY);
    if (isPromise(raw)) return undefined;
    cache = parse(raw);
  } catch {
    cache = null;
  }
  return cache;
}

/** Carrega a sessão do storage (necessário no mobile, onde a leitura é assíncrona) */
export async function loadSession(): Promise<StoredSession | null> {
  const peeked = peekSession();
  if (peeked !== undefined) return peeked;
  try {
    const raw = await getCoreConfig().storage.getItem(AUTH_STORAGE_KEY);
    // Um login feito enquanto a leitura acontecia tem prioridade
    if (cache === undefined) cache = parse(raw);
  } catch {
    if (cache === undefined) cache = null;
  }
  return cache ?? null;
}

export function getSessionToken(): string | null {
  return peekSession()?.token ?? null;
}

export function saveSession(session: StoredSession): void {
  cache = session;
  safeStorageWrite(() => getCoreConfig().storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session)));
}

export function clearSession(): void {
  cache = null;
  safeStorageWrite(() => getCoreConfig().storage.removeItem(AUTH_STORAGE_KEY));
}
