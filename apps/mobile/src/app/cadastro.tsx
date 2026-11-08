import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Eye, EyeOff, Hash, Home, Lock, Mail, MapPin, User } from "lucide-react-native";
import { FormErrors, RegisterData, formatCep, toFormErrors, useAuth, validateRegisterForm } from "@dogueria/core";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useToast } from "@/components/Toast";
import { leaveAuthFlow, safeRedirect } from "@/lib/navigation";
import { colors, fonts, spacing } from "@/theme";

const REGISTER_FIELDS = ["name", "email", "password", "confirmPassword", "zipCode", "street", "number"] as const;
const ICON = "rgba(255,255,255,0.4)";

export default function RegisterScreen() {
  const { register, isAuthenticated } = useAuth();
  const toast = useToast();
  const params = useLocalSearchParams<{ redirect?: string }>();
  const redirect = safeRedirect(params.redirect);

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
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated && !submitting) return <Redirect href="/" />;

  const set = (key: keyof RegisterData) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    const validation = validateRegisterForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const res = await register({ ...form, email: form.email.trim() });
    // Em caso de sucesso "submitting" continua true até a tela fechar,
    // para o guard "já logado" abaixo não redirecionar para o Início no meio da navegação
    if (!res.success) setSubmitting(false);
    if (res.success) {
      toast.show({ type: "success", title: `Bem-vindo(a), ${form.name.trim().split(" ")[0]}! Sua conta foi criada.` });
      leaveAuthFlow(redirect);
    } else {
      setErrors(toFormErrors(res.fields, REGISTER_FIELDS, "email", res.error || "Erro ao realizar cadastro."));
    }
  };

  const passwordToggle = (
    <Pressable
      onPress={() => setShowPassword((v) => !v)}
      accessibilityRole="button"
      accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
      hitSlop={8}
    >
      {showPassword ? <EyeOff size={18} color="rgba(255,255,255,0.5)" /> : <Eye size={18} color="rgba(255,255,255,0.5)" />}
    </Pressable>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>CRIAR CONTA</Text>
        <Text style={styles.subtitle}>Cadastre-se e peça seu dogue em segundos</Text>

        <View style={styles.form}>
          <Field label="Nome completo" placeholder="Seu nome e sobrenome" value={form.name} onChangeText={set("name")} error={errors.name} autoComplete="name" icon={<User size={18} color={ICON} />} />
          <Field label="E-mail" placeholder="seu@email.com" value={form.email} onChangeText={set("email")} error={errors.email} keyboardType="email-address" autoCapitalize="none" autoComplete="email" icon={<Mail size={18} color={ICON} />} />
          <Field label="Senha" placeholder="Mínimo 6 caracteres" value={form.password} onChangeText={set("password")} error={errors.password} secureTextEntry={!showPassword} icon={<Lock size={18} color={ICON} />} rightSlot={passwordToggle} />
          <Field label="Confirmar senha" placeholder="Repita a senha" value={form.confirmPassword} onChangeText={set("confirmPassword")} error={errors.confirmPassword} secureTextEntry={!showPassword} icon={<Lock size={18} color={ICON} />} />

          <Text style={styles.section}>📍 ENDEREÇO DE ENTREGA</Text>
          <Field label="CEP" placeholder="00000-000" value={form.zipCode} onChangeText={(v) => set("zipCode")(formatCep(v))} error={errors.zipCode} keyboardType="number-pad" maxLength={9} icon={<MapPin size={18} color={ICON} />} />
          <Field label="Rua" placeholder="Nome da rua" value={form.street} onChangeText={set("street")} error={errors.street} icon={<Home size={18} color={ICON} />} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Field label="Número" placeholder="123" value={form.number} onChangeText={set("number")} error={errors.number} icon={<Hash size={18} color={ICON} />} />
            </View>
            <View style={{ flex: 1.4 }}>
              <Field label="Complemento" placeholder="Apto, bloco..." value={form.complement ?? ""} onChangeText={set("complement")} maxLength={80} />
            </View>
          </View>

          <Button label="CRIAR CONTA" size="lg" loading={submitting} onPress={handleSubmit} testID="criar-conta" />
        </View>

        <Text style={styles.footer}>
          Já tem conta?{" "}
          <Text
            style={styles.link}
            accessibilityRole="link"
            onPress={() => (router.canGoBack() ? router.back() : router.replace({ pathname: "/login", params: redirect ? { redirect } : {} }))}
          >
            Entrar
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, gap: spacing.md },
  title: { color: colors.accent, fontFamily: fonts.display, fontSize: 36, letterSpacing: 2, textAlign: "center" },
  subtitle: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 14, textAlign: "center" },
  form: { gap: spacing.lg, marginTop: spacing.lg },
  section: { color: colors.accent, fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 2, marginTop: spacing.sm },
  row: { flexDirection: "row", gap: spacing.md },
  footer: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 14, textAlign: "center", marginTop: spacing.lg, marginBottom: spacing.xl },
  link: { color: colors.accent, fontFamily: fonts.extrabold },
});
