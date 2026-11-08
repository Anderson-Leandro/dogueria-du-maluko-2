import { centsToReais } from "../utils/money.js";

/** Formato `StoreSettings` do front (src/types/settings.ts) */
export function settingsView(s: { deliveryFeeCents: number; freeDeliveryMinCents: number }) {
  return {
    deliveryFee: centsToReais(s.deliveryFeeCents),
    freeDeliveryMin: centsToReais(s.freeDeliveryMinCents),
  };
}
