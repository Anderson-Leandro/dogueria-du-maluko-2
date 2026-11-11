import { configureCore } from "@dogueria/core";
import { resolveApiUrl } from "./apiUrl";
import { mobileStorage } from "./storage";

/** URL da API em uso (exibida na tela Conta para facilitar o diagnóstico) */
export const API_URL = resolveApiUrl();

// Executado uma única vez, ao importar este módulo (antes de renderizar o app)
configureCore({ apiBaseUrl: API_URL, storage: mobileStorage });
