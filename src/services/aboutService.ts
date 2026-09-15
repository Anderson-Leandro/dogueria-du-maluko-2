import { AboutData } from "../types/about";
import { mockAboutData } from "../data/about.data";
import { simulateNetworkDelay } from "./api";

export const aboutService = {
  /**
   * Obtém os dados da página Sobre Nós (estatísticas, timeline, time, valores)
   */
  async getAboutData(): Promise<AboutData> {
    await simulateNetworkDelay(200);
    return { ...mockAboutData };
  },
};
