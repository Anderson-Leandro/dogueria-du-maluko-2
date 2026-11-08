/** Converte centavos (Int no banco) para reais (number usado pelo front) */
export function centsToReais(cents: number): number {
  return Math.round(cents) / 100;
}
