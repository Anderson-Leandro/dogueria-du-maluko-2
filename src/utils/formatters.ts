/**
 * Formata um valor numérico para o padrão de moeda brasileiro (R$ XX,XX)
 */
export function formatPrice(value: number): string {
  return `R$${value.toFixed(2).replace(".", ",")}`;
}
