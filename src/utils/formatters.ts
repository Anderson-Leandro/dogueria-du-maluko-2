/**
 * Formata um valor numérico para o padrão de moeda brasileiro (R$ XX,XX)
 */
export function formatPrice(value: number): string {
  return `R$${value.toFixed(2).replace(".", ",")}`;
}

/** Data e hora no padrão brasileiro (ex.: 08/11/2026 às 15:20) */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const day = date.toLocaleDateString("pt-BR");
  const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${day} às ${time}`;
}

/** CEP no formato XXXXX-XXX */
export function formatZipCode(zip: string): string {
  const digits = zip.replace(/\D/g, "");
  return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : zip;
}
