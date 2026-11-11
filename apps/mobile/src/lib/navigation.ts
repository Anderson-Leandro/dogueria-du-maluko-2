import { router } from "expo-router";

/** Aceita só rotas internas como destino pós-login (evita redirecionamento arbitrário) */
export function safeRedirect(value: unknown): string | null {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : null;
}

/**
 * Depois de entrar/cadastrar: volta ao destino pedido (ex.: /carrinho, /meus-pedidos)
 * ou, sem destino, fecha as telas de autenticação e volta para as abas.
 */
export function leaveAuthFlow(redirect: string | null) {
  if (redirect) {
    router.dismissTo(redirect as never);
  } else if (router.canDismiss()) {
    router.dismissAll();
  } else {
    router.replace("/");
  }
}
