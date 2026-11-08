import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Descobre a URL da API do backend (porta 3333):
 * 1. `extra.apiUrl` do app.config.js (EXPO_PUBLIC_API_URL ou URL do Codespaces)
 * 2. No navegador (Expo web): mesmo host da página, porta 3333
 * 3. No celular/emulador: IP da máquina que roda o `expo start` (hostUri), porta 3333
 * 4. Último recurso: emulador Android (10.0.2.2) ou localhost
 */
export function resolveApiUrl(): string {
  const configured = Constants.expoConfig?.extra?.apiUrl;
  if (typeof configured === "string" && configured.length > 0) return configured;

  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:3333/api`;
  }

  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host) return `http://${host}:3333/api`;

  return Platform.OS === "android" ? "http://10.0.2.2:3333/api" : "http://localhost:3333/api";
}
