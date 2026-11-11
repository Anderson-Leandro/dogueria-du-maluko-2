import { StoreSettings } from "../types/settings";
import { apiFetch } from "./api";

/** Usado enquanto /settings não respondeu (mesmos padrões do backend) */
export const DEFAULT_SETTINGS: StoreSettings = { deliveryFee: 7, freeDeliveryMin: 60 };

let cached: Promise<StoreSettings> | null = null;

export const settingsService = {
  /** Busca uma vez por carregamento da página; em caso de erro, permite nova tentativa */
  getSettings(): Promise<StoreSettings> {
    if (!cached) {
      cached = apiFetch<StoreSettings>("/settings").catch((err) => {
        cached = null;
        throw err;
      });
    }
    return cached;
  },
};
