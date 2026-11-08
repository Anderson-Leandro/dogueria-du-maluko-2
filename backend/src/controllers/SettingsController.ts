import type { Request, Response } from "express";
import { env } from "../config/env.js";
import { settingsView } from "../views/settingsView.js";

export const SettingsController = {
  /** Regras públicas da loja que o front precisa exibir (ex.: frete) */
  show(_req: Request, res: Response) {
    res.json(
      settingsView({
        deliveryFeeCents: env.DELIVERY_FEE_CENTS,
        freeDeliveryMinCents: env.FREE_DELIVERY_MIN_CENTS,
      })
    );
  },
};
