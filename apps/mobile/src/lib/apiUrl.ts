import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Descobre a URL da API do backend (porta 3333):
 * 1. `extra.apiUrl` do app.config.js (EXPO_PUBLIC_API_URL ou URL do Codespaces) — obrigatório em builds de produção
 * 2. No navegador (Expo web): mesmo host da página, porta 3333
 * 3. No celular/emulador em desenvolvimento: IP da máquina que roda o `expo start` (hostUri), porta 3333.
 *    Com `--tunnel` o hostUri é um domínio do túnel (*.exp.direct), que não expõe a porta 3333:
 *    nesse caso defina EXPO_PUBLIC_API_URL (no Codespaces isso já é automático).
 * 4. Último recurso: emulador Android (10.0.2.2) ou localhost
 */
export function resolveApiUrl(): string {
  const configured = Constants.expoConfig?.extra?.apiUrl;
  if (typeof configured === "string" && configured.length > 0) return configured;

  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:3333/api`;
  }

  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host && !host.endsWith(".exp.direct")) return `http://${host}:3333/api`;

  if (!__DEV__) {
    console.warn("EXPO_PUBLIC_API_URL não definida: defina a URL da API para builds de produção.");
  }
  return Platform.OS === "android" ? "http://10.0.2.2:3333/api" : "http://localhost:3333/api";
}
