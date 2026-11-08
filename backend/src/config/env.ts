import "dotenv/config";
import { z } from "zod";

/**
 * Lê e valida as variáveis de ambiente na inicialização.
 * Falha cedo (fail secure) se algo obrigatório estiver ausente ou inválido.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32, "JWT_SECRET deve ter ao menos 32 caracteres"),
  // Formato aceito pelo jsonwebtoken: número (segundos) ou número + unidade (ex.: 15m, 12h, 7d)
  JWT_EXPIRES_IN: z
    .string()
    .regex(/^\d+(ms|s|m|h|d|w|y)?$/, "JWT_EXPIRES_IN inválido (ex.: 3600, 15m, 12h, 7d)")
    .default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DELIVERY_FEE_CENTS: z.coerce.number().int().nonnegative().default(700),
  FREE_DELIVERY_MIN_CENTS: z.coerce.number().int().nonnegative().default(6000),
});

// Valor publicado no .env.example: nunca pode ser usado de verdade
const PLACEHOLDER_SECRET = "troque-este-segredo-por-um-valor-longo-e-aleatorio";

const parsed = envSchema
  .refine((e) => e.JWT_SECRET !== PLACEHOLDER_SECRET, {
    message: "JWT_SECRET ainda é o valor de exemplo; gere um segredo próprio",
    path: ["JWT_SECRET"],
  })
  .safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean),
};
