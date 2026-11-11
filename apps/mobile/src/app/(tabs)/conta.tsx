import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { ChevronRight, Info, LogIn, LogOut, Package, User, UserPlus } from "lucide-react-native";
import { useAuth } from "@dogueria/core";
import { useToast } from "@/components/Toast";
import { API_URL } from "@/lib/setup";
import { colors, fonts, radius, spacing } from "@/theme";

function MenuItem({ icon, label, onPress, testID }: { icon: React.ReactNode; label: string; onPress: () => void; testID?: string }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      testID={testID}
      style={({ pressed }) => [styles.item, pressed && { backgroundColor: "rgba(0,0,0,0.04)" }]}
    >
      <View style={styles.itemLeft}>
        {icon}
        <Text style={styles.itemLabel}>{label}</Text>
      </View>
      <ChevronRight size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

/** Conta: perfil, Meus pedidos, Sobre e Sair — ou Entrar/Cadastrar para visitantes */
export default function AccountScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.show({ type: "success", title: "Você saiu da sua conta." });
    router.navigate("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <User size={26} color={colors.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name} numberOfLines={1}>
            {isAuthenticated ? user?.name || "Minha Conta" : "Olá, visitante!"}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {isAuthenticated ? user?.email : "Entre para fazer pedidos e ver seu histórico"}
          </Text>
        </View>
      </View>

      <View style={styles.group}>
        {isAuthenticated ? (
          <>
            <MenuItem icon={<Package size={20} color={colors.primary} />} label="Meus pedidos" onPress={() => router.push("/meus-pedidos")} />
            <MenuItem icon={<Info size={20} color={colors.primary} />} label="Sobre a Dogueria" onPress={() => router.push("/sobre")} />
            <MenuItem icon={<LogOut size={20} color={colors.primary} />} label="Sair da conta" onPress={handleLogout} testID="sair" />
          </>
        ) : (
          <>
            <MenuItem icon={<LogIn size={20} color={colors.primary} />} label="Entrar" onPress={() => router.push("/login")} />
            <MenuItem icon={<UserPlus size={20} color={colors.primary} />} label="Criar conta" onPress={() => router.push("/cadastro")} />
            <MenuItem icon={<Info size={20} color={colors.primary} />} label="Sobre a Dogueria" onPress={() => router.push("/sobre")} />
          </>
        )}
      </View>

      {/* Diagnóstico de conexão: só em desenvolvimento */}
      {__DEV__ ? <Text style={styles.apiInfo}>API: {API_URL}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg },
  profile: { flexDirection: "row", alignItems: "center", gap: spacing.lg, backgroundColor: colors.dark, borderRadius: radius.lg, padding: spacing.lg },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,107,0,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,107,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: colors.white, fontFamily: fonts.display, fontSize: 22, letterSpacing: 1 },
  email: { color: colors.whiteMuted, fontFamily: fonts.regular, fontSize: 13 },
  group: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  itemLabel: { color: colors.foreground, fontFamily: fonts.bold, fontSize: 15 },
  apiInfo: { color: colors.mutedForeground, fontFamily: fonts.regular, fontSize: 11, textAlign: "center" },
});
