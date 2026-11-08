import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { RefreshCw } from "lucide-react-native";
import { Button } from "./Button";
import { colors, fonts, radius, spacing } from "@/theme";

/** Blocos "fantasma" pulsando enquanto o conteúdo carrega */
export function SkeletonList({ count = 3, height = 220 }: { count?: number; height?: number }) {
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.list} accessibilityLabel="Carregando" accessibilityState={{ busy: true }}>
      {Array.from({ length: count }).map((_, i) => (
        <Animated.View key={i} style={[styles.skeleton, { height, opacity }]} />
      ))}
    </View>
  );
}

/** Erro com botão "Tentar novamente" (mesmo comportamento do web) */
export function ErrorState({ message, onRetry, dark }: { message: string; onRetry?: () => void; dark?: boolean }) {
  return (
    <View style={styles.center} accessibilityRole="alert">
      <Text style={styles.emoji}>🌭💥</Text>
      <Text style={[styles.message, dark && { color: colors.whiteMuted }]}>{message}</Text>
      {onRetry ? (
        <Button label="TENTAR NOVAMENTE" onPress={onRetry} icon={<RefreshCw size={16} color={colors.white} />} />
      ) : null}
    </View>
  );
}

export function EmptyState({ icon, title, subtitle, action }: { icon: React.ReactNode; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <View style={styles.center}>
      {icon}
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.message}>{subtitle}</Text> : null}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.lg, padding: spacing.lg },
  skeleton: { backgroundColor: colors.muted, borderRadius: radius.lg },
  center: { alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingVertical: 48, paddingHorizontal: spacing.xl },
  emoji: { fontSize: 44 },
  message: { color: colors.mutedForeground, fontFamily: fonts.semibold, fontSize: 14, textAlign: "center" },
  emptyTitle: { color: colors.foreground, fontFamily: fonts.display, fontSize: 26, letterSpacing: 1.5, textAlign: "center" },
});
