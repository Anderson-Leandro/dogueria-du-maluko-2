import { createRoot } from "react-dom/client";
import { configureCore, type KeyValueStorage } from "@dogueria/core";
import App from "./App.tsx";
import "./styles/index.css";

// Chave da versão mockada antiga: removida para não deixar sessão falsa
try {
  localStorage.removeItem("maluko_auth_user");
} catch {
  // storage indisponível
}

/** localStorage protegido: em modo privado/bloqueado o acesso pode lançar exceção */
const browserStorage: KeyValueStorage = {
  getItem: (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // cota cheia ou storage bloqueado
    }
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // storage bloqueado
    }
  },
};

/**
 * Configura o código compartilhado (packages/core) para o navegador:
 * - API em "/api" (mesma origem; o proxy do Vite repassa ao backend). VITE_API_URL sobrescreve.
 * - localStorage (síncrono): sessão e carrinho disponíveis já no primeiro render.
 */
configureCore({
  apiBaseUrl: import.meta.env.VITE_API_URL || "/api",
  storage: browserStorage,
});

createRoot(document.getElementById("root")!).render(<App />);
