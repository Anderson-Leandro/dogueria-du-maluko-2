import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import { FormErrors, toFormErrors, useAuth, validateLoginForm } from "@dogueria/core";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { PasswordToggle } from "@/components/PasswordToggle";
import { useToast } from "@/components/Toast";
import { useSingleFlight } from "@/hooks";
import { leaveAuthFlow, safeRedirect } from "@/lib/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts, spacing } from "@/theme";

export default function LoginScreen() {
  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const params = useLocalSearchParams<{ redirect?: string }>();
  const insets = useSafeAreaInsets();
  const redirect = safeRedirect(params.redirect);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const singleFlight = useSingleFlight();

  // Já logado (ex.: link direto): vai para o destino pedido ou para o Início
  if (isAuthenticated && !submitting) return <Redirect href={(redirect ?? "/") as never} />;

  const handleSubmit = () => singleFlight(submit);

  const submit = async () => {
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
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: spacing.xl + insets.bottom }]} keyboardShouldPersistTaps="handled">
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
            rightSlot={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
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
