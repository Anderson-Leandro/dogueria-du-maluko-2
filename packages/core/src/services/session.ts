import { User } from "../types/user";
import { getCoreConfig, isPromise, safeStorageWrite } from "../config";

export const AUTH_STORAGE_KEY = "maluko_auth";

export interface StoredSession {
  token: string;
  user: User;
}

function parse(raw: string | null): StoredSession | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<StoredSession>;
    return typeof value?.token === "string" && value.user ? (value as StoredSession) : null;
  } catch {
    return null;
  }
}

/*
 * Dois modos, conforme o storage da plataforma:
 * - Síncrono (web/localStorage): SEM cache — toda leitura vai ao storage, então
 *   login/logout feitos em outra aba valem imediatamente nesta.
 * - Assíncrono (mobile): a sessão é lida uma vez (loadSession) e mantida em memória.
 *   `undefined` = ainda não carregada; `null` = sem sessão.
 */
let asyncStorage: boolean | undefined;
let cache: StoredSession | null | undefined;
let loading: Promise<StoredSession | null> | null = null;

function startAsyncLoad(pending: Promise<string | null>): Promise<StoredSession | null> {
  loading = pending
    .then((raw) => parse(raw))
    .catch(() => null)
    .then((session) => {
      // Um login/logout feito enquanto a leitura acontecia tem prioridade
      if (cache === undefined) cache = session;
      return cache ?? null;
    });
  return loading;
}

/**
 * Lê a sessão sem esperar. Com storage síncrono retorna o valor atual do storage;
 * com storage assíncrono retorna o que já está em memória ou `undefined` se ainda não carregou.
 */
export function peekSession(): StoredSession | null | undefined {
  if (asyncStorage) return cache;
  let raw: string | null | Promise<string | null>;
  try {
    raw = getCoreConfig().storage.getItem(AUTH_STORAGE_KEY);
  } catch {
    return null;
  }
  if (isPromise(raw)) {
    // Primeira leitura revelou storage assíncrono: aproveita a própria leitura como carga
    asyncStorage = true;
    if (!loading) startAsyncLoad(raw);
    return cache;
  }
  asyncStorage = false;
  return parse(raw);
}

/** Garante a sessão carregada (necessário no mobile, onde a leitura é assíncrona) */
export async function loadSession(): Promise<StoredSession | null> {
  const peeked = peekSession();
  if (peeked !== undefined) return peeked;
  return loading ?? startAsyncLoad(Promise.resolve(getCoreConfig().storage.getItem(AUTH_STORAGE_KEY)));
}

/** Token atual sem esperar (null se não houver ou se ainda não carregou) */
export function getSessionToken(): string | null {
  return peekSession()?.token ?? null;
}

export function saveSession(session: StoredSession): void {
  if (asyncStorage !== false) cache = session;
  safeStorageWrite(() => getCoreConfig().storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session)));
}

export function clearSession(): void {
  if (asyncStorage !== false) cache = null;
  safeStorageWrite(() => getCoreConfig().storage.removeItem(AUTH_STORAGE_KEY));
}
