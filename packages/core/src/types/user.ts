export interface User {
  id: string;
  name: string;
  email: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
  /** Erros por campo devolvidos pela API (mesmas chaves do formulário) */
  fields?: Record<string, string>;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  /** false enquanto a sessão salva ainda está sendo lida (storage assíncrono no mobile) */
  isReady: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthActionResult>;
  register: (data: RegisterData) => Promise<AuthActionResult>;
  logout: () => void;
}
