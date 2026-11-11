import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, fonts, radius, spacing } from "@/theme";

interface FieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

/** Campo de formulário escuro, igual ao das telas de login/cadastro do web */
export function Field({ label, error, icon, rightSlot, ...inputProps }: FieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.box, error ? styles.boxError : null]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <TextInput
          placeholderTextColor="rgba(255,255,255,0.3)"
          style={styles.input}
          accessibilityLabel={label}
          {...inputProps}
        />
        {rightSlot}
      </View>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: { color: "rgba(255,255,255,0.8)", fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase" },
  box: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.md,
    paddingHorizontal: 14,
  },
  boxError: { borderColor: "rgba(239,68,68,0.7)" },
  icon: { width: 20, alignItems: "center" },
  input: { flex: 1, height: "100%", color: colors.white, fontFamily: fonts.regular, fontSize: 15 },
  error: { color: "#f87171", fontFamily: fonts.semibold, fontSize: 12 },
});
