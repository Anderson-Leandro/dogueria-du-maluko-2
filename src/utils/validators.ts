import { cleanDigits } from "./masks";
import { LoginCredentials, RegisterData } from "../types/user";

export type FormErrors = Record<string, string>;

/**
 * Validação do formulário de Login
 */
export function validateLoginForm(credentials: LoginCredentials): FormErrors {
  const errors: FormErrors = {};

  if (!credentials.email || !credentials.email.includes("@")) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!credentials.password || credentials.password.length < 6) {
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  }

  return errors;
}

/**
 * Validação do formulário de Cadastro
 */
export function validateRegisterForm(data: RegisterData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name || data.name.trim().split(" ").length < 2) {
    errors.name = "Informe seu nome completo.";
  }

  if (!data.email || !data.email.includes("@")) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!data.password || data.password.length < 6) {
    errors.password = "A senha deve ter ao menos 6 caracteres.";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem.";
  }

  const zipCodeDigits = cleanDigits(data.zipCode || "");
  if (zipCodeDigits.length !== 8) {
    errors.zipCode = "CEP inválido (8 dígitos).";
  }

  if (!data.street || !data.street.trim()) {
    errors.street = "Informe a rua.";
  }

  if (!data.number || !data.number.trim()) {
    errors.number = "Informe o número.";
  }

  return errors;
}
