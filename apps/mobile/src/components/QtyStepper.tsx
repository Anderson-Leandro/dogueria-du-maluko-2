import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { colors, fonts, radius } from "@/theme";

interface QtyStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  dark?: boolean;
  label?: string;
}

/** Seletor de quantidade (− 1 +) */
export function QtyStepper({ value, onChange, min = 0, dark, label = "item" }: QtyStepperProps) {
  const color = dark ? colors.white : colors.foreground;
  return (
    <View style={[styles.box, dark ? styles.dark : styles.light]}>
      <Pressable
        onPress={() => onChange(Math.max(min, value - 1))}
        accessibilityRole="button"
        accessibilityLabel={`Diminuir quantidade de ${label}`}
        hitSlop={8}
        style={styles.btn}
      >
        <Minus size={16} color={color} />
      </Pressable>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Pressable
        onPress={() => onChange(value + 1)}
        accessibilityRole="button"
        accessibilityLabel={`Aumentar quantidade de ${label}`}
        hitSlop={8}
        style={styles.btn}
      >
        <Plus size={16} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", borderRadius: radius.full, paddingHorizontal: 4 },
  light: { backgroundColor: colors.muted },
  dark: { backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  btn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  value: { minWidth: 24, textAlign: "center", fontFamily: fonts.black, fontSize: 15 },
});
