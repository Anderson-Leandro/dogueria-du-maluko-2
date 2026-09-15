import { User, LoginCredentials, RegisterData } from "../types/user";
import { simulateNetworkDelay } from "./api";

const AUTH_STORAGE_KEY = "maluko_auth_user";

export const authService = {
  /**
   * Simula login de usuário com validação de credenciais
   */
  async login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
    await simulateNetworkDelay(300);

    if (!credentials.email || !credentials.password) {
      return { success: false, error: "E-mail e senha são obrigatórios." };
    }

    // Usuário simulado baseado no e-mail informado
    const user: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: credentials.email.split("@")[0].replace(".", " "),
      email: credentials.email,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  /**
   * Simula cadastro de novo usuário
   */
  async register(data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> {
    await simulateNetworkDelay(350);

    if (!data.name || !data.email || !data.password) {
      return { success: false, error: "Preencha todos os campos obrigatórios." };
    }

    const user: User = {
      id: "user_" + Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      zipCode: data.zipCode,
      street: data.street,
      number: data.number,
      complement: data.complement,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  /**
   * Obtém o usuário atualmente autenticado persistido no LocalStorage
   */
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Remove a sessão do usuário
   */
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};
