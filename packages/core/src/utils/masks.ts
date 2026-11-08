/**
 * Remove todos os caracteres não numéricos
 */
export function cleanDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Formata uma string para o padrão de CEP (XXXXX-XXX)
 */
export function formatCep(value: string): string {
  const digits = cleanDigits(value).slice(0, 8);
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}
