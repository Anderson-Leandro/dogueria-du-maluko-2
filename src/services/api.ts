/**
 * Cliente base de API e simulador de latência de rede.
 * Quando o backend real estiver pronto, basta descomentar as chamadas fetch
 * ou apontar para a API_BASE_URL.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://api.dogueriadumaluko.com/v1";

/**
 * Simula um delay de rede com Promise para manter a experiência assíncrona real
 */
export async function simulateNetworkDelay(ms: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
