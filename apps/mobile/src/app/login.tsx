import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { FormErrors, toFormErrors, useAuth, validateLoginForm } from "@dogueria/core";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { useToast } from "@/components/Toast";
import { leaveAuthFlow, safeRedirect } from "@/lib/navigation";
import { colors, fonts, spacing } from "@/theme";

export default function LoginScreen() {
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const params = useLocalSearchParams<{ redirect?: string }>();
  const redirect = safeRedirect(params.redirect);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Já logado (ex.: link direto): não faz sentido mostrar o login
  if (isAuthenticated && !submitting) return <Redirect href="/" />;

  const handleSubmit = async () => {
    const validation = validateLoginForm({ email, password });
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const res = await login({ email: email.trim(), password });
    // Em caso de sucesso "submitting" continua true até a tela fechar,
    // para o guard "já logado" abaixo não redirecionar para o Início no meio da navegação
    if (!res.success) setSubmitting(false);
    if (res.success) {
      toast.show({ type: "success", title: "Login realizado. Bom apetite! 🌭" });
      leaveAuthFlow(redirect);
    } else {
      setErrors(toFormErrors(res.fields, ["email", "password"], "email", res.error || "Credenciais inválidas."));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>ENTRAR</Text>
        <Text style={styles.subtitle}>Acesse sua conta para pedir seus dogues favoritos</Text>

        <View style={styles.form}>
          <Field
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            icon={<Mail size={18} color="rgba(255,255,255,0.4)" />}
          />
          <Field
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry={!showPassword}
            autoComplete="password"
            icon={<Lock size={18} color="rgba(255,255,255,0.4)" />}
            onSubmitEditing={handleSubmit}
            rightSlot={
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                accessibilityRole="button"
                accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
                hitSlop={8}
              >
                {showPassword ? <EyeOff size={18} color="rgba(255,255,255,0.5)" /> : <Eye size={18} color="rgba(255,255,255,0.5)" />}
              </Pressable>
            }
          />
          <Button label="ENTRAR" size="lg" loading={submitting} onPress={handleSubmit} testID="entrar" />
        </View>

        <Text style={styles.footer}>
          Ainda não tem conta?{" "}
          <Text
            style={styles.link}
            accessibilityRole="link"
            onPress={() => router.push({ pathname: "/cadastro", params: redirect ? { redirect } : {} })}
          >
            Cadastre-se
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.xl, gap: spacing.md, flexGrow: 1, justifyContent: "center" },
  title: { color: colors.accent, fontFamily: fonts.display, fontSize: 40, letterSpacing: 2, textAlign: "center" },
  subtitle: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 14, textAlign: "center" },
  form: { gap: spacing.lg, marginTop: spacing.xl },
  footer: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 14, textAlign: "center", marginTop: spacing.xl },
  link: { color: colors.accent, fontFamily: fonts.extrabold },
});
