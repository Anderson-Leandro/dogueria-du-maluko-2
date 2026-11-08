import { z } from "zod";

/**
 * Espelha as regras de src/utils/validators.ts do front,
 * com as mesmas chaves de campo (FormErrors) e mensagens.
 */
const email = z
  .string({ required_error: "Informe um e-mail válido." })
  .trim()
  .toLowerCase()
  .email("Informe um e-mail válido.")
  .max(254, "Informe um e-mail válido.");

// bcrypt considera apenas os primeiros 72 bytes (UTF-8), não caracteres
const password = z
  .string({ required_error: "A senha deve ter ao menos 6 caracteres." })
  .min(6, "A senha deve ter ao menos 6 caracteres.")
  .refine((v) => Buffer.byteLength(v, "utf8") <= 72, "A senha é longa demais.");

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Informe seu nome completo." })
      .trim()
      .max(120, "Nome muito longo.")
      .refine((v) => v.split(/\s+/).filter(Boolean).length >= 2, "Informe seu nome completo."),
    email,
    password,
    confirmPassword: z.string({ required_error: "As senhas não coincidem." }),
    zipCode: z
      .string({ required_error: "CEP inválido (8 dígitos)." })
      .transform((v) => v.replace(/\D/g, ""))
      .refine((v) => v.length === 8, "CEP inválido (8 dígitos)."),
    street: z.string({ required_error: "Informe a rua." }).trim().min(1, "Informe a rua.").max(160),
    number: z.string({ required_error: "Informe o número." }).trim().min(1, "Informe o número.").max(20),
    complement: z
      .string()
      .trim()
      .max(80)
      .optional()
      .transform((v) => v || undefined),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })
  .transform(({ confirmPassword: _discard, ...data }) => data);

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email,
  password: z.string({ required_error: "Informe a senha." }).min(1, "Informe a senha.").max(72),
});
