import { AboutData } from "../types/about";
import { apiFetch } from "./api";

export const aboutService = {
  /** Dados da página Sobre Nós (estatísticas, timeline, time, valores) */
  getAboutData(signal?: AbortSignal): Promise<AboutData> {
    return apiFetch<AboutData>("/about", { signal });
  },
};
