/**
 * Configuração do core injetada por cada plataforma (web ou mobile).
 * O core não acessa localStorage, import.meta nem APIs nativas diretamente.
 */

export type MaybePromise<T> = T | Promise<T>;

/**
 * Armazenamento chave-valor. Pode ser síncrono (web, localStorage) ou
 * assíncrono (mobile, SecureStore/AsyncStorage).
 */
export interface KeyValueStorage {
  getItem(key: string): MaybePromise<string | null>;
  setItem(key: string, value: string): MaybePromise<void>;
  removeItem(key: string): MaybePromise<void>;
}

export interface CoreConfig {
  /** URL base da API, ex.: "/api" (web com proxy) ou "http://192.168.0.10:3333/api" (mobile) */
  apiBaseUrl: string;
  storage: KeyValueStorage;
}

let config: CoreConfig | null = null;

/** Deve ser chamado uma vez, antes de renderizar o app */
export function configureCore(next: CoreConfig): void {
  config = { ...next, apiBaseUrl: next.apiBaseUrl.replace(/\/+$/, "") };
}

export function getCoreConfig(): CoreConfig {
  if (!config) {
    throw new Error("@dogueria/core: chame configureCore() antes de usar os serviços.");
  }
  return config;
}

export function isPromise<T>(value: MaybePromise<T>): value is Promise<T> {
  return !!value && typeof (value as Promise<T>).then === "function";
}

/** Executa uma escrita no storage ignorando falhas (sync ou async) */
export function safeStorageWrite(write: () => MaybePromise<void>): void {
  try {
    const result = write();
    if (isPromise(result)) result.catch(() => undefined);
  } catch {
    // storage indisponível (ex.: modo privado, cota cheia)
  }
}
