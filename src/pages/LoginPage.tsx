import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Field } from "../components/auth/Field";
import { useAuth } from "../hooks/useAuth";
import { validateLoginForm, FormErrors } from "../utils/validators";

interface LoginPageProps {
  onNavigate?: (path: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const validationErrors = validateLoginForm({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        setSuccess(true);
      } else {
        setErrors({ email: res.error || "Credenciais inválidas." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoStore = () => {
    if (onNavigate) {
      onNavigate("/");
    }
  };

  const handleGoRegister = () => {
    if (onNavigate) {
      onNavigate("/cadastro");
    }
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 py-8 text-center animate-in zoom-in-95 duration-200">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <h2 className="font-display text-3xl text-accent tracking-widest">
            BEM-VINDO DE VOLTA!
          </h2>
          <p className="text-white/60 text-sm">Login realizado com sucesso.</p>
          <button
            onClick={handleGoStore}
            className="mt-4 bg-primary hover:bg-orange-400 text-white font-display text-xl tracking-widest px-10 py-3 rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          >
            IR À LOJA
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="mb-8 text-center">
        <h2 className="font-display text-4xl text-accent tracking-widest leading-none">
          ENTRAR
        </h2>
        <p className="text-white/50 text-sm mt-2">
          Acesse sua conta para pedir seus dogues favoritos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field
          label="E-mail"
          icon={<Mail className="w-4 h-4" />}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <Field
          label="Senha"
          icon={<Lock className="w-4 h-4" />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          error={errors.password}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <div className="flex justify-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Instruções de recuperação de senha enviadas para seu e-mail!");
            }}
            className="text-primary hover:text-orange-400 text-xs font-bold transition-colors cursor-pointer"
          >
            Esqueci minha senha
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-orange-400 disabled:opacity-50 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-2 cursor-pointer"
        >
          {isSubmitting ? "ENTRANDO..." : "ENTRAR"}
        </button>
      </form>

      <p className="text-center text-white/40 text-sm mt-6">
        Ainda não tem conta?{" "}
        <button
          onClick={handleGoRegister}
          className="text-accent font-bold hover:underline cursor-pointer"
        >
          Cadastre-se
        </button>
      </p>
    </AuthLayout>
  );
}
