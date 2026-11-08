import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, fonts, radius } from "@/theme";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "outline" | "dark";
  size?: "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

/** Botão no estilo do web: arredondado, fonte display, laranja da marca */
export function Button({ label, onPress, variant = "primary", size = "md", loading, disabled, icon, style, testID }: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        size === "lg" && styles.lg,
        variant === "primary" && { backgroundColor: pressed ? colors.primaryPressed : colors.primary },
        variant === "outline" && [styles.outline, pressed && { backgroundColor: "rgba(255,107,0,0.08)" }],
        variant === "dark" && { backgroundColor: pressed ? colors.panel : colors.dark },
        isDisabled && styles.disabled,
        pressed && { transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={variant === "outline" ? colors.primary : colors.white} /> : icon}
      <Text style={[styles.label, size === "lg" && styles.labelLg, variant === "outline" && { color: colors.primary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: radius.full,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  lg: { paddingVertical: 14 },
  outline: { borderWidth: 2, borderColor: colors.primary, backgroundColor: "transparent" },
  disabled: { opacity: 0.45 },
  label: { color: colors.white, fontFamily: fonts.display, fontSize: 18, letterSpacing: 1.5 },
  labelLg: { fontSize: 22 },
});
