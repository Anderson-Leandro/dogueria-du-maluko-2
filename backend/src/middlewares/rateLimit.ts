import rateLimit from "express-rate-limit";

/** Limita tentativas de login/cadastro por IP (anti força bruta) */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Muitas tentativas. Tente novamente em alguns minutos." },
});
