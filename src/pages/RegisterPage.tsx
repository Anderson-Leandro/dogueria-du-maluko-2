import React, { useState } from "react";
import { User as UserIcon, Mail, Lock, Eye, EyeOff, MapPin, Home, Hash, CheckCircle } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Field } from "../components/auth/Field";
import { useAuth } from "../hooks/useAuth";
import { formatCep } from "../utils/masks";
import { validateRegisterForm, FormErrors } from "../utils/validators";
import { RegisterData } from "../types/user";

interface RegisterPageProps {
  onNavigate?: (path: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const setField = (key: keyof RegisterData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCepChange = (value: string) => {
    setField("zipCode")(formatCep(value));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await register(form);
      if (res.success) {
        setSuccess(true);
      } else {
        setErrors({ email: res.error || "Erro ao realizar cadastro." });
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

  const handleGoLogin = () => {
    if (onNavigate) {
      onNavigate("/login");
    }
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 py-8 text-center animate-in zoom-in-95 duration-200">
          <CheckCircle className="w-16 h-16 text-green-400" />
          <h2 className="font-display text-3xl text-accent tracking-widest">
            CADASTRO REALIZADO!
          </h2>
          <p className="text-white/60 text-sm">
            Bem-vindo(a), {form.name.split(" ")[0]}! Sua conta foi criada com sucesso.
          </p>
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
    <AuthLayout wide>
      <div className="mb-6 text-center">
        <h2 className="font-display text-4xl text-accent tracking-widest leading-none">
          CADASTRO
        </h2>
        <p className="text-white/50 text-sm mt-2">
          Crie sua conta e peça seus dogues favoritos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Dados Pessoais */}
        <div>
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
            DADOS PESSOAIS
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          </p>
          <div className="flex flex-col gap-3">
            <Field
              label="Nome completo"
              icon={<UserIcon className="w-4 h-4" />}
              placeholder="João da Silva"
              value={form.name}
              onChange={setField("name")}
              error={errors.name}
            />
            <Field
              label="E-mail"
              icon={<Mail className="w-4 h-4" />}
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={setField("email")}
              error={errors.email}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              <Field
                label="Senha"
                icon={<Lock className="w-4 h-4" />}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={setField("password")}
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
              <Field
                label="Confirmar senha"
                icon={<Lock className="w-4 h-4" />}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={setField("confirmPassword")}
                error={errors.confirmPassword}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer flex-shrink-0"
                    aria-label={showConfirm ? "Ocultar confirmação" : "Ver confirmação"}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <p className="text-white/30 text-[10px] font-black tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
            ENDEREÇO DE ENTREGA
            <span className="flex-1 h-px bg-[rgba(255,255,255,0.1)]" />
          </p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field
                label="CEP"
                icon={<MapPin className="w-4 h-4" />}
                placeholder="00000-000"
                value={form.zipCode}
                onChange={handleCepChange}
                error={errors.zipCode}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Rua / Avenida"
                  icon={<Home className="w-4 h-4" />}
                  placeholder="Rua das Palmeiras"
                  value={form.street}
                  onChange={setField("street")}
                  error={errors.street}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                label="Número"
                icon={<Hash className="w-4 h-4" />}
                placeholder="123"
                value={form.number}
                onChange={setField("number")}
                error={errors.number}
              />
              <Field
                label="Complemento"
                icon={<Home className="w-4 h-4" />}
                placeholder="Apto 4B, Bloco C (opcional)"
                value={form.complement || ""}
                onChange={setField("complement")}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-orange-400 disabled:opacity-50 text-white font-display text-2xl tracking-widest py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-1 cursor-pointer"
        >
          {isSubmitting ? "CRIANDO CONTA..." : "CRIAR CONTA"}
        </button>
      </form>

      <p className="text-center text-white/40 text-sm mt-5">
        Já tem uma conta?{" "}
        <button
          onClick={handleGoLogin}
          className="text-accent font-bold hover:underline cursor-pointer"
        >
          Entrar
        </button>
      </p>
    </AuthLayout>
  );
}
